
const config  = require('./config')[process.env.NODE_ENV || 'development'];
const proxy = require('redbird')(config.server);

config.routes.forEach(route => {
	proxy.register(route.from, route.to, route.options);
})



