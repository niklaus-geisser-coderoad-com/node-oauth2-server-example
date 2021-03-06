var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server'),
	cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
	var response = {
		username : "pedroetb"
	}
	res.send(response);
});

app.use(app.oauth.errorHandler());

app.listen(3000);
