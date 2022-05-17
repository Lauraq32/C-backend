/*const { response, request } = require("express");
const { Types } = require('mongoose');
const Reservation = require("../models/reservation");
const Doctora = require("../models/doctoras");

const reservationPost = async (req, res) => {
  const doctora = await Doctora.findById(req.body.doctoraId);
  const reservations = new Reservation({
    paciente: req.body.paciente,
    tratamiento: req.body.tratamiento,
    numeromovil: req.body.numeromovil,
    montoapagar: req.body.montoapagar,
    tipodepago: req.body.tipodepago,
    doctora: doctora._id,
    porciento: req.body.porciento,
  });
  reservations
    .save()
    .then(async (result) => {
      const reservationObj = result.toObject();
      doctora.reservations.push(reservationObj._id)
      await doctora.save();
      res.status(201).json({
        ...reservationObj,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      res.status(404).json({
        error: err,
      });
    });
};
const reservationDelete = async (req, res = response) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id, { status: false });
  res.status(200).json({
    message: "reservation deleted",
  });
};

const reservationGet = async (req = request, res = response) => {
  const id = req.params.id;
  const reservation = await Reservation.findById(id).populate('doctora')
  
  res.status(200).json({
    reservation,
  });
  // falta hacer la parte de cuando no exite la reserva
};

const reservacionGet = async (req = request, res = response) => {
  const reservations = await Reservation.find();

  res.status(200).json({
    reservations,
  });
};

const reservationPut = async (req, res = response) => {
  const id = req.params.id;
  req.body.montoapagar * (req.body.porciento / 100);
  const doctora = await Doctora.findById(req.body.doctoraId);

  const updateOps = {
    paciente: req.body.paciente,
    tratamiento: req.body.tratamiento,
    numeromovil: req.body.numeromovil,
    montoapagar: req.body.montoapagar,
    tipodepago: req.body.tipodepago,
    doctora: req.body.doctora,
    porciento: req.body.porciento,
    doctora: doctora._id

  };

  Reservation.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      res.status(200).json({
        message: "reservation updated",
      });
    })

    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  reservationPost,
  reservationGet,
  reservationPut,
  reservationDelete,
  reservacionGet
};
*/

const { response, request } = require("express");
const Reservation = require("../models/reservation");
const Doctora = require("../models/doctoras");
const Clientes = require("../models/clientes");
const Tratamiento = require("../models/tratamiento");

//relacionar esas cuotas con la reserva
const reservationPost = async (req, res) => {
  const doctora = await Doctora.findById(req.body.doctoraId);
  const cliente = await Clientes.findById(req.body.clienteId);
  const tratamiento = await Tratamiento.findById(req.body.tratamientoId);
  const reservations = new Reservation({
    concepto: req.body.concepto,
    numeromovil: req.body.numeromovil,
    montoapagar: req.body.montoapagar,
    tipodepago: req.body.tipodepago,
    fecha: req.body.fecha,
    doctora: doctora._id,
    cliente: cliente._id,
    tratamiento: tratamiento._id,
    porciento: req.body.porciento,
  });
  reservations
    .save()
    .then(async (result) => {
      const reservationObj = result.toObject();
      cliente.reservations.push(reservationObj._id)
      doctora.reservations.push(reservationObj._id)
      tratamiento.reservations.push(reservationObj._id)
      await doctora.save();
      await cliente.save();
      await tratamiento.save();
      return res.status(201).json({
        ...reservationObj,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      return res.status(404).json({
        error: err,
      });
    });
};
const reservationDelete = async (req, res = response) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id);
  if (!Reservation) {
    return res.status(404).json({
      message: "reservation not found",
    });
  }
  return res.status(200).json({
    message: "reservation deleted",
  });
};

const tablaGet = async (req = request, res = response) => {
  const id = req.params.id;
  const reservation = await Reservation.findById(id).populate('doctora').populate('cliente')
  
  if (!reservation) {
    return res.status(404).json({
      message: "reservation not found",
    });
  }
  
  return res.status(200).json({
    reservation,
  });

};

const reservationGet = async (req = request, res = response) => {
  const reservations = await Reservation.find();

  //console.log("reservations id: ", reservations[2].doctora);

  //const doctorasName = await Doctora.findById(reservations.doctoras);
  //console.log("Here", doctoraName[2].doctora);


  if (!reservations) {
    return res.status(404).json({
      message: "reservations not found",
    });
  }

  return res.status(200).json({
    reservations,
    //doctorasName
  });
};

const reservationPut = async (req, res = response) => {
  const id = req.params.id;
  req.body.montoapagar * (req.body.porciento / 100);
  const doctora = await Doctora.findById(req.body.doctoraId);
  const cliente = await Clientes.findById(req.body.clienteId);

  const updateOps = {
    paciente: req.body.paciente,
    tratamiento: req.body.tratamiento,
    numeromovil: req.body.numeromovil,
    montoapagar: req.body.montoapagar,
    tipodepago: req.body.tipodepago,
    porciento: req.body.porciento,
    doctora: doctora._id,
    cliente: cliente._id
  };

  Reservation.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "reservation updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  reservationPost,
  reservationGet,
  reservationPut,
  reservationDelete,
  tablaGet
};