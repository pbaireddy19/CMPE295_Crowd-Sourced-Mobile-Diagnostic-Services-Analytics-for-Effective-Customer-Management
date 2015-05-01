/**
 * New node file
 */


var server = require('../app');
var connPool = [];

function connect()
{
	try
	{
		var connection = server.sql.createConnection({
			host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
			user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
			password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
			port: process.env.OPENSHIFT_MYSQL_DB_PORT,
			database: process.env.OPENSHIFT_GEAR_NAME
		});

		connection.connect();

		return connection;
	}
	catch(e)
	{
		console.log("Error in connecting to the database" + e);
		return null;
	}
}

function initializepool(connections)
{
	for (var i = 0; i < connections; i++)
	{
		connPool.push(connect());
	}
}

function getConnection()
{
	if(connPool.length >=1 )
	{
		return connPool.pop();
	}
}

function returnConnection(connection)
{
	connPool.push(connection);
}

exports.initializepool = initializepool;
exports.getConnection = getConnection;
exports.returnConnection = returnConnection;