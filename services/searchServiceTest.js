const searchDataService = require("../dataService/searchDataServiceTest");

let searchContentType = async (accountId, searchTerms) => {
    //need to figure out how we want to pass earch terms. For now it is returning all.
    var searchIndex = accountId + '-containertype'; 
    var query = searchTerms;
    
    return await searchDataService.openSearch({ index : searchIndex, body : query });
}

   
//concatinate account-id with mongod_id to get the ID we can change afater we think more
//Just did this real quick
let addContentType = async (accountId, id, itemJson) => {
    //we might refactor this to add to a message queue and have another process add to opensearch
    let indexName = accountId + '-containertype'
    let searchID = accountId + "-" + id;
    console.log("searchService addInventoryItem ")
    try {
        return await searchDataService.addItem(searchID, itemJson, indexName);
    } catch(err) {
        console.log("error in addint to opensearch");
        throw err;
    }
 }

 //This is just a copy of addInventoryItem addjusted for some rabbit MQ
 //POC. This is being called by the stand alone node app that will process
 //The queue.
 let addContentTypeQueue = async (indexName, searchID, itemJson) => {
     console.log("searchID = " + searchID );
     console.log("indexName = " + indexName);
    //we might refactor this to add to a message queue and have another process add to opensearch
    try {
        return await searchDataService.addItem(searchID, itemJson, indexName);
    } catch(err) {
        console.log("error in adding to opensearch addInventoryItemQueue");
        throw err;
    }
 }

module.exports = {
    searchContentType,
    addContentType,
    addContentTypeQueue
}