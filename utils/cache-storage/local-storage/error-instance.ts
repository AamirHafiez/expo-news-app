export enum LocalStorageError {
    PARSE_ITEM_FAILED = "Parse error",
    SET_ITEM_FAILED = "Failed to set item in local storage",
    REMOVE_ITEM_FAILED = "Failed to remove item from local storage",
    INVALID_VALUE_TYPE = "Invalid value type provided",
}

class LocalStorageErrorInstance extends Error {
    constructor(message: LocalStorageError) {
        super(message);
        this.name = "LocalStorageError";
    }
}

export default LocalStorageErrorInstance;