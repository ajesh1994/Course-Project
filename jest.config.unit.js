// jest.config.integration.js
var config = require("./jest.config");
config.testRegex = ".test\\.js$"; //Overriding testRegex option
console.log("RUNNING INTEGRATION TESTS");
module.exports = config;
