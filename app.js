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
    }
})();




/*******************************************************************************/
/***                              App Controller                             ***/
/*******************************************************************************/

const App = (function(ItemController, UIController) {

    // Public Functions
    return {

        // Init Function
        init: function() {
            console.log('Strating app...')

            // fetch items from data structure
            const items = ItemController.getItems();

            // populate list with items
            UIController.populateItemsList(items);
        }
    }
})(ItemController, UIController);


// Initialize App
App.init();