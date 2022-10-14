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

const overlay = document.querySelector('.overlay');

//funcion para crear y retornar el html
const createHtml = (product) => {
	const { nombre, leyenda, precio, img } = product;
	return `<div class="card-popular">
	<img src=${img} alt="fotito"/>
	<h4>${nombre}</h4>
	<p>${leyenda}</p>
	<div class="price-add">
	  <span>$${precio}</span>
	  <button class="add">Agregar</button>
	</div>
	</div>`;
};

const renderDivideProducts = (index = 0) => {
	products.innerHTML += productsController.dividedProducts[index]
		.map(createHtml)
		.join('');
};

const renderProducts = (index = 0, category = undefined) => {
	if (!category) {
		renderDivideProducts(index);
		return;
	}
	renderfilteredProducts(category);
};

const renderfilteredProducts = (category) => {
	const productList = foods.filter((product) => product.category === category);

	products.innerHTML = productList.map(createHtml).join('');
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
	//changeShowMoreBtnState(selectedCategory);
};

const applyFilter = (e) => {
	if (!e.target.classList.contains('category')) return;
	changeFilterState(e);
	if (!e.target.dataset.category) {
		products.innerHTML = '';
		renderProducts();
	} else {
		renderProducts(0, e.target.dataset.category);
	}
};

const closeCart = () => {
	cartContainer.classList.add('hidden');
};

const openCart = () => {
	cartContainer.classList.remove('hidden');
	overlay.classList.add('show-overlay');
};

const init = () => {
	renderProducts();
	categories.addEventListener('click', applyFilter);
	cartBtn.addEventListener('click', openCart);
	cerrarCart.addEventListener('click', closeCart);
};

init();
