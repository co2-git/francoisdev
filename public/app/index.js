var ngModule = angular.module('francoisdev', ['ngRoute']);

var stack = ['front', 'back', 'db', 'api'];

function slugify () {
  return function (str) {
    str = str.replace(/\s/g, '+');
    return str;
  };
}

function unslugify () {
  return function (str) {
    str = str.replace(/\+/g, ' ');
    return str;
  };
}

ngModule
  .filter({
    slugify: slugify
  })
  
  .factory({
    ProjectsService: ProjectsService,
    SkillsService: SkillsService
  })
  
  .directive({
    frdevHome: homeDirective,
    frdevProjects: projectsDirective,
    frdevProject: projectDirective,
    frdevSkills: skillsDirective,
    frdevSkill: skillDirective
  })

  .config(function ($routeProvider, $locationProvider) {
    
    $routeProvider.when('/projects', ProjectsRoute());

    $routeProvider.when('/projects/:project', ProjectsRoute(true));

    $routeProvider.when('/skills', SkillsRoute());

    $routeProvider.when('/skills/:skill', SkillRoute());

    $routeProvider.when('/about', AboutRoute());

    $routeProvider.otherwise(AboutRoute());
  })

  .run(function ($rootScope) {
    $rootScope.identity = angular.identity;
  });