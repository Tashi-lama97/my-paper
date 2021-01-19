import axios from "axios";

export const requestResetPasswordLink = (email) => {
  return axios
    .post("/api/user/getForgotPasswordLink", { email })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const validateToken = (token) => {
  return axios
    .post("/api/user/verifytoken", { token })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const changePassword = (password, token) => {
  console.log(token);
  return axios
    .put("/api/user/resetpassword", { password, token })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
