import { ArticleModel } from "@/data/top-headlines/datasource/topHeadlines.model";
import { LocalStorageErrorInstance } from "@/utils/cache-storage/local-storage";
import { AxiosError } from "axios";

export interface NewsListController {
    isRefreshing: boolean;
    isDeletingInProgress: boolean;
    listData?: ArticleModel[] | null;
    pinnedList?: ArticleModel[] | null;
    onDeleteNewsTab: (title: string) => void;
    onPinNewsTab: (index: number) => void;
    onUnpinNewsTab: (title: string) => void;
    onUserRefresh: () => void;
    error: string | AxiosError<unknown, any> | LocalStorageErrorInstance | null
}