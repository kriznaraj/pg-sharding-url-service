# pg-sharding-url-service

Demonstrates database sharding using Postgres.

## Set up Docker container

Build the custom docker image pgshard from the current directory

`docker build -t pgshard .`

Run the docker-compose

`docker-compose -f docker-compose.yml up`


# URL service

Load dummy data using the below script modify the valriables accordingly

```
let urls = [];
for(let i=0; i<100;i++) 
    urls.push(`https://google.com?q=test${i}`);

urls.forEach(u => fetch(`http://localhost:8081?url=${u}`, {method: 'POST'})
.then(r => r.json())
.then(console.log));

```


Get the URL using the urlId

```
http://localhost:8081/{urlId}`

fetch(`http://localhost:8081?url=${urlId}`, {method: 'GET'})
.then(r => r.json())
.then(console.log));
```
