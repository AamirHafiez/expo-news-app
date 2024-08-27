import type TopHeadlinesModel from "./topHeadlines.model";
import LocalStorageDataSource from "@/utils/cache-storage/local-storage/LocalStorageDataSource";
import { ArticleModel } from "./topHeadlines.model";

export default class TopHeadlinesLocalStorageDataSource extends LocalStorageDataSource {
    async getTopHeadlines(){
        return await this.localStorage.getItem<TopHeadlinesModel>(this.storageKeys.TOP_HEADLINES)
    }

    async setTopHeadlines(data: TopHeadlinesModel) {
        await this.localStorage.setItem(this.storageKeys.TOP_HEADLINES, data)
    }

    async removeCurrentHeadlinesMaxIndex () {
        await this.localStorage.removeItem(this.storageKeys.CURRENT_HEADLINES_MAX_INDEX)
    }

    async getTopHeadlinesChangedFlag () {
        return await this.localStorage.getItem<boolean>(this.storageKeys.TOP_HEADLINES_CHANGED)
    }

    async setTopHeadlinesChangedFlag (toggle: boolean) {
        await this.localStorage.setItem(this.storageKeys.TOP_HEADLINES_CHANGED, toggle)
    }

    async getTopHeadlinesPage () {
        return await this.localStorage.getItem<number>(this.storageKeys.TOP_HEADLINES_PAGE)
    }

    async setTopHeadlinesPage (pageNumber: number) {
        await this.localStorage.setItem(this.storageKeys.TOP_HEADLINES_PAGE, pageNumber)
    }

    async setTopHeadlinesPinnedList (pinnedList:ArticleModel[]) {
        await this.localStorage.setItem(this.storageKeys.TOP_HEADLINES_PINNED_LIST, pinnedList)
    }

    async getTopHeadlinesPinnedList () {
        return await this.localStorage.getItem<ArticleModel[]>(this.storageKeys.TOP_HEADLINES_PINNED_LIST)
    }
}