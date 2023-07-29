import axios from "axios";

export function createUser(userData) {
  // Todo: on server it will only return some info of user (not pasword)
  return axios.post("http://localhost:3000/users", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function checkUser(loginInfo) {
  // Eka bar authSlice me checkUserAsync funtion ko in check kar le
  return new Promise(async (resolve, reject) => {
    const email = loginInfo.email;
    const password = loginInfo.password;
    const { data } = await axios.get(
      "http://localhost:3000/users?email=" + email
    );
    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
      } else {
        reject({ message: "wrong credentials" });
      }
    } else {
      reject({ message: "wrong credentials" });
    }
  });
}
