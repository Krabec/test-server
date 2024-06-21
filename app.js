const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3500;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.etf': 'application/font-otf',
    '.wasm': 'application/wasm',
};

function staticFile(res, filePath, ext) {
    res.setHeader("Content-Type", mimeTypes[ext]);
    fs.readFile('./public'+filePath, (err, data) => {
        if(err) {
            res.statusCode = 404;
            res.end();
        }
        res.end(data);
    })
}

http.createServer((req, res) => {
    const url = req.url;
    console.log(url)

    switch (url) {
        case '/':
            console.log('main page');
            res.write('<h1>Main</h1>');
            res.end();
            break;
        case '/contact':
            console.log('contact page');
            staticFile(res, '/contact.html', '.html');
            break;
        default:
            const extname = String(path.extname(url)).toLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, url, extname)
            }
            else {
                res.statusCode = 404;
                res.end();
            }
    }

}).listen(PORT);