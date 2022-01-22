//We need to include this in the entry point after
//we do our app = express() call. 
//As we add api/routes we update this file.
//It will help kep main a little cleaner.
// const express = require('express');
// const auth = require('../middleware/auth')();
//  const accountApi = require('./accountTest');
// const authApi = require('./auth');
// const userApi = require('./user');
const containerTypeApi = require('./containerTypeTest');
// const itemCatalogApi = require("./itemCatalog");
// const testApi = require("./test");
// const messageApi = require("./message");

module.exports = function (app) {
    // app.use('/account', accountApi);
//     app.use('/auth', authApi);
//     app.use('/user', auth.authenticate(), userApi);
    app.use('/containertypes',  containerTypeApi);
//     app.use('/itemcatalog', auth.authenticate(), itemCatalogApi);
//     app.use('/test', auth.authenticate(), testApi);
//     app.use('/message', auth.authenticate(), messageApi);


 }
