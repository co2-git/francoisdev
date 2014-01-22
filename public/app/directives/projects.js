function projectsDirective () {
  return {
    restrict: 'E',
    templateUrl: '/partials/projects',
    controller: function ($scope) {
      $scope.switchView = function (project) {
        $scope.projectView = project;
        location.hash = '#/projects/' + project;
        $(document).scrollTop(0);
        console.log('hola');
      };
    }
  };
}