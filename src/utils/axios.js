import axios from 'axios';

export default axios.create({
	baseURL: 'https://mystripes-api.herokuapp.com/api'
});