import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, renderLoader, clearLoader } from './views/base';

/* Global state of the app
- Search object
- Current recipe object
- Shopping list object
- Liked recipes
*/
const state = {};
window.state = state;

/**
 * SEARCH CONTROLLER
 */
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

    try {
      // 4. Search for recipes
      await state.search.getResults();

      // 5. Render results in UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log(error);
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  controlSearch();
});

elements.searchResultsPages.addEventListener('click', (event) => {
  // event delegation
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get id from the URL
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe project
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * LIST CONTROLLER
 */
const controlList = () => {
  // Create a new list if there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredient to the list and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// Load and change recipe when load/reload
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// Handle delete and update list items events
elements.shopping.addEventListener('click', (event) => {
  const id = event.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button
  if (event.target.matches('.shopping__delete, .shopping__delete *')) {
    // Delete from state
    state.list.deleteItem(id);

    // Delete from UI
    listView.deleteItem(id);

    // Handle the count update
  } else if (event.target.matches('.shopping__count-value')) {
    const value = parseFloat(event.target.value, 10);
    if (value >= 0) state.list.updateCount(id, value);
  }
});

/**
 * LIKES CONTROLLER
 */

// TESTING ONLY remove
state.likes = new Likes();
likesView.toggleLikesMenu(state.likes.getNumLikes());

const controlLike = () => {
  // Create a new likes if there is none yet
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;

  // User has NOT yet liked current recipe
  if (!state.likes.isLiked(currentId)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // Toggle (heart) likes button
    likesView.toggleLikesBtn(true);

    // Add like to UI likes list
    console.log(state.likes);

    // User HAS liked current recipe
  } else {
    // Remove like from state
    state.likes.deleteLike(currentId);

    // Toggle (heart) likes button
    likesView.toggleLikesBtn(false);

    // Remove like from UI likes list
    console.log(state.likes);
  }
  likesView.toggleLikesMenu(state.likes.getNumLikes());
};

// Handle recipe button clicks
elements.recipe.addEventListener('click', (event) => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('decrease');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('increase');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    // Add like controller
    controlLike();
  }
});

window.el = new List();
