import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImages } from './getImages';
import { renderCardItems } from './markup';

export const API_KEY = '31904814-f4bcbbfe75d97904192d1a917';
export const perPage = 40;
let page = 1;

const refs = {
  form: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  inputEl: document.querySelector('input'),
};

const toHideBtn = () => refs.loadMoreBtn.classList.add('is-hidden');
const toShowBtn = () => refs.loadMoreBtn.classList.remove('is-hidden');
toHideBtn();

const gallery = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  nav: true,
});

const clearList = (clear = '') => {
  return (refs.galleryContainer.innerHTML = clear);
};

const onHandleSubmit = async e => {
  e.preventDefault();
  const value = await e.target.elements.searchQuery.value.trim();

  if (!value) return;
  clearList();
  const page = 1;

  try {
    const data = await getImages(value, page);
    const totalHits = await data.data.totalHits;
    Notiflix.Notify.success(`Hooray! We found "${totalHits}" images.`);
    await toShowImages(data);
    toShowBtn();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

const toShowImages = async data => {
  const markup = await renderCardItems(data);
  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
  const lastElement = refs.galleryContainer.lastElementChild;
  observer.observe(lastElement);
};

const pageCounter = () => (page += 1);

const onPagination = async () => {
  const value = refs.inputEl.value.trim();
  pageCounter();
  try {
    const data = await getImages(value, page);
    await toShowImages(data);
    // smoothyScroll();
  } catch (error) {
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    ),
      toHideBtn();
  }
};

refs.form.addEventListener('submit', onHandleSubmit);
refs.loadMoreBtn.addEventListener('click', onPagination);

// smoothyScroll /////

// const smoothyScroll = () => {
//   const { height: cardHeight } =
//     refs.galleryContainer.firstElementChild.getBoundingClientRect();
//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// };

// scrolling is not end /////

const options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
};
const callback = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
      onPagination();
    }
  });
};
const observer = new IntersectionObserver(callback, options);
