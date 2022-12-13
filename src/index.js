import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './getImages';
import { renderCardItems } from './markup';
import axios from 'axios';
import { axios } from './getImages';

export const API_KEY = '31904814-f4bcbbfe75d97904192d1a917';
export let page = 0;
export const perPage = 40;
export let value = '';
let totalHits = 0;

const refs = {
  form: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');

const gallery = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  nav: true,
});

const updatePage = (clearContainer = '') => {
  return (refs.galleryContainer.innerHTML = clearContainer);
};

const onHandleSubmit = async e => {
  e.preventDefault();
  value = await e.target.elements.searchQuery.value.trim();

  if (!value) return;
  updatePage();
  page = 1;

  await getImages(value)
    .then(data => {
      return data;
    })
    .then(data => {
      totalHits = data.data.totalHits;
      Notiflix.Notify.success(`Hooray! We found "${totalHits}" images.`);
      return data;
    })
    .then(data => toShowImages(data))
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });

  refs.loadMoreBtn.classList.remove('is-hidden');
};

const toShowImages = async data => {
  const markup = await renderCardItems(data);
  updatePage(markup);
  gallery.refresh();
};

const pageCounter = () => {
  page += 1;
};

const onPagination = async () => {
  pageCounter();
  updatePage();
  console.log(page);
  await getImages(value)
    .then(toShowImages)
    .catch(error => {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      ),
        refs.loadMoreBtn.classList.add('is-hidden');
    });
};

refs.form.addEventListener('submit', onHandleSubmit);
refs.loadMoreBtn.addEventListener('click', onPagination);
