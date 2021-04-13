// Appel de l'API
function displayProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/api/teddies');
    xhr.send();

    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                const teddies = JSON.parse(xhr.responseText);
                const $ul = document.querySelector('.teddies-list');

                // Création des cartes produit
                teddies.forEach((teddy) => {
                    const $li = document.createElement('li');
                    $li.classList.add('element')

                    $imageUrl = document.createElement('img');
                    $imageUrl.src = teddy.imageUrl;

                    $name = document.createElement('p');
                    $name.innerText = `${teddy.name}`;

                    $price = document.createElement('p');
                    $price.innerText = `${teddy.price / 100}.00€`;

                    $link = document.createElement('a');
                    $link.href = `pages/produit.html?&id=${teddy._id}`;

                    $link.appendChild($imageUrl);
                    $link.appendChild($name);
                    $link.appendChild($price);
                    $li.appendChild($link);
                    $ul.appendChild($li);
                });
            } else {
                console.log("une erreur s'est produite");
            }
        }
    });
    xhr.addEventListener('error', (error) => {
        console.log(error);
        alert('Une erreur inconnue est survenue');
    });
}
displayProducts();