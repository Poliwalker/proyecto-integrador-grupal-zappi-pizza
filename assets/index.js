const renderHTML = (food) => {
	caja.innert.html = food.filter((food) => foods.id).join('');
};

const printHTML = (menu) => {
	const { name, id, title, ingredients } = menu;
	return `<div></div>`;
};

const init = () => {
	menuOptions.addEventListenner('click', renderHTML);
};
