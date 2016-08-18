var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('http://localhost:3000/phonelist').success(function(data) {
      $scope.phones = data;
    });

    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.phoneId = $routeParams.phoneId;
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
      $http.get('http://localhost:3000/phonedetail/'+ $routeParams.phoneId).success(function(data) {
      $scope.phone = data;
    });
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
      $http.get('http://localhost:3000/phonedetail/' + $routeParams.phoneId ).success(function(data) {
     $scope.phone = data[0];
	  
	  $scope.mainImageUrl = data.images[0];
    });
    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
  
phonecatControllers.controller('PhoneBoardCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('http://localhost:3000/phoneboard').success(function(data) {
      $scope.phones = data;
    });
  }]);
/* 
phonecatControllers.controller('UpdatePhoneCtrl',['$scope','$http','$location','$routeParams',
  function ($scope, $http, $location, $routeParams) {
      var id = $routeParams.id;
      $scope.activePath = null;

      $http.get('http://localhost:3000/phoneboard'+id).success(function(data) {
        $scope.phones = data;
      });

      $scope.Update_Phone = function(phone) {
          $http.put('http://localhost:3000/phoneboard'+id, phone).success(function(data) {
          $scope.phones = data;
          $scope.activePath = $location.path('/');
        });
      };
      
      $scope.Delete_Phone = function(phone) {
          console.log(phone);
          var deletePhone = confirm('Are you absolutely sure you want to delete?');
          if (deletePhone) {
              $http.delete('http://localhost:3000/phoneboard'+phone.phoneId);
              $scope.activePath = $location.path('/');
          }        
      };
  }
]);
*/
    


  

