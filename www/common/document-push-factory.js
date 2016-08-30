(function() {
    'use strict';
    
    var module = angular.module('common.documentPushFactory',[])
    
    module.factory('documentPushFactory', function($q, $http, CONSTANTS) {
        return {
            pushDocument:function(images) {     
                var deferred = $q.defer();
                $http({
                  method: 'POST',
                  url: "http://dev.pinbox24.com:3000/api/offices/"+CONSTANTS.OFFICEID+"/items/new",
                  headers : {'Content-Type':'application/json',
                            'authorization': "" +CONSTANTS.TOKEN},
                  data : {"name":"Test Surendher 2","type":"Scanner","files":images,"creatorId":CONSTANTS.PROFILEID},
                  timeout: 30000
                 })

                 .success(function (data, status, headers, config) {
                    console.log(data);
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