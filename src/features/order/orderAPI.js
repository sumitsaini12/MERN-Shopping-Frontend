import axios from "axios";

export function addOrder(order) {
  return axios.post("http://localhost:3000/orders", order);
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return axios.get(`http://localhost:3000/orders?${queryString}`);
}

export function updateOrder(order) {
  return axios.patch(`http://localhost:3000/orders/${order.id}`, order);
}


export function deleteOrder(orderId) {
  return axios.delete(`http://localhost:3000/orders/${orderId}`)
}