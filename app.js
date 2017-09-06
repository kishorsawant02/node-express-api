var express = require('express'),
    _ = require('lodash');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express(),
    envConfig = require('./server/config/envConfig');

module.exports = function() {

    /**
     * set client landing folder
     */
    //app.use(express.static(path.join(__dirname, '../client')));

    var logger = require('./server/utils/logger');
    app.use(logger);

    /**
     *use body parser
     */
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    /**
     *Define dynamic routes
     */
    var routes = require('./server/config/routes');
    _.each(routes, function(controller, route) {
        app.use(route, controller);
    });
    
    app.use(express.static(path.join(__dirname, 'rathi')));

    //Request for static pages
    app.get('/rathi/:pageName?', function(req, res, next) {
        if (!req.params.pageName) {
            req.params.pageName = 'dashboard.html';
            res.redirect(req.params.pageName);
        } else {
            res.sendFile(path.join(__dirname+'/rathi/' + req.params.pageName));
        }
    });


    /**
     *catch 404 and forward to error handler
     */
    app.use(function(err, req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        res.status(500).send({ url: 'BAD_REQUEST' });
    });
    
    /**
     *development error handler
     *will print stacktrace
     */
    if (envConfig.env === 'dev') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    /*
     *production error handler
     *no stacktraces leaked to user
     */
    else if (envConfig.env === 'production') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    return app;
};