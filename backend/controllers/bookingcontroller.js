const bookingdb = require('../models/mydb');
exports.postbook = async (req, res)=>{
    try{
        const booking = await bookingdb.create(req.body);
        res.status(200).json(booking);
    } catch(error){
        res.status(500).json({Message: error.message});
    }

}