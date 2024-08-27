import { apiInstance } from "@/network";
import NetworkDataSource from "@/network/utils/NetworkDataSource";
import NetworkUrls from "@/network/config/NetworkUrls";
import HeadlinesModel from "./topHeadlines.model";

class TopHeadlinesNetworkDataSource extends NetworkDataSource {
  getUrl() {
    return NetworkUrls.TOP_HEADLINES;
  }

  getTopHeadlines = (page: number) =>
    apiInstance.get<HeadlinesModel>(this.getUrl() + `page=${page}`).then((res) => res.data);
}

export default TopHeadlinesNetworkDataSource;
