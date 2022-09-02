const { response } = require('express')


const AdminRole = ( req, res = response, next ) => {

    const { rol, name } = decoded.uid;
    
    if ( rol !== 'ADMIN' ) {
        return res.status(401).json({
            msg: `${ name } no tienes los permisos necesarios`
        });
    }

    next();
}

module.exports = {
    AdminRole
}