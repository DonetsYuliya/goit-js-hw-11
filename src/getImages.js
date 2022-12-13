import { API_KEY } from '.';
import { page } from '.';
import { perPage } from '.';
import { page } from '.';
import axios from 'axios';
const axios = require('axios');

export const getImages = async value => {
  try {
    const data = await axios(
      `https://pixabay.com/api/?key=${API_KEY}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    const imgObject = await data.data.hits.length;
    if (imgObject === 0) return error;
    return data;
  } catch (error) {
    throw new Error(data);
  }
};