const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const response = require('../auth/response');
const saltRounds = 10
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/basicAuth');
const { NOW, DATE } = require("sequelize/lib/data-types");

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, account_created, account_updated } = req.body;

        if (account_created) {
            return response.failureResponse(res, 400, "Bad Request");
        }

        if (account_updated) {
            return response.failureResponse(res, 400, "Bad Request");
        }

        const duplicateEmail = await User.findOne({
            where: { email: email }
        });

        console.log("email" + duplicateEmail)

        if (duplicateEmail) {
            return response.failureResponse(res, 401, "Duplicate Email");
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userCreate = await User.create({
            first_name: first_name,
            last_name: last_name,
            account_created: User.sequelize.fn('NOW'), // Use sequelize.fn to set the current timestamp
            email: email,
            password: hashedPassword
        });

        const userCreate1 = ({
            first_name: userCreate.first_name,
            last_name: userCreate.last_name,
            account_created: userCreate.account_created,
            email: userCreate.email
        });

        res.json(userCreate1);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
});

exports.getUser = asyncHandler(async (req, res, next) => {
    const userData = await basicAuth(req, res, next);

    if (!userData) {
        return response.failureResponse(res, 401, "Unauthorised");
    }

    try {
        const getUser = ({
            first_name: userData.first_name,
            last_name: userData.last_name,
            account_created: userData.account_created,
            account_updated: userData.account_updated,
            email: userData.email
        });

        return response.successResponse(res, 200, getUser);

    } catch (error) {
        return response.failureResponse(res, 500, "Internal Server Error",);
    }
});

exports.userUpdate = asyncHandler(async (req, res, next) => {

    const userData = await basicAuth(req, res, next);

    if (!userData) {
        return response.failureResponse(res, 401, "Unauthorised");
    }

    try {

        const { first_name, last_name, email, password, account_created, account_updated } = req.body;

        if (account_created) {
            return response.failureResponse(res, 400, 'Bad Request');
        }

        if (account_updated) {
            return response.failureResponse(res, 400, 'Bad Request');
        }

        if (email) {
            return response.failureResponse(res, 400, 'Bad Request');
        }

        if (first_name) userData.first_name = first_name;

        if (last_name) userData.last_name = last_name;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            userData.password = hashedPassword;
        }

        userData.account_updated = new Date();

        const userCreate1 = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            password: userData.password,
            account_updated: userData.account_updated
        };

        await User.update(userCreate1 , {
            where: { id: userData.id },
        });

        const updatedUser = await User.findOne({ id: userData.id });

        if (updatedUser) {
            // Access the updated data
            console.log('User updated successfully:', updatedUser);
        } else {
            console.log('No user found with the specified email.');
        }

        const newUser = ({
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email
        });

        return response.successResponse(res, 200, newUser);

    } catch (error) {
        return res.status(500).send('Server Error');
    }
});
