//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { response } = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, response){
      const firstname = req.body.fname;
      const lastname = req.body.lname;
      const mail = req.body.mail;
      const password = req.body.pw;

      const data = {
        members : [
            {
                email_address: mail,
                status: "subscribed",
                merge_field: {
                    FNAME: firstname,
                    LNAME: lastname,
                }
            }
        ]
      };

      const jsonData = JSON.stringify(data);
      const url = "https://us11.api.mailchimp.com/3.0/lists/d8e53d3a6e";

      const option = {
        method: "post",
        auth: "prasshy:60ad4ec24e4863dd783bc7308211df31-us11"
      }

      const request = https.request(url,option,function (response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
    console.log(JSON.parse(data));
      })
      }) 
    request.write(jsonData);
    request.end();
      });
app.post("/failure", function(req,req){
       res.redirect("/");
});

app.listen(3000, function(){
    console.log("server starts")
});


// api key - 60ad4ec24e4863dd783bc7308211df31-us11
// id - d8e53d3a6e
