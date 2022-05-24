const Clientes = require("../models/clientes");
const Tratamiento = require("../models/tratamiento");
const TratamientoPaciente = require("../models/tratamientoPaciente");

const cuotaPost = async (req, res) => {
  const cliente = await Clientes.findById(req.body.clienteId);
  const tratamiento = await Tratamiento.findById(req.body.tratamientoId);
  const tratamientoPaciente = new TratamientoPaciente({
    tratamiento: tratamiento._id,
    cliente: cliente._id,
    montoapagar: 0
  });

  try {
    const result = await tratamientoPaciente.save();
    const tratamientoPacienteObj = result.toObject();

    return res.status(201).json({
      ...tratamientoPacienteObj,
    });
  } catch (err) {
    console.log(`an error occurred ${err}`);

    return res.status(500);
  }
};

const cuotaGetById = async (req, res) => {
  try {
    let tratamientoDelPaciente = await TratamientoPaciente.findById(req.params.id).populate("reservations").populate("tratamiento");

    // iterate reservations
    let pagado = 0;

    for (let reservation of tratamientoDelPaciente.reservations) {
      pagado += reservation.montoapagar;
    }
    
    const deuda = tratamientoDelPaciente.tratamiento.total - pagado;
    
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
    const tratamientoDelPaciente = await TratamientoPaciente.find().populate("reservations").populate("tratamiento");

    // iterate reservations
    let pagado = 0;

    for (let reservation of tratamientoDelPaciente.reservations) {
      pagado += reservation.montoapagar;
    }
    
    const deuda = tratamientoDelPaciente.tratamiento.total - pagado;
    
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
