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
      var users = [];

      $scope.submissions = [];
      $scope.user = user;

      $scope.resendEmail = function(){
        AuthService
          .resendVerificationEmail()
          .then(function(){
            sweetAlert('Your email has been sent.');
          });
      };

      $scope.grabSubmissions = function() {
        user = UserService.getAll();
        users = UserService.getAll();
        setTimeout(function(){
            users = users.$$state.value.data;
            users.forEach(user => {
              user.submissions.forEach(submission => {
                $scope.submissions.push(submission);
              })
            });
        }, 100);
      }

    }]);
