class ProductManager {
    constructor(title, description, price, thumbnail, code, stock, id) {
        this.products = [];
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = id;
    
    }
    addProduct(product) {
        for(const element of this.products) {
            if(product.stock < 0 || product.price < 0 || product.code === `` || product.title === '' || product.description === '' || product.thumbnail === '') {
                return {error: 'Todos los campos son requeridos'}
            }
            else
            if(element.code === product.code) {
                return {error: 'Este producto ya existe'}
            }
        }
        product.id = Math.random().toString(9)
        this.products.push(product)
        return this.products;
    }
    
        getProducts() {
            return this.products;
        }
    
        getProductById(id) {
            for (const element of this.products) {
                if(element.id === id) {
                    return element.title;
                }
            }
            return {error: 'Not found'}
        }
}



// Pruebas

const productManager = new ProductManager();
console.log('Lista vacía');
console.log(productManager.getProducts());
console.log('Agrego un producto');
console.log(productManager.addProduct({title: 'prueba', description: 'Producto de prueba', price: 500, thumbnail: 'Sin img', code: '123', stock: 25}));
console.log('Lista con un producto');
console.log(productManager.getProducts());
console.log('Producto con el mismo código');
console.log(productManager.addProduct({title: 'prueba', description: 'Producto de prueba', price: 500, thumbnail: 'Sin img', code: '123', stock: 25}));
console.log('Producto con un campo vacío');
console.log(productManager.addProduct({title: ' ', description: 'Producto de prueba', price: 500, thumbnail: 'Sin img', code: '123', stock: 25}));
console.log('Busco un Producto por id y funciona');
console.log(productManager.getProductById(productManager.products(0).id));
console.log('Busco un Producto por id y no funciona');
console.log(productManager.getProductById('123'));