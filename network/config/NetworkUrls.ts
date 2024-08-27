enum ApiVersions {
  V2 = "v2",
}

enum NetworkUrls {
  TOP_HEADLINES = `${ApiVersions.V2}/top-headlines?country=us&pageSize=100`,
}

export default NetworkUrls;
