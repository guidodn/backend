import express from "express"
import ProductManager from "./components/ProductManager.js"
import ProductR from "../router/product.routes.js"



const app = express()
const PORT = 5959

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/products", ProductR)


app.listen(PORT, () =>{
    console.log(`Servidor Express ${PORT}`);
});