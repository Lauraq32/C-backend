const { response, request } = require("express");
const Doctor = require("../models/doctor");

const doctorasPost = async (req, res) => {
  const doctor = new Doctor({
    doctor: req.body.doctor,
    phone: req.body.phone,
    totaldeganancias: 0,
  });

  doctor
    .save()
    .then(async (result) => {
      const doctorObj = result.toObject();
      return res.status(201).json({
        ...doctorObj,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      return res.status(404).json({
        error: err,
      });
    });
};

const doctorasDelete = async (req, res = response) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  if (!doctor) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }
  return res.status(200).json({
    message: "file deleted",
  });
};

const doctorasGet = async (req = request, res = response) => {
  let doctor = await Doctor.find().populate("reservations");
  if (!doctor) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }

  doctor = doctor.map((doctora) => {
    let totaldeganancias = 0;

    doctora.reservations.forEach((reservation) => {
      const ganancia = reservation.amountpayable * (reservation.percent / 100);
      totaldeganancias += ganancia;
    });

    const result = doctora.toObject();
    result.totaldeganancias = totaldeganancias;

    return result
  });

  return res.status(200).json({
    doctor,
  });
};

const doctoraGet = async (req = request, res = response) => {
  const id = req.params.id;

  const doctor = await Doctor.findById(id).populate("reservations");
  if (!doctor) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }
  let totaldeganancias = 0;
  doctor.reservations.forEach((reservation) => {
    const ganancia = reservation.amountpayable * (reservation.percent / 100);
    totaldeganancias += ganancia;
  });

  doctor.totaldeganancias = totaldeganancias;

  const result = doctor.toObject();
  result.totaldeganancias = totaldeganancias;

  return res.status(200).json({
    doctor: result,
  });
};

const doctorasPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    doctor: req.body.doctor,
    phone: req.body.phone,
  };

  Doctor.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "account updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  doctorasPost,
  doctorasGet,
  doctorasPut,
  doctorasDelete,
  doctoraGet,
};