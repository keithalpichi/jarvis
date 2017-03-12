const jarvis = require('express').Router()
const http = require('http')
const axios = require('axios')
const url = require('url')

const wolframUrl = 'http://api.wolframalpha.com/v2/query?'
const wolframAPIKey = require('../../../keys').wolframAPIKey

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
    const data = result.data.queryresult
    if (!data.success) {
      res.status(200).json('Master, I failed to answer your inquiry. Can you be a bit more specific?')
    } else {
      const answer = findAnswersInData(data.pods)
      res.status(200).json(answer)
    }
  }).catch(function (err) {
    console.log(err);
    res.status(200).json('Master, I failed to answer your inquiry. Can you be a bit more specific?')
  })
})

const createQuery = function (req) {
  return `appid=${req.params.wolframAPIKey}&input=${req.params.query}&withCredentials=true&output=json`
}

const findAnswersInData = function (data) {
  let results = []
  data.forEach(function (pod) {
    pod.subpods.forEach(function (sub) {
      const text = sub.plaintext
      if (text != "") results.push(text)
    })
  })
  return `I found this: ${results.join(", ")}.`
}

module.exports = jarvis
