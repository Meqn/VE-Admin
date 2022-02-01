const storage = window.localStorage

export default {
  get(key) {
    const localData = storage.getItem(key)
    try {
      return localData ? JSON.parse(localData) : localData
    } catch (err) {
      return localData
    }
  },
  set(key, value) {
    return storage.setItem(key, JSON.stringify(value))
  },
  remove(key) {
    return storage.removeItem(key)
  },
  clear() {
    return storage.clear()
  }
}
