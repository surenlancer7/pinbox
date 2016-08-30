(function() {
    'use strict';
    
    var module = angular.module('common.apiCallFactory',[])
    
    module.factory('apiCallFactory', function($q, $http) {
        return {
            requestURLWithData:function(url,data) {
                var deferred = $q.defer();
                $http({
                  method: 'POST',
                  url: url,
                  headers : {'Content-Type':'application/json'},
                  data : data,
                  timeout: 30000
                 })

                 .success(function (data, status, headers, config) {
                    console.log("Success",data);
                    deferred.resolve(data);
                 })

                 .error(function (data, status, headers, config) {
                    deferred.reject(data);
            });
                return deferred.promise;
            }
        }
    });
})();