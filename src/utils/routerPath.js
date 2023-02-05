const ROUTERPATH = 'routerPath'

export const getPath = () => {
  return localStorage.getItem(ROUTERPATH)
}

export const setPath = (path) => {
  return localStorage.setItem(ROUTERPATH, path)
}

export const removePath = () => {
  return localStorage.removeItem(ROUTERPATH)
}
