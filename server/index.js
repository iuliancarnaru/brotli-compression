const express = require('express');
const { join } = require('path');
const FindFiles = require('file-regex');
const port = 3001;

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
app.get(/^\/main\.([0-9a-z]*?)\.js$/, (req, res) => {
  // if the browser accepts brotli-compressed files, send them
  const fileName = req.path.split('/')[1];

  if (req.header('Accept-Encoding').includes('br')) {
    console.log('using brotli');
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, '../', 'dist', `${fileName}.br`));
  } else if (req.header('Accept-Encoding').includes('gz')) {
    console.log('using gzip');
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, '../', 'dist', `${fileName}.gz`));
  } else {
    console.log('using uncompressed file');
    res.sendFile(join(__dirname, '../', 'dist', `${filename}`));
  }
});

app.use((req, res) => {
  res.sendFile(join(__dirname, '../', 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', (req, res) =>
  console.log(`Listening on port ${port}`)
);
