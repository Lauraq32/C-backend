const Client = require("../models/client");
const Treatment = require("../models/treatment");
const patientTreatment = require("../models/patientTreatment");

class PatientTreatmentController {
  static async post(req, res) {
    const client = await Client.findById(req.body.clientId);
    const treatment = await Treatment.findById(req.body.treatmentId);
    const newPatientTreatment = new patientTreatment({
      treatment: treatment._id,
      client: client._id,
    });

    try {
      const result = await newPatientTreatment.save();
      const newPatientTreatmentObj = result.toObject();
      client.patientTreatments.push(newPatientTreatmentObj._id);
      await client.save();

      return res.status(201).json({
        ...newPatientTreatmentObj,
      });
    } catch (err) {
      return res.status(500).end();
    }
  }

  static async get(req, res) {
    const { id } = req.params;

    try {
      const TreatmentOfPatient = await patientTreatment
        .findById(id)
        .populate("reservations")
        .populate("treatment")
        .populate("client");

      let pagado = 0;

      for (let reservation of TreatmentOfPatient.reservations) {
        pagado += reservation.amountpayable;
      }

      const deuda = TreatmentOfPatient.treatment.total - pagado;

      const result = {
        ...TreatmentOfPatient.toObject(),
        deuda,
      };

      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let TreatmentOfPatients = await patientTreatment
        .find()
        .populate("reservations")
        .populate("treatment")
        .populate("client");

      const data = [];

      TreatmentOfPatients.forEach((TreatmentOfPatient) => {
        let pagado = 0;
        TreatmentOfPatient.reservations.forEach((reservation) => {
          pagado += reservation.amountpayable;
        });

        const deuda = TreatmentOfPatient.treatment.total - pagado;
        const result = TreatmentOfPatient.toObject();
        result.deuda = deuda;

        data.push(result);
      });
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const client = await Client.findById(req.body.clientId);
      const treatment = await Treatment.findById(req.body.treatmentId);

      const fields = {
        treatment: treatment._id,
        client: client._id,
      };

      await patientTreatment.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "actualizado exitosamente",
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  static async delete(req, res) {
    const { id } = req.params;

    try {
      await patientTreatment.findByIdAndDelete(id);

      return res.status(200).json({
        message: "borrado exitosamente",
      });
    } catch (error) {
      return res.status(404).end();
    }
  }
}

module.exports = PatientTreatmentController;
