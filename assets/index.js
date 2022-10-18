//llamamos los elementos del carrito de compras
//Contenedor principal donde se renderiza los elementos agregados al carrito
const cartContainer = document.querySelector('.mis-compras');
//Font de carrito
const cartBtn = document.getElementById('cart');
// span donde se muestra la cantidad de pedidos de ese item
const numberOrder = document.querySelector('.number-order');
//Botón para sumar una misma comida al pedido
const sumarOrder = document.querySelector('.add-food-cart');
//Botón para restar una misma comida al pedido si da 0 tenemos que poner alert o modal para ponerlo en 0
const restarOrder = document.querySelector('.rest-food-cart');
//Botón para cerrar el contenedor del carrito de compras
const cerrarCart = document.querySelector('.close-button');
//Boton para finalizar la compra
const btnComprar = document.querySelector('.buy-button');
//subtotal
const subtotal = document.querySelector('.sub');
//total de la compra
const total = document.querySelector('.tot');

//categorias
const categoriesList = document.querySelectorAll('.category');
//contenedor de las categorias
const categories = document.querySelector('.card-category-container');
//contenedor de las categorias mas populares

const products = document.querySelector('.card-popular-container');
// botón para agregar pedido al carrito
const btnAdd = document.querySelector('.add');
const titleContainer = document.querySelector('.section4-title');

const overlay = document.querySelector('.overlay');

// ---------------------------------------------

//funcion para crear y retornar el html
const createHtml = (product) => {
	const { nombre, leyenda, precio, img, category } = product;
	return  `
	<div class="card-popular">
	<img src=${img} alt="fotito"/>
	<h4>${nombre}</h4>
	<p>${leyenda}</p>
	<div class="price-add">
	  <span>$${precio}</span>
	  <button class="add">Agregar</button>
	</div>
	</div>`;
};

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDividedProduct(index);
		return;
	}
	renderFilteredProducts(category);
};

const renderFilteredProducts = (category) => {
	const productsList = foods.filter((product) => product.category === category);
	products.innerHTML = productsList.map(createHtml).join('');
};

const renderDividedProduct = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(createHtml)
		.join('');
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [...categoriesList];
	categories.forEach((categoryBtn) => {
		if (categoryBtn.dataset.category !== selectedCategory) {
			categoryBtn.classList.remove('active');
			return;
		}
		categoryBtn.classList.add('active');
	});
};

const changeFilterState = (e) => {
	const selectedCategory = e.target.dataset.category;
	changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains('category'))
	 ;
	changeFilterState(e);
	if (!e.target.dataset.category) {
		products.innerHTML = renderError();
	;
	} else {
		renderProducts(0, e.target.dataset.category);
	}
};

const renderError = () => {
    return `
    <div class = "noProduct" >
        <i class="icon_not_found fas fa-exclamation-triangle"></i>
        <h2 class="text_not_found">Disculpe, no contamos con este producto momentaneamente</h2>
    </div>
   
    `
};
//----------------------------------------------

const openCart = () => {
	cartContainer.classList.remove('hidden');
	overlay.classList.add('show-overlay');
};

const closeCart = () => {
	cartContainer.classList.add('hidden');
	overlay.classList.remove('show-overlay');
};

const closeOnScroll = () => {
	if (cartContainer.classList.contains('hidden')) return;
	cartContainer.classList.add('hidden');
	overlay.classList.remove('show-overlay');
};

const init = () => {
	renderProducts();
	categories.addEventListener('click', applyFilter);
	cartBtn.addEventListener('click', openCart);
	cerrarCart.addEventListener('click', closeCart);
	window.addEventListener('scroll', closeOnScroll);
};

init();
