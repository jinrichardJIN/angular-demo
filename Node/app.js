var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
});
server.on('request',function(req,res){
	res.end('hello world');
})
server.listen(80,'127.0.0.1');
