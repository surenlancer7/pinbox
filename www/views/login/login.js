(function() {
    'use strict';
    
    var module = angular.module('login',['views.offices']);
    
    module.config(function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
    });
    
    module.controller('loginCtrl',loginCtrl)
    
    function loginCtrl($state, apiCallFactory, loadingService, dbHandler,URL,$scope, CONSTANTS, $ionicPopup, documentService) {
        var vm = this;
        vm.login = {};
        initialize();
        function initialize() {
            dbHandler.getLoginData().then(function(data) {
            console.log(data);
            if(angular.isDefined(data)) {
                console.log(data);
                CONSTANTS.TOKEN = data.data.result.token;
                CONSTANTS.PROFILEID = data.data.result.profile._id;
                $state.go('offices');
            }
            else {
                console.log("new user");
            }
            }, function() {
                console.log("new user, no db created");
        });
        };
        function isValidLogin() {
            console.log(vm.login);
            console.log(vm.login.username);
            console.log(vm.login.password);
            if(!vm.login.username || !vm.login.password ) {
                return false;    
            }
            return true;
            
        };
        var showAlertWithTitleAndMessage = function(title,message) {
            $ionicPopup.show({
              title: '<h3>'+title+'</h3>',
              template: '<h4 class="text-center">'+message+'</h4>',
              scope: $scope,
              buttons: [
                {
                  text: '<b>Ok</b>',
                  type: 'button button-primary-alert',
                  onTap: function(e) {
                    return;
                  }
                }
              ]
            });
        };
        $scope.login = function() {
            dbHandler.deleteLoginData().then(function() {
            },function() {
            });
            if(isValidLogin()) {
                loadingService.showLoadWithBackDrop();
                var data = {"login": vm.login.username,"password":vm.login.password};
                apiCallFactory.requestURLWithData(URL.LOGIN,data).then(function(data) {
                    console.log(data);
                    
                    if(data.success) {
                        CONSTANTS.TOKEN = data.result.token;
                        CONSTANTS.PROFILEID = data.result.profile._id;
                        dbHandler.setLoginData(data).then(function() {
                            $state.go('offices');
                            vm.login = {};
                        });    
                    }
                    else {
                        showAlertWithTitleAndMessage('Login Failed', 'Please log in with your valid credentials');
                        console.log("Incorrect login");
                    }
                    loadingService.hideLoadWithBackDrop();
                },function(error) {
                    console.log(error);
                    showAlertWithTitleAndMessage('Login Failed', 'Server is busy, please try again after sometime');
                    loadingService.hideLoadWithBackDrop();
                });        
            }
            else {
                console.log("ding");
                showAlertWithTitleAndMessage('Login Failed','Please input your username and password');
            }
            
        }
    }
})();