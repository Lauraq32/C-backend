const { response, request } = require("express");
const Doctoras = require("../models/doctoras");

const doctorasPost = async (req, res) => {
  const doctoras = new Doctoras({
    doctora: req.body.doctora,
    numeromovil: req.body.numeromovil,
    totaldeganancias: 0,
  });

  doctoras
    .save()
    .then(async (result) => {
      const doctorasObj = result.toObject();
      return res.status(201).json({
        ...doctorasObj,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      return res.status(404).json({
        error: err,
      });
    });
};

const doctorasDelete = async (req, res = response) => {
  const { id } = req.params;
  const doctoras = await Doctoras.findByIdAndDelete(id);
  if (!doctoras) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }
  return res.status(200).json({
    message: "file deleted",
  });
};

const doctorasGet = async (req = request, res = response) => {
  let doctoras = await Doctoras.find().populate("reservations");
  if (!doctoras) {
    return res.status(404).json({
      message: "doctora not found",
    });
}

  doctoras = doctoras.map((doctora) => {
    let totaldeganancias = 0;

    doctora.reservations.forEach((reservation) => {
      const ganancia = reservation.montoapagar * (reservation.porciento / 100);
      totaldeganancias += ganancia;
    });

    const result = doctora.toObject();
    result.totaldeganancias = totaldeganancias;

    return result
  });

  return res.status(200).json({
    doctoras,
  });
};

const doctoraGet = async (req = request, res = response) => {
  const id = req.params.id;

  const doctora = await Doctoras.findById(id).populate("reservations");
  if (!doctora) {
    return res.status(404).json({
      message: "doctora not found",
    });
  }
  let totaldeganancias = 0;
  doctora.reservations.forEach((reservation) => {
    const ganancia = reservation.montoapagar * (reservation.porciento / 100);
    totaldeganancias += ganancia;
  });

  doctora.totaldeganancias = totaldeganancias;

  const result = doctora.toObject();
  result.totaldeganancias = totaldeganancias;

  return res.status(200).json({
    doctora: result,
  });
};

const doctorasPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    doctora: req.body.doctora,
    numeromovil: req.body.numeromovil,
  };

  Doctoras.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(async () => {
      return res.status(200).json({
        message: "account updated",
      });
    })

    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  doctorasPost,
  doctorasGet,
  doctorasPut,
  doctorasDelete,
  doctoraGet,
};