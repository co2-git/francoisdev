function SkillsRoute () {
  return {
    template: '<frdev-skills>',
    
    controller: function ($scope, SkillsService, $rootScope) {
      $rootScope.PAGE = 'skills';

      SkillsService.get($rootScope);
    }
  };
}