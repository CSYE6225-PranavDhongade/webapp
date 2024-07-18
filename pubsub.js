const { PubSub } = require("@google-cloud/pubsub");
const path = require("path");
const topicName = 'verify_email'; // replace with your Pub/Sub topic name

const keyFilePath = path.join(__dirname, "../../gcpkey/newkey2/project4-414017-f35db3a91268.json");
// const keyFilePath = path.join(__dirname, "../../gcpkey/trialkey/project4-414017-56439db91ae1.json");
const projectId = "project4-414017";

// Create an instance of PubSub with the provided service account key
const pubSubClient = new PubSub({
  projectId: projectId,
  keyFilename: keyFilePath,
});

const publishMessage = async (topicName, payload) => {

  const dataBuffer = Buffer.from(JSON.stringify(payload));
  try {
    const messageId = await pubSubClient
      .topic(topicName)
      .publishMessage({ data: dataBuffer });

    console.log(`Message ${messageId} published.`);
    return messageId;
  } catch (error) {
    console.error(`Received error while publishing: ${error.message}`);
  }
};

const listenForPullMessages = async (subscriptionName, timeout) => {
  const subscription = pubSubClient.subscription(subscriptionName);
  let messageCount = 0;
  let data = [];

  const messageHandler = async message => {

    console.log(typeof (message.data))
    const jsonData = await JSON.parse(message.data);

    console.log(jsonData);

    data.push({
      id: message.id,
      attributes: message.attributes,
      ...jsonData,
    });

    messageCount += 1;
    message.ack();
  };

  subscription.on("message", messageHandler);

  setTimeout(() => {
    console.log("Message Pulled: \n", data);
    console.log(`${messageCount} message(s) received.`);
    subscription.removeListener("message", messageHandler);
  }, timeout * 100);
}

const listenForPushMessages = payload => {
  const message = Buffer.from(payload, "base64").toString("utf-8");
  let parsedMessage = JSON.parse(message);
  console.log("Message Pushed: \n", parsedMessage);
  return parsedMessage;
}

module.exports = {
  publishMessage,
  listenForPullMessages,
  listenForPushMessages,
}