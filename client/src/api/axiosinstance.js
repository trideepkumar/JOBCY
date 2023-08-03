import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://jobcybackend.thecowboy.shop/',
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
    withCredentials: true
  },
});

export default instance;