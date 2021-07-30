import 'regenerator-runtime/runtime';
import express from 'express';
import Product from './productclass';

const products = new Product();

const port = 8080;
const app = express();

// Indica que el servidor esta levantado y corriendo en puerto especificado
const server = app.listen(port, () => {
	console.log(`Server running in port:  ${port}`);
});

// Indicar un error que de el servidor.
server.on('error', (err) => {
	console.error(`There was an error: ${err}`);
});

// Endpoint GET para listar todos los productos
app.get('/api/productos/listar', (req, res) => {
	const getProducts = products.getProducts();
	getProducts.length !== 0
		? res.json({ products: getProducts })
		: res.status(404).json({ error: 'No hay productos cargados' });
});

// Endpoint GET para pedir un producto especifico por ID
app.get('/api/productos/listar/:id', (req, res) => {
	const specificId = req.params.id;
	const getProducts = products.getProducts();
	const product = getProducts.find((product) => product.id == specificId);
	product
		? res.json({ product })
		: res.status(404).json({ error: 'Producto no encontrado' });
});

app.use(express.json()); // Indica que el body viene como JSON
app.use(express.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string

// Endpoint POST para agregar un producto
app.post('/api/productos/guardar', (req, res) => {
	const body = req.body;
	const newProduct = products.addProduct(
		body.title,
		body.price,
		body.thumbnail
	);
	res.json({
		product: newProduct,
	});
});
