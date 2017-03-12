const jarvis = require('express').Router()
const http = require('http')
const axios = require('axios')
const url = require('url')

const wolframUrl = 'http://api.wolframalpha.com/v2/query?'
const wolframAPIKey = require('../../../keys').wolframAPIKey

// const defaultOptions = {
//   hostname: wolframUrl,
//   method: 'GET',
//   headers: {
//     'access-control-allow-origin': '*',
//     'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
//     'access-control-max-age': 10,
//     'Content-Type': 'application/json'
//   }
// }
//
// jarvis.get('/', function (req, res) {
//   const options = defaultOptions
//   options.path = createQuery(req)
//   http.request(options, function (res) {
//     console.log('response in /jarvis endpoint is ', res);
//     parseString(res.data, function (err, result) {
//       if (err) {
//         res.status(400).json(err)
//       } else {
//         res.status(200).json(result)
//       }
//   })
// })

jarvis.get('/', function (req, res) {
  const parts = url.parse(req.url, true)
  const query = parts.query
  axios.get(wolframUrl, {
    params: {
      appid: wolframAPIKey,
      input: query.input,
      withCredentials: true,
      output: 'json',
      format: 'plaintext'
    }
  }).then(function (result) {
    console.log('Result from wolfram = ', result.data.queryresult);
    const data = result.data.queryresult
    if (!data.success) {
      const err = new Error('No results found')
      res.status(400).json(err)
    } else {
      res.status(200).json(data.pods)
    }
  }).catch(function (err) {
    console.log(err);
    res.status(400).json(err)
  })
})

const createQuery = function (req) {
  return `appid=${req.params.wolframAPIKey}&input=${req.params.query}&withCredentials=true&output=json`
}

module.exports = jarvis
