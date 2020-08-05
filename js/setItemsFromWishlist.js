//Dealing with potential global scope issues by using closure
(() => {
    const productTable = document.querySelector('.prod-table');

    function sendFromWishlist(event) {
        event.preventDefault();
        console.log(event.target);
        if (event.target.classList.contains('cart')) {
            let cartStorage = JSON.parse(localStorage.getItem("prodForCart")) || [];
            let items = {
                image: event.target.parentNode.parentNode.childNodes[0].firstChild.getAttribute('src'),
                title: event.target.parentNode.parentNode.childNodes[1].innerText,
                price: event.target.parentNode.parentNode.childNodes[2].innerText
            };
            cartStorage.push(items);
            localStorage.setItem("prodForCart", JSON.stringify(cartStorage));
        }
    }
    productTable.addEventListener('click', sendFromWishlist);
})();
