//llamamos los elementos del carrito de compras
const cart = document.getElementById('cart');
const numberOrder = document.querySelector('.number-order');
const sumarOrder = document.querySelector('.add-food-cart');
const restarOrder = document.querySelector('.rest-food-cart');
const cerrarCart = document.querySelector('.close-button');
const btnComprar = document.querySelector('.buy-button');
const subtotal = document.querySelector('.sub');
const total = document.querySelector('.tot');

//llamamos los elementos de categorias
const pizzas = document.querySelector('.cat-pizza');
const hambuguesas = document.querySelector('.cat-burguer');
const napapuki = document.querySelector('.cat-papas');
const individuales = document.querySelector('.cat-individual');
const wraps = document.querySelector('.cat-burrito');
const tacos = document.querySelector('.cat-taco');
const batidos = document.querySelector('.batido');

const cardPopular = document.querySelector('.card-popular');
const btnAdd = document.querySelector('.add');


// const renderHTML = (food) => {
// 	caja.innert.html = food.filter((food) => foods.id).join('');
// };

// const printHTML = (menu) => {
// 	const { name, id, title, ingredients } = menu;
// 	return `<div></div>`;
// };


const init = () => {
	pizzas.addEventListenner('click', renderHtml);
};

init();