var sql = require('mssql');
var Moment = require('moment');


var config = {
    user: 'sa',
    password: 'buschecnc1',
    //  server: '192.168.254.36', // You can use 'localhost\\instance' to connect to named instance
    //  server: '10.1.2.19', // You can use 'localhost\\instance' to connect to named instance
    server: 'busche-sql-1',
    database: 'M2MDATA01',
    //  database: 'm2mdata02',
    port: 1433,
    connectionTimeout:25000,
    requestTimeout:30000,
    //    debug: true,
    options: {
        encrypt: false // Use this if you're on Windows Azure
        // ,instanceName: 'SQLEXPRESS'
    }
}
var cribDefTO = {
    user: 'sa',
    password: 'buschecnc1',
    server: '10.1.2.17',
    options: {
        database: 'Cribmaster',
        port: 1433
    }
}

function beforeRender(done) {
    
     //       var dtStart =Moment(new Date()).format("MM-DD-YYYY hh:mm:ss");
    //       var dtEnd =Moment(new Date()).format("MM-DD-YYYY hh:mm:ss");
    console.log('hello2');
    //        done();

    sql.connect(config).then(function(err) {
        console.log(err);
    //    var rptName = request.data.rptName;
        var reqSql = new sql.Request();
var notUpToDate =0;

reqSql.query('select count(*) as notCurrent from ssis where uptodate = 0', 
    (err, result) => {
    // ... error checks

//    console.log(result.recordset[0].notCurrent) // return 1
    var obj1=result.recordset[0];

        var reqSql = new sql.Request();            
            reqSql.query('select * from btreportacc', (err, result) => {
                // ... error checks
           var obj2 = result.recordset[0]
var final = {};
for(var key in obj1) final[key] = obj1[key];
for(var key in obj2) final[key] = obj2[key];
                var myJSON = JSON.stringify(final);
                
                //var obj = { "name":"John", "age":30, "city":"New York"};
                //var myJSON = JSON.stringify(obj)
                //var t =myJSON.replace(/&quot;/g,'"'); // can't get this to work
                console.log(myJSON)
                        request.data = {
                            summary: result.recordset,
                            myJSON: myJSON
                        };
                    
                        done();
            })


})

/*
reqSql.query('select * from btreportacc', (err, result) => {
    // ... error checks
    console.log(result.recordset[0].NoToolListCnt) // return 1
    
            console.log(result.recordsets.length) // count of recordsets returned by the procedure
            console.log(result.recordsets[0].length) // count of rows contained in first recordset
            console.log(result.recordset) // first recordset from result.recordsets
            console.log(result.returnValue) // procedure return value
            console.log(result.output) // key/value collection of output values
            console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
            request.data = {
                summary: result.recordset,
                data: request.data
            };
        
            done();
})
*/
    }).catch(done);

}
