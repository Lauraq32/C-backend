const { response, request } = require("express");
const client = require("../models/client");
const Client = require("../models/client");

const clientesPost = async (req, res) => {
  const client = new Client({
    patient: req.body.patient,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status
  });

  try {
    const result = await client.save();
    const clientObj = result.toObject();
    
    return res.status(201).json({
      ...clientObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const clientesDelete = async (req, res = response) => {
  const { id } = req.params;

  await Client.findByIdAndDelete(id);
  if (!Client) {
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
  const client = await Client.findById(id).populate("reservations");

  if (!client) {
    return res.status(404).json({
      message: "client not found",
    });
  }

  const clientObj = client.toObject();
  return res.status(200).json({
    ...clientObj,
    visitas: clientObj.reservations.length,
  });
};

const clientsGet = async (req = request, res = response) => {
  const client = await Client.find().populate("reservations");

  if (!client) {
    return res.status(404).json({
      message: "client not found",
    });
  }

  return res.status(200).json({
    client
  });
}


const clientesPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    patient: req.body.patient,
    phone: req.body.phone,
    email: req.body.email,
    status: req.body.status
  };

  Client.updateOne({ _id: id }, { $set: updateOps })
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
