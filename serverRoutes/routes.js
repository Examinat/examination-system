module.exports = function(app, adminRouter) {
	var mainController = require('../serverController/mainController');
	
	app.post('/login', mainController.saveRegistration);
};