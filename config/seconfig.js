const conf = {
    development: {
        username: 'pranavdhongade',
        password: 'root',
        database: 'cloudAssignmentDatabase',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        define: {
            timestamps: false,
        },
    }
}

module.exports = conf;