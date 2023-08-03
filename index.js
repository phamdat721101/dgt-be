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

app.use(express.static('public'))

app.get('/', (req, res) => {
    let resp = axios.get('http://localhost:4001/v1/status')
    .then(response => {
        console.log("PQD: ",response.data);
        return response.data
    })
    .catch(error => {
        console.log(error);
    });
    res.json({
        code: 0,
        data: resp
    })
})

app.listen(process.env.PORT || 3000);

module.exports = app;