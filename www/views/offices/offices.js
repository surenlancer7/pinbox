(function() {
    'use strict';
    
    var module = angular.module('views.offices',['offices.officesAPICallFactory','dashboard']);
    
    module.config(function($stateProvider) {
        $stateProvider.state('offices', {
            url: '/offices',
            templateUrl: 'views/offices/offices.html',
            controller: 'officesCtrl',
            controllerAs: 'vm'
        })
    });
    
    module.controller('officesCtrl', officesCtrl)
    
    function officesCtrl(dbHandler, $state, officesAPICallFactory,$scope, CONSTANTS, loadingService, $ionicPopup) {
        var vm = this;
        
        
        vm.logout = function() {
            dbHandler.deleteLoginData().then(function() {
                $state.go('login');
            });
        };
        vm.openOffice = function(office) {
            CONSTANTS.OFFICEID = office._id
            CONSTANTS.OFFICENAME = office.name;
            //console.log(CONSTANTS.OFFICEID)
            $state.go('dashboard');
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
        initialize();
        function initialize() {
          loadingService.showLoadWithBackDrop();
          officesAPICallFactory.requestURLWithData("","").then(function(data) {
              console.log(data);
              $scope.offices = data.result;
              loadingService.hideLoadWithBackDrop();
          }, function() {
              showAlertWithTitleAndMessage("Loading Failed", "Server is busy, please try again after sometime");
              loadingService.hideLoadWithBackDrop();
          });  
        };
        
        /*vm.showCamera = function() {
            var options = {
               quality : 75,
               destinationType : Camera.DestinationType.DATA_URL,
               sourceType : Camera.PictureSourceType.CAMERA,
               allowEdit : true,
               encodingType: Camera.EncodingType.JPEG,
               //targetWidth: 640,
               //targetHeight: 400,
               popoverOptions: CameraPopoverOptions,
               saveToPhotoAlbum: false,
               cameraDirection: Camera.Direction.FRONT
           };
           $cordovaCamera.getPicture(options).then(function(imageData) {
              //Update Image logic 
           }, function(err) {
              console.log(err);
               // An error occured. Show a message to the user
           });
        };*/
    }
})();