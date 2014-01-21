function HomeRoute () {
  return {
    template: '<frdev-home/>',

    controller: function ($rootScope) {
      $rootScope.PAGE = 'home';
    }
  };
}