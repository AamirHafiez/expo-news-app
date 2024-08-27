# 👋 Welcome to your Expo News App 📰

Checkout video demo of the app - [Click Here](https://drive.google.com/file/d/1lGRbX_r8n4mAOUPiJROuBQST8Ns16XnT/view?usp=drive_link)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started
1. Go to https://newsapi.org and get an api key.

2. Create a new .env file in your root directory and add below to it. Replace [api_key_from_news_api] with your api key from https://newsapi.org.

   ```bash
      EXPO_PUBLIC_API_URL=https://newsapi.org
      EXPO_PUBLIC_NEWS_API_KEY=[api_key_from_news_api]
   ```


2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

Refer above links to open the app in an environment of your choice.

## Assumptions

1. The app will fetch 100 articles from https://newsapi.org and store it in the local storage.

2. If the local storage data is not available, the app will fetch articles on startup.

3. A background task is running behind the scenes which will automatically fetch these articles. The minimum time on android is given as 1 minute in order to avoid user time issues while developing. For iOS the developer will have to manually trigger the background task using instruments app on macOS. [Refer this](https://docs.expo.dev/versions/latest/sdk/background-fetch/).

4. Assuming that the headlines api server updates after every 1 minute. The background task will automatically fetch page number 1 with 100 articles. This background fetch should usually be triggered after 12 to 24 hours in production.

5. There is an option for user to manually trigger the network call to fetch articles either by pull to refresh on the screen or the refresh button present on the title bar. This manual trigger will fetch the next page number with 100 articles from network.

6. On the initial open of the app, the app will fetch random 10 articles from the local storage which was populated from either from previous fetch or background task or current fetch. After every 10 seconds a timer will go off and refresh button will be triggered if all articles from the local storage have been shown a new refetch to network will be triggered which will rewrite the local storage and new 10 articles will be shown to the user. Incase there are articles still pending to be shown in the local storage a random list of 5 articles will be shown on top of the current list shown on the screen.

7. It is assumed that articles will be fetched from the network in the multiples of 5 since the random article generator maps for 5 articles at a time and if there are random articles list not divisible by 5 then a new network refetch will be called.

8. Pin functionality is given so that the user can pin an article to the top of the list. But it is assumed that the pinned article will be deleted from the articles list that are not pinned so that the functionality where a refetch happens and new 10 articles will be shown does not have the current article which could create an ambiguity.

9. A delete functionality is given so that the user can delete an article which is not pinned. But a pinned article cannot be deleted since it is already deleted from the unpinned articles list. To delete a pinned article just unpin them.