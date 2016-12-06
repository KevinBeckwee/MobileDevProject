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

      var url = 'https://www.gingerwald.com/community/v2.1/api/getCommunityDetails.php?token=VRYsLhjqom93MPPPcfeaWwmb8S3hwS7rImoqS3OOVthP4BFApUPT1wIsW2UmSiFO'

      var test = "ne";

      /*$http ({
        method: 'GET',
        url: url,
        success: function (data) {
          console.log ('Success');
          test = "success";
        },
        error: function (data) {
          console.log ('Error');
          test = "error";
        }
      });*/

      $http.get (url).success(function () { test = "ja" });

      console.log (test);

      /*if (name == 'user' && pw == 'secret') {
        deferred.resolve('Welcome ' + name + '!');
      } else {
        deferred.reject('Wrong credentials.');
      }*/
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});