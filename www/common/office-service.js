(function() {
    'use strict';
    
    var module = angular.module('common.officeService', []);
    
    module.service('officeService', function() {
        var currentOffice = {};
        this.setCurrentOffice = function(office) {
            currentOffice = office
        };
        this.getCurrentOffice = function() {
            return currentOffice;
        };
    
    });
    
})()