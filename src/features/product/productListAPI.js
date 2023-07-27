import axios from "axios";
export function fetchProducts() {
    return axios.get('http://localhost:3000/products')
}