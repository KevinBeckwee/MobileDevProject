angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('LoginService', function($q, $http) {
  return {
    loginUser: function(name, pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      //Tijdelijke logindetails
      //var getUserDetails = 'https://www.gingerwald.com/community/v2.1/api/getUserDetails.php?token=';
      //var userToken = 'VRYsLhjqom93MPPPcfeaWwmb8S3hwS7rImoqS3OOVthP4BFApUPT1wIsW2UmSiFO'; //token moet later nog uit de server gehaald worden adhv van de logingegevens

      //1. token aanvragen adhv van usernaam en wachtwoord (client_secret heb ik er vast ingezet)
      var url = 'https://www.gingerwald.com/community/v2.1/authorization/oauth/token.php?grant_type=password&username=' + name + '&password=' + pw + '&client_id=GingerwaldUserApp13&client_secret=nO7mudLAY6w2CnNWEv0RNVjsRqfnsh8NYdc4Jpj3Z0PPTvbG1SGihD7w8YedIPtV';

      $http ({
        method: 'POST',
        url: url,
      }).then (function successCallback (response) {
        console.log (response);
      }, function errorCallback (response) {
        console.log (response);
      });

      //2. indien de token opgehaald kan worden kan men inloggen en worden de gegevens van de gebruikers getoond glinkt aan zijn token

      /*if (name == 'plantijn004@gingerwald.be' && pw == 'gingerjuice') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;*/
    }
  }
});