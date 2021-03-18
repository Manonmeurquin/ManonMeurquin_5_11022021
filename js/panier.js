
// Récupération des données dans le local storage et ajout d'un index pour suppression

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
    const $emptyBasket = document.getElementById('empty-basket')
    $emptyBasket.innerText = `Votre panier est vide :'(`
}
console.log(basket);

// Fonction pour récupérer le prix total

function sumOfPrice(products) {
    const $totalSum = document.querySelector('.total');
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total = total + products[i].totalPrice;
    }
    $totalSum.HTML = ` TOTAL = <span id"ttprice">${total}€</span>`;
    console.log($totalSum);
}

// Fonction qui affiche les articles dans le panier + suppression

function displayBasket(product) {
    for (let i = 0; i < product.length; i++) {
        const $contentBasket = document.getElementById('content-basket');
        const $li = document.createElement('li');
        $li.classList.add('tab');

        const $imgTeddy = document.createElement('img');
        $imgTeddy.src = product[i].image;

        const $pName = document.createElement('p');
        $pName.innerText = `${product[i].name} `;
        $pName.classList.add('pname');

        const $quantity = document.createElement('p');
        $quantity.innerText = `${product[i].quantity} `;

        const priceTrash = document.createElement('div');
        priceTrash.classList.add('price-trash');

        const $totalPrice = document.createElement('p');
        $totalPrice.innerText = `${product[i].totalPrice}€`;
        $totalPrice.classList.add('totalPrice');


        // Suppression d'un élément du panier au click

        const $trash = document.createElement('i');
        $trash.innerHTML = `<i class="fas fa-trash-alt trash"></i>`;
        $trash.addEventListener('click', () => {

            const index = product[i].index;
            const $tabs = document.querySelectorAll('.tab');
            const $tabToRemove = $tabs[index]
            product.splice(index, 1)
            console.log(product);

            if (product.length == 0) {
                localStorage.clear();

            } else {
                console.log($tabToRemove);
                window.localStorage.setItem('teddies_basket_storage', JSON.stringify(product));

            }
            document.location.reload();
            product = product.map((item, i) => {
                item.index = i
                return item
            });
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

    sumOfPrice(product);
};

// Validation du formulaire avec regex


const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexCity = /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/;


// Fonction d'envoi au back au submit du boutton de validation de la commande

const $contactForm = document.getElementById('contactForm');
console.log($contactForm);

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
        return ;
    } else if (contact.lastName.trim().length < 2) {
        return ;
    } else if (contact.address.trim().length < 5) {
        return ;
    } else if (!regexEmail.test(contact.email)) {
        return ;
    } else if (!regexCity.test(contact.city)) {
        return ;
    };

    console.log(contact);
    //Id à envoyer en POST

    // const products = [];
    // basket.forEach(teddy => {
    //     products.push(teddy._id);
    // });
    const products = basket.map(teddy => {
        return teddy._id
    })
    // création de l'objet à envoyer

    const order = { products, contact };
    console.log(order);

    // Si formulaire valide, POST / Fetch
    
    const fetchHeaders = new Headers();
    fetchHeaders.append('Content-Type', 'application/json');

    const fetchInit = {
        method: 'post',
        body: JSON.stringify(order),
        headers: fetchHeaders
    };
    console.log(fetchInit);
    fetch('http://localhost:3000/api/teddies/order', fetchInit)
        .then(response => response.json())
        .then(result => {
        const orderId = result.orderId;
        localStorage.removeItem('teddies_basket_storage');
        location.href = `../pages/confirm.html?orderid=${orderId}`;
            console.log(result);
        })
        .catch(function (error) {
            console.log("Une erreur s'est produite");
        })
});
