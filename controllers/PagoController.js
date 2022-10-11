const { response, request } = require("express");
const Pago = require("../models/pago");
const Doctor = require("../models/doctor");

class PagoController {
  static async post(req, res) {
    const doctor = await Doctor.findById(req.body.doctorId);
    const pagos = new Pago({
      status: req.body.status,
      date: req.body.date,
      doctor: doctor._id,
      amount: req.body.amount,
    });

    try {
      pagos.save().then(async (result) => {
        const pagoObj = result.toObject();
        // doctor.pagos.push(pagoObj._id);

        await doctor.save();
        return res.status(201).json({
            ...pagoObj,
        });
      })
    } catch (err) {
        console.log(err);
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let pagos = await Pago.find();

      return res.status(200).json({
        pagos,
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const doctor = await Doctor.findById(req.body.doctorId);

      const fields = {
        status: req.body.status,
        date: req.body.date,
        doctor: doctor._id,
        amount: req.body.amount,
      };

      await Pago.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "Exito",
      });
    } catch (error) {
      return res.status(500).end();
    }
  }
}

module.exports = PagoController;
