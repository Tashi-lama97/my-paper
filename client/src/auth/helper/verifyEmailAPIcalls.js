import axios from "axios";

export const verifyEmailToken = (verificationToken) => {
  return axios
    .post("/api/user/verifyemail", { verificationToken })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
