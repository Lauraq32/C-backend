const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const { SECRETORPRIVATEKEY } = require("../config");
const User = require("../models/user");

const jwtValidations = async (req = request, res = response, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      msg: "Need a valid token to proceed",
    });
  }
  try {
    const decoded = jwt.verify(token, SECRETORPRIVATEKEY);
    req.userId = decoded.uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Insert valid token to proceed",
    });
  }
};

module.exports = {
  jwtValidations,
};
