const mongoose = require("mongoose")

 const connect= ()=>{
    return mongoose.connect("mongodb://localhost:27017/product_Cache")
}

module.exports = connect 