const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    console.log(req.url);

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
    }[extname] || 'text/plain';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h2>404 Not Found</h2>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h2>500 Server Error: ${err.code}</h2>`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const hostname = 'mabsisbeautiful.com';
const PORT = 80;


server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});