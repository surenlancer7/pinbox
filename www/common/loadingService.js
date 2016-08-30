(function () {

    'use strict';

    var loadingService = angular.module('common.loadingService', []);

    loadingService.factory("loadingService", function ($ionicLoading, $timeout, $ionicBackdrop) {

        return {

            loading: null,

            showBackdropLoading: function(){
                this.loading = $ionicLoading.show({
                    template: '<p><ion-spinner icon="ios"></ion-spinner></p>Loading...',
                    animation: 'fade-in',
                    showBackdrop: true,
                    noBackdrop: false,
                    maxWidth: 200
                });

                /*var loading = this.loading;
                $timeout(function () {
                    loading.hide();
                }, 40000);*/
            },

            showBackdrop: function(){
                $ionicBackdrop.retain();
            },
            showLoadWithBackDrop:function() {
                this.showBackdrop();
                this.showLoading();
            },
            hideLoadWithBackDrop:function() {
                this.hideLoading();
                this.hideBackDrop();
            },

            showLoading: function(){
                this.loading = $ionicLoading.show({
                    template: '<p><ion-spinner icon="ios"></ion-spinner></p>Loading...',
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200
                });

                /*var loading = this.loading;
                $timeout(function () {
                    loading.hide();
                }, 40000);*/
            },

            showCustomLoading: function(data, additionalFunc){
                this.loading = $ionicLoading.show({
                    template: ''+data,
                    animation: 'fade-in',
                    showBackdrop: false,
                    maxWidth: 200
                });

                /*var loading = this.loading;
                $timeout(function () {
                    loading.hide();
                }, 40000);*/

                additionalFunc();
            },

            hideLoading: function(){
                //this.loading.hide();
                $ionicLoading.hide();
            },

            hideBackDrop: function(){
                $ionicBackdrop.release();
            }

        };
    });
})();