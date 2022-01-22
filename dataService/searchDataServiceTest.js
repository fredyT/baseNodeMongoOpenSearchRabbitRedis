//This is an example service that hits OpenSearch.
//Open search is powerful with facets/collection etc. Need to figure out 
//how to use. It performs really well too.
const { Client } = require('@opensearch-project/opensearch');
const openSearchConfig = require("../config/opensearch")
const fs = require('fs');
const client = new Client({
    node: openSearchConfig.protocol + '://' + openSearchConfig.auth + '@' + openSearchConfig.host + ':' + openSearchConfig.port,
    ssl: {
        ca: fs.readFileSync(openSearchConfig.ca_certs_path),
        rejectUnauthorized: false
        // You can turn off certificate verification (rejectUnauthorized: false) if you're using self-signed certificates with a hostname mismatch.
        // cert: fs.readFileSync(client_cert_path),
        // key: fs.readFileSync(client_key_path)
    }
})
console.log("********HOST IS ****** " + openSearchConfig.host);
let openSearch = async (queryJson) => {
    return response = await client.search(
        queryJson
)
};
let addItem = async (itemID, itemJson, addToIndex) => {
   console.log("in searchDataService addItem ");
   console.log('addItem search data service body ' + itemJson);
    return response = await client.index({
        id: itemID,
        index: addToIndex,
        body: itemJson,
        refresh: true
    })
}

module.exports = {
    openSearch,
    addItem
}