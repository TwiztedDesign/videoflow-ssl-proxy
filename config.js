const customResolver1 = function(host, url, req) {
	console.log("HOST:", host);
	console.log("URL:", url);
};

// assign high priority
customResolver1.priority = 100;


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
	db : {
		name: process.env.DB_NAME,
		url : process.env.DB_URL
	},
	server,
	UPDATE_INTERVAL : 1000 * 60 * 10
};
