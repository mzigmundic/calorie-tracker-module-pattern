/*******************************************************************************/
/***                             Item Controller                             ***/
/*******************************************************************************/

const ItemController = (function() {
    
    // Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // Private Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };

    // Public Functions
    return {

        // Get Items Function
        getItems: function() {
            return data.items;
        },

        // Add Item Function
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if (data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            calories = parseInt(calories);

            newItem = new Item(ID, name, calories);
            
            data.items.push(newItem);

            return newItem;
        },

        getTotalCalories: function() {
            let total = 0;

            // loop through items and add calories
            data.items.forEach((item) => {
                total += item.calories;
            });

            // set total cals in data structure
            data.totalCalories = total;

            // return total
            return data.totalCalories;
        },

        // Testing Function
        logData: function() {
            return data;
        }
    }
})();


/*******************************************************************************/
/***                              UI Controller                              ***/
/*******************************************************************************/

const UIController = (function() {

    // Private DOM Selectors Object
    const DOMSelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '#add-btn',
        updateBtn: '#update-btn',
        deleteBtn: '#delete-btn',
        backBtn: '#back-btn',
        clearBtn: '#clear-btn',
        itemNameInput: '#meal-name',
        itemCaloriesInput: '#meal-calories',
        totalCalories: '#total-calories'
    };
    
    // Public Functions
    return {

        // Populate Items Lists Function
        populateItemsList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li id="item-${item.id}" class="list-group-item">
                            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                            <a href="#" class="btn btn-light btn-sm float-right">
                                <i class="edit-item fas fa-pen"></i>
                            </a>
                        </li>`;
            });

            // insert list items
            document.querySelector(DOMSelectors.itemList).innerHTML = html;
        },

        // Add List Item Function
        addListItem: function(item) {

            // show the list
            document.querySelector(DOMSelectors.itemList).style.display = 'block';
            
            // create li element
            const li = document.createElement('li');

            // add class
            li.className = 'list-group-item';

            // add id
            li.id = `item-${item.id}`;

            // add html
            li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
            <a href="#" class="btn btn-light btn-sm float-right">
                <i class="edit-item fas fa-pen"></i>
            </a>`;

            // insert item
            document.querySelector(DOMSelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        // Get Item Input Function
        getItemInput: function() {
            return {
                name: document.querySelector(DOMSelectors.itemNameInput).value,
                calories: document.querySelector(DOMSelectors.itemCaloriesInput).value
            }
        },

        // Clear Input Funciton
        clearInput: function() {
            document.querySelector(DOMSelectors.itemNameInput).value = '';
            document.querySelector(DOMSelectors.itemCaloriesInput).value = '';
        },

        // Hide List Function
        hideList: function() {
            document.querySelector(DOMSelectors.itemList).style.display = 'none';
        },

        // Show Total Calories Function
        showTotalCalories: function(totalCalories) {
            document.querySelector(DOMSelectors.totalCalories).textContent = totalCalories;
        },

        // Get DOM Selectors Function
        getSelectors: function() {
            return DOMSelectors;
        }
    }
})();




/*******************************************************************************/
/***                              App Controller                             ***/
/*******************************************************************************/

const App = (function(ItemController, UIController) {

    // Private Load Event Listeners Function
    const loadEventListeners = function() {
        // get UI selectors
        const DOMSelectors = UIController.getSelectors();

        // add item event
        document.querySelector(DOMSelectors.addBtn).addEventListener('click', addItemSubmit);
    };

    // Private Add Item Submit Function
    const addItemSubmit = function(e) {

        // get form input from UIController
        const input = UIController.getItemInput();

        // check for name and calorie input
        if (input.name !== '' && input.calories !== '') {
            
            // Add item
            const newItem = ItemController.addItem(input.name, input.calories);
            
            // add item to the UI list
            UIController.addListItem(newItem);
            
            // get total calories
            const totalCalories = ItemController.getTotalCalories();

            // add total calories to the UI
            UIController.showTotalCalories(totalCalories);

            // clear fields
            UIController.clearInput();
        }

        e.preventDefault();
    };

    // Public Functions
    return {

        // Init Function
        init: function() {
            console.log('Strating app...')

            // fetch items from data structure
            const items = ItemController.getItems();

            // check if any items, populate if not empty
            if (items.length === 0) {
                UIController.hideList();
            } else {
                UIController.populateItemsList(items);
            }

            // get total calories
            const totalCalories = ItemController.getTotalCalories();

            // add total calories to the UI
            UIController.showTotalCalories(totalCalories);

            // load event listeners
            loadEventListeners();
        }
    }
})(ItemController, UIController);


// Initialize App
App.init();