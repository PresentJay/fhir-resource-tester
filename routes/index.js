const express = require('express');
const router = express.Router();
const client = require('fhir-kit-client');
const fhirClient = new Client({
  baseUrl: 'http://hapi.fhir.org/baseR4'
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'etri-fhir-resource-tester'
  });
});

module.exports = router;