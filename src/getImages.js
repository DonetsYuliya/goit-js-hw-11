import { API_KEY } from '.';
import { page } from '.';
import { perPage } from '.';
import { value } from '.';
import axios from 'axios';
import { axios } from '.';

export const getImages = async () => {
  return await axios(
    `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  ).then(data => {
    if (data.data.hits.length === 0) {
      throw new Error(data);
    }
    return data;
  });
};
