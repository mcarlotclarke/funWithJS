/*
In Search.js const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
In Recipe.js const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
Documentation URL http://forkify-api.herokuapp.com/
 */

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New serch object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchResults);

    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render results in UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  controlSearch();
});

elements.searchResultsPages.addEventListener('click', (event) => {
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});
