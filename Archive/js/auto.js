import axios from "../node_modules/axios";

const Axios = axios.create({
    baseURL: 'http://192.168.1.200:3002/rentaautos/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'}
});

const Listar = () => {
    Axios.get("/pedidos/pedidosllevar/listar")
        .then((data) => {
            console.log(data.data);

        })

        .catch((error) => {
            console.log(error)
        });
}
