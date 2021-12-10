const express = require("express")
const productController = require("./controllers/product")
const connect  = require("./configs/db")

const app = express()
app.use("/products", productController)
app.use(express.json())




app.listen(2233, async()=>{
    await connect()
    console.log("listening on the port 2233")
})



