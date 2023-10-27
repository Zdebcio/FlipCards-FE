export const setItem = (item: string, value: string) => {
  return localStorage.setItem(item, value)
}

export const getItem = (item: string) => {
  return localStorage.getItem(item)
}

export const removeItem = (item: string) => {
  return localStorage.removeItem(item)
}
