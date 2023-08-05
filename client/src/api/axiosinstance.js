import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://jobcybackend.thecowboy.shop',

  //timeout implementation
  
  headers: {
    'Content-Type': 'application/json',
    // Add other headers if needed
    withCredentials: true
  },
});

export default instance;