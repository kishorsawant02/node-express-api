var mysql = require('mysql');
var dbConfig = require('../config/dbConfig');

var pool = mysql.createPool(dbConfig.dbConnection);

function _getConnection(callback) {
    pool.getConnection(function(err, connection) {
        callback(err, connection);
    });
}

function _operation(q, connection, callback) {
    connection.query(q, function(error, results, fields) {
        connection.release();
        callback(error, results, fields)
    });
}


module.exports = {
    'getConnection': _getConnection,
    'operation': _operation
}