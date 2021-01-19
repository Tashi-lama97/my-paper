import axios from "axios";

export const signup = (user) => {
  return axios
    .post("/api/signup", user)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const login = (user) => {
  return axios
    .post("/api/login", user)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const logout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
    return axios
      .get("/api/logout")
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
