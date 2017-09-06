var express = require('express'),
    router = express.Router(),
    dbConnector = require('../utils/dbConnector'),
    errorHandler = require('../utils/Error'),
    helper = require('../utils/helper');


// save user's feedback
router.post('/insert', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
        	var data = helper.getKeyValueArray(req.body);
            var query = 'INSERT INTO feedback (`' + data.keys.join('`, `') + '`) VALUES (\'' + data.values.join('\', \'') + '\');';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                	res.status(200);
                    res.send({
                    	feedback: {
                    		status:'OK',
                            acknowledgeMentNumber:result && result.insertId
                    	}
                    });
                }
            });
        }
    });
});

module.exports = router;


//sample payload
/*{
  "name": "gold_ring",
  "msg": 10,
  "mobile": 1234567890,
  "address": "Aurangabad"
}*/