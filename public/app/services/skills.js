function SkillsService ($http, ProjectsService) {
  return {
    skills: {},

    get: function (cb) {
      if ( ! Object.keys(this.skills).length ) {
        $http.get('/js/skills.json')
          .error(function (error) {
            console.error(error);
          })
          .success(function (skills) {
            this.skills = skills;

            this.get(cb);
          }.bind(this));

        return;
      }

      if ( typeof cb === 'function' ) {
        cb(null, this.skills);

        return;
      }

      if ( cb.constructor.name === 'h' ) {
        cb.skills = this.skills;

        return;
      }
    },

    getSkill: function (skillName, cb) {
      if ( ! Object.keys(this.skills).length ) {
        this.get(function (error) {
          if ( error ) {
            throw error;
          }

          this.getSkill(skillName, cb);
        }.bind(this));

        return;
      }

      var skill, projectsUsingSkill = [];

      ['front', 'back', 'db', 'api'].forEach(function (stack) {
        this.skills[stack].forEach(function ($skill) {
          if ( $skill === skillName ) {
            skill = $skill;
          }
        });
      }.bind(this));

      if ( ! skill ) {
        throw new Error('No such skill: ' + skillName);
      }

      ProjectsService.get(function (error, projects) {
        if ( error ) {
          throw error;
        }

        projects.forEach(function (project) {
          ['front', 'back', 'db', 'api'].forEach(function (stack) {
            if ( typeof project.stack[stack] === 'object' ) {
              project.stack[stack].forEach(function ($skill) {
                if ( $skill === skillName ) {
                  projectsUsingSkill.push(project);
                }
              });
            }
          });
        });
      });

      if ( typeof cb === 'function' ) {
        cb(null, skill, projectsUsingSkill);

        return;
      }

      if ( cb.constructor.name === 'h' ) {
        cb.skill = skill;
        cb.projectsUsingSkill = projectsUsingSkill;

        return;
      }
    }
  };
}