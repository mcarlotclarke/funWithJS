// Budget controller
const budgetController = (() => {})();

// UI controller
const uiController = (() => {})();

// App controller -> central place to decide and control what happens in each event and delegate tasks to other controllers
// Takes two parameters - Then we pass the UI and budget controllers as arguments to the IIFE
const controller = ((budgetCtrl, uiCtrl) => {
  const controllerAddItem = () => {
    // 1. Get the input field data
    // 2. Add the item to the budget controller
    // 3. Add the item to the UI
    // 4. Calculate budget
    // 5. Display the budget on the UI
  };

  document
    .querySelector('.add__btn')
    .addEventListener('click', controllerAddItem);
  document.addEventListener('keypress', (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      controllerAddItem();
    }
  });
})(budgetController, uiController);
