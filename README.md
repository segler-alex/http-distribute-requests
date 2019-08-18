# http-distribute-requests
## About
Distributes http requests it receives to other http addresses by doing http redirects.

## Config
Settings are set by environment variables:
* DNS_NAME - mandatory, DNS name to check for ip addresses to redirect to
* REFRESH_TIME - optional, milliseconds to wait for recheck dns, default 5000