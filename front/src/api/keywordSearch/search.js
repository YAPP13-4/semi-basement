import Fuse from "fuse.js"

export function getKeywordSearchResult(dataList) {
  //data[0] = searchKeyword
  //data[1] = targetList
  const searchOpts = {
    caseSensitive: true,
    shouldSort: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["title", "user.username"]
  }
  const fuse = new Fuse(dataList[1], searchOpts)
  const matchResult = fuse.search(dataList[0]) // 여기에서 키워드 넣어주어야 한다.
  //console.log("matchResult ", matchResult)
  return matchResult
}
