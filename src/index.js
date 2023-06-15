import express from "express"
import ProductManager from "./components/ProductManager.js"
import ProductR from "../router/cart.routes.js"
import { engine } from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js"



const app = express()
const PORT = 5959
const product = new ProductManager ()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Handlebars - Estructura

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "views"))

//Static

app.use("/", express.static(__dirname + "/public"))

app.get("/", async (req, res) =>{
    let allProducts = await product.getProducts()
    res.render("home", {
        title : "Express",
        products : allProducts
    })
})



app.use("/api/cart", CartRouter)
app.use("/api/products", ProductR)


app.listen(PORT, () =>{
    console.log(`Servidor Express ${PORT}`);
});