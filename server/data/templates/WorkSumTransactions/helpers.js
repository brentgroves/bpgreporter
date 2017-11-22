// The advantage of declaring handlbars-helpers here instead of common is 
// that all these helpers will be registered without the 
// line     request.template.helpers +='\n' + ifCond2 + '\n' + deptToPlant + '\n' + fmtDate + '\n' + fmtDesc + '\n' + formatPhone + '\n' + formatDate + '\n' + trim +'\n' + toFixed + '\n' + toJSON;
// which we need in the common script
// so register 3rd party libraries here
// and custom helpers in common script.

var handlebars = require('handlebars');
var utils = require('handlebars-utils');
//var helpers = require('handlebars-helpers')();
var helpers = require('handlebars-helpers')({
  handlebars: handlebars
});
