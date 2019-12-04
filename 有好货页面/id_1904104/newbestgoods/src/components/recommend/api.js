import axios from 'axios'

export const getCarouselList = data => {
  let url = 'https://static001.geekbang.org/univer/classes/js_dev/data/getRecommendationPageData'
  return axios.get(url)
}
