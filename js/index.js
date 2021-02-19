// Appel de l'API

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/teddies');
xhr.send();

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201){
            console.log(xhr.responseText);
            const teddies = JSON.parse(xhr.responseText);
            console.log(teddies);
            const $ul = document.querySelector('.teddies-list');

// Création des cartes produit
            teddies.forEach((teddy) => {
                const $li = document.createElement('li');
                $ul.appendChild($li);

                $imageUrl = document.createElement('img');
                $imageUrl.src = teddy.imageUrl;
                $li.appendChild($imageUrl)

                $name = document.createElement('p');
                $name.innerText = `${teddy.name}`;
                $li.appendChild($name);

                $price = document.createElement('p');
                $price.innerText = `${teddy.price/100}.00€`;
                $li.appendChild($price);
         
            });
        } else {
        }

    }
});

xhr.addEventListener('error', (error) => {
    console.log(error);
    alert('Une erreur inconnue est survenue');
});
