examApp.controller('registrationController', ['$scope', '$state', 'Service', function($scope, $state, Service) {
    $scope.saveRegistration = function(registrationData) {
        Service.saveRegistration(registrationData)
            .then(function(response) {
                console.log('reg-response-from-serverRG', response);
                $state.go('main.login');
            })
        .catch(function(error) {})
    }
}])
examApp.controller('loginController', ['$scope', '$state', 'Service', 'userAuth', function($scope, $state, Service, userAuth) {
    $scope.checkUser = function(loginData) {
        Service.checkUser(loginData)
            .then(function(response) {
                console.log('log-response-from-serverLG', response);
                if(response[0].access=="admin") {
                    userAuth.setCurrentUser(response[0]._id, "admin");
                    $state.go('adminDashboard');
                }
                else {
                    userAuth.setCurrentUser(response[0]._id, "student");
                    $state.go('userDashboard');
                }
            })
        .catch(function(error) {})
    }
}])
examApp.controller('adminDashboardController', ['$scope', 'store', '$state', 'Service', 'userAuth', function($scope, store, $state, Service, userAuth) {
    var currentUser = userAuth.getCurrentUser()
    var userId = null;
    $scope.logout = function(){
        store.remove('admin');
        $state.go('main.login');
    }
    if(currentUser) userId = currentUser.access_token;
    else{
        $state.go('main.login');
    }
    Service.checkUserById({id:userId})
    .then(function(response) {
            console.log('log-response-from-serverCU', response);
            $scope.name = response[0].fullname;
        })
    .catch(function(error) {})
}])
examApp.controller('userDashboardController', ['$scope', 'store', '$state', 'Service', 'userAuth', function($scope, store, $state, Service, userAuth) {
    var currentUser = userAuth.getCurrentUser()
    var userId = null;
    $scope.logout = function(){
        //store.remove('student');
        $state.go('main.login');
    }
    if(currentUser) userId = currentUser.access_token;
    else{
        $state.go('main.login');
    }
    Service.checkUserById({id:userId})
    .then(function(response) {
            console.log('log-response-from-serverCU', response);
            $scope.name = response[0].fullname;
        })
    .catch(function(error) {})
}])