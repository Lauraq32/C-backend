const express = require('express');
const cors = require('cors');
const {DataBase} = require("../database/db");

class Server {

    constructor() {
        this.app  = express();
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.reservationPath = '/api/reservation';
        this.clientesPath = '/api/clientes';
        this.productosPath = '/api/productos';
        this.doctorasPath = '/api/doctoras';
        this.tratamientoPath = '/api/tratamiento';
        this.tratamientoPacientePath = '/api/paciente/tratamiento';
    
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
        this.app.use( this.clientesPath, require('../routes/clientes'));
        this.app.use( this.productosPath, require('../routes/productos'));
        this.app.use( this.doctorasPath, require('../routes/doctoras'));
        this.app.use( this.tratamientoPath, require('../routes/tratamiento'));
        this.app.use( this.tratamientoPacientePath, require('../routes/tratamientoPaciente'));
    }

    listen() {
        this.app.listen(8080, console.log("server running on port 8080"));
    }
}

module.exports = Server;