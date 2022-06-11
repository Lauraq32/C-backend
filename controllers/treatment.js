const Treatment = require("../models/treatment");

const tratamientoPost = async (req, res) => {
  const treatment = new Treatment({
    treatment: req.body.treatment,
    total: req.body.total,
  });

  try {
    const result = await treatment.save();
    const treatmentObj = result.toObject();

    return res.status(201).json({
      ...treatmentObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const tratamientoGet = async (req = request, res = response) => {
  const id = req.params.id;
  const treatment = await Treatment.findById(id);

  if (!treatment) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }

  return res.status(200).json({
    treatment,
  });
};

const tratamientosGet = async (req = request, res = response) => {
  const treatment = await Treatment.find();

  if (!treatment) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }

  return res.status(200).json({
    treatment,
  });
};

const tratamientoPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    treatment: req.body.treatment,
    total: req.body.total,
  };

  Treatment.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "tratamiento updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

const tratamientoDelete = async (req, res = response) => {
  const { id } = req.params;
  await Treatment.findByIdAndDelete(id);
  if (!Treatment) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }
  return res.status(200).json({
    message: "tratamiento deleted",
  });
};

module.exports = {
  tratamientoPost,
  tratamientoGet,
  tratamientoDelete,
  tratamientoPut,
  tratamientosGet
};
