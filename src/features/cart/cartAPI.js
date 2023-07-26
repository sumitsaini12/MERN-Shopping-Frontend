import axios from "axios";
export function fetchCarts() {
    return axios.get('/Api')
}