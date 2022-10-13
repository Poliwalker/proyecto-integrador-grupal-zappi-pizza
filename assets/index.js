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
const categoriesList = document.querySelectorAll('.category');
const categories = document.querySelector('.card-category-container')
const products = document.querySelector('.card-popular-container');
const btnAdd = document.querySelector('.add');

//funcion para crear y retornar el html
const createHtml = (product) => {
	const { nombre, leyenda, precio, img} = product;
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

const renderDivideProducts = (index = 0) =>{
	products.innerHTML += productsController.dividedProducts[index].map(createHtml).join('');
}

const renderProducts = (index = 0, category= undefined)=>{
	if(!category) {
	renderDivideProducts(index);
	return ;
	}
	renderfilteredProducts(category);
};

const renderfilteredProducts = category =>{
	const productList = foods.filter((product) => product.category === category);

	products.innerHTML = productList.map(createHtml).join('');
};

const changeBtnActiveState = (selectedCategory) => {
	const categories = [... categoriesList];
	categories.forEach((categoryBtn)=>{
		if(categoryBtn.dataset.category !== selectedCategory)
		{
			categoryBtn.classList.remove('active');
			return;
		}
		categoryBtn.classList.add('active')
	});
};

 const changeFilterState = e => {
 	const selectedCategory = e.target.dataset.category;
	changeBtnActiveState(selectedCategory);
  	//changeShowMoreBtnState(selectedCategory);
 };

const applyFilter = e => {
	if(!e.target.classList.contains('category')) return;
	changeFilterState(e);
	if (!e.target.dataset.category) {
		products.innerHTML = '';
		renderProducts();
	} else { 
		renderProducts(0, e.target.dataset.category);
	}
};

const init = () => {
	renderProducts();
	categories.addEventListener('click', applyFilter);
};

init();