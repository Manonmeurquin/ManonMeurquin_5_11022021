const $orderNumber = document.querySelector('.orderNumber');
let urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderid');

console.log(orderId);
$orderNumber.innerHTML=(`Votre n° de commande : ${orderId}`);
