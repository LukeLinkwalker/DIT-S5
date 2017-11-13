const ServerFactory = require('./Server');
const server = ServerFactory.createServer({
    // "debug":true
});
server.listen(20895);