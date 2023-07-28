import { data } from "autoprefixer";
import axios from "axios";
export function fetchProducts() {
  return axios.get("http://localhost:3000/products");
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category": ["smartphone", "laptops"], "brand": ["apple", "oppo"]}
  // sort ={_sort:"price", _order="desc"}
  // Todo= Server support multiple categories
  // pagination = { _page:1, _limi=10}  // _page=1&_limit=10

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return axios.get(`http://localhost:3000/products?${queryString}`);
}

export function fetchBrands() {
  return axios.get("http://localhost:3000/brands");
}

export function fetchCategories() {
  return axios.get("http://localhost:3000/categories");
}
