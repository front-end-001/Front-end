const urlMap = {
  recommend: 'https://static001.geekbang.org/univer/classes/js_dev/data/getRecommendationPageData'
}

// https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeAll
// https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeSuprise
// https://static001.geekbang.org/univer/classes/js_dev/data/getInterestingPageDataTypeUnexpect
// https://static001.geekbang.org/univer/classes/js_dev/data/getNewPageData
export function getData(key) {
  const url = urlMap[key];
  if (!url) {
    throw new Error('unknow data key');
  }
  return fetch(url);
}