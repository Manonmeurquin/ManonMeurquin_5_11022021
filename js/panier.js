let total, basket = [];

// Récupération des données dans le local storage et ajout d'un index pour suppression
function getBasket() {
    const storedBasket = window.localStorage.getItem('teddies_basket_storage');
    console.log(storedBasket);

    if (storedBasket != null) {
        return JSON.parse(storedBasket).map((product, i) => {
            product.index = i
            return product
        });
    } else {
        return []
    };
}
// Affiche les éléments retournés dans la fonction getBasket
function initPage() {
    basket = getBasket();
    if (basket.length > 0) {
        const $home = document.querySelector('.home');
        $home.style.display = 'none';
        displayBasket(basket);
    } else {
        const $emptyBasket = document.getElementById('empty-basket');
        $emptyBasket.innerText = `Votre panier est vide :'(`;
        const $mainContact = document.querySelector('.main-contact');
        $mainContact.style.display = 'none';
    };
}
// Fonction pour récupérer le prix total
function sumOfPrice(products) {
    const $totalSum = document.querySelector('.total');
    total = 0;
    for (let i = 0; i < products.length; i++) {
        total = total + products[i].totalPrice;
    }
    $totalSum.innerHTML = ` TOTAL = <span id="orderPrice">${total}€</span>`;
}
//Permet de supprimer les éléments du panier un par un

function removeFromBasket(product) {
    const index = product.index;
    const $tabs = document.querySelectorAll('.tab');
    const $tabToRemove = $tabs[index];
    console.log($tabs, index);
    document.getElementById('content-basket').removeChild($tabToRemove);
    basket.splice(index, 1);
    sumOfPrice(basket);

    if (basket.length == 0) {
        window.localStorage.removeItem('teddies_basket_storage');

    } else {
        console.log($tabToRemove);
        basket = basket.map((item, i) => {
            item.index = i
            return item
        });
        window.localStorage.setItem('teddies_basket_storage', JSON.stringify(basket));
    }
}
// Fonction qui affiche les articles dans le panier

function displayBasket(products) {
    for (let i = 0; i < products.length; i++) {
        const $contentBasket = document.getElementById('content-basket');
        const $li = document.createElement('li');
        $li.classList.add('tab');

        const $imgTeddy = document.createElement('img');
        $imgTeddy.src = products[i].image;

        const $pName = document.createElement('p');
        $pName.innerText = `${products[i].name} `;
        $pName.classList.add('pname');

        const $quantity = document.createElement('p');
        $quantity.innerText = `${products[i].quantity} `;

        const priceTrash = document.createElement('div');
        priceTrash.classList.add('price-trash');

        const $totalPrice = document.createElement('p');
        $totalPrice.innerText = `${products[i].totalPrice}€`;
        $totalPrice.classList.add('totalPrice');

        // Suppression d'un élément du panier au click

        const $trash = document.createElement('i');
        $trash.innerHTML = `<i class="fas fa-trash-alt trash"></i>`;
        $trash.addEventListener('click', () => {
        removeFromBasket(products[i]);
        console.log(products);
        })

        // Suppression du panier entier

        const $delete = document.querySelector('.delete');
        $delete.addEventListener('click', () => {
            localStorage.clear();
            document.location.reload();
        })

        $li.appendChild($imgTeddy);
        $li.appendChild($pName);
        $li.appendChild($quantity);
        $li.appendChild($totalPrice);
        $li.appendChild($trash);
        $contentBasket.appendChild($li);
    }

    sumOfPrice(products);
};

// Validation du formulaire avec regex

const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;

// Fonction d'envoi au back au submit du boutton de validation de la commande

const $contactForm = document.getElementById('contactForm');

$contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //Récupération du formulaire

    let contact = {
        firstName: document.querySelector('.fname').value,
        lastName: document.querySelector('.flastname').value,
        email: document.querySelector('.fmail').value,
        address: document.querySelector('.faddress').value,
        city: document.querySelector('.fcity').value,
    };
    if (contact.firstName.trim().length < 2) {
        return;
    } else if (contact.lastName.trim().length < 2) {
        return;
    } else if (contact.address.trim().length < 5) {
        return;
    } else if (!regexEmail.test(contact.email)) {
        return;
    } else if (!regexCity.test(contact.city)) {
        return;
    };

    //Id à envoyer en POST

    const products = basket.map(teddy => {
        return teddy._id
    })
    // création de l'objet à envoyer

    const order = { products, contact };

    // Si formulaire valide, POST / Fetch

    const fetchHeaders = new Headers();
    fetchHeaders.append('Content-Type', 'application/json');

    const fetchInit = {
        method: 'post',
        body: JSON.stringify(order),
        headers: fetchHeaders
    };
    fetch('http://localhost:3000/api/teddies/order', fetchInit)
        .then(response => response.json())
        .then(result => {
            const orderId = result.orderId;
            localStorage.removeItem('teddies_basket_storage');
            location.href = `../pages/confirm.html?orderid=${orderId}?orderPrice=${total}`;
            console.log(result);
        })
        .catch(function (error) {
            console.log("Une erreur s'est produite");
        })
});
initPage();