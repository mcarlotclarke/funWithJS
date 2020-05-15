/*
In Search.js const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
In Recipe.js const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
Documentation URL http://forkify-api.herokuapp.com/
 */

import Search from './models/Search';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};

const controlSearch = async () => {
  // 1. Get the query from the view
  const query = 'pizza';

  if (query) {
    // 2. New serch object and add to state
    state.search = new Search(query);
    // 3. Prepare UI for results
    // 4. Search for recipes
    await state.search.getResults();
    // 5. Render results in UI
    console.log(state.search.result);
  }
};

document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault();
  controlSearch();
});
