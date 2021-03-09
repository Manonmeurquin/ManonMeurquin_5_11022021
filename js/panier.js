
const $contentBasket = document.querySelector('#content-basket');
const $emptyBasket = document.getElementById('#empty-basket')

const displayBasket = (product)=>{
    const $li = document.createElement('li');

    const $imgTeddy = document.createElement('img');
    $imgTeddy.src = product.image;
;
    const $pName = document.createElement('p');
    $pName.innerText = `Nom : ${product.name}`;

    const $pPrice = document.createElement('p');
    $pPrice.innerText = `Prix unitaire : ${product.unitPrice}`;

    const $quantity = document.createElement('p');
    $quantity.innerText = `Quantité : ${product.quantity}`;

    const $totalPrice = document.createElement('p');
    $totalPrice.innerText = `Prix total : ${product.totalPrice}`;

    $li.appendChild($imgTeddy);
    $li.appendChild($pName);
    $li.appendChild($pPrice);
    $li.appendChild($quantity);
    $li.appendChild($totalPrice);
   
    $contentBasket.appendChild($li);
}
// Je récupère les données dans le local storage
const storedBasket = window.localStorage.getItem('teddies_basket_storage');
let basket = [];

if (!storedBasket) {
    basket = [];
} else {
    basket = JSON.parse(storedBasket);
}
console.table(storedBasket)

if (localStorage.length > 0) {
    displayBasket(basket)

} else {
    $emptyBasket.innerText = 'Votre panier est vide.'
}

console.log(basket);

// longueur objet local storage = 
// const pastille = document.getElementById('itemsInCart');
// const locStrLength = JSON.parse(localStorage.getItem('products')).length;
// pastille.innerText = locStrLength;
