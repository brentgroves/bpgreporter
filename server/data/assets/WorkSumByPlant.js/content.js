<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NorthWind Dashboard</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.10/semantic.min.css">  
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/semantic-ui/2.2.10/semantic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/rg-1.0.2/datatables.min.css"/>
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/rg-1.0.2/datatables.min.js"></script>


  
<style>
{#asset HtmlToBrowserClient.css}
</style>

</head>
<body>
    
<div class="ui top attached demo menu">
  <a class="item">
    <i class="sidebar icon"></i> Menu
  </a>
</div>
<div class="ui bottom attached segment">
  <div class="ui inverted labeled icon left inline vertical demo sidebar menu">
    <a class="item">
      <i class="home icon"></i> Home
    </a>
    <a class="item">
      <i class="block layout icon"></i> Topics
    </a>
    <a class="item">
      <i class="smile icon"></i> Friends
    </a>
    <a class="item">
      <i class="calendar icon"></i> History
    </a>
  </div>
  <div class="pusher">
    <div class="ui basic segment">
      <h3 class="ui header">Application Content <p>{{reportName}} --{{date dtStart "ll"}}</h3>
      <p>{{reportName}}</p>
      <p></p>
<table id="example" class="display compact" width="100%" cellspacing="0" >
    <thead>
        <tr>

<!--    
{{moment }}

       var dtStart =Moment(new Date()).format("MM-DD-YYYY hh:mm:ss"); 
        <div class="col-xs-8 text-right " >date "dtStart" "ll"
        {{#ifCond2 "1" "1"}}
        "block"
        {{else}}
        "block2"
        {{/ifCond2}}
        {{ifCond2 "not block"}}

        {{#ifCond3 "1" "1"}}
        "block for ifCond3"
        {{else}}
        "block3"
        {{/ifCond3}}
        {{ifCond3 "not block for ifCond3"}}

-->



        </tr>
    <tr>
        <th >Plant</th>
        <th  >Part</th>
        <th >Description</th>
        <th>Pieces Produced</th>
        <th>Per Part Value Add</th>
        <th>Total Value Add Sales</th>
        <th>Consumable Tool Cost</th>
        <th>Total Tool Cost</th>
        <th>Consumable Vrs Actual</th>
        <th>Consumable Vrs Estimate</th>
        <th>Tool Cost Vrs VA Sales</th>
    </tr>
    </thead>
<tbody>
{{#each summary}}
    <tr>
        <td class="dt-body-center">{{plant}}</td>
        <td class="dt-body-center" >{{partNumber}}</td>
        <td class="dt-body-left" >{{descript}}</td>
        <td class="dt-right">{{addCommas pcsProduced}}</td>
        <td class="dt-right">${{valueAddedSales}}</td>
        <td class="dt-right">${{addCommas (toFixed  totalValueAdd 2)}}</td>
        <td class="dt-right">${{addCommas (toFixed  ConsToolCost 2)}}</td>
        <td class="dt-right">${{addCommas (toFixed  actualToolCost 2)}}</td>
        <td class="dt-right">${{addCommas (toFixed consumableVrsActualPct 2)}}</td>
        <td class="dt-right">{{addCommas (toFixed actualVrsBudgetedPct 2)}}%</td>
        <td class="dt-right">{{addCommas (toFixed actualVrsVaSalesPct 2)}}%</td>
    </tr>
{{/each}}

</tbody>
</table>

      <p></p>
      <p></p>
    </div>
  </div>
</div>  
  
<div class="ui inverted teal vertical segment">
    <div class="ui page grid">
      <div class="column">
        <h2 class="ui inverted header">Full Width Background</h2>
        <p>First section of content</p>
      </div>
    </div>
</div>

<div class="ui inverted teal vertical segment">
    <div class="ui page grid">
      <div class="column">
        <div  class="ui teal button" 
            data-title="Tool Cost Summary" 
            data-content="Description: This report sums all of the issues from the tool bosses and crib 
            for a part number for a specified date range and department(s).  
            It also displays the current M2M Job Number, pieces produced, value added sales, total 
            and cunsumable tool costs as well as a Tool Cost / Value Add Sales percentage."
            data-variation="very wide">Description        
        </div>
      </div>
    </div>
</div>

<div class="ui page grid">
    <div class="seven wide column"></div>
    <div class="nine wide column"><H2>Tool Cost Summary</H2></div>
    <div class="six wide column">

    </div>
    <div class="nine wide column" >
        <h3 class="col-xs-6 text-right " >{{date dtStart "ll"}}
            To {{date dtEnd "ll"}}        
        </h3>
    </div>

    <div class="sixteen wide column">
        <div  class="ui teal button" 
            data-title="Tool Cost Summary" 
            data-content="Description: This report sums all of the issues from the tool bosses and crib 
            for a part number for a specified date range and department(s).  
            It also displays the current M2M Job Number, pieces produced, value added sales, total 
            and cunsumable tool costs as well as a Tool Cost / Value Add Sales percentage."
            data-variation="very wide">Description        
        </div>
    </div>
</div>


<div class="ui page grid">
    <div class="seven wide column"></div>
    <div class="nine wide column"><H2>Tool Cost Summary</H2></div>
    <div class="six wide column">
    </div>
    <div class="nine wide column" >
        <div  class="ui teal button" 
            data-title="Tool Cost Summary" 
            data-content="Description: This report sums all of the issues from the tool bosses and crib 
            for a part number for a specified date range and department(s).  
            It also displays the current M2M Job Number, pieces produced, value added sales, total 
            and cunsumable tool costs as well as a Tool Cost / Value Add Sales percentage."
            data-variation="huge wide">Description        
        </div>
    </div>

    <div class="sixteen wide column">
    </div>
</div>
<div class="ui button popup-button1">Show flowing popup  </div>
<div class="ui flowing popup top left transition hidden">
  <div class="ui three column divided center aligned grid">
    <div class="column">
      <h4 class="ui header">Basic Plan</h4>
      <p><b>2</b> projects, $10 a month</p>
      <div class="ui button">Choose</div>
    </div>
    <div class="column">
      <h4 class="ui header">Business Plan</h4>
      <p><b>5</b> projects, $20 a month</p>
      <div class="ui button">Choose</div>
    </div>
    <div class="column">
      <h4 class="ui header">Premium Plan</h4>
      <p><b>8</b> projects, $25 a month</p>
      <div class="ui button">Choose</div>
    </div>
  </div>
</div>


<!--
<div class="container"> 
     <div  class="row" >
        <h3 class="col-xs-6 text-right " >Tool Cost Summary
        </h3>
      </div>
     <div  class="row" >
        <h5 class="col-xs-6 text-right " >{{date dtStart "ll"}}
        To {{date dtEnd "ll"}}        
        </h3>
      </div>
</div>      
-->





<!--
<div class="ui teal button" 
data-title="Using click events" 
data-content="Clicked popups will close if you click away, but not if you click inside the popup">Click Me</div>

<div class="ui icon input">
  <input type="text" placeholder="Focus me..." 
  data-content="You can use me to enter data">
  <i class="search icon"></i>
</div>

<button class='ui center floated tiny circular icon button popup-button1' 
    data-html="<div class='ui buttons'>
    <button class='ui icon facebook button'><i class='ui icon facebook'></i></button>
    <button class='ui icon google plus button'><i class='ui icon google plus'></i></button>
    <button class='ui icon twitter button'><i class='ui icon twitter'></i></button>
    </div>" >
    <i class='ui share alternate icon'></i>
</button>
-->


<div id='detail'></div>
<table id="ex1" class="display" width="100%"></table>

  <script>
    /*
    html-with-browser-client recipe automatically adds global jsreport object
    which includes the rendering inputs - jsreport.template, jsreport.data
    and also function render and download to dynamically render reports from the browser
    */

    function runWorkSumTransactions(partNumber) {
alert('partNumber=>'+partNumber);
//display report in the new tab
jsreport.render('_blank', { 
            template: { 
                name: 'HtmlToBrowserClient',
            },
            data:{
              "dtStart": jsreport.data.dtStart,
              "dtEnd": jsreport.data.dtEnd,
              "partNumber":partNumber,
              "rptName":'WorkSumTransactions'
            }
        });
        
        // render "country detail" template into detail div
        // this creates iframe inside the div with the html content, which avoids scripts and styles collision
/*
        jsreport.render("detail", { 
            template: { 
                name: 'WorkSumTransactions',
            },
            data:{
              "dtStart": "01-1-2017 00:00:00",
              "dtEnd": "01-12-2017 23:15:10",
              "partNumber":"000 560 175 006"
            }
        })
        $('iframe')[0].onload =function () {
            this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
        }
  */      
        
    }
// http://numeraljs.com/#format
    Number.prototype.formatMoney = function(places, symbol, thousand, decimal) {
    	places = !isNaN(places = Math.abs(places)) ? places : 2;
    	symbol = symbol !== undefined ? symbol : "$";
    	thousand = thousand || ",";
    	decimal = decimal || ".";
    	var number = this, 
    	    negative = number < 0 ? "-" : "",
    	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    	    j = (j = i.length) > 3 ? j % 3 : 0;
    	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };
// Remove non-numeric chars (except decimal point/minus sign):
//priceVal = parseFloat(price.replace(/[^0-9-.]/g, '')); // 12345.99
    $(document).ready(function() {
        // var table = $('table.display').DataTable();
        //https://datatables.net/examples/basic_init/dom.html
        var table = $('#example').DataTable( {
            order: [[0, 'asc']],
                "scrollY":        false,
                "scrollX":        false,
                 "scrollCollapse": false,
                "lengthMenu": [[10, 15, -1], [10, 15, "All"]],
        "dom": '<"wrapper"fltip>',
              rowGroup: {
                startRender: null,
                endRender: function ( rows, group ) {
                    var myNumeral = numeral(1000);
                    var pcsProducedSum = rows
                        .data()
                        .pluck(3)
                        .reduce( function (a, b) {
                            var nca = numeral(a).value();
                            var ncb = numeral(b).value();
                            return nca + ncb*1;
                        }, 0);
                    var actualToolCostSum = rows
                        .data()
                        .pluck(7)
                        .reduce( function (a, b) {
                            var nca = numeral(a).value();
                            var ncb = numeral(b).value();
                            return nca + ncb*1;
                        }, 0);
     
                    return $('<tr/>')
                        .append( '<td colspan="3">Totals for plant '+group+'</td>' )
                        .append( '<td style="text-align:right;">'+numeral(pcsProducedSum).format('(0,0.00)')+'</td>' )
                        .append(',<td colspan="3">&nbsp</td>')
                        .append( '<td>'+numeral(actualToolCostSum).format('($0,0.00)')+'</td>' );

                },
                dataSrc: 0
            }


        } );

/*
$('.popup-button1').popup({
	inline: true,
	on: 'click',
	position: 'top center'
});
*/
$('.ui.sidebar').sidebar({
    context: $('.bottom.segment')
  })
  .sidebar('attach events', '.menu .item');
  

    $('.teal.button')
      .popup({
        on: 'click'
      });
      /*
    $('input')
      .popup({
        on: 'focus'
      });
      */
        $('#example tbody').on('click', 'tr', function () {
            var data = table.row( this ).data();
            alert( 'You clicked on '+data[1]+'\'s row' );
            runWorkSumTransactions(data[1]);
        } );
    } );    


  </script>
</body>
</html>