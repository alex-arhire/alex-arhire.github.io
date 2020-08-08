// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

// function ready() {
// }

/*Removing items from cart/wishlist*/

// var removeItemsButtons = document.getElementsByClassName('prod-remove');
// for (var i = 0; i < removeItemsButtons.length; i++) {
//     var button = removeItemsButtons[i];
//     button.addEventListener("click", function (event) {
//         var buttonClicked = event.target;
//         buttonClicked.parentElement.remove();
//     });
// }

// function clearProducts() {
//     //Clearing existing data
//     if (products.length > 0) {
//         for (var k = 0; k < products.length; k++) {
//             products[k].remove();
//         }
//     } else {
//         console.warn("No products available");
//     }
// }

//Removing items from cart
// const FROM_STORAGE = JSON.parse(localStorage.getItem('prodForCart'));
// var removeItemsButtons = document.getElementsByClassName('prod-remove');
var prodTable = document.getElementsByClassName('prod-table')[0];

/*
class FindID {
    constructor(id) {
        this.id = id;
    }
    find() {
        return FROM_STORAGE.find(id => {
            id.id;
        })
    }
}
*/


/*
function removeCartItem(event) {
    let buttonClicked = event.target;
    FROM_STORAGE.forEach(obj => {
        let parsedID = parseInt(buttonClicked.parentNode.getAttribute('id'), 10);
        console.log(parsedID);
        if (parsedID === obj.id) {
            let index = FROM_STORAGE.indexOf(obj);
            FROM_STORAGE.splice(index, 1);
            console.log(FROM_STORAGE);
            localStorage.setItem('prodForCart', JSON.stringify(FROM_STORAGE));
        }
    });
    buttonClicked.parentElement.remove();
    updateTotal();
}
*/

function qtyChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

/*Calculating total*/
function updateTotal() {
    let cartItem = document.getElementsByClassName('cart-item');
    let total = 0;
    for (var i = 0; i < cartItem.length; i++) {
        var cartData = cartItem[i];
        var price = parseFloat(cartData.getElementsByClassName('prod-price')[0].innerText.replace('$', '').replace(',', ''));
        var quantity = cartData.getElementsByClassName('quantity')[0].valueAsNumber;
        total += (price * quantity);
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}

prodTable.addEventListener('click', event => {
    if (event.target.classList.contains('prod-remove')) {
        updateTotal();
    }
});

prodTable.addEventListener('change', event => {
    if (event.target.classList.contains('quantity')) {
        qtyChanged(event);
    }
});

document.addEventListener('DOMContentLoaded', updateTotal);



