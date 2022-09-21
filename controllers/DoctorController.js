const { response, request } = require("express");
const Doctor = require("../models/doctor");
const Reservation = require("../models/reservation");

class DoctorController {
  static async post(req, res) {
    const doctor = new Doctor({
      name: req.body.name,
      phone: req.body.phone,
      totaldeganancias: 0,
    });

    try {
      const result = await doctor.save();
      const data = result.toObject();

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).end();
    }
  }

  static async get(req, res) {
    const { id } = req.params;

    try {
      const doctor = await Doctor.findById(id).populate("reservations");

      if (!doctor) {
        return res.status(404).end();
      }

      let totaldeganancias = 0;
      doctor.reservations.forEach((reservation) => {
        const ganancia =
          reservation.amountPayable * (reservation.percent / 100);
        totaldeganancias += ganancia;
      });

      doctor.totaldeganancias = totaldeganancias;

      const result = doctor.toObject();
      result.totaldeganancias = totaldeganancias;

      return res.status(200).json({
        doctor: result,
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async getEarningsByDate(req, res) {
    const { id } = req.params;
    const firstDate = new Date(req.query.firstDate);
    let lastDate = new Date(req.query.lastDate).getTime() + 86400000;
    lastDate = new Date(lastDate);

    try {
      const doctor = await Doctor.findById(id);
      const match = {
        _id: `${req.params.id}`,
        date: { $gte: firstDate, $lt: lastDate },
      };
      const group = {
        _id: "$doctor",
        payments: {
          $push: {
            amount: "$amountPayable",
            percent: "$percent",
            date: "$date",
          },
        },
        total: { $sum: { $multiply: ["$amountPayable", "$percent", 0.01] } },
      };
      const project = {
        doctorId: "$_id",
        payments: "$payments",
        _id: false,
        total: "$total",
      };

      const pipeline = [
        { $match: match },
        { $group: group },
        { $project: project },
      ];
      const earnings = await Reservation.aggregate(pipeline);
      return res.status(200).json({
        doctor,
        earnings
      });
    } catch (error) {
        console.log(error);
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let doctors = await Doctor.find().populate("reservations");

      if (!doctors) {
        return res.status(404).end();
      }

      doctors = doctors.map((doctora) => {
        let totaldeganancias = 0;

        doctora.reservations.forEach((reservation) => {
          const ganancia =
            reservation.amountPayable * (reservation.percent / 100);
          totaldeganancias += ganancia;
        });

        const result = doctora.toObject();
        result.totaldeganancias = totaldeganancias;

        return result;
      });

      return res.status(200).json({
        doctors,
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;

      const fields = {
        name: req.body.name,
        phone: req.body.phone,
      };

      await Doctor.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "doctora actualizada",
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      await Doctor.findByIdAndDelete(id);

      return res.status(200).json({
        message: "doctora borrada",
      });
    } catch (error) {
      return res.status(404).end();
    }
  }
}

module.exports = DoctorController;
