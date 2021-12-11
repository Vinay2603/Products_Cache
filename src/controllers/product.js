const express = require("express")

const Product = require("../models/product")

const router = express.Router()
const redis = require("../configs/redis")

router.post("/", async (req, res )=>{
    try{
    console.log('req:', req.body)
    const product = await Product.create(req.body)
    console.log('product:', product)
   // const products = await Product.find({}).exec()
   // console.log('products:', products)
   // redis.set("product", JSON.stringify(products))

    return res.status(201).send(product)

    }catch(e){
        return res.status(500).json( {message: e.message , status : "failed"})
    }
})




router.get("/", (req,res)=>{

       redis.get("products",async function(err, pros){
            console.log('pros:', pros)
            if(err) console.log(err)

            if(pros) return res.status(200).send({ pros : JSON.parse(pros)})
            
            console.log("reached here" )

            const product = await Product.find({}).lean().exec()
 
            redis.set("product", JSON.stringify(product))

            return res.status(200).send({ pros1 : product})
       })
 
})


module.exports = router
