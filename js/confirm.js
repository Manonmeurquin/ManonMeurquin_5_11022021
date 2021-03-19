const $orderNumber = document.querySelector('.orderNumber');
const $orderPrice = document.querySelector('.orderPrice');
//Récupération de l'Url
const currentUrl = window.location.href;
// Frangmentation de l'Url
const fragmentUrl = currentUrl.split('=');
const orderId = fragmentUrl[1].split('?')
// Récupération et affichage des fragments de l'Url
$orderNumber.innerHTML=(`N° de commande : ${orderId[0]}`);
$orderPrice.innerHTML=(`Prix total : ${fragmentUrl[2]}€`);
