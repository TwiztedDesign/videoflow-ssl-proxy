
const config  = require('./config')[process.env.NODE_ENV || 'production'];
const proxy = require('redbird')(config.server);


config.routes.forEach(route => {
	proxy.register(route.from, route.to, route.options);
})

console.log('Server started on port:' , process.env.PORT || 80);



