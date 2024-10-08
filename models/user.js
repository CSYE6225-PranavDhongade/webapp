const {Sequelize} = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

const sequelizeConfig = require('../config/sequelizeconfig');

const User = sequelizeConfig.define('User', {
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    account_created: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    account_updated: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true
    },
    verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    token_create_time: {
        type: Sequelize.DATE,
        allowNull: true
    }
  });

module.exports = User;