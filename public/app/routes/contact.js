function ContactRoute () {
  return {
    template: '<frdev-home/>',

    controller: function ($rootScope) {
      $rootScope.PAGE = 'home';
    }
  };
}