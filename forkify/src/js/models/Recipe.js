import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    // Assuming we need 15 mins per each 3 ingredients
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];

    const newIngredients = this.ingredients.map((el) => {
      // 1. Uniform units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      // 3. Parse ingredients into count, unit and ingredient
      const arrIngredients = ingredient.split(' ');
      const unitIndex = arrIngredients.findIndex((curEl) =>
        unitsShort.includes(curEl)
      );

      let objIng;
      if (unitIndex > -1) {
        // a. There is a unit
        // Ex. 4 1/2 cups, arrCount is [4, 1/2] --> eval("4+1/2") --> 4.5
        // Ex. 4 cups, arrCount is [4]
        const arrCount = arrIngredients.slice(0, unitIndex);
        let count;

        if (arrCount.length === 1) {
          count = eval(arrIngredients[0].replace('-', '+'));
        } else {
          count = eval(arrIngredients.slice(0, unitIndex).join('+'));
        }

        objIng = {
          count,
          unit: arrIngredients[unitIndex],
          ingredient: arrIngredients.slice(unitIndex + 1).join(' '),
        };
      } else if (parseInt(arrIngredients[0], 10)) {
        // b. No unit, but first element is a number
        objIng = {
          count: parseInt(arrIngredients[0], 10),
          unit: '',
          ingredient: arrIngredients.slice(1).join(' '),
        };
      } else if (unitIndex === -1) {
        // c. No unit, no number in first position
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}
