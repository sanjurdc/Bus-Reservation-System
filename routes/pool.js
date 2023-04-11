var mysql=require("mysql");
var pool=mysql.createConnection({

    host:'localhost',
    port:3306,
    database:'bus_project',
    user:'root',
    password:'Sanjay@12',
   multiStatements:true

})
module.exports=pool;