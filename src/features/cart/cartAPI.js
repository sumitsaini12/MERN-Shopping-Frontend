import axios from "axios";

export function addToCart(item) {
  return axios.post("http://localhost:3000/cart", item);
}

export function fetchItemsByUserId(userId) {
  return axios.get(`http://localhost:3000/cart?user=${userId}`);
}

export function updateCart(update) {
  return axios.patch(`http://localhost:3000/cart/${update.id}`, update);
}

export function deleteItemFromCart(itemId) {
  return axios.delete(`http://localhost:3000/cart/${itemId}`);
}
