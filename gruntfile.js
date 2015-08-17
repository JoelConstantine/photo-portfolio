module.exports = function( grunt ) {
  
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    concat : {
      build : {
        src: [
            'scripts/**/*.js', // All JS in the libs folder
        ],
        dest: 'build/js/site.js',
      }
    },
    uglify : {
      buildjs: {
          src: 'build/js/site.js',
          dest: 'themes/joel-theme/static/js/site.js'
      }
    },
    sass : {
      mainstyle : {
        options : {
          style : 'compressed'
        },
        files : {
          'public/stylesheets/style.css' : 'sass/main.scss'
        }

      }
    },
    autoprefixer : {
      style : {
        src : 'public/stylesheets/style.css'
      }
    },
    watch : {
      styles : {
        files : 'sass/**/*.scss',
        tasks : ['buildCSS'],
        options : {
          spawn : false
        }
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-autoprefixer');

  grunt.registerTask('default', ['buildCSS', 'watch']);
  //grunt.registerTask('buildJS', ['concat','uglify']);
  grunt.registerTask('buildCSS', ['sass', 'autoprefixer' ])
}