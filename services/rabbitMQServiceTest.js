const rabbitMQDataService = require("../dataService/rabbitMQDataServiceTest");

const openSearchQueue = 'openSearchMessage';
   
//concatinate account-id with mongod_id to get the ID we can change afater we think more
//Just did this real quick. We may not use queues for things like inventory
//But this is an example
let addContainerType = async (accountId, id, itemJson) => {
    console.log("in rabbitMQsercie addinventoryitem")
    //we might refactor this to add to a message queue and have another process add to opensearch
    var sendObj = {};

    let indexNameVar = accountId + '-containertype'
    let searchIDVar = accountId + "-" + id;
    let theBody = JSON.parse(itemJson);
    let openSearchInfoVar =  {
        indexName : indexNameVar,
        searchID : searchIDVar
    };
    console.log("setting openSearchInfo");
    sendObj.openSearchInfo = openSearchInfoVar;
    console.log("just set openSearchInfo")
    sendObj.body = theBody;
    console.log("set body");
    var jObj = JSON.stringify(sendObj);
    console.log("Item is " + jObj);
    try {
        return await rabbitMQDataService.sendToRabbit(openSearchQueue,jObj);
    } catch(err) {
        console.log("error in additem to rabbit");
        throw err;
    }
 }


module.exports = {
    addContainerType
}