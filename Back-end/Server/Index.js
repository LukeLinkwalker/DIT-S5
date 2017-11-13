const http = require('http');
const cluster = require('cluster');
const os = require('os');

class Server {
    constructor(options) {
        this._debugging = true;             
        this._caching = false;   
        this._authenticating = false;    
        this._cores = os.cpus().length;   

        if(options != undefined) {
            if(options.debug != undefined) {
                this._debugging = (options.debug == true);
            }
    
            if(options.cache != undefined) {
                this._caching = (options.cache == true);
            }

            if(options.authenticate != undefined) {
                this._authenticating = (options.authenticate == true);
            }

            if(options.threading != undefined) {
                if(!(options.threading == true)) {
                    this._cores = 1;
                }
            }
        }
    }

    listen(port) {
        if(cluster.isMaster) {
            if(this._debugging) {
                console.log(`Setting up server to handle requests on port ${port}`);
                console.log('Forking work ..');
            }

            for(var i = 0; i < this._cores; i++) {
                cluster.fork();
            }
        } else {
            if(this._debugging) {
                console.log(`Spawned worker with pid: ${process.pid}`)
            }

            http.createServer((request, response) => {
                request.on('data', async function() {

                })
                .on('end', async function(){
                    response.end();
                })
            }).listen(port);
        }
    }
}

exports.createServer = function(options) {
    return new Server(options);
};