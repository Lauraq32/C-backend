const { response, request } = require('express');
const User = require('../models/user');
const crypto = require("crypto");
const {SECRETORPRIVATEKEY} = require('../config');
const {getJWT} = require("../helpers/generate-jwt");

const usersGet = async(req, res) => {
    const id = req.params.id;

    User.findById(id)
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                return res.status(200).json({
                    account: doc,
                });
            } else {
                return res.status(404).json({message: "account not found"});
            }
        });
};

const usersPost =  async (req, res ) => {
    const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
    const hash = sha256Hasher.update(req.body.password).digest("hex");

    const users = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        rol: req.body.rol,
        email: req.body.email,
        password: hash,
    });

    users
    .save()
    .then(async (result) => {
        const userObj = result.toObject();
        const token = await getJWT( User.id );
        delete userObj.password;
        return res.status(201).json({
         ...userObj,
         token
      });
    })
    .catch(err => {
        return res.status(500).json({
            error: err
        });
    });
};

const Login = async(req, res = response) => {
    const { email, password }  = req.body;
  
    try {
        const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
        const hash = sha256Hasher.update(password).digest("hex");
  
        const user = await User.findOne({ email, password: hash });
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid credentials'
            });
        }
        const token = await getJWT( user.id );
        //guardar el token en una cookie y extraer de la cookie
  
        return res.json({
            user,
            token
        })
  
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'talk to admin'
        });
    }
}

const usersPut = async (req, res = response ) => {
    const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
    const hash = sha256Hasher.update(req.body.password).digest("hex");
  
    try {
      const user = await User.findById(req.params.id);
      if (user.userId === req.body.userId) {
        await user.updateOne({ $set: req.body, password: hash });
        return res.status(200).json({
          message: "this account has been updated",
        });
      } 
    } catch (err) {
      return res.status(500).json(err);
    }
};

const usersDelete = async(req, res = response) => {
    const { id } = req.params;
    await User.findByIdAndDelete( id, { status: false } );
    return res.status(200).json({
        message: 'account deleted',
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    Login
}