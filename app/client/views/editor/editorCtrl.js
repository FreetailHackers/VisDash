angular.module('reg')
  .controller('EditorCtrl', [
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

    }]);
