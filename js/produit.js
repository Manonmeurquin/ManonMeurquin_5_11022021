
// Fonction qui récupère l'id de l'article sélectionné et l'affiche sur la page

function getOneTeddy() {
    const productId = new URLSearchParams(document.location.search);
    const id = productId.get('id');

    fetch(`http://localhost:3000/api/teddies/${id}`)

        .then((success) => {
            success.json().then((teddy) => {

                const $imgTeddy = document.getElementById('img-teddy');
                $imgTeddy.src = teddy.imageUrl;

                const $h1 = document.querySelector('h1');
                $h1.innerText = teddy.name;

                const $price = document.getElementById('price');
                $price.innerText = `${teddy.price / 100}€`;

                const $description = document.getElementById('description');
                $description.innerText = teddy.description;

                // Boucle pour choix des options

                const $color = document.getElementById('select-colors');
                for (const color of teddy.colors) {
                    $color.innerHTML += `<option value = "${color}"> ${color}</option>`;
                }

                const $quantity = document.getElementById('quantity');
                for (let i = 1; i < 11; i++) {
                    $quantity.innerHTML += `<option value ="${i}"> ${i}</option>`;
                }

                const $add = document.getElementById('add');
                $add.addEventListener('click', () => {
                    addToBasket(teddy, $color.value, $quantity.value)
                    document.location.reload();
                })
            })
        })
}

// Ajoute l'article avec ses options au LS
function addToStorage(teddy){
    const storedJsonTeddies = window.localStorage.getItem('teddies_basket_storage');
    let teddies;

    if (!storedJsonTeddies) {
        teddies = [];
    } else {
        teddies = JSON.parse(storedJsonTeddies);
    }
    teddies.push(teddy);
    window.localStorage.setItem('teddies_basket_storage', JSON.stringify(teddies));
};

// Fonction qui sert à créer l'objet qui récupère les informations de l'article à envoyer au LS
function addToBasket(teddy, color, quantity) {
    let storageTeddy = {
        _id: teddy._id,
        image: teddy.imageUrl,
        name: teddy.name,
        color: color,
        unitPrice: teddy.price / 100,
        quantity: quantity,
        totalPrice: quantity * teddy.price / 100
    };
    addToStorage(storageTeddy);
}

getOneTeddy();

