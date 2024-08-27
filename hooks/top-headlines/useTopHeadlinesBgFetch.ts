
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { useEffect, useState } from 'react'
import { TOP_HEADLINES_BACKGROUND_FETCH_TASK, registerBackgroundFetchAsync, unregisterBackgroundFetchAsync } from "./backgroundFetchScript";

const useTopHeadlinesBgFetch = () => {
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState<BackgroundFetch.BackgroundFetchStatus | null>(null);
  
    useEffect(() => {
      checkStatusAsync();
    }, []);
  
    const checkStatusAsync = async () => {
      const status = await BackgroundFetch.getStatusAsync();
      const isRegistered = await TaskManager.isTaskRegisteredAsync(TOP_HEADLINES_BACKGROUND_FETCH_TASK);
      setStatus(status);
      setIsRegistered(isRegistered);
    };
  
    const toggleFetchTask = async () => {
      if (isRegistered) {
        // await unregisterBackgroundFetchAsync();
      } else {
        await registerBackgroundFetchAsync();
      }
      checkStatusAsync();
    };

  return {
    toggleFetchTask,
    status
  }
}

export default useTopHeadlinesBgFetch
