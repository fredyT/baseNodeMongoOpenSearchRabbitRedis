#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var searchService = require('./services/searchServiceTest');
var rabbitConfig = require('./config/rabbitConfig');
var rabbitURI = 'amqp://' + rabbitConfig.RABBIT_HOST;

amqp.connect(rabbitURI, function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'openSearchMessage';

        channel.assertQueue(queue, {
            durable: true,
	    noAck : true 
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            let jsonObj = JSON.parse(msg.content);
            console.log("parsed the message");
            let theIndex = jsonObj.openSearchInfo.indexName;
            let theSearchID = jsonObj.openSearchInfo.searchID;
            let theBody = jsonObj.body;
            console.log("the info : theIndex " + theIndex + " the searchID is " + theSearchID);
            console.log("the body is " + JSON.stringify(theBody));
            searchService.addContentTypeQueue(theIndex, theSearchID, theBody).then((item) => {
                console.log("back from addint to open search " + item);
            }).catch((err) => {
                console.log("ERROR in monitorSearchQueue");
                console.log("Error is " + err);
            })
        }, {
            noAck: true
        });
    });
});
