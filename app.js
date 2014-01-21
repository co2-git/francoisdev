
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals.projects = [
  {
    "name": "Venus Software International",
    "slug": "vsisoft",
    "url": "http://vsisoft.com",
    "stack": {
      "front": [
        "HTML5",
        "Bootstrap",
        "Foundation",
        "LESS CSS",
        "Angular",
        "jQuery",
        "Font Awesome"
      ],
      "back": [
        "NodeJS",
        "Express",
        "PM2"
      ]
    }
  },

  {
    "name": "Blue Trail Software",
    "slug": "bluetrailsoft",
    "url": "http://bluetrailsoft.com",
    "stack": {
      "front": [
        "HTML5",
        "Foundation",
        "SASS CSS",
        "Angular",
        "jQuery",
        "Font Awesome"
      ],
      "back": [
        "NodeJS",
        "Express",
        "PM2"
      ]
    }
  },

  {
    "name": "Immobileaks",
    "slug": "immobileaks",
    "url": "http://immobileaks.com",
    "stack": {
      "front": [
        "HTML5",
        "Foundation",
        "SASS CSS",
        "Angular",
        "jQuery",
        "Font Awesome"
      ],
      "back": [
        "NodeJS",
        "Express",
        "PM2"
      ],
      "db": [
        "MySQL"
      ],
      "api": [
        "Google Maps"
      ]
    }
  },

  {
    "name": "Francois Dev",
    "slug": "francoisdev",
    "url": "http://francoisdev.com",
    "stack": {
      "front": [
        "HTML5",
        "Foundation",
        "SASS CSS",
        "Angular",
        "jQuery"
      ],
      "back": [
        "NodeJS",
        "Express",
        "PM2"
      ]
    }
  }
];

app.get('/js/projects.json', function (req, res) {
  res.json(app.locals.projects);
});

app.get('/js/skills.json', function (req, res) {
  var skills = {
    front: [],
    back: [],
    db: [],
    api: []
  };

  app.locals.projects.forEach(function (project) {
    if ( typeof project.stack.front === 'object' ) {
      project.stack.front.forEach(function (skill) {
        if ( skills.front.indexOf(skill) === -1 ) {
          skills.front.push(skill);
        }
      });
    }

    if ( typeof project.stack.back === 'object' ) {
      project.stack.back.forEach(function (skill) {
        if ( skills.back.indexOf(skill) === -1 ) {
          skills.back.push(skill);
        }
      });
    }

    if ( typeof project.stack.db === 'object' ) {
      project.stack.db.forEach(function (skill) {
        if ( skills.db.indexOf(skill) === -1 ) {
          skills.db.push(skill);
        }
      });
    }

    if ( typeof project.stack.api === 'object' ) {
      project.stack.api.forEach(function (skill) {
        if ( skills.api.indexOf(skill) === -1 ) {
          skills.api.push(skill);
        }
      });
    }
  });

  res.json(skills);
});

app.get('/partials/:partial', function (req, res) {
  res.render('partials/' + req.params.partial);
});

app.get('/', function (req, res) {
	res.render('pages/index');
});

app.get('/skills', function (req, res) {
  res.render('pages/skills');
});

app.get('/projects', function (req, res) {
  res.render('pages/projects');
});

app.get('/projects/:project', function (req, res) {
  res.render('pages/projects', { project: req.params.project });
});

app.get('/contact', function (req, res) {
  res.render('pages/contact');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
