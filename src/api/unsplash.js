import axios from 'axios';

export function getUnsplashPhoto(reqInfo) {
  const { page, keyword } = reqInfo;
  return axios
    .get(
      `https://seba-api.cf/users/unsplash-images/?page=${page}&keyword=${keyword}`,
    )
    .then(res => res);
}
