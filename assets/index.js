//llamamos los elementos del carrito de compras
//Contenedor principal de toda la estructura del carrito
const cartContainer = document.querySelector('.mis-compras');
//contenedor donde se renderizan los elementos agregados
const cartProducts = document.querySelector('.cart-products');
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

const numberProducts = document.querySelector('.number-products');

const titleCartBuy = document.querySelector('.title-cart-buy');

//categorias
const categoriesList = document.querySelectorAll('.category');
//contenedor de las categorias
const categories = document.querySelector('.card-category-container');
//contenedor de las categorias mas populares

const products = document.querySelector('.card-popular-container');
// botón para agregar pedido al carrito
const btnAdd = document.querySelector('.add');
//contenedor para el titulo en la seccion los más populares
const titleContainer = document.querySelector('.section4-title');

const overlay = document.querySelector('.overlay');

// ------------------------local Storage--------------

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveLocalStorage = (cartList) => {
	localStorage.setItem('cart', JSON.stringify(cartList));
};
// ---------------------------------------------

//funcion para crear y retornar el html
const createHtml = (product) => {
	const { nombre, leyenda, precio, img, id } = product;
	return `
	<div class="card-popular">
	<img src=${img} alt="fotito"/>
	<h4>${nombre}</h4>
	<p>${leyenda}</p>
	<div class="price-add">
	  <span>$${precio}</span>
	 <button class="add"
	 data-id='${id}'
	 data-nombre='${nombre}'
	 data-precio='${precio}'
	 data-img='${img}'
	 data-leyenda='${leyenda}'
	 >Agregar</button>
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
	selectedCategory = e.target.dataset.category;
	changeBtnActiveState(selectedCategory);
};

const titleCaterogy = (e) => {
	selectedCategory = e.target.dataset.id;
	const titleCategories = foods.filter((cat) => cat.category === category);
	return titleCategories;
};

const applyFilter = (e) => {
	if (!e.target.classList.contains('category'));
	changeFilterState(e);
	titleContainer.innerHTML = changeFilterState(e);
	if (!e.target.dataset.category) {
		products.innerHTML = renderError();
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

    `;
};

//--------------------Toggle and Scroll--------------------------

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

const closeOnOverlay = () => {
	overlay.classList.remove('show-overlay');
	cartContainer.classList.add('hidden');
};

//--------------------Add cart------------------------------

// funcion para maquetado del renderizado
const renderCartProduct = (cartProduct) => {
	const { img, nombre, leyenda, precio, id, quantity } = cartProduct;
	return `<div class="card-recomendaciones">
	          <img src="${img}" alt="pizza">
	          <div class="description">
	              <p>${nombre}</p>
	              <p class="p2">${leyenda}</p>
	              <span>$ ${precio}</span>
	          </div>
	          <div class="add-rest">
	              <button class="rest-food-cart down" data-id='${id}'>-</button>
	              <span class="number-order">${quantity}</span>
	              <button class="add-food-cart up" data-id='${id}'>+</button>
	          </div>
           </div>
`;
};

// // logica del renderizado
const renderCartProducts = () => {
	if (!cart.length) {
		cartProducts.innerHTML = `<p class="empty-mensagge">No hay productos añadidos al carrito</p>`;
		return;
	}
	cartProducts.innerHTML = cart.map(renderCartProduct).join('');
};

const getCartTotal = () => {
	return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
};

const showTotal = () => {
	total.innerHTML = `${getCartTotal().toFixed(2)}$`;
	subtotal.innerHTML = `${getCartTotal().toFixed(2)}$`;
};

const disabled = (btn) => {
	if (!cart.length) {
		btn.classList.add('disabled');
	} else {
		btn.classList.remove('disabled');
	}
};

const createProductData = (id, nombre, precio, img, leyenda) => {
	return { id, nombre, precio, img, leyenda };
};

const isExistingCartProduct = (product) => {
	return cart.find((item) => item.id === product.id);
};

const addUnitProduct = (product) => {
	cart = cart.map((cartProduct) => {
		return cartProduct.id === product.id
			? { ...cartProduct, quantity: cartProduct.quantity + 1 }
			: cartProduct;
	});
};

const cantTotalLogoCart = () => {
	let total = 0;
	cart.forEach((producto) => (total = total + producto.quantity));
	return total;
};

const createCardProduct = (product) => {
	cart = [...cart, { ...product, quantity: 1 }];
};

const checkCartState = () => {
	saveLocalStorage(cart);
	renderCartProducts(cart);
	showTotal(cart);
	disabled(btnComprar);
};

const addProduct = (e) => {
	if (!e.target.classList.contains('add')) return;
	const { id, nombre, precio, img, leyenda } = e.target.dataset;
	const product = createProductData(id, nombre, precio, img, leyenda);
	if (isExistingCartProduct(product)) {
		addUnitProduct(product);
	} else {
		createCardProduct(product);
	}
	checkCartState();
	numberProducts.innerHTML = cantTotalLogoCart();
};

const removeProduct = (existingProduct) => {
	cart = cart.filter((product) => product.id !== existingProduct.id);
	checkCartState();
};

const restProductUnit = (existingProduct) => {
	cart = cart.map((product) => {
		return product.id === existingProduct.id
			? { ...product, quantity: Number(product.quantity) - 1 }
			: product;
	});
};

const restProductCart = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);

	if (existingCartProduct.quantity === 1) {
		if (window.confirm('Desea eliminar el producto del carrito')) {
			removeProduct(existingCartProduct);
		}
		return;
	}
	restProductUnit(existingCartProduct);
};

const addProductCart = (id) => {
	const existingCartProduct = cart.find((item) => item.id === id);
	addUnitProduct(existingCartProduct);
};

const handleQuantity = (e) => {
	if (e.target.classList.contains('down')) {
		restProductCart(e.target.dataset.id);
	} else if (e.target.classList.contains('up')) {
		addProductCart(e.target.dataset.id);
	}
	checkCartState();
	numberProducts.innerHTML = cantTotalLogoCart();
};

const resetCartItems = () => {
	cart = [];
	checkCartState();
};

const finishAction = (confirmmsg, succefullmsg) => {
	if (!cart.length) return;
	if (window.confirm(confirmmsg)) {
		resetCartItems();
		alert(succefullmsg);
		numberProducts.textContent = cantTotalLogoCart();
	}
};

const endBuy = () => {
	finishAction('¿Desea finalizar su compra?', '¡Gracias por su compra actual!');
};

const init = () => {
	renderProducts();
	categories.addEventListener('click', applyFilter);
	overlay.addEventListener('click', closeOnOverlay);
	cartBtn.addEventListener('click', openCart);
	cerrarCart.addEventListener('click', closeCart);
	window.addEventListener('scroll', closeOnScroll);
	document.addEventListener('DOMContentLoaded', renderCartProducts);
	document.addEventListener('DOMContentLoaded', showTotal);
	disabled(btnComprar);
	products.addEventListener('click', addProduct);
	cartProducts.addEventListener('click', handleQuantity);
	btnComprar.addEventListener('click', endBuy);
	numberProducts.innerHTML = cantTotalLogoCart();
};

init();
