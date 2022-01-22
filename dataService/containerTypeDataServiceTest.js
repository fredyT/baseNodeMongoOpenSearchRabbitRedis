const containerTypes = require('../models/containerTypeTest');
const { mongoose } = require('./databaseService');

let  getCountainerTypes = async (accountId) => {
    console.log(`get container types`);

    let emptyJ = JSON.parse("{}");
   let containerItems = await containerTypes.find({ account_id : accountId});
   if (!containerItems) {
       console.log("Container types for " + accountId + " not found");
       return emptyJ;
   } else {
     console.log("Container Item :" + containerItems);
     return containerItems;
   }
};

let  addNewContainerType = async (accountId, containerTypeInfo) => {
    //add the account ID to the jSON. We are assuming JSON is correct format.
    //do we need to explicitly validate JSON. I believe mogoose does it for us.
    containerTypeInfo.account_id = accountId;
    console.log("in Add new container type info passed is " + JSON.stringify(containerTypeInfo));

    //the calling function will catch the error. We assome the item passed has
    //been sanatized (bodyparse.json make sure it is valid json). But we may change it so this method checks

    let theResult = await containerTypes.create(containerTypeInfo);
    //return the mongo ID.
    console.log('results' + theResult._id);
    return JSON.parse(`{ "_id" :  "${theResult._id}"}`);
 };

module.exports = {
    getCountainerTypes,
    addNewContainerType
}