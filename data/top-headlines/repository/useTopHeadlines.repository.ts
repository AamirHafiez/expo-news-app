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

/**
 * A custom hook that manages the fetching, caching, and manipulation of top headlines data.
 * It handles network requests, local storage operations, and state management for the top headlines.
 *
 * @returns An object containing various state variables and functions related to top headlines.
 */
function useTopHeadlinesRepository() {
  // State variables
  const [response, setResponse] = useState<null | TopHeadlinesModel>(null);
  const [currentList, setCurrentList] = useState<ArticleModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError | LocalStorageErrorInstance | null | string>(null);
  const [currentPinnedList, setCurrentPinnedList] = useState<ArticleModel[]>([]);
  const [deleting, setDeleting] = useState(false);

  // useRef for storing the current app state
  const appState = useRef(AppState.currentState);

  // useCountdown hook for managing a countdown timer
  const [count, { startCountdown, stopCountdown, resetCountdown }] = useCountdown({
    countStart: 1,
    intervalMs: 10000,
  });

  // useEffect for fetching top headlines, populating the pinned list, and cleaning up on unmount
  useEffect(() => {
    getTopHeadlines();
    populateCurrentPinnedList();
    return () => {
      stopAndResetCounter();
    };
  }, []);

  // useEffect for fetching more articles when the countdown reaches 0
  useEffect(() => {
    if (count <= 0) {
      fetchMore(5);
    }
  }, [count]);

  // useEffect for handling app state changes (foreground/background)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // App State is in foreground
        startCountdown();
        refetchOnFocusIfDataChanged();
      }
      if (nextAppState === 'background') {
        // App State is in background
        stopAndResetCounter();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // Function to populate the current pinned list from local storage
  const populateCurrentPinnedList = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    const pinnedList = await localStorageDataSource.getTopHeadlinesPinnedList();
    setCurrentPinnedList(pinnedList ?? []);
  };

  // Function to stop and reset the countdown timer
  const stopAndResetCounter = () => {
    stopCountdown();
    resetCountdown();
  };

  // Function to refetch top headlines if data has changed when the app comes into the foreground
  const refetchOnFocusIfDataChanged = async () => {
    const shouldRefetch = await shouldRefetchOnFocus();
    if (shouldRefetch) {
      refetch();
    }
  };

  // Function to check if top headlines data has changed when the app comes into the foreground
  const shouldRefetchOnFocus = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    return await localStorageDataSource.getTopHeadlinesChangedFlag();
  };

  // Function to fetch more articles and append them to the current list
  const fetchMore = async (count: number, resetList: boolean = false) => {
    try {
      stopAndResetCounter();
      const moreRandomArticles = await topHeadlinesUtils.getRandomArticles(count);
      setCurrentList(prev => {
        if (prev == null || resetList) {
          return moreRandomArticles;
        }
        return [...moreRandomArticles, ...prev];
      });
    } catch (error) {
      if (error instanceof TopHeadlinesErrorInstance) {
        if (error.message === TopHeadlinesError.RANDOM_ARTICLES_EXHAUSTED) {
          refetch();
        }
      }
    } finally {
      startCountdown();
    }
  };

  // Function to refetch top headlines
  const refetch = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    await localStorageDataSource.removeCurrentHeadlinesMaxIndex();
    await localStorageDataSource.setTopHeadlinesChangedFlag(false);
    await getTopHeadlines('network');
  };

  // Function to fetch top headlines from local storage
  const getHeadlinesFromOfflineStorage = async () => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    return await localStorageDataSource.getTopHeadlines();
  };

  // Function to fetch top headlines from a network call
  const getHeadlinesFromNetworkCall = async (page: number) => {
    const networkDataSource = new TopHeadlinesDataSource();
    return await networkDataSource.getTopHeadlines(page);
  };

  // Function to fetch top headlines, handling network and local storage operations
  const getTopHeadlines = async (fetchMode: 'network' | 'offline' = 'offline') => {
    stopAndResetCounter();
    setIsLoading(true);
    setError(null);

    try {
      let headlines: TopHeadlinesModel | undefined;
      headlines = await getHeadlinesFromOfflineStorage();
      if (headlines == null || fetchMode !== 'offline') {
        const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();

        let pageNumber = await localStorageDataSource.getTopHeadlinesPage();
        if (pageNumber == null) {
          pageNumber = 1;
        } else {
          if (headlines != null) {
            pageNumber++;
          }
        }
        headlines = await getHeadlinesFromNetworkCall(pageNumber);
        if (headlines == null) {
          throw new Error('No top headlines available');
        }
        await localStorageDataSource.setTopHeadlines(headlines);
        await localStorageDataSource.setTopHeadlinesPage(pageNumber);
      }
      setResponse(headlines);
      await fetchMore(10, fetchMode === 'network');
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle network errors
        setError(error);
      } else if (error instanceof LocalStorageErrorInstance) {
        // Handle local storage errors
        setError(error);
      }
      const unknownError = error as UnknownError;
      // Handle other unknown errors
      setError(unknownError?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add an article to the pinned list
  const addToPinnedList = (index: number) => {
    stopCountdown();
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    try {
      var articleToPin = currentList[index];
    } catch (error) {
      startCountdown();
      // Handle index out of bounds error
      return;
    }
    if (articleToPin != null) {
      const newPinnedList = [...currentPinnedList, articleToPin];
      setCurrentPinnedList(newPinnedList);
      localStorageDataSource.setTopHeadlinesPinnedList(newPinnedList);
      removeArticleFromStateAndStorage(articleToPin.title);
    }
  };

  // Function to remove an article from the pinned list
  const removeFromPinnedList = (title: string) => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    const newPinnedList = currentPinnedList.filter(article => article.title !== title);
    setCurrentPinnedList(newPinnedList);
    localStorageDataSource.setTopHeadlinesPinnedList(newPinnedList);
  };

  // Function to delete an article from the top headlines
  const deleteArticle = async (title: string) => {
    stopCountdown();
    setDeleting(true);
    removeArticleFromStateAndStorage(title);
    setDeleting(false);
    startCountdown();
  };

  // Function to remove an article from the state and local storage
  const removeArticleFromStateAndStorage = async (title: string) => {
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource();
    const newList = currentList.filter(article => article.title !== title);
    const currentTopHeadlines = await localStorageDataSource.getTopHeadlines();
    const currentTopHeadlinesArticles = currentTopHeadlines?.articles;
    if (currentTopHeadlinesArticles != null) {
      const newTopHeadlinesArticles = currentTopHeadlinesArticles.filter(
        article => article.title !== title
      );
      await localStorageDataSource.setTopHeadlines({
        ...currentTopHeadlines,
        articles: newTopHeadlinesArticles,
      } as TopHeadlinesModel);
    }
    setCurrentList(newList);
  };

  // Return the object containing various state variables and functions related to top headlines
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
    deleting,
  };
}
export default useTopHeadlinesRepository;
