
import TopHeadlinesLocalStorageDataSource from "@/data/top-headlines/datasource/topHeadlines.localstorage.datasource";
import TopHeadlinesNetworkDataSource from "@/data/top-headlines/datasource/topHeadlines.network.datasource";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

export const TOP_HEADLINES_BACKGROUND_FETCH_TASK = "top-headlines-background-fetch";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(TOP_HEADLINES_BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`
  );

  const networkDataSource = new TopHeadlinesNetworkDataSource();

  try {
    const page = 1
    const topHeadlines = await networkDataSource.getTopHeadlines(page);
    if (topHeadlines?.status !== "ok" || topHeadlines?.articles == null || topHeadlines?.articles?.length <= 0) {
      throw new Error("BG Fetch Failed")
    }
    const localStorageDataSource = new TopHeadlinesLocalStorageDataSource()

    await localStorageDataSource.setTopHeadlinesChangedFlag(true)
    await localStorageDataSource.setTopHeadlines(topHeadlines);
    await localStorageDataSource.setTopHeadlinesPage(page)
  } catch (error) {
    console.error(
      `Got background fetch call at date with error: ${new Date(now).toISOString()}`,
      error
    );
    return BackgroundFetch.BackgroundFetchResult.Failed
  }

  console.log(
    `BG fetch Success`
  );

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(TOP_HEADLINES_BACKGROUND_FETCH_TASK, {
    minimumInterval: 60, // 60 seconds
    // minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
export async function unregisterBackgroundFetchAsync() {
  console.log("🚀 ~ unregisterBackgroundFetchAsync ~ unregistered background fetch tasks")
  return BackgroundFetch.unregisterTaskAsync(TOP_HEADLINES_BACKGROUND_FETCH_TASK);
}
