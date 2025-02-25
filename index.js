const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const token = require('./routes/token.route')
const chain = require('./routes/chain.route')

require("dotenv").config();
  
app.use(express.static('public'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: '*'
}));

app.use('/v1/token', token)
app.use('/v1/chain', chain)

app.get('/', async (req, res) => {
    res.json({
        code: 0,
        data: "Ok"
    })
})

app.listen(process.env.PORT || 3001, () =>{
    console.log("Listening at 3001")
});

module.exports = app;