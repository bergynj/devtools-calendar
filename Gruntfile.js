module.exports = function (grunt) {
	
	// init config
	grunt.initConfig({
		// read & parse npm package file
		"pkg": grunt.file.readJSON("package.json"),
		
		// config jshint
		"jshint": {
			options: lintOpt(),
            // jquery-ui.js ignored, not lint free
			files: ["Gruntfile.js", "javascripts/calendar*.js", "javascripts/jquery.js"]
		},
        
        // config for closure-compiler to minify & optimise js
        // https://mazira.com/blog/minifying-javascript-grunt
        "closure-compiler": {
            simple: {
                closurePath: "/lib/compiler.jar",
                js: [
                    '/javascripts/jquery.js',
                    '/javascripts/calendar.js'
                ],
                jsOutputFile: "/javascripts/app-simple.min.js",
                noreport: true,
                options: {
                    compilation_level: "SIMPLE_OPTIMIZATIONS",
                    warning_level:"DEFAULT"
                }
            },
            adv: {
                closurePath: "/lib",
                // cwd: "/javascripts",
                js: ["/javascripts/jquery.js", "/javascripts/jquery-ui.js"],
                jsOutputFile: "/javascripts/min/app-adv.min.js",
                noreport: true,
                options: {
                    compilation_level: "ADVANCED_OPTIMIZATIONS",
                    warning_level:"DEFAULT"
                }
            }
        },
        
        // config for karma
        // http://blog.credera.com/technology-insights/java/testing-angularjs-part-3-karma-grunt/
        karma: {
            options: {
                configFile: "./karma.conf"
            },
            unit: {
                // run single test instead continously
                singleRun: true
            }
        }
	
	});
	
	// load module - jshint
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-closure-compiler");
	grunt.loadNpmTasks("grunt-karma");
    
    grunt.registerTask("default", "Default description - Lint & Test", ["jshint"]);
    grunt.registerTask("minify", "Minify JavaScript", ["closure-compiler:adv"]);
    
    // create unit testing
    
    
    
    // dummy task to print linting options
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
