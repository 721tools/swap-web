export function setStorage(key, val) {
  localStorage.set(key, JSON.stringify(val))
}

export function getStorage(key) {
  const res = localStorage.get(key)
  return res ? JSON.parse(res) : res
}
