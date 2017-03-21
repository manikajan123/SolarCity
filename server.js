const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: 'manika',
    database: 'solarcity',
    debug: false
});

const app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3001));





function databaseStore(req, res, post) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log("Error");
        }

        connection.query("INSERT INTO contactinfo SET ?", post, function(err, rows) {
            connection.release();
            if (!err) {
                console.log(rows.insertId);
            }
        });

        connection.on('error', function(err) {
            console.log("error2")

        });
    });
}


app.post('/form', function(req, res, next) {
    console.log(req.body);
     databaseStore(req, res, req.body);
    res.json({ 'status': 'ok' });

});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
