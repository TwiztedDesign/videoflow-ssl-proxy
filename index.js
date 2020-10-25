
const config  = require('./config')[process.env.NODE_ENV || 'producation'];
const proxy = require('redbird')(config.server);
const ROUTES = {};
const UPDATE_INTERVAL = 1000 * 60 * 10;
const DB_NAME = process.env.DB_NAME;
let Mongo = require('./utils/db');
let mongo = new Mongo(config.db.url);


async function queryDatabase (db) {
	return db.collection('channels').find({whitelist_domains : { $exists: true, $ne: [] }}).toArray();
}
async function findUser(db, user) {
	return db.collection('users').findOne({_id : mongo.ObjectId(user)});
}

async function registerRoutes(){
	let db = await mongo.connect(DB_NAME);
	let channels = await queryDatabase(db);
	for (const channel of channels) {
		let user = await findUser(db, channel.user); //user user or organization_owner?
		let route = {
			to: `https://${channel.token}.videoflow.io/`,
			options: {
				ssl: {
					letsencrypt: {
						email: user.local.email, // Domain owner/admin email
						production: true, // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
					}
				}
			}
		}

		for (const domain of channel.whitelist_domains) {
			if(!ROUTES[domain]){
				console.log(`Register Custom Domain: ${domain} => ${route.to}`);
				proxy.register(domain, route.to, route.options);
				ROUTES[domain] = true;
			} else {
				// console.log(domain + ' already registered');
			}

		}
	}
}
try{
	registerRoutes();
} catch (e) {
	console.error(e);
}

setInterval(()=> {
	try{
		registerRoutes();
	} catch (e) {
		console.error(e);
	}
}, UPDATE_INTERVAL);



console.log('Server started on port:' , process.env.PORT || 80);



