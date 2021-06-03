const express = require('express');
const { join } = require('path');
const port = 3000;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static('public'));

app.use('*', (req, res, next) => {
  //logger
  let time = new Date();
  console.log(
    `${req.method} to ${
      req.originalUrl
    } at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );

  next();
});

// requested by index.html
app.get('/bundle.js', (req, res) => {
  // if the browser accepts brotli-compressed files, send them
  if (req.header('Accept-Encoding').includes('br')) {
    console.log('using brotli');
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, '../', 'dist', 'bundle.js.br'));
  } else if (req.header('Accept-Encoding').includes('gz')) {
    console.log('using gzip');
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, '../', 'dist', 'bundle.js.gz'));
  } else {
    console.log('using uncompressed file');
    res.sendFile(join(__dirname, '../', 'dist', 'bundle.js'));
  }
});

app.use((req, res) => {
  res.sendFile(join(__dirname, '../', 'dist', 'index.html'));
});

app.listen(port, '', (req, res) => console.log(`Listening on port ${port}`));
