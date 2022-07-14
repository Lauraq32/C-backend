const { response, request } = require("express");
const Client = require("../models/client");

class PatientController {
  static async post(req, res) {
    const patient = new Client({
      patient: req.body.patient,
      phone: req.body.phone,
      email: req.body.email,
      status: req.body.status,
    });

    try {
      const result = await patient.save();
      const data = result.toObject();

      return res.status(201).json(data);
    } catch (err) {
      return res.status(500).end();
    }
  }

  static async get(req, res) {
    const { id } = req.params;

    try {
      const patient = await Client.findById(id).populate("reservations");

      if (!patient) {
        return res.status(404).end();
      }

      const data = patient.toObject();

      return res.status(200).json({
        ...data,
        visitas: data.reservations.length,
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let fields = ["patient", "phone", "email", "status"];

      fields = fields.reduce((result, field) => {
        result[field] = true;
        return result;
      }, {});

      const pipeline = [{
        $project: {
          ...fields,
          visitas: { $size: "$reservations" },
        },
      }];
      const patients = await Client.aggregate(pipeline);
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;

      const fields = {
        patient: req.body.patient,
        phone: req.body.phone,
        email: req.body.email,
        status: req.body.status,
      };

      await Client.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "paciente actualizado",
      });

    } catch (error) {
      return res.status(500).end();
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      await Client.findByIdAndDelete(id);

      return res.status(200).json({
        message: "paciente borrado",
      });
    } catch (error) {
      return res.status(404).end();
    }
  }
}

module.exports = PatientController;