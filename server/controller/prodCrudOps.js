var express = require('express'),
    router = express.Router(),
    dbConnector = require('../utils/dbConnector'),
    errorHandler = require('../utils/Error'),
    helper = require('../utils/helper');


// Save product
router.post('/add', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
            var data = helper.getKeyValueArray(req.body);
            var query = 'INSERT INTO product (`' + data.keys.join('`, `') + '`) VALUES (\'' + data.values.join('\', \'') + '\');';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                    res.status(200);
                    res.send({
                        Customer_Order: {
                            status: 'OK',
                            productId: result && result.insertId
                        }
                    });
                }
            });
        }
    });
});

//update product
router.post('/update/:id', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
            var id = req.params.id;
            var data = helper.getUpdateQueryObject(helper.getKeyValueArray(req.body));
            var query = 'update product set ' + data + ' where id = ' + id + ';';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                    res.status(200);
                    res.send({
                        Customer_Order: {
                            status: 'OK',
                            updatedProductId: req.params.id
                        }
                    });
                }
            });
        }
    });
});

//delete product
router.delete('/delete/:id', function(req, res) {
    dbConnector.getConnection(function(error, connection) {
        if (error) {
            errorHandler.connectionError(error, connection, res);
        } else {
            var id = req.params.id;
            var query = 'delete from product where id=' + id + ';';
            dbConnector.operation(query, connection, function(error, result, field) {
                if (error) {
                    errorHandler.queryError(error, res);
                } else {
                    res.status(200);
                    res.send({
                        Customer_Order: {
                            status: 'DELETED_SUCCESS',
                            productId: req.params.id
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;


//add product json
/*
http://localhost:18080/product/add
{
    "name":"Kishotr",
    "price":12,
    "category":"RING",
    "material":"GOLD",
    "discount":23,
    "specification":"{a:a,b:B}",
    "icon_img":"google.com",
    "images":"[gogggle,yahoo,dsfafdsaf]",
    "description":"wertuio wertyuio ertyui ertyu ertyu "
}

http://localhost:18080/product/delete/75

http://localhost:18080/product/update/1
{
    "name":"fasfdasdfasdf",
    "price":122334.3232,
    "category":"fdsaf",
    "material":"GOfdsaLD",
    "discount":1123,
    "specification":"{a:a,b:B}",
    "icon_img":"google.com",
    "images":"[gogggle,yahoo,dsfafdsaf]",
    "description":"wertuio wertyuio ertyui ertyu ertyu "
}
*/