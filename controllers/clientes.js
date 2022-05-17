const { response, request } = require("express");
const Clientes = require("../models/clientes");
const Reservation = require("../models/reservation");

const clientesPost = async (req, res) => {
  const clientes = new Clientes({
    paciente: req.body.paciente,
    numeromovil: req.body.numeromovil,
    email: req.body.email,
    status: req.body.status
  });

  try {
    const result = await clientes.save();
    const clientesObj = result.toObject();
    
    return res.status(201).json({
      ...clientesObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const clientesDelete = async (req, res = response) => {
  const { id } = req.params;

  await Clientes.findByIdAndDelete(id);
  if (!Clientes) {
    return res.status(404).json({
      message: "Clientes not found",
    });
  }
  return res.status(200).json({
    message: "cliente deleted",
  });
};

const tablaGet = async (req = request, res = response) => {
  const id = req.params.id;
  const cliente = await Clientes.findById(id).populate("reservations");

  if (!cliente) {
    return res.status(404).json({
      message: "reservation not found",
    });
  }

  const clienteObj = cliente.toObject();
  return res.status(200).json({
    ...clienteObj,
    visitas: clienteObj.reservations.length,
  });
};

const clientsGet = async (req = request, res = response) => {
  const clientes = await Clientes.find().populate("reservations");

  if (!Clientes) {
    return res.status(404).json({
      message: "Clientes not found",
    });
  }
  return res.status(200).json({
    clientes,
  });
};

const clientesPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    paciente: req.body.paciente,
    numeromovil: req.body.numeromovil,
    email: req.body.email,
    status: req.body.status
  };

  Clientes.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "clientes updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  clientesPost,
  clientesPut,
  clientesDelete,
  clientsGet,
  tablaGet
};
