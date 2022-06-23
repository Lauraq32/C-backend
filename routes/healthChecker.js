const { Router } = require('express');

const router = Router();

router.get('/', async (_req, res, _next) => {

    const healthcheck = {
        uptime: process.uptime(),
        Responsetime: process.hrtime(),
        message: 'ok',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).send();
    }
});

module.exports = router;