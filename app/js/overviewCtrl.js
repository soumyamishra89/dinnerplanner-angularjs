// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('OverviewCtrl', function ($scope,Dinner) {

  /*$scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }*/
  
  if(Dinner.getSelectedDishes().length === Dinner.getAllDishIds().length){
   $scope.selectedDishes = Dinner.getSelectedDishes();
   $scope.totalCost = Dinner.getTotalCostofSelectedDishes(); 
  }
  else{

      var selcteddishes = Dinner.getSelectedDishes();
      var dishIds = Dinner.getAllDishIds();

      for(i = 0; i<dishIds.length; i++) {
        //check first if the item is in selectedDishes then
        var j = 0;
        for( j = 0; j < selcteddishes.length; j++){
            if(selcteddishes[j].RecipeID == dishIds[i]){
                break;
            }
        }

        if(j==selcteddishes.length){
            Dinner.Dish.get({id:dishIds[i]}, function(data) {
            //add dish to selectedDishes
              Dinner.addtoSelectedDish(data);
              $scope.selectedDishes = Dinner.getSelectedDishes();
              $scope.totalCost = Dinner.getTotalCostofSelectedDishes();
            }, function(data){
                $scope.status = "There was an error";
            });  
        }
      
  }
}
  $scope.showDetails = false;
  $scope.showDetailsinSamePage = function(dish){
    $scope.showDetails = true;
    $scope.Dish = dish;
  }

  $scope.removeDish = function(dish){
    Dinner.removeDish(dish);
    $scope.selectedDishes = Dinner.getSelectedDishes();
    $scope.totalCost = Dinner.getTotalCostofSelectedDishes(); 
    if(dish.RecipeID == $scope.Dish.RecipeID){
      $scope.showDetails = false;
    }
  }



  /*$scope.getAllDishes = function() {
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
  }*/
  
});