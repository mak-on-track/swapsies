// auth/auth-service.js

import axios from 'axios';


const signup = (username, password) => {
  return axios
    .post('/api/auth/signup', { username, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
}

const login = (username, password) => {
  return axios
    .post('/api/auth/login', { username, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete('/api/auth/logout')
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };


/* class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5555/api',
      withCredentials: true
    });
    this.service = service;
  }

  loggedin = () => {
  return this.service.get('/loggedin')
  .then(response => response.data)
}

}

export default AuthService;
 */