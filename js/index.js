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

            teddies.forEach((teddy) => {
                const $li = document.createElement('li');
                $ul.appendChild($li);

                $name = document.createElement('p');
                $name.innerText = `Nom : ${teddy.name}`;
                $li.appendChild($name);

                // Créer un tableau ? ou une liste ? rechercher option value, form...
                // $colors = document.createElement([]);
                // $colors.
                // $li.appendChild($colors);

                $description = document.createElement('p');
                $description.innerText = `Description : ${teddy.description}`;
                $li.appendChild($description);

                $price = document.createElement('p');
                $price.innerText = `Prix : ${teddy.price}`;
                $li.appendChild($price);

                $imageUrl = document.createElement('img');
                $imageUrl.src = teddy.imageUrl;
                $li.appendChild($imageUrl);
         
            });
        } else {
        }

    }
});

xhr.addEventListener('error', (error) => {
    console.log(error);
    alert('Une erreur inconnue est survenue');
});
