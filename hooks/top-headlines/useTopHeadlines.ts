import { useEffect } from "react";
import { NewsListController } from "./types"
import useTopHeadlinesBgFetch from "@/hooks/top-headlines/useTopHeadlinesBgFetch";
import useTopHeadlinesRepository from "@/data/top-headlines/repository/useTopHeadlines.repository";

const useTopHeadlines = (): NewsListController => {

  const {status, toggleFetchTask} = useTopHeadlinesBgFetch();

  const { isLoading, currentList, fetchMore, addToPinnedList, error, currentPinnedList, removeFromPinnedList, deleteArticle, deleting} = useTopHeadlinesRepository();

  useEffect(() => {
    toggleFetchTask()
  }, [])
  
  const onUserRefresh = () => {
    fetchMore(5)
  }

  return {
    isRefreshing: isLoading,
    isDeletingInProgress: deleting,
    listData: currentList,
    pinnedList: currentPinnedList,
    onDeleteNewsTab: deleteArticle,
    onPinNewsTab: addToPinnedList,
    onUnpinNewsTab: removeFromPinnedList,
    onUserRefresh,
    error
  }
}

export default useTopHeadlines