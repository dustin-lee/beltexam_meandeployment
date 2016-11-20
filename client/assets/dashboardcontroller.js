console.log('we hit the DashboardController')

//DashboardController
myApp.controller('DashboardController', function($scope, LoginFactory, $location){
  LoginFactory.getCurrentUser(function(user){
    $scope.currentUser = user
  })
  $scope.logout = function(){
  }
  function getBuckets(){
    LoginFactory.getBuckets(function(data){
      $scope.buckets = data;
      console.log('data from getBucket function', $scope.buckets);
    })
  }
  getBuckets()


  $scope.createbucket = function(){
    console.log('hit the dashboardcontroller', $scope.newBucket);
    LoginFactory.addbucket($scope.newBucket, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.custErrors = data.errors;
        console.log(data.errors);
      } else{
        getBuckets()
      }
    })
  }

  function getUsers(){
    LoginFactory.getUsers(function(data){
      $scope.Users = data;
      console.log('data from getusers function', $scope.Users);
    })
  }
  getUsers()


  // $scope.updatestatus = function(){
  //   LoginFactory.newStatus($scope.status, function(data){
  //     if(data.data.errors){
  //       $scope.errors = data.data.errors;
  //     }else {
  //
  //     }
  //   })
  // }



})
