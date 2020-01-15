(function() {
    'use strict';

    examApp.factory('Service', Service)

    function Service($http, $q) {
        var service = {};
        service.saveRegistration = saveRegistration;
        service.checkUser = checkUser;
        service.checkUserById = checkUserById;

        return service;

        function saveRegistration(data) {
            console.log('from service', data);
            return $http.post('/saveRegistration', data).then(handleSuccess, handleError);
        }

        function checkUser(data) {
            console.log('from service', data);
            return $http.post('/checkUser', data).then(handleSuccess, handleError);
        }

        function checkUserById(data) {
            console.log('from service', data);
            return $http.post('/checkUserById', data).then(handleSuccess, handleError);
        }

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }
})();