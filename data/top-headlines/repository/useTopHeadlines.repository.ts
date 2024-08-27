import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { AxiosError } from "axios";
import { LocalStorageErrorInstance } from "@/utils/cache-storage/local-storage";
import UnknownError from "@/utils/error/UnknownError";
import TopHeadlinesDataSource from "../datasource/topHeadlines.network.datasource";
import type TopHeadlinesModel from "../datasource/topHeadlines.model";
import { type ArticleModel } from "../datasource/topHeadlines.model";
import { topHeadlinesUtils } from "@/utils/top-headlines";
import TopHeadlinesErrorInstance, { TopHeadlinesError } from "@/utils/top-headlines/error-instance";
import { useCountdown } from "@/hooks/utils/useCountDown";
import TopHeadlinesLocalStorageDataSource from "../datasource/topHeadlines.localstorage.datasource";

function useTopHeadlinesRepository() {
  const [response, setResponse] = useState<null | TopHeadlinesModel>(null);
  const [currentList, setCurrentList] = useState<ArticleModel[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | LocalStorageErrorInstance | null | string>(null);
  const [currentPinnedList, setCurrentPinnedList] = useState<ArticleModel[]>([])
  const [deleting, setDeleting] = useState(false);

  const appState = useRef(AppState.currentState);

  const [count, { startCountdown, stopCountdown, resetCountdown,  }] = useCountdown({
    countStart: 1,
    intervalMs: 10000,
  });

  useEffect(() => {
    getTopHeadlines();
    populateCurrentPinnedList();
    return () => {
      stopAndResetCounter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
      if (count <= 0) {
        fetchMore(5)
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])
  

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App State is in foreground
        startCountdown()
        refetchOnFocusIfDataChanged()
      } 
      if (nextAppState === "background") {
        // App State is in background
        stopAndResetCounter()
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const populateCurrentPinnedList = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    const pinnedList = await localStorageDataSource.getTopHeadlinesPinnedList()
    setCurrentPinnedList(pinnedList ?? [])
  }

  const stopAndResetCounter = () => {
    stopCountdown();
    resetCountdown();
  }

  const refetchOnFocusIfDataChanged = async () => {
    const shouldRefetch = await shouldRefetchOnFocus();
    if (shouldRefetch) {
      refetch()
    }
  }

  const shouldRefetchOnFocus = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    return await localStorageDataSource.getTopHeadlinesChangedFlag()
  }

  const fetchMore = async (count: number, resetList: boolean = false) => {
    try {
      stopAndResetCounter();
      const moreRandomArticles = await topHeadlinesUtils.getRandomArticles(count);
      setCurrentList(prev => {
        if (prev == null || resetList) {
          return moreRandomArticles;
        }
        return [...moreRandomArticles, ...prev];
      })
    } catch (error) {
        if (error instanceof TopHeadlinesErrorInstance) {
          if (error.message === TopHeadlinesError.RANDOM_ARTICLES_EXHAUSTED) {
            refetch()
          }
        }
    } finally {
      startCountdown();
    }
  }

  const refetch = async () => {
      const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
      await localStorageDataSource.removeCurrentHeadlinesMaxIndex();
      await localStorageDataSource.setTopHeadlinesChangedFlag(false);
      await getTopHeadlines("network");
  }

  const getHeadlinesFromOfflineStorage = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    return await localStorageDataSource.getTopHeadlines();
  }

  const getHeadlinesFromNetworkCall = async (page: number) => {
    const networkDataSource = new TopHeadlinesDataSource();
    return await networkDataSource.getTopHeadlines(page)
  }

  const getTopHeadlines = async (fetchMode: "network" | "offline" = "offline") => {
    stopAndResetCounter();
    setIsLoading(true);
    setError(null);
    
    try {
      let headlines: TopHeadlinesModel | undefined
      headlines = await getHeadlinesFromOfflineStorage();
      if (headlines == null || fetchMode !== "offline") {
          const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
          
          let pageNumber = await localStorageDataSource.getTopHeadlinesPage();
          if (pageNumber == null) {
            pageNumber = 1
          } else {
            if (headlines != null) {
              pageNumber++
            }
          }
          headlines = await getHeadlinesFromNetworkCall(pageNumber);
          if (headlines == null)  {
            throw new Error("No top headlines available")
          }
          await localStorageDataSource.setTopHeadlines(headlines);
          await localStorageDataSource.setTopHeadlinesPage(pageNumber)
      }
      setResponse(headlines)
      await fetchMore(10, fetchMode === "network");
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle network errors
        setError(error)
      } else if (error instanceof LocalStorageErrorInstance) {
        // Handle local storage errors
        setError(error)
      }
      const unknownError = error as UnknownError
      // Handle other unknown errors
      setError(unknownError?.message)
    } finally {
      setIsLoading(false);
     }
  }

  const addToPinnedList = (index: number) => {
    stopCountdown()
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    try {
      var articleToPin = currentList[index]
    } catch (error) {
      startCountdown()
      // Handle index out of bounds error
      return;
    }
    if (articleToPin != null)  {
      const newPinnedList = [...currentPinnedList, articleToPin]
      setCurrentPinnedList(newPinnedList)
      localStorageDataSource.setTopHeadlinesPinnedList(newPinnedList)
      removeArticleFromStateAndStorage(articleToPin.title)
    }
  }

  const removeFromPinnedList = (title: string) => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    const newPinnedList = currentPinnedList.filter(article => article.title !== title)
    setCurrentPinnedList(newPinnedList)
    localStorageDataSource.setTopHeadlinesPinnedList(newPinnedList)
  }

  const deleteArticle  = async (title: string) => {
    stopCountdown();
    setDeleting(true)
    removeArticleFromStateAndStorage(title)
    setDeleting(false)
    startCountdown()
  }

  const removeArticleFromStateAndStorage = async (title: string) => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()
    const newList = currentList.filter(article => article.title !== title)
    const currentTopHeadlines = await localStorageDataSource.getTopHeadlines();
    const currentTopHeadlinesArticles = currentTopHeadlines?.articles;
    if (currentTopHeadlinesArticles != null) {
      const newTopHeadlinesArticles = currentTopHeadlinesArticles.filter(article => article.title !== title)
      await localStorageDataSource.setTopHeadlines({ ...currentTopHeadlines, articles: newTopHeadlinesArticles } as TopHeadlinesModel);
    }
    setCurrentList(newList)
  }

  return {
    response, 
    isLoading,
    error,
    getTopHeadlines,
    currentList,
    fetchMore,
    addToPinnedList,
    removeFromPinnedList,
    currentPinnedList,
    deleteArticle,
    deleting
  }
}

export default useTopHeadlinesRepository;
