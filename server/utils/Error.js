/**
 * handle error while connection fails
 */
var _connectionError = function(err, connection, resp) {
    console.log(':::::::::Error in mysql pool connection:::::::::::');
    if (connection) {
        connection.release();
    }
    resp.status(400)
    resp.send({
        error: {
            url: resp.req && resp.req.originalUrl,
            status: "400",
            message: "Cannot connect to DB",
            description: "Something went wrong to connect DB"
        }
    });
}

/**
 * handle query failing error
 */
var _queryError = function(err, resp) {
    console.log('::::::::::::::::::Error in query::::::::::::::::::');
    resp.status(400)
    resp.send({
        error: {
            url: resp.req && resp.req.originalUrl,
            status: "400",
            message: err.sqlMessage,
            description: "Something went wrong to with query to retrive or save data"
        }
    });
}
/**
 * handle error when model of request mismatches with recived request
 */
var _authenticationError = function(error, resp) {
    console.log(':::::::::::: Authentication Data Error ::::::::::::');
    resp.status(400);
    resp.send(error);
}


module.exports = {
    'connectionError': _connectionError,
    'queryError': _queryError,
    'authenticationError': _authenticationError
}