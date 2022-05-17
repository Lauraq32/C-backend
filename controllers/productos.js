const { response, request } = require("express");
const Productos = require("../models/productos");

const productosPost = async (req, res) => {
  const productos = new Productos({
    productos: req.body.productos,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
  });
  productos
    .save()
    .then(async (result) => {
      const productosObj = result.toObject();
      return res.status(201).json({
        ...productosObj,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      return res.status(404).json({
        error: err,
      });
    });
};
const productosDelete = async (req, res = response) => {
  const { id } = req.params;
  await Productos.findByIdAndDelete(id);
  if (!Productos) {
    return res.status(404).json({
      message: "Productos not found",
    });
  }
  return res.status(200).json({
    message: "producto deleted",
  });
};

const productosGet = async (req = request, res = response) => {
  const id = req.params.id;

  Productos.findOne({ _id: id }).then((doc) => {
    console.log("from database", doc);
    if (doc) {
      return res.status(200).json({
        productos: doc,
      });
    } else {
      return res.status(404).json({ message: "producto not found" });
    }
  });
};

const productsGet = async (req = request, res = response) => {
  const productos = await Productos.find();

  return res.status(200).json({
    productos,
  });

  if (!productos) {
    return res.status(404).json({
      message: "producto not found",
    });
  }
};

const productosPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    productos: req.body.productos,
    cantidad: req.body.cantidad,
    precio: req.body.precio,
  };

  Productos.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "productos updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  productosPost,
  productosGet,
  productosPut,
  productosDelete,
  productsGet,
};
