function _getKeyValueArray(object) {
    var keys = [],
        values = [];
    for (var i in object) {
        keys.push(i);
        values.push(object[i]);
    }
    return { keys: keys, values: values };
}

function _getUpdateQueryObject(object) {
    var query = [];
    for (var i in object.keys) {
        var value = (typeof object.values[i] == 'string') ?("'"+object.values[i]+"'"):object.values[i];
        query.push(object.keys[i]+'='+value);
    }
    return query.join(',');
}

function _ensureAuthenticated(req, res, next) {
    console.log('req.user', req.user);
    if (req.isAuthenticated()) {
        return next();
    } else {
        console.log('req.user', req.user);
        res.redirect('/user/login');
        console.log('req.user', req.user);
    }
}

module.exports = {
    'getKeyValueArray': _getKeyValueArray,
    'ensureAuthenticated': _ensureAuthenticated,
    'getUpdateQueryObject': _getUpdateQueryObject
}