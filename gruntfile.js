module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
    base: {
      src: ['modules/**/*.ts'],
      options: {
       // keepDirectoryHierarchy: true,
        watch:'modules'
      }
    }
  }
  });

  
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-typescript');

  
  grunt.registerTask('default', ['typescript']);


};