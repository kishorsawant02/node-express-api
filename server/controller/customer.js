var express = require('express'),
    router = express.Router(),
    dbConnector = require('../utils/dbConnector'),
    errorHandler = require('../utils/Error'),
    helper = require('../utils/helper');


// Save customer order details 
router.post('/order', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
        	var data = helper.getKeyValueArray(req.body);
            var query = 'INSERT INTO customer (`' + data.keys.join('`, `') + '`) VALUES (\'' + data.values.join('\', \'') + '\');';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                	res.status(200);
                    res.send({
                    	Customer_Order: {
                    		status:'OK',
                    		orderId:result && result.insertId
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
  "mobile": 1234567890,
  "product_id": 10,
  "paymentstatus": 'POSTED',
  "paymentnumber": "12357890",
  "name":"Kishor",
  "address":"Aurangabad",
  "pan":"CQHJBF324G",
  "user_id":1234567890,
  "adhar":"12343563456"
}*/