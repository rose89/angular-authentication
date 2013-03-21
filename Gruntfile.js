var path = require('path');

exports = module.exports = function (grunt) {

  var config = grunt.initConfig({
    clean: {
      files: ['docs/', 'exmaple/components']
    }
  });

  grunt.registerTask('default', ['doc', 'example']);

  // Generate documentation
  grunt.registerTask('doc', 'Generate documentation', function () {
    var done = this.async();

    var child = grunt.util.spawn({
      cmd: path.resolve('./node_modules/.bin/docco'),
      grunt: false,
      args: ['js/angular-authentication.js']
    }, function (error, result, code) {
      grunt.log.ok('Generated documentation at ./docs/');
      done();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

  // Bootstrap example
  grunt.registerTask('example', 'Bootstrap example', function () {
    var done = this.async();

    grunt.file.setBase('./example');

    var child = grunt.util.spawn({
      cmd: path.resolve('../node_modules/.bin/bower'),
      grunt: false,
      args: ['install']
    }, function (error, result, code) {
      grunt.log.ok('Bootstrapped ./example/');
      done();
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

  // Removes directories that were generated by the build process
  grunt.registerTask('clean', 'Remove files generated by the build process', function () {
    var globs, i, j, m, n, files = [];

    for (i = 0, j = config.clean.files.length; i < j; i++) {
      globs = grunt.file.expand(config.clean.files[i]);
      for (m = 0, n = globs.length; m < n; m++) {
        files.push(globs[m]);
      }
    }

    for (i = 0, j = files.length; i < j; i++) {
      grunt.log.ok('Deleting ', files[i]);
      grunt.file.delete(files[i]);
    }
  });
};