// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getAllDishes = function() {
  	var dishIds = Dinner.getAllDishIds();
  	var dishes = [];
  	for(i = 0; i<dishIds.length; i++) {
  		Dinner.Dish.get({id:dishIds[i]}, function(data) {
  		$scope.Dish = data;
  		$scope.status = "";
  		$scope.Ingredients="Ingredients";
  		$scope.Instructions="Instructions";
   	}, function(data){
     $scope.status = "There was an error";
   });  
  }
  	return dishes;
  }
  
});