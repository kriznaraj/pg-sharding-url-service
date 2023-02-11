const app = require('express')();
const {Client} = require('pg');
const crypto = require('crypto');
//or const Client = require('pg').Client;

//Refer - https://www.npmjs.com/package/hashring
var HashRing = require('hashring');
var hr = new HashRing({
  '5432': 200,
  '5433': { weight: 200 }, // same as above
  '5434': 200
});


const clients = {
    '5432': new Client({
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
    '5433': new Client({
        host: 'localhost',
        port: '5433',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
    '5434': new Client({
        host: 'localhost',
        port: '5434',
        user: 'postgres',
        password: 'postgres',
        database: 'postgres'
    }),
}

connectDb();
async function connectDb() {
    clients['5432'].connect();
    clients['5433'].connect();
    clients['5434'].connect();
}

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/:urlId', async(req, res) => {
    const urlId = req.params.urlId;
    const server = hr.get(urlId);
    const result = await clients[server].query("SELECT * FROM URL_TBL WHERE URL_ID = $1", [urlId]);
    if(result.rowCount > 0) {
        res.send({
            urlId: urlId,
            server: server,
            result: result.rows
        });
    } else {
        res.sendStatus(404)
    }
    
});

app.post('/', async (req, res) => {
    const url = req.query.url;

    //consistently hash to get the shard node

    const hash = crypto.createHash('sha256').update(url).digest('base64');
    const urlId = hash.substring(0,5);
    const server = hr.get(urlId);
    await clients[server].query('INSERT INTO URL_TBL (URL, URL_ID) VALUES ($1, $2)', [url, urlId]);

    res.send({
        urlId: urlId,
        server: server,
        url: url
    });
});

app.listen('8081', () => {
    console.log('listening 8081');
})