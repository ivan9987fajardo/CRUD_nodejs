var express = require('express');
var app = express();
var mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory',
    multipleStatements: true
});



//Get all items
app.get('/', (req, res) => {
    
    mysqlConnection.query('SELECT * FROM items', (err, rows, fields) => {
        if (!err)
            
             res.render('index',{'itemlist' : rows});

        else
            console.log(err);
    })
});



//Delete an item
app.delete('/', (req, res) => {
    mysqlConnection.query('DELETE FROM items WHERE id = ?', [req.body.id], (err, rows, fields) => {
        if (!err)
            res.redirect('/');
           
        
        else
            console.log(err);
    })
});

//Insert an item
app.post('/', (req, res) => {
    let itm = req.body;
    var sql = "SET @name = ?;SET @qty = ?;SET @amount = ?; \
    INSERT INTO items (name,qty,amount) VALUES (@name,@qty,@amount);";
    mysqlConnection.query(sql, [itm.name, itm.qty, itm.amount], (err, rows, fields) => {
        if (!err){
            rows.forEach(element => {
                if(element.constructor == Array)
                res.redirect('/');
               
            

            });
            res.redirect('/');
        }
        else
            console.log(err);
    })
});

//Update an item
app.put('/', (req, res) => {
    let itm = req.body;
    var sql = "SET @id = ?;SET @name = ?;SET @qty = ?;SET @amount = ?; \
    UPDATE items SET name = @name, qty = @qty, amount = @amount WHERE id = @id;";
    mysqlConnection.query(sql, [itm.id, itm.name, itm.qty, itm.amount], (err, rows, fields) => {
        if (!err)
            res.redirect('/');
        else
            console.log(err);
    })
});

module.exports = app;