import axios from 'axios';

export function getUnsplashPhoto(reqInfo) {
  const { page, keyword } = reqInfo;
  return axios
    .get(
      `https://localhost:6508/users/unsplash-images?page=${page}&keyword=${keyword}`,
    )
    .then(res => res);
}
