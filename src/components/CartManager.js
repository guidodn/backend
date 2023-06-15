import {promises as fs} from "fs"
import {nanoid} from "nanoid"
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager

class CartManager {
    constructor () {
        this.path = "./src/models/carts.json"
    }


    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }
    
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart))
    };

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }


    addCarts = async () => {
        let cartsViejos = await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{id : id, products : []}, ...cartsViejos]
        await this.writeCarts(cartsConcat);
        return "Carrito agregado"

    }

    getCartsById = async (id) =>{

        let cartById = await this.exist(id)
        if(!cartById) return "No encontramos el carrito"
        return productById
    }

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId)
        if(!cartById) return "No encontramos el carrito"
        let productById = await productAll.exist(productId)
        if(!cartById) return "No encontramos el producto"

        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter((cart) => cart.id != cartId) 
        
        if(cartById.product.some(prod => prod.id === productId)){
            let moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.quantity + 1
            let cartsConcat = [moreProductInCart, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Sumamos un producto al carrito"
        }


        cartById.products.push({id : productById.id, quantity: 1})

        //Agrego el producto al carrito

        
        let cartsConcat = [{id: cartId, products : []}, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Agregamos el producto al carrito"
    }

}


export default CartManager