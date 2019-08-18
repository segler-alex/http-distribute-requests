# http-distribute-requests
## About
Distributes http requests it receives to other http addresses by doing http redirects.

## Config
Settings are set by environment variables:
* DNS_NAME - mandatory, DNS name to check for ip addresses to redirect to
* REFRESH_TIME - optional, milliseconds to wait for recheck dns, default 5000

## Usage
### Native
```bash
npm i
DNS_NAME="name.example.com" npm start
```

### Docker
```bash
docker run -d --name http_distribute --restart=always -p 80:3000 -e DNS_NAME="name.example.com" segleralex/http-distribute-requests
```
