const { response, request } = require("express");
const Reservation = require("../models/reservation");
const Doctor = require("../models/doctor");
const Client = require("../models/client");
const patientTreatment = require("../models/patientTreatment");
const Product = require("../models/product");

const reservationPost = async (req, res) => {
  const doctor = await Doctor.findById(req.body.doctorId);
  const client = await Client.findById(req.body.clientId);
  const treatment = await patientTreatment.findById(req.body.patientTreatmentId);
  const productIds = req.body.productIds

  const reservations = new Reservation({
    concept: req.body.concept,
    phone: req.body.phone,
    amountpayable: req.body.amountpayable,
    paymenttype: req.body.paymenttype,
    date: req.body.date,
    doctor: doctor._id,
    client: client._id,
    patientTreatment: treatment._id,
    products: productIds,
    percent: req.body. percent,
  });
  reservations
    .save()
    .then(async (result) => {
      const reservationObj = result.toObject();
      client.reservations.push(reservationObj._id)
      doctor.reservations.push(reservationObj._id)
      treatment.reservations.push(reservationObj._id)

      //descontar productos del inventario
      for (let i = 0; i < productIds.length; i++) {
        const query = { $inc: { "amount": -1 }}
        await Product.findByIdAndUpdate(productIds[i], query);
      }

      await doctor.save();
      await client.save();
      await treatment.save();
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

const GetEarningsByDate = async (req = request, res = response) => {
  const firstDate = new Date(req.query.firstDate) 
  let lastDate = new Date(req.query.lastDate).getTime() + 86400000
  lastDate = new Date(lastDate)

  const match = {
    date: {$gte:firstDate, $lt:lastDate}
  }
  const group = {
    _id: '$doctor',
    payments: {$push: {'amount': '$amountpayable', 'percent': '$percent', 'date': '$date'}},
    "total": {   "$sum": { $multiply: [ "$amountpayable", "$percent", 0.01 ]} },
  }
  const project = {
    doctorId: '$_id',
    payments: '$payments',
    "_id": false,
    "total": '$total',
  }
  const pipeline = [{$match: match}, {$group: group}, {$project: project}]


  const earnings = await Reservation.aggregate(pipeline);
  if (!Reservation) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }

  return res.status(200).json({
    earnings,
  });
};

const tablaGet = async (req = request, res = response) => {
  const id = req.params.id;
  const reservation = await Reservation.findById(id).populate('doctor').populate('client').populate('patientTreatment').populate('patientTreatment.treatment')
  
  if (!reservation) {
    return res.status(404).json({
      message: "reservation not found",
    });
  }
  
  return res.status(200).json({
    reservation,
  });

};

const getReservationByDate = async (req = request, res = response) => {
  const firstDate = new Date(req.query.firstDate) 
  let lastDate = new Date(req.query.lastDate).getTime() + 86400000
  lastDate = new Date(lastDate)

  const match = {
    date: {$gte:firstDate, $lt:lastDate}
  }

  const pipeline = [{$match: match}]

  const reservation = await Reservation.aggregate(pipeline);
  if (!Reservation) {
    return res.status(404).json({
      message: "Reservation not found",
    });
  }

  return res.status(200).json({
    reservation
  })
}

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
  const doctor = await Doctor.findById(req.body.doctorId);
  const client = await Client.findById(req.body.clientId);
  const treatment = await patientTreatment.findById(req.body.patientTreatmentId);
  const productIds = req.body.productIds

  const updateOps = {
    concept: req.body.concept,
    phone: req.body.phone,
    amountpayable: req.body.amountpayable,
    paymenttype: req.body.paymenttype,
    date: req.body.date,
    doctor: doctor._id,
    client: client._id,
    patientTreatment: treatment._id,
    products: productIds,
    percent: req.body. percent,
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
  tablaGet,
  GetEarningsByDate,
  getReservationByDate
};