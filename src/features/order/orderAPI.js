import axios from "axios";

export function addOrder(order) {
  return axios.post("http://localhost:3000/orders", order);
}
