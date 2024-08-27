import { CreateAxiosDefaults } from "axios";

const NetworkInstance: CreateAxiosDefaults = {
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  params: {
    apiKey: process.env.EXPO_PUBLIC_NEWS_API_KEY,
  }
};

export default NetworkInstance;
