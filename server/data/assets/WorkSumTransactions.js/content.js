<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Tool Transactions</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.16/css/jquery.dataTables.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.16/js/jquery.dataTables.js"></script>

</head>
<body>

<div class="row">
    <div class="col-md-1">
        <table id="example" class="display" cellspacing="0" width="100%">
            <thead>
            <tr>
                <th>Part</th>
                <th>Item</th>
                <th>Description</th>
                <th>Plant</th>
                <th>Name</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
                {{#each transactions}}
                    <tr>
                        <td>{{partNumber}}</td>
                        <td>{{itemNumber}}</td>
                        <td>{{description}}</td>
                        <td>{{Plant}}</td>
                        <td>{{userName}}</td>
                        <td>{{date transTime "lll"}}</td>
                        <!--  https://momentjs.com/ -->
                    </tr>
                {{/each}}
            </tbody>
        </table>
    </div>
</div>
</br>
<div class="row">
  <div class="col-xs-1 col-xs-offset-8">
        <!-- Standard button -->
        <button type="button" onclick="downloadExcel()" class="btn btn-default">Excel</button>
  </div>
</div>



  <script>
    /*
    html-with-browser-client recipe automatically adds global jsreport object
    which includes the rendering inputs - jsreport.template, jsreport.data
    and also function render and download to dynamically render reports from the browser
    */
    $(document).ready(function() {
        alert('partNumber=> ' + jsreport.data.partNumber)
        var table = $('table.display').DataTable();
        $('#example tbody').on('click', 'tr', function () {
            var data = table.row( this ).data();
            alert( 'You clicked on '+data[0]+'\'s row' );
        } );
    } );    

    function downloadExcel() {
        jsreport.download(jsreport.data.partNumber + '.xlsx', {
            template: { 
                name: 'Xlsx'
            },
            data: {
                dtStart: jsreport.data.dtStart,
                dtEnd: jsreport.data.dtEnd,    
                partNumber:jsreport.data.partNumber,
                rptName: "WorkSumTrans"
            }
        })
    }

  </script>
</body>
</html>