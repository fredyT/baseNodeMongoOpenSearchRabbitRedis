var tmphost = process.env.NODE_HOST || 'localhost';
var  tmpport = process.env.NODE_PORT || 8080;
console.log("node host is " + tmphost);
let appConfig = {
    NODE_HOST : tmphost,
    NODE_PORT : tmpport
}

module.exports = appConfig
