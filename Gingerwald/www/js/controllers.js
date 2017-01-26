angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {

	// Form data for the login modal
	$scope.loginData = {};

	// Open the login modal
	$scope.login = function() {
		$scope.sendLogin = UserService.logIn ($scope.loginData.username, $scope.loginData.password);

		$scope.sendLogin.then (function (data) {
			UserService.setToken (data);
		}, function (reason) {
			alert (reason);
		});
	};
})

.controller ("UserCtrl", function ($scope, UserService) {

	$scope.token = UserService.getToken ();
	$scope.details = UserService.getUserDetails ($scope.token); //All the user's info is in here

	$scope.details.then (function (data) {
		$scope.userDetails = data;
	}, function (reason) {
		alert (reason);
	});
})

.controller ("DashboardCtrl", function ($scope, $filter, UserService, DashboardService, DateService) {
	
	$scope.token = UserService.getToken ();

	$scope.DOM = {
		allTime: document.getElementById ("allTime"),
		perWeek: document.getElementById ("perWeek"),
		perMonth: document.getElementById ("perMonth"),
		ingredients: document.getElementById ("ingredients"),
		nutrients: document.getElementById ("nutrients")
	};

	$scope.today = new Date ();
	$scope.firstDayWeek = DateService.getWeekDates ($scope.today)[0];
	$scope.lastDayWeek = DateService.getWeekDates ($scope.today)[1];
	$scope.firstDayMonth = DateService.getMonthDates ($scope.today)[0];
	$scope.lastDayMonth = DateService.getMonthDates ($scope.today)[1];

	$scope.getuserDashboard = function (dateFrom, dateTo) {
		$scope.dashboard = DashboardService.getDashboard ($scope.token, dateFrom, dateTo);

		$scope.dashboard.then (function (data) {
			$scope.data = data;
		}, function (reason) {
			alert (reason);
		});
	};

	$scope.addWeek = function () {
		$scope.firstDayWeek = DateService.addWeek ($scope.firstDayWeek);
		$scope.lastDayWeek = DateService.addWeek ($scope.lastDayWeek);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.subtractWeek = function () {
		$scope.firstDayWeek = DateService.subtractWeek ($scope.firstDayWeek);
		$scope.lastDayWeek = DateService.subtractWeek ($scope.lastDayWeek);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.addMonth = function () {
		$scope.firstDayMonth = DateService.addMonth ($scope.firstDayMonth);
		$scope.lastDayMonth = DateService.addMonth ($scope.lastDayMonth);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
	};

	$scope.subtractMonth = function () {
		$scope.firstDayMonth = DateService.subtractMonth ($scope.firstDayMonth);
		$scope.lastDayMonth = DateService.subtractMonth ($scope.lastDayMonth);
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
	};

	$scope.showAllTimeData = function () {
		$scope.DOM.allTime.style.display = "block";
		$scope.DOM.perWeek.style.display = "none";
		$scope.DOM.perMonth.style.display = "none";
		$scope.getuserDashboard	("", "");
	};

	$scope.showWeekData = function	() {
		$scope.DOM.allTime.style.display = "none";
		$scope.DOM.perWeek.style.display = "block";
		$scope.DOM.perMonth.style.display = "none";
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayWeek), DateService.formatDate ($scope.lastDayWeek));
	};

	$scope.showMonthData = function	() {
		$scope.DOM.allTime.style.display = "none";
		$scope.DOM.perWeek.style.display = "none";
		$scope.DOM.perMonth.style.display = "block";
		$scope.getuserDashboard (DateService.formatDate ($scope.firstDayMonth), DateService.formatDate ($scope.lastDayMonth));
	};

	$scope.showIngredients = function () {
		$scope.DOM.ingredients.style.display = "block";
		$scope.DOM.nutrients.style.display = "none";
	};

	$scope.showNutrients = function () {
		$scope.DOM.nutrients.style.display = "block";
		$scope.DOM.ingredients.style.display = "none";
	};

	$scope.showAllTimeData ();
})

.controller ("ScannerCtrl", function ($scope, $cordovaBarcodeScanner, UserService, ScannerService) {

	$scope.token = UserService.getToken ();

	$scope.DOM = {
		addButton: document.getElementById ("addButton"),
		cancelButton: document.getElementById ("cancelButon")
	};

	$scope.scanBarcode = function () {
		$cordovaBarcodeScanner.scan ().then (function (imageData) {
			$scope.bottleToken = imageData.text.substr (27, 40);
			addButton.disabled = false;
			cancelButton.disabled = false;

			$scope.bottleDetails = ScannerService.getBottleId ($scope.token, $scope.bottleToken);

			$scope.bottleDetails.then (function (data) {
				$scope.juiceId = data.Bottle.JuiceID;
			}, function (reason) {
				$scope.bottleToken = "Ongeldige code!";
			});

		}, function (error) {
			alert ("An error happened: " + error);
		});
	};

	$scope.addShot = function () {
		$scope.scanner = ScannerService.addShot ($scope.token, $scope.bottleToken);

		$scope.scanner.then (function (data) {
			$scope.bottleToken = "Shot toegevoegd!";
		}, function (reason) {
			$scope.bottleToken = "Shot bestaat al! (" + reason + ")";
		});

		$scope.juiceId = "";
		addButton.disabled = true;
		cancelButton.disabled = true;
	};

	$scope.cancelShot = function () {
		$scope.juiceId = "";
		$scope.bottleToken = "";
		addButton.disabled = true;
		cancelButton.disabled = true;
	};
})