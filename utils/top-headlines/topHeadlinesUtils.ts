import { ArticleModel } from "@/data/top-headlines/datasource/topHeadlines.model";

export default interface TopHeadlinesUtils {
    /**
     * @throws {TopHeadlinesErrorInstance - NO_RANDOM_TOP_HEADLINES_FOUND, UNABLE_TO_GET_RANDOM_HEADLINE, RANDOM_ARTICLES_EXHAUSTED}
     * @throws {LocalStorageErrorInstance - PARSE_ITEM_FAILED}
     */
    getRandomArticles (count: number): Promise<ArticleModel[]>;
}