function AboutRoute () {
  return {
    template: '<frdev-home/>',

    controller: function ($rootScope) {
      $rootScope.PAGE = 'about';
    }
  };
}