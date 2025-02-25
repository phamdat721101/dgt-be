const data = require('../config/chain')

exports.get_chain_data = async(req, res, next) =>{
    res.json({
        data
    });
}