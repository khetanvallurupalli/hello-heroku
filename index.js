const http = require('http');
const { Client } = require('pg');

const PORT = process.env.PORT || 5000;
const { DATABASE_URL } = process.env;
const server = http.createServer((req, res) => {
  const client = new Client({
    connectionString: "postgres://eazwukoicfoaif:5bdd452dbdf855a81f77d1c225300421e22c6ea9d87adc73c2deae759308b52d@ec2-54-225-242-183.compute-1.amazonaws.com:5432/d2rkbvpbbgm7mu",
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
