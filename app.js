const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
       res.write("hello sudhir")
       res.end();
    }

    if(req.url === '/demo'){
        res.write('showing demo response');
        console.log("say hi")
        res.end();
    }
})

server.listen(3000);
