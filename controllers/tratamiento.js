const Tratamiento = require("../models/tratamiento");

const tratamientoPost = async (req, res) => {
  const tratamiento = new Tratamiento({
    tratamiento: req.body.tratamiento,
    total: req.body.total,
  });

  try {
    const result = await tratamiento.save();
    const tratamientoObj = result.toObject();

    return res.status(201).json({
      ...tratamientoObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const tratamientoGet = async (req = request, res = response) => {
  const id = req.params.id;
  const tratamiento = await Tratamiento.findById(id);

  if (!tratamiento) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }

  return res.status(200).json({
    tratamiento,
  });
};

const tratamientoPut = async (req, res = response) => {
  const id = req.params.id;
  req.body.total - req.body.montoapagar;

  const updateOps = {
    tratamiento: req.body.tratamiento,
    total: req.body.total
  };

  Tratamiento.updateOne({ _id: id }, { $set: updateOps })
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
  await Tratamiento.findByIdAndDelete(id);
  if (!Tratamiento) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }
  return res.status(200).json({
    message: "tratamiento deleted",
  });
};

//TAREA
//hacer el get de tratamiento con populate.

module.exports = {
  tratamientoPost,
  tratamientoGet,
  tratamientoDelete,
  tratamientoPut
};
