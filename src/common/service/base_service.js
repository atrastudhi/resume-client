import axios from 'axios';

const SERVICE_BASE_URL = process.env.SERVICE_BASE_URL || 'http://localhost:8080';

const service = axios.create({
  baseURL: SERVICE_BASE_URL,
});

export default service;