function AboutRoute () {
  return {
    template: '<frdev-about/>',

    controller: function ($rootScope) {
      $rootScope.PAGE = 'about';
    }
  };
}