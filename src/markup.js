export const renderCardItems = data => {
  const imgObj = data.data;
  return imgObj.hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b>likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>views ${views}</b>
      </p>
      <p class="info-item">
        <b>comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>downloads ${downloads}</b>
      </p>
    </div>
  </div>`;
      }
    )
    .join('');
};
