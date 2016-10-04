//jshint node: true
//jshint esnext: true
'use strict';
var Server = require('http').Server;
var path   = require('path');
var fs     = require('fs');
var glob   = require('glob');

const PORT = 3000;
const JS_PATTERN = './**/*.js';
const JS_SRC = path.join(__dirname, './src');

var server = new Server();

server.listen(PORT, function() {
    console.log('Server launched on port ' + PORT);
});

function waterfall(items, iter, cb) {
    if (items.length === 0) {
        cb(null);
    } else {
        var item = items[0];
        var iterCb = iter(item);
        iterCb(function(err) {
            if (err) {
                cb(err);
            } else {
                waterfall(items.slice(1), iter, cb);
            }
        });
    }
}

server.on('request', function(request, response) {
    //Serve static
    if (request.method === 'GET') {
        let urlPath = request.url
            .replace(/\?.*/)
            .replace(/#.*/);

        if (~['/', 'index', 'index.html'].indexOf(urlPath)) {
            let filePath = 'index.html';
            fs.readFile(filePath, function(err, data) {
                if (err) {
                    console.error(err);
                    response.statusCode = 500;
                    response.end();
                    return;
                }
                response.end(data);
            });
            return;
        }

        if ('/bundle.js' === urlPath) {
            glob(JS_PATTERN, {
                cwd: JS_SRC
            },
            function(err, matches) {
                if (err) {
                    console.error(err);
                    response.statusCode = 500;
                    response.end();
                    return;
                }
                console.log(matches);
                response.writeHead(200);
                var count = matches.length;
                if (count === 0) {
                    response.end();
                }
                waterfall(matches, function(fileName) {
                    return function(cb) {
                        fs.readFile(path.join(JS_SRC, fileName), function(err, data) {
                            if (!err) { 
                                response.write(data);
                            }
                            cb(err, data);
                        });
                    };
                }, function(err) {
                    if (err) {
                        response.statusCode = 500;
                        response.end();
                    } else {
                        response.statusCode = 200;
                        response.end();
                    }
                });
            });
            return;
        }

        fs.readFile(path.join(__dirname, urlPath), function(err, data) {
            if (err) {
                response.statusCode = 404;
                response.end();
            } else {
                response.write(data);
                response.end();
            }
        });
    }
});

