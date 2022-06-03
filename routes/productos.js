const router = require('express').Router();
const productos = require('../data/productos')

let productosStore = [...productos]

router.get('/', (req, res) => {
    res.status(200).json(productos)
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const producto = productosStore.find(producto => producto.id == parseInt(id))

    if (!producto) {
        return res.status(403).json({ status: "error", message: "producto no encontrado" })
    }

    res.status(200).json(producto)
})

router.post('/', (req, res) => {
    const { title, price } = req.body;

    if (!title || !price) {
        return res.status(403).json({ status: "error", message: "falta algun dato" })
    }

    productosStore.push({ id: productosStore.length + 1, title, price })

    res.status(200).json({ status: "ok", message: "producto añadido correctamente" })

})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;

    const producto = productosStore.find(producto => producto.id == parseInt(id))

    if (!producto) {
        return res.status(403).json({ status: "error", message: "producto no encontrado" })
    }

    productosStore = productosStore.map(
        producto => producto.id == Number(id) ? { ...producto, title, price } : producto
    )

    const productoNuevo = productosStore.find(producto => producto.id == parseInt(id))

    res.status(200).json({ status: "ok", message: "producto actualizado", nuevo: productoNuevo })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const producto = productosStore.find(producto => producto.id == parseInt(id))

    if (!producto) {
        return res.status(403).json( { status: "error", message: "producto a eliminar no encontrado" })
    }

    productosStore = productosStore.filter(
        producto => producto.id != Number(id)
    )

    res.status(200).json({ status: "ok", message: "producto borrado" })
})

module.exports = router;