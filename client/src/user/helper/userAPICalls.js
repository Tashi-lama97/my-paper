import axios from "axios";

//Save Resume
export const saveResumeInfo = (resume, authToken, userId) => {
  return axios
    .post(`/api/resume/add/${userId}`, resume, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data.resumeId;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//GET RESUME BY ID

export const getResumeUsingId = (authToken, userId, resumeId) => {
  return axios
    .get(`/api/user/resume/${userId}/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//GET RESUMES BY USER ID

export const getResumesByUser = (authToken, userId) => {
  return axios
    .get(`/api/user/resumes/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//UPDATE RESUME

export const updateResume = (resumeId, userId, authToken, resume) => {
  return axios
    .put(`/api/resume/update/${userId}/${resumeId}`, resume, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//DELETE RESUME

export const deleteResume = (authToken, userId, resumeId) => {
  return axios
    .delete(`/api/resume/delete/${userId}/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data;
    });
};

//UPDATE USER

export const updateUserInfo = (token, userId, userData) => {
  return axios
    .put(`/api/user/update/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err.response.data.error;
    });
};
