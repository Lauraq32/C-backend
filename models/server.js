const express = require('express');
const cors = require('cors');
const {DataBase} = require("../database/db");

class Server {

    constructor() {
        this.app  = express();
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.reservationPath = '/api/reservation';
        this.clientPath = '/api/clientes';
        this.productPath = '/api/productos';
        this.doctorPath = '/api/doctoras';
        this.treatmentPath = '/api/tratamiento';
        this.patientTreatmentPath = '/api/paciente/tratamiento';
        this.healthCheckerPath = '/api/healthcheck';
    
        this.DataBase();
        this.middlewares();
        this.routes();
    }

    async DataBase() {
        await DataBase();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users'));
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.reservationPath, require('../routes/reservation'));
        this.app.use( this.clientPath, require('../routes/client'));
        this.app.use( this.productPath, require('../routes/product'));
        this.app.use( this.doctorPath, require('../routes/doctor'));
        this.app.use( this.treatmentPath, require('../routes/treatment'));
        this.app.use( this.patientTreatmentPath, require('../routes/patientTreatment'));
        this.app.use( this.healthCheckerPath, require('../routes/healthChecker'));
    }

    listen() {
        const port = process.env.PORT || 8080
        this.app.listen(port, console.log("server running on port 8080"));
    }
}

module.exports = Server;