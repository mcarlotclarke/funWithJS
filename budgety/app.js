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

    // to test our app temporarily
    testing: () => {
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
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
  };

  return {
    getInput: () => {
      return {
        type: document.querySelector(domStrings.inputType).value, // Will be either inc or exp
        description: document.querySelector(domStrings.inputDescription).value,
        value: parseFloat(document.querySelector(domStrings.inputValue).value),
      };
    },

    addListItem: (obj, type) => {
      // Create HTML with placeholder text
      let html, newHtml, element;

      if (type === 'inc') {
        element = domStrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = domStrings.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace placeholder text with actual data
      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);

      // Insert HTML into the DOM
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    clearFields: () => {
      const fields = document.querySelectorAll(
        `${domStrings.inputDescription}, ${domStrings.inputValue}`
      );
      // querySelector returns a list - convert to an array
      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((current) => {
        current.value = '';
      });

      fieldsArr[0].focus();
    },

    getDomStrings: () => {
      return domStrings;
    },
  };
})();

// App controller -> central place to decide and control what happens in each event and delegate tasks to other controllers
// Takes two parameters - Then we pass the UI and budget controllers as arguments to the IIFE
const controller = ((budgetCtrl, uiCtrl) => {
  const updateBudget = () => {
    // 1. Calculate budget
    // 2. Return the budget
    // 3. Display the budget on the UI
  };

  const controllerAddItem = () => {
    // 1. Get the input field data
    const input = uiCtrl.getInput();

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      const newItem = budgetCtrl.addItem(
        input.type,
        input.description,
        input.value
      );

      // 3. Add the item to the UI
      uiCtrl.addListItem(newItem, input.type);

      // 4. Clear fields
      uiCtrl.clearFields();

      // 5. Calculate and update budget
      updateBudget();
    }
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
