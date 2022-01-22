var tmphost = process.env.RABBIT_HOST || 'localhost';
console.log("node host is " + tmphost);
let rabbitConfig = {
    RABBIT_HOST : tmphost
}

module.exports = rabbitConfig