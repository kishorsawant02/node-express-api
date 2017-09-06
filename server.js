/**
 * @envConfig - projects base configuration
 * @app - projects all api routing and base code setup
 */
var app = require('./app')();
/**
 * Setting port
 */
app.set('port', process.env.PORT || 18080);

/**
 * Opening port lo listion to url API's
 */
app.listen(app.get('port'), function () {
    console.log('::Listining localhost ::', +app.get('port'));
});



