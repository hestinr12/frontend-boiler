module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower_concat: {
      all: {
        dest: "src/dist/js/bower.js",
        destCss: "public/bower.css"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/dist/js/bower.js',
        dest: 'src/dist/js/bower.min.js'
      }
    },
    concat: {
      basic: {
        src: ['src/dist/js/bower.min.js', 'src/js/*.js'],
        dest: 'public/build.min.js',
      }
    },
    sass: { // Task
      dist: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['*.scss'],
          dest: 'src/dist/css',
          ext: '.css'
        }]
      }
    },
    concat_css: {
      all: {
        src: ["src/dist/css/*.css"],
        dest: "src/dist/css/concated.css"
      },
    },
    autoprefixer: {
      dist: {
        files: {
          'public/build.css': 'src/dist/css/concated.css'
        }
      }
    },
    watch: {
      js: {
        // We watch and compile sass files as normal but don't live reload here
        files: ['src/js/*.js'],
        tasks: ['bower_concat', 'uglify', 'concat'],
      },
      sass: {
        files: ['src/sass/*.scss'],
        tasks: ['sass', 'concat_css', 'autoprefixer']
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: {
          livereload: true
        },
        files: ['public/**/*'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['bower_concat', 'uglify', 'concat', 'sass', 'concat_css', 'autoprefixer']);
  grunt.registerTask('watch' ['watch']);
}
