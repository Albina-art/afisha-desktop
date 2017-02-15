module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    haml:
      templates:
        options:
          target: 'js'
          language: 'coffee'
          precompile: true
        files:
          'temp/templates.js': ['haml/[^~]*.haml']
    concat:
      options:
        separator: ';'
      dev:
        src: ["temp/templates.js", 'vendor/*.js', 'js/declare.js', 'js/api.js', 'js/controllers/*.js', 'js/init.js']
        dest: 'app/js/app.js'
    watch:
      haml:
        files: ['haml/[^~]*.haml'],
        tasks: ['haml'],
        options:
          atBegin: true
      concat:
        files: ['vendor/*.js', 'js/app.js', 'temp/templates.js', 'vendor/*.js'],
        tasks: ['concat:dev'],
        options:
          atBegin: true
    concurrent:
      options:
        limit: 20
        logConcurrentOutput: true
      cwatch: [
        # 'watch:css',
        'watch:haml',
        'watch:concat',
      ]


  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-ng-annotate'
  grunt.loadNpmTasks 'grunt-haml'
  grunt.loadNpmTasks 'grunt-concurrent'


  # Default task(s).
  grunt.registerTask 'default', ['concurrent:cwatch']
  return
