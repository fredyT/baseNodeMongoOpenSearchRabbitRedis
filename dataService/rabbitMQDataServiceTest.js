//initial example for testing.
var amqp = require("amqplib/callback_api");
var rabbitConfig = require('../config/rabbitConfig');
var hostURI = 'amqp://' + rabbitConfig.RABBIT_HOST;
let sendToRabbit = async (theQueue, theMessage) => {
//TODO: look at how we might be able to use connection pool.
// Doing this as initial example test.
  amqp.connect(hostURI, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    console.log("past connect ready to create channel");
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      console.log("past create channel");
      //var queue = 'subscriptionStatus';
      //var queue = "testClassic";
      var queue = theQueue;
     // var msg = '"Hello World!';
      var msg = theMessage;

      channel.assertQueue(queue, {
        durable: true,
        noAck: true
      });
      console.log("read to sentToQueue");
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    });
    console.log("setting timeout");
    setTimeout(function () {
      connection.close();
      //process.exit(0);
    }, 500);
    return;
  });
};

module.exports = {
    sendToRabbit
};
