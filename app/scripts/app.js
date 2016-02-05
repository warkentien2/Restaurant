'use strict';

angular.module('confusionApp', [])

  .controller('MenuController', ['$scope', function($scope){

    $scope.tab = 1; // sets tab 1 as "active"
    $scope.filtText = "";

    $scope.dishes = [
      {
         name:'Uthappizza',
         image: 'images/uthappizza.png',
         category: 'mains',
         label:'Hot',
         price:'4.99',
         description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
         comment: ''
      },
      {
         name:'Zucchipakoda',
         image: 'images/zucchipakoda.png',
         category: 'appetizer',
         label:'',
         price:'1.99',
         description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
         comment: ''
      },
      {
         name:'Vadonut',
         image: 'images/vadonut.png',
         category: 'appetizer',
         label:'New',
         price:'1.99',
         description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
         comment: ''
      },
      {
         name:'ElaiCheese Cake',
         image: 'images/elaicheesecake.png',
         category: 'dessert',
         label:'',
         price:'2.99',
         description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
         comment: ''
      }
    ];

    $scope.select = function(setTab){
      $scope.tab = setTab;

      if (setTab === 2) {
        $scope.filtText = "appetizer";
      }
      else if (setTab === 3) {
        $scope.filtText = "mains";
      }
      else if (setTab === 4) {
        $scope.filtText = "dessert";
      }
      else {
        $scope.filtText = "";
      }
    };

    this.isSelected = function(checkTab){
      return ($scope.tab === checkTab);
    };

  }]);
