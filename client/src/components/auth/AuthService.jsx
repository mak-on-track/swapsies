// auth/auth-service.js

import axios from 'axios';

class AuthService {
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
