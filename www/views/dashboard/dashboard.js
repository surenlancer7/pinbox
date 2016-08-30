(function() {
    'use strict';
    
    var module = angular.module('dashboard',['dashboard.dashboardAPICallFactory','common.documentPushFactory']);
    
    module.config(function($stateProvider) {
        $stateProvider.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'dashboardCtrl',
            controllerAs: 'vm'
        })
    });
    
    module.controller('dashboardCtrl', dashboardCtrl)
    
    function dashboardCtrl($cordovaCamera, dbHandler, $state, dashboardAPICallFactory, documentPushFactory, loadingService, $ionicPopup, $scope, CONSTANTS) {
        var vm = this;
        vm.logout = function() {
            dbHandler.deleteLoginData().then(function() {
                $state.go('login');
            });
        };
        vm.name = CONSTANTS.OFFICENAME;
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
        var images = [];
        vm.pushDocument = function() {
            console.log("pushDocument");
            loadingService.showLoadWithBackDrop();
            documentPushFactory.pushDocument(images).then(function(data) {
                console.log(data);
                vm.picture = null;
                images = [];
                loadingService.hideLoadWithBackDrop();
                showAlertWithTitleAndMessage('Success', 'Document Pushed Successfully');

            }, function() {
                loadingService.hideLoadWithBackDrop();
                showAlertWithTitleAndMessage('Failed', 'Please check your internet then try again');
            });
            
        };

        vm.showCamera = function() {
            var options = {
               quality : 75,
               destinationType : Camera.DestinationType.DATA_URL,
               sourceType : Camera.PictureSourceType.CAMERA,
               allowEdit : true, //To enable/disable the user editing in camera
               encodingType: Camera.EncodingType.JPEG,
               targetWidth: 595,
               targetHeight: 842,
               popoverOptions: CameraPopoverOptions,
               saveToPhotoAlbum: false,
               cameraDirection: Camera.Direction.FRONT
           };
           $cordovaCamera.getPicture(options).then(function(imageData) {
              //Update Image logic 
               var image = String(imageData);
               images.push(image);
               vm.picture = image;
           }, function(err) {
              console.log(err);
               // An error occured. Show a message to the user
           });
        };
    }
})();