const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;
const server = http.createServer((req, res) => {
  const client = new Client({
    connectionString: "postgres://wqpyzcyzfeotce:de5e64a491ea82ae592a1d79d235fe3ab6087a5735bb2a98fe6752abbd1f71fe@ec2-107-21-126-201.compute-1.amazonaws.com:5432/da1j2161nqhsa4",
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  client.connect()
    .then(() => client.query('SELECT * FROM hellotable'))
    .then((result) => {
      res.end(`${result.rows[0].name}\n`);
      client.end();
    })
    .catch(() => {
      res.end('ERROR');
      client.end();
    });
});
server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Server running on ${PORT}/`);
});
