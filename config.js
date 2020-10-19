const customResolver1 = function(host, url, req) {
	console.log("HOST:", host);
	console.log("URL:", url);
};

// assign high priority
customResolver1.priority = 100;


const server = {
	port: process.env.PORT || 80, // http port is needed for LetsEncrypt challenge during request / renewal. Also enables automatic http->https redirection for registered https routes.
	resolvers: [
		customResolver1
	],
	letsencrypt: {
		path: __dirname + '/certs',
		port: 9999 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
	},
	ssl: {
		http2: true,
		port: 443, // SSL port used to serve registered https routes with LetsEncrypt certificate.
	},
	xfwd: true,
	bunyan : true
};


module.exports = {

	development : {

		server,

		routes : [
			{
				from    : "ssl1.localhost.io",
				to   : "http://127.0.0.1:3002",
				options : {
					// ssl: {
					// 	letsencrypt: {
					// 		email: 'ddumansky@gmail.com', // Domain owner/admin email
					// 		production: false, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
					// 	}
					// }
				}
			},
			// {
			// 	from    : "ssl2.localhost.io",
			// 	to   : "http://github.com",
			// 	options : {
			// 		ssl: {
			// 			letsencrypt: {
			// 				email: 'ddumansky@gmail.com', // Domain owner/admin email
			// 				production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
			// 			}
			// 		}
			// 	}
			// }
		]
	},

	production : {

		server,

		routes : [
			{
				from : "sslproxy2.videoflow.io",
				to   : "https://www.videoflow.io/channel/vfc-rjso5f-r8",
				options : {
					ssl: {
						letsencrypt: {
							email: 'jan.umansky@twizted-design.com', // Domain owner/admin email
							production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
						}
					}
				}
			},
			{
				from : "channel.flowgic.io",
				to   : "https://www.videoflow.io/channel/vfc-rlci0r7p5",
				options : {
					ssl: {
						letsencrypt: {
							email: 'jan.umansky@twizted-design.com', // Domain owner/admin email
							production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
						}
					}
				}
			},
			// {
			// 	from : "videoflow-ssl-proxy.herokuapp.com",
			// 	to   : "http://vfc-rjso5f-r8.videoflow.io",
			// 	options : {
			// 		ssl: {
			// 			letsencrypt: {
			// 				email: 'jan.umansky@twizted-design.com', // Domain owner/admin email
			// 				production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
			// 			}
			// 		}
			// 	}
			// },
			// {
			// 	from : "defined-wasabi-l5yr3vepvwygt207njxj7yln.herokudns.com",
			// 	to   : "http://vfc-rjso5f-r8.videoflow.io",
			// 	options : {
			// 		ssl: {
			// 			letsencrypt: {
			// 				email: 'jan.umansky@twizted-design.com', // Domain owner/admin email
			// 				production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
			// 			}
			// 		}
			// 	}
			// },

			// {
			// 	from    : "sslproxy2.videoflow.io",
			// 	to   : "http://github.com"
			// }
		]
	}
};
