angular.module('reg')
  .controller('DashboardCtrl', [
    '$rootScope',
    '$scope',
    '$sce',
    'currentUser',
    'Utils',
    'AuthService',
    'UserService',
    'EVENT_INFO',
    function($rootScope, $scope, $sce, currentUser, Utils, AuthService, UserService){
      var user = currentUser.data;

      $scope.users = [];
      $scope.user = user;

      $scope.resendEmail = function(){
        AuthService
          .resendVerificationEmail()
          .then(function(){
            sweetAlert('Your email has been sent.');
          });
      };

      $scope.grabSubmissions = function() {
        $scope.users = UserService.getAll();
        setTimeout(function(){
            $scope.users = $scope.users.$$state.value.data;
            console.log($scope.users);
        }, 100);
      }

    }]);
