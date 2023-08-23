import axios from "axios";

export function createUser(userData) {
  // Todo: on server it will only return some info of user (not pasword)
  return axios.post("http://localhost:3000/auth/signup", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function loginUser(loginInfo) {
  // Eka bar authSlice me checkUserAsync funtion ko in check kar le
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }
  });
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:3000/auth/check');
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject( error );
    }

  });
}




export function signOut() {
  return new Promise(async (resolve) => {
    //TODO: on server we will remove user session info

    resolve({ data: "successfully" });
  });
}
