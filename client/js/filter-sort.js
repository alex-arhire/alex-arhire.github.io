/**Imports**/
import {RenderProducts} from "./method-handler.js";

/**Function for handling product filtering**/
const productsToFilter = document.querySelector('.products-template');

const FROM_STORAGE = JSON.parse(localStorage.getItem('productsForStorage'));
let filteredArray = [];
let checkboxItems = Array.from(document.querySelectorAll('input[type=checkbox]'));

function check() {
    if (activeFilters[0].value.length === 0) {
        const resetList = new RenderProducts(FROM_STORAGE, productsToFilter);
        resetList.render();
    }
}

let activeFilters = [];

function filterSort(event) {
    productsToFilter.innerHTML = '';
    let result = FROM_STORAGE;
    if (event.target.checked) {
        if (activeFilters.length === 0) {
            activeFilters.push({type: event.target.className, value: [event.target.value]});
        } else {
            let filter = activeFilters.find(filter => filter.type === event.target.className);
            if (!filter) {
                activeFilters.push({type: event.target.className, value: [event.target.value]});
            } else {
                filter.value.push(event.target.value);
            }
        }
        console.log(activeFilters);
    } else {
        activeFilters.forEach(filter => {
            if (filter.value.length === 0) {
                activeFilters = activeFilters.filter(item => item.value.length !== 0);
            } else {
                activeFilters = activeFilters.filter(filter => {
                    filter.value = filter.value.filter(item => item !== event.target.value);
                    return filter.value;
                });
            }
        });
    }
    console.log(activeFilters);
    activeFilters.forEach(activeFilter => {
        result = result.filter(prod => {
            return activeFilter.value.indexOf(prod[activeFilter.type]) > -1
        });
    });
    filteredArray = result;
    return Promise.resolve(result).then(function (response) {
        const renderList = new RenderProducts(response, productsToFilter);
        renderList.render();
    });

}

checkboxItems.forEach(checkbox => {
    checkbox.addEventListener('click', function (event) {
        filterSort(event).then(check);
    })
});

/**end filtering**/

/**Sorting function**/
let sortDropdown = document.getElementById('sort-options');

function sortItems(event) {
    let checkboxList = Array.from(document.querySelectorAll('input[type=checkbox]'));
    let itemsChecked = checkboxList.find(item => item.checked);
    let sortedList = [];
    if (!itemsChecked) {
        filteredArray = FROM_STORAGE;
    }
    switch (event.target.id) {
        case "ascending":
            sortedList = filteredArray.sort((a, b) =>
                (a['prod-name'] > b['prod-name']) ? 1 : -1
            );
            let displaySortedByName = new RenderProducts(sortedList, productsToFilter);
            displaySortedByName.render();
            break;
        case "descending":
            sortedList = filteredArray.sort((a, b) =>
                (a['prod-name'] > b['prod-name']) ? -1 : 1
            );
            let displaySortedByNameReversed = new RenderProducts(sortedList, productsToFilter);
            displaySortedByNameReversed.render();
            break;
        case "highest":
            sortedList = filteredArray.sort((a, b) =>
                (a.price < b.price) ? 1: -1
            );
            let displaySortedByHighestPrice = new RenderProducts(sortedList, productsToFilter);
            displaySortedByHighestPrice.render();
            break;
        case "lowest":
            sortedList =  filteredArray.sort((a, b) =>
                (a.price < b.price) ? -1: 1
            );
            let displaySortedByLowestPrice = new RenderProducts(sortedList, productsToFilter);
            displaySortedByLowestPrice.render();
            break;
        case "reset-sort":
            sortedList =  filteredArray.sort((a, b) =>
                (a.price < b.price) ? -1: 1
            );
            let displayReset = new RenderProducts(FROM_STORAGE, productsToFilter);
            displayReset.render();
            break;
    }
}

sortDropdown.addEventListener('click', sortItems);

/**end sort**/