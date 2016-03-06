// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  
  $scope.$watch(function(){
  	$scope.noOfGuests=Dinner.getNumberOfGuests();
  });
  console.log($routeParams.dishId);
  $scope.status = "Searching...";
 
  Dinner.Dish.get({id:$routeParams.dishId}, function(data) {
  	$scope.Dish = data;
  	console.log(data);
  	$scope.status = "";
  	$scope.Ingredients="Ingredients";
  	$scope.Instructions="Instructions";
   }, function(data){
     $scope.status = "There was an error";
   });
  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});