const { response } = require('express')


const AdminRole = ( req, res = response, next ) => {

    const { role, name } = req.user;
    
    if ( role !== 'ADMIN' ) {
        return res.status(401).json({
            msg: `${ name } no tienes los permisos necesarios`
        });
    }

    next();
}

module.exports = {
    AdminRole
}