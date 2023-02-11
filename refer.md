Build the custom docker image pgshard from the current directory

`docker build -t pgshard .`

Run the docker container from the custom image built

`docker run --name pgshard1 -p 5432:5432 -d pgshard -e POSTGRES_PASSWORD=postgres`

`docker run --name pgshard2 -p 5433:5432 -d pgshard -e POSTGRES_PASSWORD=postgres`

`docker run --name pgshard3 -p 5434:5432 -d pgshard -e POSTGRES_PASSWORD=postgres`

or run the docker-compose

`docker-compose -f docker-compose.yml up`

Http post from console to test
`fetch('http://localhost:8081?url=http://anyurl.com', {method: 'POST'}).then(r => r.json()).then(console.log)`

```
let urls = [];
for(let i=0; i<100;i++) 
    urls.push(`https://google.com?q=test${i}`);

urls.forEach(u => fetch(`http://localhost:8081?url=${u}`, {method: 'POST'})
.then(r => r.json())
.then(console.log));

```






