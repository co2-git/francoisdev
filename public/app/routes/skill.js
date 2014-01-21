function SkillRoute () {
  return {
    template: '<frdev-skill>',
    
    controller: function ($scope, SkillsService, $rootScope, $routeParams) {
      $rootScope.PAGE = 'skills';

      SkillsService.getSkill(unslugify()($routeParams.skill), $scope);
    }
  };
}