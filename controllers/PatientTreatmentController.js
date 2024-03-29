const Patient = require("../models/patient");
const Treatment = require("../models/treatment");
const patientTreatment = require("../models/patientTreatment");
const total = require("../models/treatment");
const treatment = require("../models/treatment");

class PatientTreatmentController {
  static async post(req, res) {
    const patient = await Patient.findById(req.body.patientId);
    const treatmentIds = req.body.treatmentIds;
    const newPatientTreatment = new patientTreatment({
      treatment: treatmentIds,
      patient: patient._id,
    });

    try {
      const result = await newPatientTreatment.save();
      const newPatientTreatmentObj = result.toObject();
      patient.patientTreatments.push(newPatientTreatmentObj._id);
      await patient.save();

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
        .populate("patient");

      let pagado = 0;

      for (let reservation of TreatmentOfPatient.reservations) {
        pagado += reservation.amountPayable;
      }

      const deudaTotal = TreatmentOfPatient.treatment
        .map((x) => x.total)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const deuda = deudaTotal - pagado;

      const patientTreatments = {
        ...TreatmentOfPatient.toObject(),
        deuda,
      };

      return res.status(200).json({
        patientTreatments,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }

  static async getAll(req, res) {
    try {
      let TreatmentOfPatients = await patientTreatment
        .find()
        .populate("reservations")
        .populate("treatment")
        .populate("patient");

      const data = [];

      TreatmentOfPatients.forEach((TreatmentOfPatient) => {
        let pagado = 0;
        TreatmentOfPatient.reservations.forEach((reservation) => {
          pagado += reservation.amountPayable;
        });

        // const deuda = TreatmentOfPatient.treatment.forEach((treatment) => {
        //   treatment.total += total - pagado;
        // });
        const deudaTotal = TreatmentOfPatient.treatment
          .map((x) => x.total)
          .reduce((accumulator, currentValue) => accumulator + currentValue);
        const deuda = deudaTotal - pagado;
        const result = TreatmentOfPatient.toObject();
        result.deuda = deuda;

        result.totalAmountPaid = pagado;
        data.push(result);
      });

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }

  static async put(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findById(req.body.patientId);
      const treatmentIds = req.body.treatmentIds;

      const fields = {
        treatment: treatmentIds,
        patient: patient._id,
        status: req.body.status,
      };

      await patientTreatment.updateOne({ _id: id }, { $set: fields });

      return res.status(200).json({
        message: "actualizado exitosamente",
      });
    } catch (error) {
      return res.status(500).end();
    }
  }

  // static async delete(req, res) {
  //   const { id } = req.params;

  //   try {
  //     await patientTreatment.findByIdAndDelete(id);

  //     return res.status(200).json({
  //       message: "borrado exitosamente",
  //     });
  //   } catch (error) {
  //     return res.status(404).end();
  //   }
  // }
}

module.exports = PatientTreatmentController;
