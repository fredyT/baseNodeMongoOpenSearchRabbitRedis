const containerTypeService = require('../dataService/containerTypeDataServiceTest');
const searchService = require('../services/searchServiceTest');
const rabbitMQSevice = require('../services/rabbitMQServiceTest');

let searchContainerType = async (accountId, queryBody) => {
    console.log("list container types for an account");
    let listOfCatalogItems = await searchService.searchContentType(accountId, queryBody);
    if (!listOfCatalogItems) {
        return emptyJ;
    } else {
        return listOfCatalogItems;
    }
}

let listContainterTypes = async (accountId) => {
    console.log("list container types for an account");
    let listOfContainerTypes = await containerTypeService.getCountainerTypes(accountId);
    if (!listOfContainerTypes) {
        return emptyJ;
    } else {
        return listOfContainerTypes;
    }
}

let addContainerType = async (accountId, containerTypeInfo) => {
    console.log("Add new content info passed is" + containerTypeInfo);
    let addedContainerType = await containerTypeService.addNewContainerType(accountId,containerTypeInfo);
    if (!addedContainerType) {
      return { message : "Unable to register user"};
    } else {
         //we probably want put this on rabbit MQ and index from there but this is just to see it in 
      //action. Not sure we need to think it over.
      let indexBody = JSON.parse(JSON.stringify(containerTypeInfo));
      indexBody.contentType = indexBody.type;
      delete indexBody.type;
      remove_fromJson = JSON.parse(JSON.stringify(addedContainerType));
      remove_fromJson.id = remove_fromJson._id;
      delete remove_fromJson._id;
      indexBody.id = remove_fromJson.id;
      indexBody = JSON.stringify(indexBody);
      console.log("addedItemCatalog " +  indexBody);
      //if doing dev an you don't have opensearch running comment this out.
      let addToSearch = await searchService.addContentType(accountId,addedContainerType._id, indexBody);
      return JSON.parse(JSON.stringify(addedContainerType));
    }
}


//this is just an example of adding item to a queue and that queue
//will take the item and add it to opensearch could be other action.
//
let addContainerTypeQueue = async (accountId, containerTypeInfo) => {
    console.log(`Add new item to catalog info passed in ${containerTypeInfo}`);
    let addedContainerType = await containerTypeService.addNewContainerType(accountId,containerTypeInfo);
    if (!addedContainerType) {
      return { message : "Unable to add catalog item"}; //TODO: add more info to message
    } else {
      //we probably want put this on rabbit MQ and index from there but this is just to see it in 
      //action. Not sure we need to think it over.
      let remove_fromJson = JSON.parse(JSON.stringify(containerTypeInfo));
      remove_fromJson.id = remove_fromJson._id;
      delete remove_fromJson._id;
      let indexBody = JSON.stringify(remove_fromJson);
      console.log("addedItemCatalog " +  indexBody);
      //if doing dev an you don't have opensearch running comment this out.
      let addToSearch = await rabbitMQSevice.addContainerType(accountId,addedContainerType._id, indexBody);
      return JSON.parse(JSON.stringify(addedContainerType));
    }
}

module.exports = {
    searchContainerType,
    listContainterTypes,
    addContainerType,
    addContainerTypeQueue
}