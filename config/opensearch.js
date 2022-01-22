var theHost = process.env.OPENSEARCH_HOST || 'localhost';
console.log("process O ************** " + process.env.OPENSEARCH_HOST);
console.log("###########the host is######### " + theHost);
module.exports = {
    host : theHost,
    protocol : 'https',
    port : 9200,
    auth : 'admin:admin',// For testing only. Don't store credentials in code.
    ca_certs_path : './certs/root-ca.pem'
    };