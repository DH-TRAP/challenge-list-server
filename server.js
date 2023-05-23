const http = require('http');
const url = require('url');
const fs = require('fs');
require('dotenv').config();

// const hostname = process.env.HOST ? '127.0.0.1' : null;
const port = 10000;

const server = http.createServer((req, res) => {
  const { query, path } = url.parse(req.url, true);

  const home = fs.readFileSync(`${__dirname}/home.html`, 'utf-8');
  const challenge1 = fs.readFileSync(`${__dirname}/challenges/1-Top-Double.html`, 'utf-8');
  const challenge2 = fs.readFileSync(`${__dirname}/challenges/2-Even sum from array.html`, 'utf-8');
  const challenge3 = fs.readFileSync(`${__dirname}/challenges/3-Roman to Integer.html`, 'utf-8');
  const challenge4 = fs.readFileSync(`${__dirname}/challenges/4-svg animation.html`, 'utf-8');
  const error = () => {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'challenge-header': '404 Not found'
    });
    res.end('opps! page not found(404).');
  }

  if (path == '/' || path == '/home') {
    res.writeHead(200, {
      'Content-type': 'text/html',
      'project-header': 'first-node-project'
    });
    res.end(home);
  }

  else if (path.includes('/challenge')) {
    res.writeHead(200, {
      'Content-type': 'text/html',
      'challenge-header': `${path.slice(1)}`
    });
    if (path === '/challenge-1') res.end(challenge1);
    else if (path === '/challenge-2') res.end(challenge2);
    else if (path === '/challenge-3') res.end(challenge3);
    else if (path === '/challenge-4') res.end(challenge4);
    else error();
  }
  else error();
});

server.listen(port, hostname, () => {
  console.log(`server Running at ${port} from ${__dirname}`)
})