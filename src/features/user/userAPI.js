import axios from "axios";

export function fetchLoggedInUserOrders(userId) {
  return axios.get(`http://localhost:3000/orders/?user.id=${userId}`);
}
