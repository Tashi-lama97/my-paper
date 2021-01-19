import axios from "axios";

export const getAllResumes = (token, userId) => {
  return axios
    .get(`/api/resumes/list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

export const getAllUsers = (token, userId) => {
  return axios
    .get(`/api/users/list/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};
