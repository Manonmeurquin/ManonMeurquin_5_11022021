
function getOneTeddy() {
    const productId = new URLSearchParams(document.location.search);
    const id = productId.get('id');
    console.log(id);

    fetch(`http://localhost:3000/api/teddies/${id}`)
        
        .then((success) => {
            success.json().then((teddy) => {
                console.log(teddy)

                const $imgTeddy = document.getElementById('img-teddy');
                $imgTeddy.src = teddy.imageUrl;

                const $h1 = document.querySelector('h1');
                $h1.innerText = teddy.name;

                const $price = document.getElementById('price');
                $price.innerText = `${teddy.price / 100}.00€`;

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
                
                // récupère le bouton validation du panier et j'applique la fonction de sauvegarde

                const $button = document.querySelector('button');
                $button.addEventListener('click', () => {
                    saveClickedObject();
                });

                // Création de l'objet des éléments à récupérer
                let teddiesQuantity = document.
                let teddiesColor = document.
                
                let displayObject = {
                    _id: teddy._id,
                    image : teddy.imageUrl
                    name: teddy.name,
                    price: teddy.price,
                    quantity: $quantity.value,
                    // totalPrice: $quantity * price/ 100

                };

                //Fontion de sauvegarde avec localStorage

                const saveClickedObject = () => {
                    const storedBasket = window.localStorage.getItem('teddies_basket_storage');
                    let basket;
                    
                    if(!storedBasket) {
                        basket = [];
                    } else {
                        basket = JSON.parse(storedBasket);
                    }
                    basket.push();
                    window.localStorage.setItem('teddies_basket_storage', JSON.stringify(basket));
                    console.log(basket);
                };
                
            })
        })

}

getOneTeddy();

