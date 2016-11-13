var app = angular.module('noticiasST', ['ionic','angularMoment']);

//Controlador principal
app.controller('stController',function($http,$scope){
  //Array de noticias
  $scope.noticias=[];
  //Carga nuevas
  $scope.cargarNuevas = function(){
    var params={};
    params['before']=$scope.noticias[0].name;
    //Peticion de datos al API
    $http.get('https://www.reddit.com/r/StrangerThings/new/.json',{params:params})
    .success(function(response){
      angular.forEach(response.data.children,function(data){
          $scope.noticias.push(data.data);
      });
    $scope.$broadcast('scroll.refreshComplete');
    });
  }

  //Carga de mas noticias
  $scope.cargarMas = function(){
    var params={};
    if($scope.noticias.length>0){
      params['after']=$scope.noticias[$scope.noticias.length-1].name;
    }
    //Peticion de datos al API
    $http.get('https://www.reddit.com/r/StrangerThings/new/.json',{params:params})
    .success(function(response){
      angular.forEach(response.data.children,function(data){
          $scope.noticias.push(data.data);
      });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };

  //Carga de url
  $scope.abrirUrl=function(url){
    window.open(url,'_blank');
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.cordova && window.cordova.InAppBrowser) {
      window.open=window.cordova.InAppBrowser.open;
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
