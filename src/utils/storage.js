const storage = window.localStorage
// var objArr = /(^\{[\s\S]*\}$)|(^\[[\s\S]*\]$)/

export default {
  get(key) {
    try {
      const localData = storage.getItem(key)
      if (localData) {
        return JSON.parse(localData)
      }
      return localData
    } catch (err) {
      return undefined
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
