const mysql = require("mysql");
var express = require("express");
var Joi = require("joi");
var emprouter=express();
const connection = mysql.createConnection({
    host:'192.168.43.29',
    user:'root',
    password:'manager',
    database:'mydatabase',
    port:3307

});

var myData=[];
connection.connect();
function validate(bodycontent)
{
    const schema ={
        "no": Joi.number().required(),
        "name": Joi.string().required(),
        "address": Joi.required()
    }
    return Joi.validate(bodycontent,schema);
}

emprouter.get("/",function(request,response){
    connection.query("select * from emp",function(err,result){
        if(err == null)
        {
            myData=result;
            response.contentType("application/json");
            response.send(JSON.stringify(myData));
        }
        else{
            response.send("something wrong!!");
        }
    });
});
emprouter.get("/:no",function(request,response){
    connection.query(`select * from emp where no=${request.params.no}`,function(err,result){
        if(err == null)
        {
            myData=result;
            response.contentType("application/json");
            response.send(JSON.stringify(myData));
        }
        else{
            response.send("something wrong!!");
        }
    });
});

emprouter.post("/",function(request,response){
    let rv=validate(request.body);

    if(rv.error==null)
    {
        let no=parseInt(request.body.no);
        let name=request.body.name;
        let address=request.body.address;

        let query=`insert into emp values(${no},'${name}','${address}')`;
        console.log(query);
        connection.query(query,function(err,result){
            if(err==null)
            {
                response.contentType("application/json");
                response.send(JSON.stringify(result));
            }
            else{
                response.contentType("application/json");
                response.send(err);
            }
        });
    }
    else
    {
        response.contentType("application/json");
        response.send(JSON.stringify(rv));
    }
});
emprouter.put("/:no",function(request,response){
    let no = parseInt(request.params.no);
    let name = request.body.name;
    let address=request.body.address;

    let query=`update emp set name='${name}',address='${address}' where no=${no}`;

    console.log(query);

    connection.query(query,function(err,result){
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(err);
        }
    });
});
emprouter.delete("/:no",function(request,response){
    let no=parseInt(request.params.no);
    let query=`delete from emp where no='${no}'`;
    console.log(query);
    connection.query(query,function(err,result){
        if(err==null)
        {
            response.contentType("application/json");
            response.send(JSON.stringify(result));
        }
        else{
            response.contentType("application/json");
            response.send(err);
        }
    });
});
module.exports=emprouter;
