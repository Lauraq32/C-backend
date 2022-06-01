const Client = require("../models/client");
const Treatment = require("../models/treatment");
const patientTreatment = require("../models/patientTreatment");

const cuotaPost = async (req, res) => {
  const client = await Client.findById(req.body.clientId);
  const treatment = await Treatment.findById(req.body.treatmentId);
  const patientTreatments = new patientTreatment({
    treatment: treatment._id,
    client: client._id,
  });

  try {
    const result = await patientTreatments.save();
    const patientTreatmentObj = result.toObject();

    return res.status(201).json({
      ...patientTreatmentObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const cuotaGetById = async (req, res) => {
  try {
    let tratamientoDelPaciente = await patientTreatment.findById(req.params.id).populate("reservations").populate("treatment");

    let pagado = 0;

    for (let reservation of tratamientoDelPaciente.reservations) {
      pagado += reservation.amountpayable;
    }
    
    const deuda = tratamientoDelPaciente.treatment.total - pagado;
    
    const result = {
      ...tratamientoDelPaciente.toObject(),
      deuda
    }

    return res.status(200).json(result)

  }
  catch(error) {
    return res.status(404).end()
  }
}

const cuotaGet = async (req, res) => {
  try {
    const tratamientoDelPaciente = await patientTreatment.find().populate("reservations").populate("treatment");

    let pagado = 0;

    for (let reservation of tratamientoDelPaciente.reservations) {
      pagado += reservation.amountpayable;
    }
    
    const deuda = tratamientoDelPaciente.treatment.total - pagado;
    
    const result = {
      ...tratamientoDelPaciente.toObject(),
      deuda
    }

    return res.status(200).json(result)
  } catch (err) {
    return res.status(500);
  }
};

module.exports = {
  cuotaPost,
  cuotaGet,
  cuotaGetById
};
