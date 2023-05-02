const express = require('express');
const ProductManager = require("./ProductManager");
const productManager = new ProductManager('./products.json');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Listening on port:${PORT}`)
})

app.get('/products', async (req, res) =>{
    const limit = req.query.limit;    
    const products = await productManager.getProducts();    
    if(limit){
        res.json(products.slice(0, limit));
    }else{ res.json(products)};
} )

app.get('/products/:id', async (req, res)=>{
    const id = req.params.id;
    console.log(id)
    const product = await productManager.getProdctById(id);
    if(product){
        res.json(product)
    } else{ res.json({error: 'Producto not found'})};
})