
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
        $pName.classList.add('pname');

        // const $pPrice = document.createElement('p');
        // $pPrice.innerText = `${product[i].unitPrice}€ `;

        const $quantity = document.createElement('p');
        $quantity.innerText = `${product[i].quantity} `;

        const priceTrash = document.createElement('div');
        priceTrash.classList.add('price-trash')

        const $totalPrice = document.createElement('p');
        $totalPrice.innerText = `${product[i].totalPrice}€`;
        $totalPrice.classList.add('totalPrice')

        const $trash = document.createElement('i');
        $trash.innerHTML = `<i class="fas fa-trash-alt trash"></i>`;
        $trash.addEventListener('click', () => {
            const index = product[i].index;
            product.splice(index, 1)
            const $tabs = document.querySelectorAll('.tab');
            const $tabToRemove = $tabs[index]
            console.log($tabToRemove);
            window.localStorage.setItem('teddies_basket_storage', JSON.stringify(product));
            $contentBasket.removeChild($tabToRemove);

            product = product.map((item, i) => {
                item.index = i
                return item
            });
        })

        $li.appendChild($imgTeddy);
        $li.appendChild($pName);
        // $li.appendChild($pPrice);
        $li.appendChild($quantity);
        
        $li.appendChild($totalPrice);
        $li.appendChild($trash);

        $contentBasket.appendChild($li);
    }

    sumOfPrice(product);
}

// Fonction pour récupérer le prix total

function sumOfPrice(products) {
    const $totalSum = document.querySelector('.total');
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total = total + products[i].totalPrice;
    }
    $totalSum.innerText = ` TOTAL = ${total}€`;
    console.log($totalSum);
}




// Je récupère les données dans le local storage
const storedBasket = window.localStorage.getItem('teddies_basket_storage');
let basket = [];

if (storedBasket != null) {
    basket = JSON.parse(storedBasket).map((product, i) => {
        product.index = i
        return product
    });
    console.log(basket);
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
