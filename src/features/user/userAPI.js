import axios from "axios";

export function fetchLoggedInUserOrders() {
  return axios.get("http://localhost:3000/orders/own");
}

export function updateUser(update) {
  return axios.patch(`http://localhost:3000/users/${update.id}`, update);
}

export function fetchLoggedInUser() {
  return axios.get(`http://localhost:3000/users/own`);
}
