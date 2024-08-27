export enum TopHeadlinesError {
    NO_RANDOM_TOP_HEADLINES_FOUND = "NO_RANDOM_TOP_HEADLINES_FOUND",
    RANDOM_ARTICLES_EXHAUSTED = "RANDOM_ARTICLES_EXHAUSTED",
    UNABLE_TO_GET_RANDOM_HEADLINE = "UNABLE_TO_GET_RANDOM_HEADLINE"
}

class TopHeadlinesErrorInstance extends Error {
    constructor(message: TopHeadlinesError) {
        super(message);
        this.name = "TopHeadlinesError";
    }
}

export default TopHeadlinesErrorInstance;