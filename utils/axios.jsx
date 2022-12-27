import axios from 'axios';

export const apiLink = 'http://localhost:3500/v1';
// export const apiLink = 'https://api.smileart-eg.com';

export const post = async (url, data = new FormData()) => {

  // let token = await getData('user_t');
  // token && data.append('token', token);

  return await axios({
    method: 'POST',
    url: apiLink + url,
    data: data,
    validateStatus: () => true,
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

export const put = async (url, data = new FormData()) => {
  
  // let token = await getData('user_t');
  // token && data.append('token', token);

  return await axios({
    method: 'PUT',
    url: apiLink + url,
    data: data,
    validateStatus: () => true,
    headers: {
      Accept: 'application/json, text/plain, /',
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const get = async (url, params = {}) => {
  
  // let token = await getData('user_t');
  // token && (params.token = token);

  return await axios({
    method: 'GET',
    url: apiLink + url,
    params: params,
    validateStatus: () => true,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const remove = async (url, params = {}) => {
  
  // let token = await getData('user_t');
  // token && data.append('token', token);

  return await axios({
    method: 'DELETE',
    url: apiLink + url,
    params: params,
    validateStatus: () => true,
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

