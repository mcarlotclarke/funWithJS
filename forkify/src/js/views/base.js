export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResults: document.querySelector('.results'),
  searchResultsList: document.querySelector('.results__list'),
};

// To better maintain code and if we update class html or css
export const elementStrings = {
  loader: 'loader',
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="${elementStrings.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`);

  // to remove child, we move up to parent element then remove child
  if (loader) loader.parentElement.removeChild(loader);
};
