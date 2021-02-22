
function getOneTeddy() {
    const productId = new URLSearchParams(document.location.search);
    const id = productId.get('id');
    console.log(id);

    fetch(`http://localhost:3000/api/teddies/${id}`)
        // .then(response => {
        //     if (response.ok) {
        //         return teddy = response.json()
        //     } else {
        //         Promise.reject(response.status);
        //     };
        // })
        // .then(teddy => {
        //     const $h1 = document.querySelector('h1');
        //     $h1.innerText = teddy.name;

        //     const $imgTeddy = document.getElementById('img-teddy');
        //     console.log($imgTeddy);
        //     $imgTeddy.src = teddy.imageUrl;
            

        //     const $price = document.getElementById('price');
        //     $price.innerText = `${teddy.price / 100}.00€`;

        // })
        .then((success) => {
            success.json().then((teddy) => {
                console.log(teddy)

                const $imgTeddy = document.getElementById('img-teddy');
                $imgTeddy.src = teddy.imageUrl;
                
                const $h1 = document.querySelector('h1');
                $h1.innerText = teddy.name;

                const $price = document.getElementById('price');
                $price.innerText = `${teddy.price/100}.00€`;

                const $description = document.getElementById('description');
                $description.innerText = teddy.description;

                const $color = document.getElementById('colors');
            
                for (let i in teddy.colors) {
                    if ( i < 1)
                     $color.inner

                    } 
               // const $quantity = document.getElementById('quantity');
            

                // for (let i = 0; i < 10; i+= 1) {
                //     let rep =
                //     if
                // }
                
            })
        })
       
}

getOneTeddy();




// $colors = document.createElement("select");
// $description = document.createElement('p');
// $description.innerText = `${teddy.description}`;
// $li.appendChild($description);