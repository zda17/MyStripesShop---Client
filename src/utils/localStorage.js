const localStorage = {
	setItem(UUID) {
		window.localStorage.setItem('UUID', UUID);
	},
	setUserCart(cart) {
		window.localStorage.setItem('userCart', JSON.stringify(cart));
	},
	getUserCart() {
		let newCart = [];
		newCart.push(JSON.parse(window.localStorage.getItem('userCart')));
		return newCart[0];
	},
	getItem() {
		return window.localStorage.getItem('UUID');
	},
	clearItem() {
	  window.localStorage.removeItem('UUID');
	},
	clearCart() {
		window.localStorage.removeItem('userCart');
	},
	hasUUID() {
	  return !!localStorage.getItem();
	},
	setJWT(JWT) {
		window.localStorage.setItem('JWT', JWT);
	}
};

export default localStorage;