var express = require("express");
var fs = require("fs");
var passwordHash = require("password-hash");
var fileUpload = require('express-fileupload');
var exec = require("child_process").exec;
var sys = require("sys");
var app = express();
app.use(express.static('view'));
app.use(fileUpload());

app.get('/', function(request, response) {
	response.redirect("login.html")
});

app.get('/check', function(request, response) {
	console.log("request aa gayi!");

	fs.readFile('users.csv', function(err, data) {
		if(err) {
			response.send("error!");
		}

		var users = data.toString().split('\n');
		var n = users.length;
		var uname = request.query.uname;
		var pass = request.query.pass;

		for(var i=0;i<n;i++) {
			var det = users[i].split(',');

			if(det[0] == uname) {
				if( passwordHash.verify(pass, det[1]) == true ) {
					response.end("2");
				}
				else {
					response.end("1");
				}
			}

		}
		response.end("0");
	})
});

app.get('/newUser', function(request, response) {

	var uname = request.query.uname;
	var pass = request.query.pass;
	var hashedPass = passwordHash.generate(pass);
	var fl = 0;

	fs.readFile('users.csv', function(err, data) {
		if(err) {
			response.send("error!");
		}

		var users = data.toString().split('\n');
		var n = users.length;
		var uname = request.query.uname;
		var pass = request.query.pass;

		if(uname == 'undefined') {
			response.end('0');
		}

		for(var i=0;i<n;i++) {
			var det = users[i].split(',');

			if(det[0] == uname) {
				fl = 1;
				response.end('0')
				break;
			}
		}

		if(fl == 0 && uname != 'undefined') {
			fs.appendFile('users.csv', uname+','+hashedPass+'\n', function(err) {
				if(err) {
					response.end('0');
				}
			});
			response.end('1');
		}
	})
});

app.post("/upload", function(request, response) {
	var sampleFile;
 
    if (!request.files) {
        response.send('Noooo files were uploaded.');
        return;
    }
 
    sampleFile = request.files.code;
    sampleFile.mv('./temp/code.cpp', function(err) {
        if (err) {
            response.status(500).send(err);
        }
        else {
        	var send = [];
            for(var i=1;i<=3;i++) {
				exec("bash ./bash/script.sh power " + i, function puts(error, stdout, stderr) { 
					if(stdout[2] == "0") {
						var tt = {};
						tt[stdout[0]] = 1;
						send.push(tt);
					}
					else {
						var tt = {};
						tt[stdout[0]] = 0;
						send.push(tt);
					}
				});

				if(i == 3) {
					setTimeout(function() {
						console.log("checking complete!");
		            	response.send(send);
		            }, 500);
				}
	        }
        }
    });
});

var server = app.listen(3000, function() {
});