const express = require("express")

const Product = require("../models/product")

const router = express.Router()
const redis = require("../configs/redis")

router.get("/", (req,res)=>{

       redis.get("products",async function(err, pros){
            console.log('pros:', pros)
            if(err) console.log(err)

            if(pros) return res.status(200).send(pros)

            const product = await Product.find({}).lean().exec()

            return res.status(200).send(product)
       })
 

   
})

module.exports = router
