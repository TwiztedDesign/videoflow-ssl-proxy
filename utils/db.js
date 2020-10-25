const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
let cachedDb = null;

const DB = function(connectionString){
	this.connectionString = connectionString;
}

DB.prototype.connect = async function(dbName){
	if (cachedDb && cachedDb.serverConfig.isConnected()) {
		console.log('=> using cached database instance');
		return Promise.resolve(cachedDb);
	}
	return MongoClient.connect(this.connectionString)
		.then(client => { cachedDb = client.db(dbName); return cachedDb; });
}

DB.prototype.ObjectId = function(id){
	return new mongo.ObjectID(id);
}

// function queryDatabase (db) {
// 	console.log('=> query database', db);
//
// 	return db.collection('organizations').find({}).toArray()
// 		.then((res) => { return { statusCode: 200, body: JSON.stringify(res) }; })
// 		.catch(err => {
// 			console.log('=> an error occurred: ', err);
// 			return { statusCode: 500, body: 'error' };
// 		});
// }

module.exports = DB;