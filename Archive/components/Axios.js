import axios from "axios";

const Axios = axios.create({
	baseURL: 'http://192.168.1.200:3002/rentaautos/',
	timeout: 10000,
	headers: {'Content-Type': 'application/json'}
});

export default Axios;