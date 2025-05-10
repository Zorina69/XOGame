const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set file path based on request URL
    let filePath = path.join(__dirname, req.url === '/' ? 'HTML/Game.html' : req.url);
    const extname = path.extname(filePath);

    // Set default Content-Type
    let contentType = 'text/html';

    // Set correct Content-Type for various file types
    switch (extname) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.html':
            contentType = 'text/html';
            break;
    }

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Handle 404 error
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'HTML', '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    console.log('404 error: File not found');
                    res.end(content, 'utf-8');
                });
            } else {
                // Handle server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // Serve the file
            res.writeHead(200, { 'Content-Type': contentType });
            console.log(`Serving file: ${req.url}`);
            res.end(content, 'utf-8');
        }
    });
});

// Listen on the server IP and port
server.listen(3000, '10.180.126.46', () => {
    console.log('Server running at http://localhost:3000 or http://10.180.126.46:3000');
});
