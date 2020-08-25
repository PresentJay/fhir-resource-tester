const express = require('express');
const router = express.Router();
const client = require('fhir-kit-client');
const Client = require('fhir-kit-client');
const fhirClient = new Client({
  baseUrl: 'http://129.254.63.252:8888'
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'etri-fhir-resource-tester'
  });
});

module.exports = router;