const webSocket = require('websocket');

var WebSocketServer = webSocket.server;
var http = require('http');

var server = http.createServer(function(req,res){

});

server.listen(1234, function(){
	console.log("server is listening on port 1234");
});

wsServer = new WebSocketServer({
	httpServer: server
});

var count =0;
var clients = {};
var convLog=[];

wsServer.on('request',function(r){
	var connection = r.accept('echo-protocol',r.origin)
	if(convLog.length)
		connection.sendUTF(convLog.join("<br>"));
	var id = count++;
	clients[id]=connection;
	//console.log("new client connected");
	connection.on('message',function(packet){
		data = JSON.parse(packet.utf8Data);
		convLog.push(data.name+": "+data.message);
		for(c in clients){
			clients[c].sendUTF(data.name+": "+data.message);	
		}
	});
	
});
