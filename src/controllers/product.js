const express = require("express")

const Product = require("../models/product")

const router = express.Router()
const redis = require("../configs/redis")





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


router.post("/", async (req, res )=>{

    const product = await Product.create(req.body)

    

    const products = await Product.find({}).exec()


    redis.set("product", JSON.stringify(products))

    return res.status(201).send(product)

   
})


router.get("/:id", (req,res)=>{
    if(err) console.error(err)

    redis.get(`product.${req.params.id}`, async(err, pros)=>{
        if(pros) return res.status(200).send({cached_pros : JSON.parse(pros)})

        const product =  await Product.findById(req.params.id).lean().exec()

        redis.set(`product.${req.params.id}`, JSON.stringify(product))

        return res.status(200).send({db_pros : product})
    })
})

router.patch("/:id", async(req,res)=>{
            const product = await Product.findByIdAndUpdate(res.params.id, req.body,{new: true})

            redis.set(`product.${req.params.id}`, JSON.stringify(product))

            const products = await Product.find().exec()

            redis.set("products", JSON.stringify(products))

            return res.status(201).send(product)

})

router.delete("/:id", async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)

    redis.del(`product.${req.params.id}`)

    const products = await Product.find().exec()

    redis.set("products", JSON.stringify(products))

    return res.status(201).send(product)
})




module.exports = router
