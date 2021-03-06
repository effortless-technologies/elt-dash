import decode from 'jwt-decode';
const config = require('../../../env.json')[process.env.NODE_ENV || 'dev'];


export default class AuthService {
  // Initializing important variables
  constructor(domain) {
    this.domain = domain || 'http://' + config.AUTH_URI + ':' + config.AUTH_PORT;
    this.fetch = this.fetch.bind(this); // React binding stuff
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this)
  }

  login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch(`${this.domain}/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  register(username, password) {
    return this.fetch(`${this.domain}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      }
      else
        return false;
    }
    catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  fetch(url, options) {
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error
    }
  }
}