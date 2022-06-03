const express = require('express');
const app = express();
const dotenv = require('dotenv')
const productosRoute = require('./routes/productos')

dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))

app.use('/api/productos', productosRoute);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running")
})


