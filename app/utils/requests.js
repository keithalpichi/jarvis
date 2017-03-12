import axios from 'axios'
import { wolframUrl, wolframAPIKey } from '../../keys'

const baseUrl = '/api'
const jarvisEndpoint = '/jarvis'

export const httpGetAll = (endpoint) => {
  //console.log('Sending a get all to endpoint ' + baseUrl + endpoint);
  return axios.get(baseUrl + endpoint)
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      console.log(err);
    })
}

export const httpGetOne = (endpoint, id) =>  {
  return axios.get(baseUrl + endpoint + id)
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      console.log(err);
    })
}

export const httpPost = (endpoint, params) => {
  //console.log('Sending a post to endpoint ' + baseUrl + endpoint + 'with data: ' + params);
  return axios.post(baseUrl + endpoint, params)
    .then(function (results) {
      return results.data
    })
    .catch(function (err) {
      console.log(err);
    })
}

export const getFromWolfram = (query) => {
  return axios.get(baseUrl + jarvisEndpoint, {
    params: {
      input: query
    }
  })
    .then(function (res) {
      return res.data
    })
    .catch(function (err) {
      console.log(err);
    })
}
