import MethodHandler, {RenderProducts} from "./methodHandler.js";

/**Function for handling product filtering**/
const productsToFilter = document.querySelector('.products-template');

const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
let filteredArray = [];
let checkboxItems = Array.from(document.querySelectorAll('input[type=checkbox]'));

function check() {
    if (filteredArray.length === 0) {
        const resetList = new RenderProducts(FROM_STORAGE, productsToFilter);
        resetList.render();
    }
}
let activeFilters = [];
function filter(event) {
    productsToFilter.innerHTML = '';
    let result = FROM_STORAGE;
    if (event.target.checked) {
        if (activeFilters.length === 0) {
            activeFilters.push({type: event.target.className, value: [event.target.value]});
            console.log(activeFilters);
        } else {
            let filter = activeFilters.find(filter => filter.type === event.target.className);
            if (filter) {
                filter.value.push(event.target.value);
            } else {
                activeFilters.push({type: event.target.className, value: [event.target.value]});
                console.log(activeFilters);
            }
        }
    } else {
        activeFilters = activeFilters.filter(item => item.type !== event.target.value);
    }
    activeFilters.forEach(activeFilter => {
        result = result.filter(prod => {
            return activeFilter.value.indexOf(prod[activeFilter.type]) > -1
        });
    });
    return Promise.resolve(result).then(function (response) {
        const renderList = new RenderProducts(response, productsToFilter);
        renderList.render();
    });
}

checkboxItems.forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
        filter(event).then(check);
    })
});

/**Sorting function**/
let sortDropdown = document.getElementById('sort-options');

function sortItems(event) {
    // let items = Array.from(document.querySelectorAll('.tile'));
    let items = document.querySelectorAll('.tile');
    let sortedList = [];
    switch (event.target.id) {
        case "ascending":
            sortedList = filteredArray[0]['products'].sort(function (a, b) {
                return a['prod-name'] > b['prod-name'];
            });
            let displaySortedByName = new RenderProducts(sortedList, productsToFilter);
            displaySortedByName.render();
            break;
        case "descending":
            sortedList = filteredArray[0]['products'].sort(function (a, b) {
                return a['prod-name'] < b['prod-name'];
            });
            let displaySortedByNameReversed = new RenderProducts(sortedList, productsToFilter);
            displaySortedByNameReversed.render();
            break;
        case "highest":
            sortedList = filteredArray[0]['products'].sort(function (a, b) {
                return a.price < b.price;
            });
            let displaySortedByHighestPrice = new RenderProducts(sortedList, productsToFilter);
            displaySortedByHighestPrice.render();
            break;
        case "lowest":
            sortedList = filteredArray[0]['products'].sort(function (a, b) {
                return a.price > b.price;
            });
            let displaySortedByLowestPrice = new RenderProducts(sortedList, productsToFilter);
            displaySortedByLowestPrice.render();
            break;
    }
}

sortDropdown.addEventListener('click', sortItems);

