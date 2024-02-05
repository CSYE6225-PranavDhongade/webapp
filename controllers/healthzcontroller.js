const asyncHandler = require("express-async-handler");

const response = require('../auth/response');

//I need to handle for other endpoints
exports.healthz_get = asyncHandler(async (req, res, next) => {

    //We need to handle the req.body length
    if (Object.keys(req.body).length > 0)
        res.status(400).header('Cache-Control', 'no-cache').send('Bad Request');

    try {
        const isDatabaseConnected = await checkDatabaseConnection(req);

        if (isDatabaseConnected) {
            res.status(200).header('Cache-Control', 'no-cache').send('OK');
        } else {
            res.status(503).header('Cache-Control', 'no-cache').send('Service Unavailable');
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).header('Cache-Control', 'no-cache').send('Internal Server Error');
    }
});

exports.healthz_put = asyncHandler(async (req, res, next) => {
    res.status(405).header('Cache-Control', 'no-cache').send('Method Not Allowed');
});

exports.healthz_delete = asyncHandler(async (req, res, next) => {
    res.status(405).header('Cache-Control', 'no-cache').send('Method Not Allowed');
});

exports.healthz_post = asyncHandler(async (req, res, next) => {
    res.status(405).header('Cache-Control', 'no-cache').send('Method Not Allowed');
});

exports.healthz_patch = asyncHandler(async (req, res, next) => {
    res.status(405).header('Cache-Control', 'no-cache').send('Method Not Allowed');
});

async function checkDatabaseConnection(req) {
    try {
        await req.sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return true;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};