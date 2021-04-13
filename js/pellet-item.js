//Fonction d'affichage de la pastille contenant le nombre d'articles dans le panier

// const pellet = document.getElementById('itemsInCart'); // Je récupère l'élément dans le HTML
// if (localStorage.getItem != null){ // Si il y a des éléments dans le LS, 
//     const lsLength = JSON.parse(localStorage.getItem('teddies_basket_storage')).length; // Je récupère la longueur du tableau et la quantité
//     pellet.innerText = lsLength; // J'injecte le nombre d'éléments dans le tableau ( sa longueur)
// } else {
//     pellet.style.display = "none"; // Sinon, je n'affiche pas la pastille
// }

const pellet = document.getElementById('itemsInCart'); // Je récupère l'élément dans le HTML
if (localStorage.getItem != null){ // Si il y a des éléments dans le LS, 
    total = 0;
    for (let i = 0; i < products.quantity; i++) {
        totalQuantity = total + products[i].totalQuantity;
    }
    const itemsQuantity = JSON.parse(localStorage.getItem('teddies_basket_storage')).quantity; // Je récupère la longueur du tableau et la quantité
    pellet.innerText = itemsQuantity; // J'injecte le nombre d'éléments dans le tableau ( sa longueur)
} else {
    pellet.style.display = "none"; // Sinon, je n'affiche pas la pastille
}