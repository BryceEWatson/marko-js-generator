'use strict';

const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const templatesPath = path.join(__dirname, '../templates');

function directoryExists(filePath) {
    try {
        return fs.statSync(filePath).isDirectory();
    } catch (err) {
        return false;
    }
}

function copyTemplates(options, callback) {
    const templatePath = path.join(templatesPath, options.templateName);
    fs.readdir(templatePath, function(err, files) {
        if (err){
            callback({success: false, message: err});
        } else {
            let success = true;
            let errMsg;
            files.forEach(function(file, index){
                const filePath = path.join(templatePath, file);
                if (!directoryExists(filePath)){
                    let content = fs.readFileSync(filePath, 'utf8');
                    let compileOptions = {
                        data: {
                            name: options.name
                        }
                    };
                    let compiledContent = ejs.render(content, compileOptions);
                    const destFile = path.join(options.destPath, file);
                    fs.writeFileSync(destFile, compiledContent);
                }
            });
            callback({success: true});
        }
    });
}

module.exports = {
    generateUIComponent: function(options, callback) {
        const destDirectory = path.join(options.path, options.name);
        if (!directoryExists(destDirectory)) {
            fs.mkdirSync(destDirectory);
            let copyOptions = {
                templateName: 'ui-component',
                destPath: destDirectory,
                name: options.name
            };
            copyTemplates(copyOptions, function(status) {
                if (status.message) {
                    console.log(status.message);
                }
                callback(status);
            });
        } else {
            callback({success: false, message: 'Location already in use.'});
        }
    }
}
