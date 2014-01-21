function ProjectRoute () {
  return {
    template: '<frdev-project>',
    
    controller: function ($scope, ProjectsService, $rootScope, $routeParams) {
      $rootScope.PAGE = 'projects';

      ProjectsService.getProject(unslugify()($routeParams.project), $scope);
    }
  };
}