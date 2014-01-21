function ProjectsRoute (selected) {
  return {
    template: '<frdev-projects>',
        
    controller: function ($scope, ProjectsService, $rootScope, $routeParams) {
      $rootScope.PAGE = 'projects';

      $scope.selected = selected;

      if ( selected ) {
        $scope.projectView = $routeParams.project;
      }

      ProjectsService.get($rootScope);
    }
  };
}