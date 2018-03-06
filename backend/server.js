const Express = require('express');
const app = Express();

app.use(Express.static('./frontend'));

app.get('/',(req,res)=>{
	res.sendfile("index.html");
});

app.listen(8080);

console.log("app listening on 8080");