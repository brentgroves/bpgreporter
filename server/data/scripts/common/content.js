// Remember you must put requires in each function

function ifCond2(v1, v2, options) {
    var utils = require('handlebars-utils');
    if (utils.isBlock(options)){
        return options.fn(this);
    }else{
        return v1;
    }
}


function deptToPlant(dept) {
    var plant='3';
    switch(dept) {
        case '20':
            plant='2'
            break;
        case '10':
            plant='3'
            break;
        case '50':
            plant='5'
            break;
        case '60':
            plant='6'
            break;
        case '77':
            plant='2'
            break;
        case '88':
            plant='8'
            break;
        default:
            plant='unknown'
    }

    return plant;
}



function toJSON(data) {
    return JSON.stringify(data);
}

function trim(str) {
    return str.trim();
}

function fmtDesc(itemDescription){
    var format = require('string-format');
    var description;
    description=format('{0}    Rev:NS,    U/M:EA', itemDescription.substring(0, 24));
    return description;
//    '{{0}, you have {1} unread message{2}'.format(, 2, 's');
}

function fmtDate(itemDescription){
    var format = require('string-format');
    var description;
    description=format('{0}    Rev:NS,    U/M:EA', itemDescription.substring(0, 24));
    return description;
//    '{{0}, you have {1} unread message{2}'.format(, 2, 's');
}


function formatPhone(phone){
    var format = require('string-format');
    var formPhone;
    console.log(phone.length);
    if(10==phone.trim().length){
        formPhone=format('({0}){1}-{2}', phone.substring(0,3),phone.substring(3,6),phone.substring(6,10));
    }else{
        formPhone=phone;
    }
    return formPhone;
//    '{{0}, you have {1} unread message{2}'.format(, 2, 's');
}



function beforeRender(done) {
    /* 
    you must register 3rd party libraries in main script
    not in common script
    
    I have tried the following code and it does not work 
    instead use request.template.helpers += for 
    block or inline helpers to be exported 
    from common script.
    
    remember all required libraries in helpers must be
    required in helper itself not globally for some reason 
    
    TRIED this
    var handlebars = require('handlebars');
    var utils = require('handlebars-utils');
    //var helpers = require('handlebars-helpers')();
    var helpers = require('handlebars-helpers')({
      handlebars: handlebars
    });

    
    handlebars.registerHelper('ifCond4', function(v1, v2, options) {
        if (utils.isBlock(options)){
          if(v1 === v2) {
            return options.fn(this);
          }
          return options.inverse(this);
        }else{
            return v1;
        }
    
    });

    */
//    request.template.helpers +='\n' + deptToPlant + '\n' + fmtDate + '\n' + fmtDesc + '\n' + formatPhone + '\n' + formatDate + '\n' + trim +'\n' + toFixed + '\n' + toJSON;
    request.template.helpers +='\n' + ifCond2 + '\n' + deptToPlant + '\n' + fmtDesc + '\n' + formatPhone + '\n' + trim +'\n' + toJSON;
    done();
}
