(function() {
    'use strict';
    
    var module = angular.module('dashboard.dashboardAPICallFactory',[])
    
    module.factory('dashboardAPICallFactory', function($q, $http) {
        return {
            requestURLWithData:function(url,data) {     
                var deferred = $q.defer();
                $http({
                  method: 'GET',
                  url: "http://dev.pinbox24.com:3000/api/offices/list",
                  headers : {'Content-Type':'application/json',
                            'authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3RAdGVzdC5jb20iLCJfaWQiOiI1NzY3ZDQ2MjU5YTUwMWNlNWQ1ZmJhNTYiLCJhdmF0YXIiOnsiaWQiOiJETTEzNzc0NzRGQUoiLCJiYWNrZ3JvdW5kIjp7ImNvbG9yIjoiQzVEMEU2In19LCJpYXQiOjE0NzAyMTU1OTR9.3ZEY0PuR8YXnjFBgJ84BCsXmyTzQtiIvYxSiafa4G0Y"},
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