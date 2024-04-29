const express = require('express');
var mysql = require('mysql');
const app = express();

const data = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

data.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server');

    data.query('CREATE DATABASE IF NOT EXISTS productsdb', (err) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database created or already exists');
        data.query('USE productsdb', (err) => {
            if (err) {
                console.error('Error using database:', err);
                return;
            }
            console.log('Using productsdb database');
            initializeTables();
        });
    });
});
function initializeTables() {
    data.query(`CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50),
    description TEXT,
    price DECIMAL(10, 2),
    image VARCHAR(255),
    active INT)`, (err) => {
       if (err) {
            console.error('Error creating products table:', err);
            return;
        }
        console.log('Products table created or already exists');
        insertInitialData();
    });
}

function insertInitialData() {
    const initialProducts = [
        { name: 'Product 1', description: 'Description 1', price: 10.99, image: 'image1.jpg', active: 1 },
        { name: 'Product 2', description: 'Description 2', price: 20.99, image: 'image2.jpg', active: 1 }
    ];
    data.query('INSERT INTO products (name, description, price, image, active) VALUES ?', [initialProducts.map(p => [p.name, p.description, p.price, p.image, p.active])], (err, result) => {
        if (err) {
            console.error('Error inserting initial data:', err);
            return;
        }
        console.log('Initial data inserted successfully');
    });
}
app.use(express.json());

app.get('/products', (req, res) => {
    data.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    data.query('SELECT * FROM products WHERE id = ?', productId, (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.post('/products', (req, res) => {
    const newProduct = req.body;
    data.query('INSERT INTO products SET ?', newProduct, (err, result) => {
        if (err) throw err;
        res.status(201).send('Product added successfully');
    });
});

app.patch('/products/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;
    data.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, productId], (err, result) => {
        if (err) throw err;
        res.send('Product updated successfully');
    });
});

app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    data.query('DELETE FROM products WHERE id = ?', productId, (err, result) => {
        if (err) throw err;
        res.send('Product deleted successfully');
    });
});

app.listen(8080);