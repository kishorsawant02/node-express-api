var envConfig = require('./EnvConfig').envConfig;
var credential = require('./credential');
var dbConfig = {
    'EC2PoolConnection': {
        'multipleStatements': true,
        'aquireTimeout': 10000,
        'timeout': 10000,
        'connectionLimit': 50,
        'queueLimit': 30,
        'host': credential.prod.host,
        'port': credential.prod.port,
        'user': credential.prod.user,
        'password': credential.prod.password,
        'database': credential.prod.database
    },
    'LocalPoolConnection': {
        'multipleStatements': true,
        'connectionLimit': 50,
        'queueLimit': 30,
        'aquireTimeout': 10000,
        'timeout': 10000,
        'host': credential.dev.host,
        'port': credential.dev.port,
        'user': credential.dev.user,
        'password': credential.dev.password,
        'database': credential.dev.database
    }
};

module.exports = {
    'dbConnection': dbConfig[envConfig.db]
};