const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

module.exports = args;
