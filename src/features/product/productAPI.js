import axios from "axios";
export function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

export function fetchProductsByFilters(filter) {
  let queryString = "";
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`;
  }

  return axios.get(`http://localhost:3000/products?${queryString}`);
}
