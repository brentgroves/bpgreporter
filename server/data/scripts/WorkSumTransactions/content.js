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
    console.log(request.data.dtStart);
    console.log(request.data.dtEnd);
    console.log(request.data.partNumber);
    //        done();

    sql.connect(config).then(function(err) {
        console.log(err);
        var dtStart = request.data.dtStart;
        var dtEnd = request.data.dtEnd;
        var partNumber = request.data.partNumber;
        var reqSql = new sql.Request();
        reqSql.input('dtStart', sql.VarChar(20), dtStart);
        reqSql.input('dtEnd', sql.VarChar(20), dtEnd);
        reqSql.input('partNumber', sql.VarChar(25), partNumber);
        console.log('***before bpGRPOStatusRpt call');

        return reqSql.execute('bpWorkSumTransactionsHTML', (err, result) => {
            // ... error checks
            var dateNow = new Date();
            var generatedOn = dateNow.toLocaleString();
         
            console.log(result.recordsets.length) // count of recordsets returned by the procedure
            console.log(result.recordsets[0].length) // count of rows contained in first recordset
            console.log(result.recordset) // first recordset from result.recordsets
            console.log(result.returnValue) // procedure return value
            console.log(result.output) // key/value collection of output values
            console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
            request.data = {
                transaction: result.recordset,
                generatedOn: generatedOn,
                dtStart: dtStart,
                dtEnd: dtEnd,
                partNumber:partNumber
            };
        
            done();
        });
    }).catch(done);

}

function afterRender(req, res, done) {
    //filter out script execution for phantom header
    if (req.options.isChildRequest) {
        return done();
    }
    return done();

}