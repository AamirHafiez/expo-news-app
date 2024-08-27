import { UrlType } from "../types";

abstract class NetworkDataSource {
  abstract getUrl(): Readonly<UrlType>;

  getQueryKey = () => this.getUrl();

  validateModel = <DataModel>() => {
    // TODO: Complete this function
  };
}

export default NetworkDataSource;
