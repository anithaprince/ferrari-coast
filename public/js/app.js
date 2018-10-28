const app = angular.module('MovieCars', []);

app.controller('MovieCarController', ['$http', function($http){
  this.make= "";
  this.model= "";
  this.year= "";
  this.color= "";
  this.tags= "";
  this.image= "";
  this.note= "";
  this.availability= false;
  const controller = this;
  this.reveal = false;
  this.toggleReveal =()=>{
      this.reveal =  !this.reveal;
   }
  /*********    Show route      ********/
  this.getCars = function(){
    $http({
      method:'GET',
      url: '/cars',
    }).then(function(response){
      controller.cars = response.data;
    });
  };


  /*********    Create route      ********/
  this.createCar = function(){
    $http({
      method:'POST',
      url: '/cars',
      data: {
        make: this.make,
        model: this.model,
        year:this.year,
        color: this.color,
        tags: this.tags,
        image: this.image,
        note: this.note,
        availability: this.availability,
      }
    }).then(function(response){
        controller.getCars();
        controller.make= "";
        controller.model= "";
        controller.year= "";
        controller.color= "";
        controller.tags= "";
        controller.image= "";
        controller.note= "";
        controller.availability= false;
    }, function(){
        console.log('error');
    });
  }

  this.createCarSeed = function(){
    $http({
      method:'POST',
      url: '/cars/seed',
    }).then(function(response){
        this.getCars();
    }, function(){
        console.log('error');
    });
  }

  /*********    Delete route      ********/
  this.deleteCar = function(car){
    $http({
      method:'DELETE',
      url:'/cars/'+ car._id
    }).then(function(response){
      controller.getCars();
    })
  }

  /*********    Update route      ********/
  this.updateCar = (car) => {
    $http({
      method: 'PUT',
      url: '/cars/' + car._id,
      data: {
        make: this.editedMake,
        model: this.editedModel,
        year: this.editedYear,
        color: this.editedColor,
        tags: this.editedTags,
        image: this.editedImage,
        notes: this.editedNotes,
        availability: this.editedAvailability
      }
    }).then((response) => {
      this.getCars();
    }, (error) => {
      console.log(error.message)
    })
  }
  this.getCars();
}]);
