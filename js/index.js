const teddies = [
    {
        name:"Norbert",
        price: 35,
        imageUrl: "http://localhost:3000/images/teddy_1.jpg"
    },
    {
        name:"eddy",
        price: 35,
        imageUrl: "http://localhost:3000/images/teddy_1.jpg"
    },
    {
        name:"paul",
        price: 35,
        imageUrl: "http://localhost:3000/images/teddy_1.jpg"
    },
];
const $teddiesList = document.querySelector(".teddies-list");

teddies.forEach((teddy) => {
    const $li = document.createElement("li");
    const $name = document.createElement("p");
    $name.innerText = `Nom : ${teddy.name}`;
    const $price = document.createElement("p");
    $price.innerText = `Prix : ${teddy.price}`;
    const $img = document.createElement("img");
    $img.src = teddy.imageUrl;
    $li.appendChild($name);
    $li.appendChild($price);
    $li.appendChild($img);
    $teddiesList.appendChild($li);
})