import LocalStorageKeys from "./keys"
import LocalStorage from "./localStorage"

export default abstract class LocalStorageDataSource {
    localStorage = new LocalStorage()
    storageKeys = LocalStorageKeys
}