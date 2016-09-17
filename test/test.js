'use strict';

const path = require('path');
const assert = require('assert');
const markoGenerator = require('../lib/marko-js-generator');
const testUtils = require('./testUtils');

describe('marko-js-generator', function(){
    describe('#generateUIComponent', function(){
        afterEach(function() {
            testUtils.deleteDirectory(path.join(__dirname, 'temp', 'app-test-component'));
        });

        it('should create a basic ui component', function(done){
            const testAppPath = path.join(__dirname, 'temp');
            const options = {
                path: testAppPath,
                name: 'app-test-component'
            };
            markoGenerator.generateUIComponent(options, function(status){
                assert.equal(status.success, true);
                done();
            });
        });
    });
});
