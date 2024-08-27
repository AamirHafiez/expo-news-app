import TopHeadlinesModel, { ArticleModel } from "@/data/top-headlines/datasource/topHeadlines.model";
import { localStorage, LocalStorageKeys } from "../cache-storage/local-storage";
import TopHeadlinesUtils from "./topHeadlinesUtils";
import TopHeadlinesErrorInstance, { TopHeadlinesError } from "./error-instance";
import getRandomNumberInclusive from "../number/getRandomNumberInclusive";

class TopHeadlinesUtilsImpl implements TopHeadlinesUtils {
    
    /**
     * @throws {TopHeadlinesErrorInstance - NO_RANDOM_TOP_HEADLINES_FOUND, UNABLE_TO_GET_RANDOM_HEADLINE, RANDOM_ARTICLES_EXHAUSTED}
     * @throws {LocalStorageErrorInstance - PARSE_ITEM_FAILED}
     */
    async getRandomArticles(count: number): Promise<ArticleModel[]> {
        const headlinesResponse = await localStorage.getItem<TopHeadlinesModel>(LocalStorageKeys.TOP_HEADLINES);
        const storedMax = await localStorage.getItem<number>(LocalStorageKeys.CURRENT_HEADLINES_MAX_INDEX)
        const articles = headlinesResponse?.articles;
        if (headlinesResponse == null || articles == null || articles?.length <= 0) {
            throw new TopHeadlinesErrorInstance(TopHeadlinesError.NO_RANDOM_TOP_HEADLINES_FOUND)
        }
        let maxIndex = storedMax ?? articles?.length - 1
        const requiredRandomArticles: ArticleModel[] = []
        for (let i = 0; i < count; i++) {
            const {article: randomArticle, index: randomArticleIndex} = this.getRandomArticle(articles, maxIndex)
            const articleAtMaxIndex = articles[maxIndex]
            articles[maxIndex] = randomArticle;
            articles[randomArticleIndex] = articleAtMaxIndex;
            requiredRandomArticles.push(randomArticle)
            maxIndex--;
        }
        await localStorage.setItem(LocalStorageKeys.CURRENT_HEADLINES_MAX_INDEX, maxIndex);
        await localStorage.setItem(LocalStorageKeys.TOP_HEADLINES, { ...headlinesResponse, articles })
        return requiredRandomArticles;
    }

    /**
     * @throws {TopHeadlinesErrorInstance - UNABLE_TO_GET_RANDOM_HEADLINE}
     */
    private getRandomArticle (articles: ArticleModel[], maxIndex: number): {
        article: ArticleModel,
        index: number,  // Index of the random article in the array.
    }{
        if (maxIndex > articles.length - 1) {
            throw new TopHeadlinesErrorInstance(TopHeadlinesError.UNABLE_TO_GET_RANDOM_HEADLINE);
        }
        if (maxIndex < 0) {
            throw new TopHeadlinesErrorInstance(TopHeadlinesError.RANDOM_ARTICLES_EXHAUSTED);
        }
        const randomIndexBetweenStartIndexAndMax = getRandomNumberInclusive(0, maxIndex);
        return {
            article: articles[randomIndexBetweenStartIndexAndMax],
            index: randomIndexBetweenStartIndexAndMax
        };
    }
}

export default TopHeadlinesUtilsImpl;