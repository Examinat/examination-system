examApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/page404")

    $stateProvider
        .state("main", {
            url: "",
            abstract: true,
            templateUrl: "public/partials/main.html",
            resolve:{
                studentAfterLogin: studentAfterLogin
            }
        })
        .state("main.home", {
            url: "/",
            templateUrl: "public/partials/home.html"
        })
        .state("main.register", {
            url: "/register",
            templateUrl: "public/partials/registration.html",
            controller: 'registrationController'
        })
        .state("main.login", {
            url: "/login",
            templateUrl: "public/partials/login.html",
            controller: 'loginController',
            resolve:{
                studentBeforeLogin: studentBeforeLogin
            }
        })
        .state("main.forgotpass", {
            url: "/login",
            templateUrl: "public/partials/forgotpass.html"
        })

        .state("userDashboard", {
            url: "/studentDashboard",
            templateUrl: "public/partials/dashboard/userDashboard.html",
            controller: 'userDashboardController'
        })
        .state("adminDashboard", {
            url: "/adminDashboard",
            templateUrl: "public/partials/dashboard/adminDashboard.html",
            controller: 'adminDashboardController'
        })

        .state("page404", {
            url: "/page404",
            templateUrl: "public/partials/page404.html"
        })
    $locationProvider.html5Mode(true);
}]);

function studentBeforeLogin($q, userAuth, $state) {
    var deferred = $q.defer($q, userAuth, $state);
    var currentUser = userAuth.getCurrentUser();
    access_token = currentUser ? currentUser.access_token : null;
    console.log('debug:',access_token);
    if (access_token) {
        console.log('user present', access_token);
        $state.go('userDashboard');
        //deferred.reject({ session: true, role: 'student' });
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}
function studentAfterLogin($q, userAuth, $state, Service, store){
    var deferred = $q.defer($q, userAuth, $state, Service, store);
    var currentUser = userAuth.getCurrentUser();
    var access = 0;

    access_token = currentUser ? currentUser.access_token : null;
    console.log('debug:',access_token);
    
    if(currentUser)
    access = currentUser.admin;

    if (access_token) {
        console.log('already logged', access_token,access);

        Service.checkUserById({id:currentUser.access_token})
            .then(function(response) {
                console.log('log-response-from-server', response);
                if(response[0].access=="admin") {
                    userAuth.setCurrentUser(response[0]._id, "admin");
                    $state.go('adminDashboard');
                }
                if(response[0].access=="student") {
                    userAuth.setCurrentUser(response[0]._id, "student");
                    $state.go('userDashboard');
                }
            })
            .catch(function(error) {});
    } else {
        deferred.resolve();
    }
    return deferred.promise;
}