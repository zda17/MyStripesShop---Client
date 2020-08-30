import axios from 'axios';

export default axios.create({
	baseURL: 'https://mystripes-api.herokuapp.com/api'
	
	// for testing in development:
	// baseURL: 'http://localhost:8000/api'
});