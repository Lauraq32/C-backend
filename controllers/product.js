const { response, request } = require("express");
const Product = require("../models/product");

const productosPost = async (req, res) => {
  const productos = new Product({
    products: req.body.products,
    amount: req.body.amount,
    price: req.body.price,
  });
  productos
    .save()
    .then(async (result) => {
      const ProductObj = result.toObject();
      return res.status(201).json({
        ...ProductObj,
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
  await Product.findByIdAndDelete(id);
  if (!Product) {
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

  Product.findOne({ _id: id }).then((doc) => {
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
  const Products = await Product.find();

  if (!Product) {
    return res.status(404).json({
      message: "producto not found",
    });
  }

  return res.status(200).json({
    Products,
  });
};

const productosPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    products: req.body.products,
    amount: req.body.amount,
    price: req.body.price,
  };

  Product.updateOne({ _id: id }, { $set: updateOps })
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
