const { response, request } = require("express");
const Payment = require("../models/payment");
const Doctor = require("../models/doctor");

class PagoController {
  static async post(req, res) {
    const doctor = await Doctor.findById(req.body.doctorId);
    const payment = new Payment({
      status: req.body.status,
      date: req.body.date,
      doctor: doctor._id,
      amount: req.body.amount,
    });

    try {
      payment.save().then(async (result) => {
        const paymentObj = result.toObject();
        doctor.payments.push(paymentObj._id);

        await doctor.save();
        return res.status(201).json({
            ...paymentObj,
        });
      })
    } catch (err) {
        console.log(err);
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let payments = await Payment.find().populate("doctor");

      return res.status(200).json({
        payments,
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

      await Payment.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "Exito",
      });
    } catch (error) {
      return res.status(500).end();
    }
  }
}

module.exports = PagoController;
