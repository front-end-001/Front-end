export const getList = () => {
  return fetch('./data/list.json').then(r => {
    return r.json()
  })
}