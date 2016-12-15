var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.static('view'));

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

		console.log(uname, pass);

		for(var i=0;i<n;i++) {
			var det = users[i].split(',');

			if(det[0] == uname) {
				if(det[1] == pass) {
					response.send("2");
				}
				else {
					response.send("1");
				}
			}

			else {
				response.send("0");
			}
		}
	})
});

app.get('/newUser', function(request, response) {

	var uname = request.query.uname;
	var pass = request.query.pass;

	console.log(uname, pass);

	fs.appendFile('users.csv', uname+','+pass+'\n', function(err) {
		if(err) {
			response.end('0');
		}
	});

	response.end('1');
});

var server = app.listen(3000, function() {
	//console.log("User++");
});