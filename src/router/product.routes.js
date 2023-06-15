import {Router} from "express"
import ProductManager from "../components/ProductManager.js"

const ProductR = Router()
const product = new ProductManager ()


ProductR.get("/", async (req, res) =>{
    res.send(await product.getProducts())
})

ProductR.get(":id", async (req, res) =>{

    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProductR.post("/", async (req, res) =>{

    let newProduct = req.body
    res.send(await product.addProducts(newProduct))

})

ProductR.put("/:id", async (req,res) =>{
    let id = req.params.id
    let updateProduct = req.body;
    res.send(await product.deleteProducts(id));
})

ProductR.delete("/:id", async (req, res) =>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))        

})  


export default ProductR