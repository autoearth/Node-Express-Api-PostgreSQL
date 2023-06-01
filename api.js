const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(5500, ()=>{
    console.log("Sever is now connecting at port 3000");
})
client.connect();

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.get('/users/:id', (req, res)=>{
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(id, fname, lname, location) 
                       values(${user.id}, '${user.fname}', '${user.lname}', '${user.location}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Inserted successfully')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set fname = '${user.fname}',
                       lname = '${user.lname}',
                       location = '${user.location}'
                       where id = ${user.id}`

    client.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Updated successfully')
        }
        else{ console.log(err.message) }
    })
    client.end;
})


app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deleted successfully')
        }
        else{ console.log(err.message) }
    })
    client.end;
})