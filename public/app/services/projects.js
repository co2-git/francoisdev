function ProjectsService ($http) {
  return {
    projects: [],

    get: function (cb) {
      if ( ! this.projects.length ) {
        $http.get('/js/projects.json')
          .error()
          .success(function (projects) {
            this.projects = projects;

            this.get(cb);
          }.bind(this));

        return;
      }

      if ( typeof cb === 'function' ) {
        cb(null, this.projects);

        return;
      }

      if ( cb.constructor.name === 'h' ) {
        cb.projects = this.projects;

        return;
      }
    },

    getProject: function (projectName, cb) {
      if ( ! this.projects.length ) {
        this.get(function (error) {
          if ( error ) {
            throw error;
          }

          this.getProject(projectName, cb);
        }.bind(this));

        return;
      }

      var project;

      this.projects.forEach(function (proj) {
        if ( proj.slug === projectName ) {
          project = proj;
        }
      });

      if ( ! project ) {
        throw new Error('No such project: ' + projectName);
      }

      if ( typeof cb === 'function' ) {
        cb(null, project);

        return;
      }

      if ( cb.constructor.name === 'h' ) {
        cb.project = project;

        return;
      }
    }
  };
}