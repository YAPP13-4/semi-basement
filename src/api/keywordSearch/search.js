import Fuse from 'fuse.js';

export function getKeywordSearchResult(dataList) {
  const { musicInfo, keyword } = dataList;
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
    includeMatches: true,
    keys: ['title', 'user.username'],
  };
  const fuse = new Fuse(musicInfo, searchOpts);
  const matchResult = fuse.search(keyword); // 여기에서 키워드 넣어주어야 한다.
  console.log('matchResult ', matchResult);
  return matchResult; //나중엔 matches 도 넘겨야해!
}
