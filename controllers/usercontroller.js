const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const response = require('../auth/response');
const saltRounds = 10
const bcrypt = require('bcrypt');
const basicAuth = require('../auth/basicAuth');
const { NOW, DATE } = require("sequelize/lib/data-types");
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const topicName = 'verify_email'; // replace with your Pub/Sub topic name
const { publishMessage, listenForPullMessages } = require("../pubsub");
const { v4: uuidv4 } = require('uuid');

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const { first_name, last_name, email, password, account_created, account_updated } = req.body;

        console.log("body" + first_name);

        if (account_created) {
            return response.failureResponse(res, 400, "Bad Request");
        }

        if (account_updated) {
            return response.failureResponse(res, 400, "Bad Request");
        }

        const duplicateEmail = await User.findOne({
            where: { email: email }
        });

        console.log("email" + duplicateEmail);

        if (duplicateEmail) {
            return response.failureResponse(res, 401, "Duplicate Email");
        }

        console.log(password);

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userCreate = await User.create({
            first_name: first_name,
            last_name: last_name,
            account_created: User.sequelize.fn('NOW'),
            email: email,
            password: hashedPassword,
            verify: false,
            token_create_time: User.sequelize.fn('NOW'),
            token: uuidv4()
        });

        console.log(userCreate);

        let messageId = await publishMessage(topicName, userCreate);

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

    //cloud function should be called

    // const messageBuffer = Buffer.from(JSON.stringify(userCreate1));

    // await pubsub.topic(topicName).publish(messageBuffer);

    // res.json(userCreate1);
});

exports.getUser = asyncHandler(async (req, res, next) => {

    const userData = await basicAuth(req, res, next);

    if (!userData) {
        return response.failureResponse(res, 401, "Unauthorised");
    }

    if (!userData.verify)
        return response.failureResponse(res, 403, "UnVerified User");

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
        return response.failureResponse(res, 500, "Internal Server Error");
    }
});

exports.userUpdate = asyncHandler(async (req, res, next) => {

    const userData = await basicAuth(req, res, next);

    if (!userData) {
        return response.failureResponse(res, 401, "Unauthorised");
    }

    if (!userData.verify) {
        return response.failureResponse(res, 403, "Unverified");
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

        await User.update(userCreate1, {
            where: { id: userData.id },
        });

        const updatedUser = await User.findOne({ id: userData.id });

        if (updatedUser) {
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

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        const [userToken, userEmail] = token.split('_');

        const user = await User.findOne({ where: { email: userEmail } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the token matches
        if (user.token !== userToken) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const currentTime = new Date();

        const tokenCreationTime = user.token_create_time;

        // Check if the current time is within 2 minutes of the token creation time
        const tokenValidDuration = 2 * 60 * 1000; // 2 minutes in milliseconds

        if (currentTime - tokenCreationTime <= tokenValidDuration) {
            // Update the verify column
            user.verify = true;

            await user.save();

            return res.status(200).json({ message: 'Email verified successfully' });

        } else {
            return res.status(400).json({ message: 'Token expired' });
        }
        // const token = req.query.token;
        // const tokenData = tokenStore[token];

        // if (!tokenData || tokenData.expiresAt < Date.now()) {
        //   return res.status(400).send('Invalid or expired token');
        // }

        // const userEmail = tokenData.email;

        // Mark the user's email as verified in your database
        // Example: updateUserEmailVerificationStatus(userEmail, true);

        // Remove the token from the store after verification
        // delete tokenStore[token];

        //1. We need to check if the user email exists in the db
        //2. We need to check if the current time is less or equal to 2 minutes + token creation time.
        //if both is yes then user is valid
        //else
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};