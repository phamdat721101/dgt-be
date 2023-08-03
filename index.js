const express = require('express');
const app = express();
const path = require('path');

const axios = require('axios');

// const fetch = require('node-fetch');

// async function getData() {
//     const url = 'http://localhost:4001/v1/status';
//     const response = await fetch(url);
//     const jsonResponse = await response.json();
//     console.log("PQD: ", jsonResponse);
// } 
  
// getData();

// app.use(express.static('public'))

app.get('/', async (req, res) => {
    let resp = await axios.get('http://localhost:4001/v1/asset?assetAddress=0x23926749Faf9F9AB807e57010999e9f274390421')

    console.log("resp after: ", resp.data.data)
    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.get('/v1/asset', async (req, res) => {
    let request = req.query.assetAddress
    let resp = await axios.get(`http://localhost:4001/v1/asset?assetAddress=${request}`)

    res.json({
        code: 0,
        data: resp.data.data
    })
})

app.listen(process.env.PORT || 3000);

module.exports = app;