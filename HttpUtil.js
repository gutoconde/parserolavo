'use strict';

const https = require('https');

module.exports.recuperarPagina = (url) => {
    const promise = new Promise( (resolve, reject) => {
        
        const options = {
            method: 'GET',
            headers: {
                Cookie: 'security=true; path=/'
            }
        };
        
        https.get(url, options, (response) => {
            response.setEncoding('utf8');
            let html = '';
            
            response.on('data', (chunk) => {
                html += chunk;
            });
        
            response.on('end', () => {
                resolve(html);
            });
        }).on('error', (err) => {
            reject(err);
        });
    }); 
    return promise;
};