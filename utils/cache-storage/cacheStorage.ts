export interface CacheStorage {
    getItem<K>(key: string): K | undefined | Promise<K | undefined>;
    setItem<K>(key: string, value: K): void | Promise<void>;
    removeItem(key: string): void;
}

export interface CacheStoragePromised extends CacheStorage  {
    getItem<K>(key: string): Promise<K | undefined>;
    setItem<K>(key: string, value: K): Promise<void>;
    removeItem(key: string): Promise<void>;
}
