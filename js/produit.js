
const productId = new URLSearchParams(document.location.search);

console.log(productId)

fetch(`http://localhost:3000/api/teddies/${productId}`)
.then((response) => response.json())
.then(response => {
})


// $colors = document.createElement("select");
// $description = document.createElement('p');
// $description.innerText = `${teddy.description}`;
// $li.appendChild($description);