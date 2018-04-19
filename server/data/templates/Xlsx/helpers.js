/*
Rename Sheet
{{#xlsxMerge "xl/workbook.xml" "workbook.sheets[0].sheet[0]"}}
   <sheet name="My Sheet Name"/>
{{/xlsxMerge}}

{{date transTime "lll"}}
{{date "2017-11-11T01:49:00.000Z" "lll"}}

dxfid <dxfs count="4">
3=red
2=green
1=yellow
0=yellow

styles.xml
style (s="",<cellXfs> )
0=none
1=currency
2=currency bold
3=red currency bold
10=center bold
11=right bold
12=center
13=right
15=bold + Overhead line
16=$ + bold + Overhead line

{{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.conditionalFormatting"}} 
<conditionalFormatting sqref="H5">
<cfRule type="cellIs" dxfId="1" priority="0" operator="greaterThan">
<formula>500</formula>
</cfRule>
<cfRule type="cellIs" dxfId="3" priority="1" operator="lessThan">
<formula>300</formula>
</cfRule>
</conditionalFormatting>
{{/xlsxAdd}}


{{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.conditionalFormatting"}}
<conditionalFormatting sqref="E3:E{{sum 3 transactions.length}}">
    <cfRule type="containsText" dxfId="3" priority="1" >
        <formula>NOT(ISERROR(SEARCH("JOSH",E3:E{{sum 3 transactions.length}})))</formula>
    </cfRule>
</conditionalFormatting>
{{/xlsxAdd}}

{{#xlsxAdd "xl/worksheets/sheet1.xml" "worksheet.sheetData[0].row"}}
<row r="{{#sum items.length 3}}{{/sum}}">
    <c r="D{{#sum items.length 3}}{{/sum}}" t="inlineStr"><is><t>TOTAL:</t></is></c>
    {{!-- formula column --}}
    <c r="E{{#sum items.length 3}}{{/sum}}" t="str"><f>SUM(E2:E{{#sum items.length 1}}{{/sum}})</f></c>
</row>
{{/xlsxAdd}}

    /* 
    you must register 3rd party libraries in main script
    not in common script
    
    I have tried the following code and it does not work 
    instead use request.template.helpers += for 
    block or inline helpers to be exported 
    from common script.
    
    remember all required libraries in helpers must be
    required in helper itself not globally for some reason 
    

--------------------------------------------------------
*/
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

//{{ifConsumable consumable}}
function ifConsumable(consumable, options) {
    if (utils.isBlock(options)){
        return options.fn(this);
    }else{
        return consumable;
    }

    
}


function sum(val1, val2) {
    return val1 + val2   
}