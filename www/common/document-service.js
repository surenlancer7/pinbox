(function() {
    'use strict';
    
    var module = angular.module('common.documentService',[])
    
    module.factory('documentService', function($q, $http) {
        var documentService = {};
        return documentService;
    });
})();