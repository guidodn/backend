import {promises as fs} from "fs"

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0;

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }

        // Pruebo si funciona
        //console.log(newProduct);

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))

    }

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    //Consulto

    getProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async () => {

        let rta = await this.readProducts()
        return console.log(rta);
    }

    getProductsById = async (id) => {
        let rta2 = await this.readProducts()
        
        if(!rta2.find(product => product.id === id)){
            console.log("No encontramos el producto");
        } else {
            console.log(rta2.find(product => product.id === id));
        }

        //console.log(filter);
    }

    deleteProductsById = async (id) => {
        let rta2 = await this.readProducts()
        let productFilter = rta2.filter(products => products.id != id)

        
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
    }
    
    updateProducts = async ({id, ...producto}) => {

        await this.deleteProductsById(id)

        let prodViejo = await this.readProducts()

        let prodModificados = [{id, ...producto}, ...prodViejo]
        await fs.writeFile(this.patch, JSON.stringify(prodModificados))

    }
}


//const productos = new ProductManager

// Ejecuto

/* productos.addProduct("Titulo", "Descripcion", 2000, "Img.jpg", "bck123", 25)
productos.addProduct("Titulo2", "Descripcion2", 3000, "imagen.jpg", "bck321", 30) 
productos.addProduct("Titulo3", "Descripcion3", 2000, "Img.jpg", "bck123", 12)
productos.addProduct("Titulo4", "Descripcion4", 3000, "imagen.jpg", "bck321", 5) 
productos.addProduct("Titulo5", "Descripcion5", 2000, "Img.jpg", "bck123", 8)
productos.addProduct("Titulo6", "Descripcion6", 3000, "imagen.jpg", "bck321", 14) 
productos.addProduct("Titulo7", "Descripcion7", 2000, "Img.jpg", "bck123", 16)
productos.addProduct("Titulo8", "Descripcion8", 3000, "imagen.jpg", "bck321", 2) 
productos.addProduct("Titulo9", "Descripcion9", 2000, "Img.jpg", "bck123", 1)
productos.addProduct("Titulo10", "Descripcion10", 3000, "imagen.jpg", "bck321", 18)  */

/* productos.getProducts () */

// Busco el producto por id

/* //productos.getProductsById(4) */

// Elimino un producto por id

/* productos.deleteProductsById(1) */


// Actualizo el producto cambiando price y stock

/* productos.updateProducts ({
    title: 'Titulo2',
    description: 'Descripcion2',
    price: 4000,
    img: 'imagen.jpg',
    code: 'bck321',
    stock: 45,
    id: 2
})  */