const localStorage = {
	setItem(UUID) {
		window.localStorage.setItem('UUID', UUID);
	},
	getItem() {
		return window.localStorage.getItem('UUID');
	},
	clearItem() {
	  window.localStorage.removeItem('UUID');
	},
	hasUUID() {
	  return !!localStorage.getItem();
	},
	setJWT(JWT) {
		window.localStorage.setItem('JWT', JWT);
	}
};

export default localStorage;