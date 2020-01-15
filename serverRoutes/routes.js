module.exports = function(app, adminRouter) {
    var mainController = require('../serverController/mainController');
    app.post('/saveRegistration', mainController.saveRegistration);
    app.post('/checkUser', mainController.checkUser);
    app.post('/checkUserById', mainController.checkUserById);
};