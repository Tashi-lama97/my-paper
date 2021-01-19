import axios from "axios";

export const sendContactMail = (emailData) => {
  return axios
    .post("/api/contact", emailData)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
