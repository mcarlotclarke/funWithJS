// Budget controller
const budgetController = (() => {})();

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
    // 1. Get the input field data
    const input = uiCtrl.getInput();
    // 2. Add the item to the budget controller
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
