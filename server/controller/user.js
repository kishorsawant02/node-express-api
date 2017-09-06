var express = require('express'),
    router = express.Router(),
    dbConnector = require('../utils/dbConnector'),
    errorHandler = require('../utils/Error'),
    helper = require('../utils/helper');


// Save user 
router.post('/register', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
            var data = helper.getKeyValueArray(req.body);
            var query = 'INSERT INTO user (`' + data.keys.join('`, `') + '`) VALUES (\'' + data.values.join('\', \'') + '\');';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                    res.status(200);
                    res.send({
                        User: {
                            status: 'OK'
                        }
                    });
                }
            });
        }
    });
});

//check user login credentials
router.post('/login', function(req, res) {
    var data = req.body;
    getUserDetails(req, res, data, function(result) {
        var result = result[0];
        if (result.password == data.password) {
            if (result.location == data.location) {
                res.status(200);
                res.send({
                    User: {
                        status: 'OK'
                    }
                });
            } else {
                var error = {
                    username: true,
                    password: true,
                    location: false,
                    status: "400",
                    message: "location not match.",
                    description: "Please enter correct location."
                };
                errorHandler.authenticationError(error, res);
            }
        } else {
            var error = {
                username: true,
                password: false,
                location: false,
                status: "400",
                message: "password does not Match.",
                description: "Please enter correct password."
            };
            errorHandler.authenticationError(error, res);
        }

    });
});

//forgot password
router.post('/password/forgot', function(req, res) {
    var data = req.body;
    getUserDetails(req, res, data, function(result) {

    });
});

//chnage password
router.post('/password/change', function(req, res) {
    var data = req.body;
    getUserDetails(req, res, data, function(result) {
        var result = result[0];
        if (result.password == data.password) {
            dbConnector.getConnection(function(error, connection) {
                if (error) {
                    errorHandler.connectionError(error, connection, res);
                } else {
                    var query = 'update user set password =\'' + data.newPassword + '\'  where username = \'' + result.username + '\';';
                    dbConnector.operation(query, connection, function(error, result, field) {
                        if (error) {
                            errorHandler.queryError(error, res);
                        } else {
                            res.status(200);
                            res.send({
                                User: {
                                    status: 'PASSWORD_UPDATED',
                                    username: true,
                                    password: true
                                }
                            });
                        }
                    });
                }
            });
        } else {
            var error = {
                username: true,
                password: false,
                status: "400",
                message: "old password does not Match.",
                description: "Please enter correct old password."
            };
            errorHandler.authenticationError(error, res);
        }
    });
});

function getUserDetails(req, res, data, callback) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
            var query = 'select * from user where username = \'' + data.username + '\';';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else if (result.length == 0) {
                    //result length 0 :  no username 
                    var error = {
                        username: false,
                        password: false,
                        location: false,
                        status: "400",
                        message: "UserName not found.",
                        description: "Please enter correct username."
                    };
                    errorHandler.authenticationError(error, res);
                } else {
                    return callback(result);
                }
            });
        }
    });
}

module.exports = router;

//sample payload for register user

/*
/register
{
  "username": "gold_ring",
  "password": "1234567890",
  "mobile": 1234567890,
  "location": "Aurangabad"
}
/login
{
  "username": "gold_ring",
    "password":"1234567890",
    "location":"Aurangabad"
}
*/