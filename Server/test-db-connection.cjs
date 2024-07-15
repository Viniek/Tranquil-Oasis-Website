const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:4241@localhost:5432/apartment'
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack))
  .finally(() => client.end());
