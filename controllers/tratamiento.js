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
  const tratamiento = await Tratamiento.findById(id).populate("reservations");

  if (!tratamiento) {
    return res.status(404).json({
      message: "tratamiento not found",
    });
  }

  return res.status(200).json({
    tratamiento,
  });
};

//TAREA
//hacer el get de tratamiento con populate.

module.exports = {
  tratamientoPost,
  tratamientoGet,
};
