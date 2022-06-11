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

const treatmentPut = async (req, res = response) => {
  const id = req.params.id;
  const client = await Client.findById(req.body.clientId);
  const treatment = await Treatment.findById(req.body.treatmentId);

  const updateOps = {
    treatment: treatment._id,
    client: client._id,
  };

  patientTreatment.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "treatment updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

const treatmentDelete = async (req, res = response) => {
  const { id } = req.params;
  await patientTreatment.findByIdAndDelete(id);
  if (!patientTreatment) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }
  return res.status(200).json({
    message: "tratamiento deleted",
  });
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

module.exports = {
  cuotaPost,
  cuotaGetById,
  treatmentPut,
  treatmentDelete
};
