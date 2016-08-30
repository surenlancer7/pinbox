(function(){
	'use strict';

  angular.module('common.dbHandler', [])

  .factory("dbHandler", dbHandler);

  function dbHandler($q){
    var dbHandler;

        /*function prepareDoc(key,data){
            var doc = {};
            doc['_id'] = key;
            doc['data'] = EncryptionService.encrypt(key,angular.toJson(data));
            return doc;
        }*/
      function prepareDoc(key,data){
			var doc = {};
			doc['_id'] = key;
			doc['data'] = data;
			return doc;
		}

    dbHandler = {
        setLoginData: function(loginData){
				var deferred = $q.defer();
				//var db = new PouchDB('login');
            var db = new PouchDB('login', {adapter: 'websql'});
if (!db.adapter) { // websql not supported by this browser
  db = new PouchDB('login');
}
                console.log(db);
				var prepDoc = prepareDoc('login', loginData);
				/*db.destroy('login').then(function (destroyError, destroyResponse) {
                    alert(1);
					if(destroyError!=null){
						var db = new PouchDB('login');
						db.put(prepDoc).then(function (response) {
						  // handle response
							deferred.resolve(response);
						}).catch(function (err) {
						  console.log(err);
							deferred.reject(err);
						});
					}
					else{
                        console.log(destroyError);
						deferred.reject(destroyError);
					}
				},function() {
                    alert(2);
                    db.put(prepDoc).then(function (response) {
						  // handle response
							deferred.resolve(response);
						}).catch(function (err) {
						  console.log(err);
							deferred.reject(err);
						});
                });*/
                db.put(prepDoc).then(function(response) {
                    console.log(response);
                    deferred.resolve(response);
                })
				return deferred.promise;
      },
        getLoginData: function(){
            console.log("Get");
            var deferred = $q.defer();
            var db = new PouchDB('login');
            db.get('login').then(function (response) {
              // handle response
                console.log("Get1");
                //var responseData = angular.fromJson(EncryptionService.decrypt('consentForm',response.data));
                console.log(response);
                deferred.resolve(response);
            }).catch(function (err) {
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
      },
        deleteLoginData: function(){
            var db = new PouchDB('login');
            var deferred = $q.defer();

            db.destroy('login').then(function (destroyError, destroyResponse) {
                console.log(destroyError);
                if(destroyError!=null){
                    deferred.resolve(destroyResponse);
                }
                else{
                    deferred.reject(destroyError);
                }
            });
            return deferred.promise;
        }
//      setConsentForm: function(consentFormData){
//				var deferred = $q.defer();
//				var db = new PouchDB('consentForm');
//				var prepDoc = prepareDoc('consentForm', consentFormData);
//				db.destroy('consentForm').then(function (destroyError, destroyResponse) {
//					if(destroyError!=null){
//						var db = new PouchDB('consentForm');
//						db.put(prepDoc).then(function (response) {
//						  // handle response
//							deferred.resolve(response);
//						}).catch(function (err) {
//						  console.log(err);
//							deferred.reject(err);
//						});
//					}
//					else{
//						deferred.reject(destroyError);
//					}
//				});
//				return deferred.promise;
//      },
//			getConsentForm: function(){
//                console.log("Get");
//				var deferred = $q.defer();
//				var db = new PouchDB('consentForm');
//				db.get('consentForm').then(function (response) {
//				  // handle response
//                    console.log("Get1");
//                    var responseData = angular.fromJson(EncryptionService.decrypt('consentForm',response.data));
//                    console.log(responseData);
//					deferred.resolve(responseData);
//				}).catch(function (err) {
//				  console.log(err);
//					deferred.reject(err);
//				});
//				return deferred.promise;
//      },
//			deleteConsentForm: function(){
//				var db = new PouchDB('consentForm');
//				var deferred = $q.defer();
//
//				db.destroy('consentForm').then(function (destroyError, destroyResponse) {
//					console.log(destroyError);
//					if(destroyError!=null){
//						deferred.resolve(destroyResponse);
//					}
//					else{
//						deferred.reject(destroyError);
//					}
//				});
//				return deferred.promise;
//			}
    };

    return dbHandler;
  }

})();
