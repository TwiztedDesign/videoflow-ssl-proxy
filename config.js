const customResolver1 = function(host, url, req) {
	console.log("HOST:", host);
	console.log("URL:", url);
};

// assign high priority
customResolver1.priority = 100;

const dbName = 'videoflow';

const server = {
	port: process.env.PORT || 80, // http port is needed for LetsEncrypt challenge during request / renewal. Also enables automatic http->https redirection for registered https routes.
	// resolvers: [
	// 	customResolver1
	// ],
	letsencrypt: {
		path: __dirname + '/certs',
		port: 9999 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
	},
	ssl: {
		http2: true,
		port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
	},
	httpProxy: {
		// This config allows HTTPS targets
		secure: false,
		changeOrigin: true,
	},
	xfwd: true,
	bunyan : true
};


module.exports = {

	development : {

		db : {
			name: dbName,
			url : 'mongodb://127.0.0.1/' + dbName
		},

		server
	},

	production : {

		db : {
			name: dbName,
			url : `mongodb://admin:Videoflow1@videoflow-shard-00-00.maspi.mongodb.net:27017,videoflow-shard-00-01.maspi.mongodb.net:27017,videoflow-shard-00-02.maspi.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-sxkn4p-shard-0&authSource=admin&retryWrites=false&w=majority`
		},

		server
	}
};
