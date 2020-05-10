// Budget controller
const budgetController = (() => {
  // Create constructor functions & data structure
  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      totalExp: 0,
      totalInc: 0,
    },
  };

  return {
    addItem: (type, desc, val) => {
      let newItem, iD;

      // Create new id
      if (data.allItems[type].length > 0) {
        iD = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        iD = 0;
      }

      // Create new item based on 'exp' or 'inc' type
      if (type === 'inc') {
        newItem = new Income(iD, desc, val);
      } else if (type === 'exp') {
        newItem = new Expense(iD, desc, val);
      }

      // Push it into our data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },

    testing() {
      console.log(data);
    },
  };
})();

// UI controller
const uiController = (() => {
  const domStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputButton: '.add__btn',
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: document.querySelector(domStrings.inputValue).value,
      };
    },

    getDomStrings: () => {
      return domStrings;
    },
  };
})();

// App controller -> central place to decide and control what happens in each event and delegate tasks to other controllers
// Takes two parameters - Then we pass the UI and budget controllers as arguments to the IIFE
const controller = ((budgetCtrl, uiCtrl) => {
  const controllerAddItem = () => {
    let input, newItem;
    // 1. Get the input field data
    input = uiCtrl.getInput();
    // 2. Add the item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    // 4. Calculate budget
    // 5. Display the budget on the UI
  };

  const setUpEventListeners = () => {
    const domStringsUICtrl = uiCtrl.getDomStrings();

    document
      .querySelector(domStringsUICtrl.inputButton)
      .addEventListener('click', controllerAddItem);
    document.addEventListener('keypress', (event) => {
      if (event.keyCode === 13 || event.which === 13) {
        controllerAddItem();
      }
    });
  };

  return {
    init: () => {
      setUpEventListeners();
    },
  };
})(budgetController, uiController);

// To execute all the code when app starts like setUpEventListeners
controller.init();
