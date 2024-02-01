import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8081',
  method: 'get',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
})
