myApp.factory('loginInterceptor',['$q','$location',function($q, $location){
 return{
  'responseError': function(rejection){
   if (rejection.status == 401){
         $location.url('/login');
   }
   return $q.reject(rejection);
  }
 }
}])
myApp.config(function($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('loginInterceptor');
  $routeProvider
    .when('/login',{
      templateUrl: 'partials/loginreg.html',
      controller:'LoginController'
    })
    .when('/', {
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardController'
    })
    .when('/user/:id', {
     templateUrl: 'partials/user.html',
     controller: 'showController'
   })
    .otherwise({
      redirectTo: '/login'
    })
});
