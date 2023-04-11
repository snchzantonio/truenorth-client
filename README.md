# Small and simple client

This is a simple client, it doesn't handle any logic, just pass requests to the api server.

# Setup

1. Go to `client` folder   
`cd client`  

1. Change the variable `VITE_API_BASE_URL` in `.env-example` to your api server domain

1. Copy the `.env-example` file to the `client` folder  
`cp .env-example ./client/.env`

1. Install dependencies and build:  
`npm i; npm build`  

1. Change the domain in the first line of `docker/caddy/Cadyfile` to the domain the client will use 

1. Start the file server:  
`docker compose up -d`  

1. Acces the client using the domain you set up in step 5