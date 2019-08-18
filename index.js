#!/bin/env node

const dns = require('dns');
const util = require('util');
const express = require('express');

var app = express();

const resolve4 = util.promisify(dns.resolve4);
const reverse = util.promisify(dns.reverse);

let cache = [];

/**
 * Get a list of base urls of all available radio-browser servers
 * Returns: array of strings - base urls of radio-browser servers
 */
async function get_radiobrowser_base_urls() {
    return resolve4("all.api.radio-browser.info").then(hosts => {
        let jobs = hosts.map(host => reverse(host));
        return Promise.all(jobs);
    }).then(hosts => {
        hosts.sort();
        return hosts.map(host_arr => "https://" + host_arr[0]);
    });
}

/**
 * Update the cached list of hosts to redirect to
 */
function updateCache() {
    get_radiobrowser_base_urls().then(hosts => {
        if (cache.join(',') !== hosts.join(',')) {
            console.log("changed redirect list:", hosts.join(','));
            cache = hosts;
        }
    }).catch(err => {
        console.error(err);
    }).then(() => {
        setTimeout(() => { updateCache(); }, 5000);
    });
}
// update cache first time
updateCache();

app.get('/', function (req, res) {
    var random_host = cache[Math.floor(Math.random() * cache.length)];
    res.redirect(302, random_host);
});

app.listen(3000, function () {
    console.log('Automatic redirect app listening on port 3000!');
});

