import { parser } from "../../parser";
import {CacheStoragePromised} from "../cacheStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocalStorageKeys from "./keys";
import LocalStorageErrorInstance, { LocalStorageError } from "./error-instance";

class LocalStorage implements CacheStoragePromised {
    /**
     * @throws {LocalStorageErrorInstance - PARSE_ITEM_FAILED}
     */
    async getItem<K>(key: LocalStorageKeys): Promise<K | undefined> {
        const jsonValue =  await AsyncStorage.getItem(key)
        if (jsonValue === null) return undefined;
        try {
            return parser.parse(jsonValue) as K
        } catch (error) {
            throw new LocalStorageErrorInstance(LocalStorageError.PARSE_ITEM_FAILED)
        }
    }

    /**
     * @throws {LocalStorageErrorInstance - PARSE_ITEM_FAILED, SET_ITEM_FAILED}
     */
    async setItem<K>(key: LocalStorageKeys, value: K): Promise<void> {
        const stringifiedValue = (() => {
            try {
                return parser.stringify(value)
            } catch (error) {
                throw new LocalStorageErrorInstance(LocalStorageError.INVALID_VALUE_TYPE)
            }
        })()
        try {
            await AsyncStorage.setItem(key, stringifiedValue)
        } catch (error) {
            throw new LocalStorageErrorInstance(LocalStorageError.SET_ITEM_FAILED)
        }
    }
    async removeItem(key: LocalStorageKeys): Promise<void> {
        try {
            await AsyncStorage.removeItem(key)
        } catch (error) {
            throw new LocalStorageErrorInstance(LocalStorageError.REMOVE_ITEM_FAILED)
        }
    }
}

export default LocalStorage