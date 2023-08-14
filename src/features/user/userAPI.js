import axios from "axios";

export function fetchLoggedInUserOrders(userId) {
  return axios.get(`http://localhost:3000/orders/user/${userId}`);
}

export function updateUser(update) {
  return axios.patch(`http://localhost:3000/users/${update.id}`, update);
}

export function fetchLoggedInUser(userId) {
  return axios.get(`http://localhost:3000/users/${userId}`);
}
