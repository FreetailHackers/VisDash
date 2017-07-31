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
      $scope.user = user;

      $scope.resendEmail = function(){
        AuthService
          .resendVerificationEmail()
          .then(function(){
            sweetAlert('Your email has been sent.');
          });
      };

    }]);
