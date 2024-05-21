const fetch = require('node-fetch');

const pool_id = '0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582'

const url = `https://api.dexscreener.com/latest/dex/pairs/sui/${pool_id}`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
};

fetch(url, options)
  .then(res => res.json())
  .then((json) => {
    console.log(json)
  })
  .catch(err => console.error('error:' + err));