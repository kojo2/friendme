const webSocket = require('websocket');

var WebSocketServer = webSocket.server;
var http = require('http');

var server = http.createServer(function(req,res){

});

server.listen(1234, function(){
	console.log("pong server is listening on port 1234");
});

wsServer = new WebSocketServer({
	httpServer: server
});

var count =0;
var clients = {};
var game = {
	paddle1: {
		positionX:0,
		positionY:0
	},
	paddle2: {
		positionX:0,
		positionY:0
	},
	ball: {
		positionX:0,
		positionY:0,
		speed:0,
		dirX:0,
		dirY:0
	},
	score: {
		player1:0,
		player2:0
	}
}

var number=0;



wsServer.on('request',function(r){
	var connection = r.accept('echo-protocol',r.origin)
	connection.on('close', function(reasonCode, description) {
	    delete clients[id];
	    console.log((new Date()) + ' Peer ' + id + ' disconnected.');
	});
	if(count==3){
		for(i in clients){
			delete clients[i];
			count=0;
		}
	}
	console.log("new user :)");	
	// when someone joins give them a number
	var id = count++;
	connection.sendUTF("id:"+id);
	clients[id]=connection;
	//console.log("new client connected");
	connection.on('message',function(packet){
		data = JSON.parse(packet.utf8Data);
		//console.log("data was: ");
		//console.log(data.dataType);
		if(parseInt(data.dataType)===1){
			//console.log("player 1 is moving");
			//master set
			game = {
				paddle1: {
					positionX:data.paddle1X,
					positionY:data.paddle1Y
				},
				paddle2: {
					positionX:game.paddle2.positionX
				},
				ball: {
					positionX:data.ballX,
					positionY:data.ballY,
					speed:data.ballSpeed,
					dirX:data.ballDirX,
					dirY:data.ballDirY
				},
				score: {
					player1:game.score.player1,
					player2:game.score.player2
				}
			}
		}else{
			//console.log("player 2 is moving");
			//slave set
			game.paddle2.positionX = data.paddle1X,
			game.paddle2.positionY = data.paddle1Y
		}
		for(c in clients){
			clients[c].sendUTF(JSON.stringify(game));
		}
		//console.log(game);
	});
	
});
