module.exports = function (grunt) {
	
	// init config
	grunt.initConfig({
		// read & parse npm package file
		pkg : grunt.file.readJSON("./package.json"),
		
		// config jshint
		jshint: {
			options: lintOpt(),
            // jquery-ui.js ignored, not lint free
			files: ["Gruntfile.js", "javascripts/calendar*.js", "javascripts/jquery.js"]
		}
	
	});
	
	// load module - jshint
	grunt.loadNpmTasks("grunt-contrib-jshint");
	
	grunt.registerTask("default", "Default description - Lint & Test", ["printOpt","jshint"]);
    
    grunt.registerTask("printOpt", "Printing lint options", function() {
        console.log(JSON.stringify(lintOpt()));
    });

	// it also can run a JavaScript function
	function lintOpt(mode) {
		var options = {
            // options for relaxing jQuery
            evil: true,
            eqeqeq: false,
            eqnull: true,
            sub: true,
            expr: true,
            globals: {
                jQuery: true
            },
            // jQuery-UI - ignored atm, not lint free
            funcscope: true,
            laxbreak: true,
            lastsemic: true,
            asi:true
        };
		
		if (mode === "node") {
			options.node = true;
		} else {
			// default - browser lint flag
			options.browser = true;
		}
		
		return options;
	}
};
