module.exports = function(grunt) {

    grunt.initConfig({
        i18n: {
            belair: {
                sourceType: "properties",
                languages: ["en", "fr"],
                provinces: ["qc", "on"],
                source: ["i18n/belair"],
                target: "src/assets/locales/belair",
                filekey: "belair",
                prefix: "",
                encoding: "utf-8",
                generateEmptyFiles: true,
                generatePropertiesFiles: false,
                exportProperties: {
                    prefix: "rqq-belair"
                }
            },
            intact: {
                sourceType: "properties",
                languages: ["en", "fr"],
                provinces: ["qc", "on"],
                source: ["i18n/intact"],
                target: "src/assets/locales/intact",
                filekey: "intact",
                prefix: "",
                encoding: "utf-8",
                generateEmptyFiles: true,
                generatePropertiesFiles: false,
                exportProperties: {
                    prefix: "rqq-intact"
                }
            }
        },    
        watch: {
            files: ['i18n/**/*'],
            tasks: ['build']
        }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
  
    grunt.registerTask('build', ['i18n:belair', 'i18n:intact']);
    grunt.registerTask('default', ['build', 'watch']);
  


    var config = null;

  // i18N PROCESSORS
    grunt.registerTask('i18n', 'i18n Label Processor', function(args) {

        grunt.log.ok('Generating i18n files...');

        var configParam = args ? args : 'all';
        config = grunt.config('i18n')[configParam];
        if(config === undefined || config === null){
            grunt.fail.warn('i18n configuration not found');
            return false
        };

        // Configuring the encoding
        var encoding = config.encoding || 'utf8';
        grunt.file.defaultEncoding = encoding;
        grunt.log.ok('Encoding set to ' + encoding);
        

        // Read all folders from the source
        if(!config.source){
            grunt.fail.warn('i18n : Source not found')
        }
        else{

            var targetFiles = new Array;
            var languages = config.languages;
            var provinces = config.provinces;
            var sourceType = config.sourceType.toUpperCase();
            var exportProperties = config.hasOwnProperty('exportProperties');
            
            // Generate the array of target files
            languages.forEach(function(lang){
                provinces.forEach(function(prov){
                    var key = lang.toLowerCase() + "-" + prov.toLowerCase();
                    targetFiles[key] = {};
                })
            })
            
            grunt.file.expand({filter: 'isDirectory'}, config.source).forEach(function(path){

                // grunt.log.writeln(path);
                languages.forEach(function(lang){

                    //First read the global language file
                    var globalLanguageFile = undefined;
                    try{
                        if(sourceType === 'JSON'){
                            globalLanguageFile = grunt.file.readJSON(path + "/" + lang + ".json");
                        }
                        
                        if(sourceType === 'PROPERTIES'){
                            globalLanguageFile = processPropertyFiles(path + "/" + lang + ".properties");
                        }             
                    } 
                    catch(e) {};
                    
                    //then for all provinces in configuration
                    provinces.forEach(function(prov){

                        var targetFile = targetFiles[lang.toLowerCase() + "-" + prov.toLowerCase()];

                        // Append global language first
                        if(globalLanguageFile){
                            for(var key in globalLanguageFile){
                                targetFile[key] = globalLanguageFile[key];
                            }
                        }

                        // Process province file
                        var provinceFile = undefined;
                        var provincePath = path + "/" + lang + "-" + prov.toLowerCase() + "." + config.sourceType.toLowerCase();
                        try{
                            if(sourceType === 'JSON'){
                                provinceFile = grunt.file.readJSON(provincePath);
                            }
                            if(sourceType === 'PROPERTIES'){
                                provinceFile = processPropertyFiles(provincePath);
                            } 
                            
                        } 
                        catch(e) {};
                        
                        // province language file 
                        if(provinceFile){
                            for(var key in provinceFile){
                                targetFile[key] = provinceFile[key];
                            }
                        }                        
                    })

                });

            })

            // Output all files
            for(var key in targetFiles){
                var filename = config.target + "/" + (config.prefix.length ? config.prefix + "-" : "") + key + ".json";

                var emptyFile = Object.keys(targetFiles[key]).length === 0;
                if(!emptyFile || config.generateEmptyFiles){
                    grunt.log.ok('>   Writting file ' + filename);
                    grunt.file.write(filename, JSON.stringify(targetFiles[key], null, 4), {});            
                }
            }


            // Export Properties File if needed
            if(config.generatePropertiesFiles){
                for(var key in targetFiles){

                    // Building file name
                    var targetPath = config.target;
                    var prefix = config.prefix;
                    if(config.hasOwnProperty('exportProperties')){
                        targetPath = config.exportProperties.target ? config.exportProperties.target : config.target;
                        prefix = config.exportProperties.prefix ? config.exportProperties.prefix : config.prefix;
                    }
                    var filename = targetPath + "/" + prefix + "-" + key + ".properties";

                    // Converting props
                    var props = "";
                    var data = targetFiles[key];
                    for(var prop in data){
                        props = props + (prop + '=' + data[prop]) + '\n'
                    }

                    // Writting
                    var emptyFile = Object.keys(targetFiles[key]).length === 0;
                    if(!emptyFile || config.generateEmptyFiles){
                        grunt.log.ok('>   Writting file ' + filename);
                        grunt.file.write(filename, props, {});
                    }
                }
            }
        };

        grunt.log.ok('Intact i18n files generated');
        grunt.log.ok('');
      
    });


    /**
     * Processing property files
     * @param  {String} path [The path to the property file]
     * @return {Object}      [A proper JSON object]
     */
    var processPropertyFiles = function(path){
        
        var obj = {},
            properties = grunt.file.read(path, {encoding: 'utf8'});
    
        // Extract data
        var line = '',
            key = null;
                
        properties.split('\n').forEach(function(line, index){
            // clean-up ( \) + remove last char if is "\"
            line = line.replace(/( \\| \\r)/, '');
            var last = line.charAt(line.length - 2);
            if(last === '\\'){
                line = line.substr(0, line.length-2);
            }
            line = line.trim();
            line = line.replace(/\t/g, '');
            line = line.replace(/\\u2019/g, "'");

            // Ignore comments
            if(line.length && line.charAt(1) !== '#'){
                // test check if = is a key/value split (TODO)
                var entity = line.split('=');
                if(entity.length > 1){
                    // key value on same line
                    key = entity[0];
                    obj[key] = entity[1];
                } else if(key) {
                    // update 
                    obj[key] += line;
                }
            }
        });

        return obj;
        
    };





  };