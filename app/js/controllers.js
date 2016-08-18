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
  
phonecatControllers.controller('UpdatePhoneCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
      $http.get('http://localhost:3000/phonedetail/'+ $routeParams.phoneId).success(function(data) {
      $scope.phone = data;
    });
  }]);

phonecatControllers.controller('UpdatePhoneCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
      $http.get('http://localhost:3000/phonedetail/' + $routeParams.phoneId ).success(function(data) {
     $scope.phone = data[0];
	  
	 $scope.mainImageUrl = data.images[0];
    });
    $scope.setImage = function(imageUrl) {
     $scope.mainImageUrl = imageUrl;
    }
  }]);
/*
phonecatControllers.controller('PostUpdateCtrl',function ($scope,$http){
	$scope.postPhoneUpdate = function() {
		$http.post('http://localhost:3000/update/',{
				'phoneId':$scope.phone.phoneId,
				'age':$scope.phone.age,
				'carrier':$scope.phone.carrier,
				'id':$scope.phone.id,
				'imageUrl':$scope.phone.imageUrl,
				'name':$scope.phone.name,
				'snippet':$scope.phone.snippet,
				'additionalFeatures':$scope.phone.additionalFeatures,
				'description':$scope.phone.description,
				'availability':$scope.phone.availability,
				'type':$scope.phone.type,
				'standbyTime':$scope.phone.standbyTime,
				'talkTime':$scope.phone.talkTime,
				'os':$scope.phone.os,
				'ui':$scope.phone.ui,
				'primary':$scope.phone.primary,
				'features':$scope.phone.features,
				'bluetooth':$scope.phone.bluetooth,
				'cell':$scope.phone.cell,
				'gps':$scope.phone.gps,
				'infrared':$scope.phone.infrared,
				'wifi':$scope.phone.wifi,
				'screenResolution':$scope.phone.screenResolution,
				'screenSize':$scope.phone.screenSize,
				'touchScreen':$scope.phone.touchScreen,
				'accelerometer':$scope.phone.accelerometer,
				'audioJack':$scope.phone.audioJack,
				'cpu':$scope.phone.cpu,
				'fmRadio':$scope.phone.fmRadio,
				'physicalKeyboard':$scope.phone.physicalKeyboard,
				'usb':$scope.phone.usb,
				'dimensions':$scope.phone.dimensions,
				'weight':$scope.phone.weight,
				'ram':$scope.phone.ram,
				'flash':$scope.phone.flash,
				'images':$scope.phone.images}).success(function(data,status,headers,config){
			
			console.log("Updated Successfully!");
 
			
		}); 
	  }]);


*/


  

