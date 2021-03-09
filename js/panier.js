
const $emptyBasket = document.getElementById('empty-basket')

function displayBasket(product) {
    for (let i = 0; i < product.length; i++) {
        const $contentBasket = document.getElementById('content-basket');
        const $li = document.createElement('li');
        $li.classList.add('tab');

        const $imgTeddy = document.createElement('img');
        $imgTeddy.src = product[i].image;
        ;
        const $pName = document.createElement('p');
        $pName.innerText = `${product[i].name} `;

        const $pPrice = document.createElement('p');
        $pPrice.innerText = `Prix : ${product[i].unitPrice}€ `;

        const $quantity = document.createElement('p');
        $quantity.innerText = `Quantité : ${product[i].quantity} `;

        const $totalPrice = document.createElement('p');
        $totalPrice.innerText = `Prix total : ${product[i].totalPrice}€`;
        $totalPrice.classList.add('totalPrice')

        $li.appendChild($imgTeddy);
        $li.appendChild($pName);
        $li.appendChild($pPrice);
        $li.appendChild($quantity);
        $li.appendChild($totalPrice);

        $contentBasket.appendChild($li);

    }

    sumOfPrice(product);
}

// Fonction pour récupérer le prix total

function sumOfPrice(product) {
    const $totalSum = document.querySelector('total');
    let total = 0;
    for (let i = 0; i < product.length; i++) {
        total = total + product[i];
        $totalSum.innerText = ` TOTAL = ${total}€`;
    }
console.log($totalSum);
}



// Je récupère les données dans le local storage
const storedBasket = window.localStorage.getItem('teddies_basket_storage');
let basket = [];

if (storedBasket != null) {
    basket = JSON.parse(storedBasket);
    displayBasket(basket);
} else {
    $emptyBasket.innerText = 'Votre panier est vide.'
}
console.table(storedBasket)
console.log(basket);


// longueur objet local storage = 
// const pastille = document.getElementById('itemsInCart');
// const locStrLength = JSON.parse(localStorage.getItem('products')).length;
// pastille.innerText = locStrLength;
