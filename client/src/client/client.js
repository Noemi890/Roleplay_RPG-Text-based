import axios from 'axios'
export const host = process.env.REACT_APP_DATABASE_URL
export const tokenKey = process.env.REACT_APP_TOKEN_KEY

const client = {
  get: path => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.get(url, { headers });
  },

  post: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};

    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.post(url, data, { headers });
  },

  patch: (path, data, withToken = true) => {
    const url = `${host}${path}`;
    const token = localStorage.getItem(tokenKey);
    let headers = {};
    if (withToken) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return axios.patch(url, data, { headers });
  },

  delete: path => {
    const url = `${host}${path}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`,
    };

    return axios.delete(url, { headers });
  },

  put: (path, data, withToken = true) => {
    const url = `${host}${path}`
    let headers = {}
    if (withToken) {
    headers = {
      Authorization: `Bearer ${localStorage.getItem(tokenKey)}`
    }}
    return axios.put(url, data, { headers })
  }
};

export default client;