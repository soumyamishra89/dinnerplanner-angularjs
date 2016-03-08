// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {
  
  var numberOfGuest = 2;
  
  this.setNumberOfGuests = function(num) {
    numberOfGuest = num;
    $cookieStore.put("guests", numberOfGuest);
  }

  this.getNumberOfGuests = function() {
    if($cookieStore.get("guests") === undefined) {
      return numberOfGuest;
    }
    else {
      return $cookieStore.get("guests");
    }
  }

  var allSelectdDishes =[];

  this.addtoSelectedDish = function(dish){
    allSelectdDishes.push(dish);
  }

  this.getSelectedDishes = function(){
    return allSelectdDishes;
  }

  this.getTotalCostofSelectedDishes = function(){
    //console.log(allSelectdDishes);
    var totalCost = 0;
    for(i = 0; i < allSelectdDishes.length; i++){
      var ingredients = allSelectdDishes[i].Ingredients;
      //console.log("ingredients");
      //console.log(ingredients);
      for(j = 0; j < ingredients.length; j++){
            totalCost += parseInt(ingredients[j].Quantity)*numberOfGuest;
            //console.log("ing name:");
            //console.log(ingredients.Name);
            //console.log("ing Quantity:");
            //console.log(ingredients.Quantity);
      }
    }
    console.log("totalCost: " + totalCost);
    return totalCost;
  }
  
  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details

  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:'0OV23011kU7B3VVVgxTTTIfdNXeTI3us'});
  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:'0OV23011kU7B3VVVgxTTTIfdNXeTI3us'}); 

  var fullMenu =[];
  

  this.addDishToMenu = function(dish) {
    if($cookieStore.get("dishes") !== undefined) {
      fullMenu = $cookieStore.get("dishes");
    }
    if(fullMenu.indexOf(dish.RecipeID) ===-1) {
      fullMenu.push(dish.RecipeID);
      allSelectdDishes.push(dish);
      console.log(dish);
    }
    $cookieStore.put("dishes", fullMenu);
  }

  this.removeDish = function(dish){
    for(i = 0; i < fullMenu.length;i++){
      if(fullMenu[i] == dish.RecipeID){
        fullMenu.splice(i,1);
      }
    }
    console.log(allSelectdDishes.length);
    for(i = 0; i < fullMenu.length;i++){
      if(allSelectdDishes[i].RecipeID == dish.RecipeID){
        allSelectdDishes.splice(i,1);
      }
    }
    
    
    console.log(allSelectdDishes.length);
    $cookieStore.put("dishes", fullMenu);
  }

  this.getAllDishIds = function() {
    if($cookieStore.get("dishes") === undefined) {
      return fullMenu;
    }
    else {
     return $cookieStore.get("dishes");
    }
  }



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});