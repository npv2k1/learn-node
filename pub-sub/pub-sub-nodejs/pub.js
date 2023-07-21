const Redis = require("ioredis");
const redis = new Redis(); // uses defaults unless given configuration object
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
// // ioredis supports all Redis commands:
// redis.set("foo", "bar"); // returns promise which resolves to string, "OK"

// // the format is: redis[SOME_REDIS_COMMAND_IN_LOWERCASE](ARGUMENTS_ARE_JOINED_INTO_COMMAND_STRING)
// // the js: ` redis.set("mykey", "Hello") ` is equivalent to the cli: ` redis> SET mykey "Hello" `

// // ioredis supports the node.js callback style
// redis.get("foo", function (err, result) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // Promise resolves to "bar"
//   }
// });

// setInterval(() => {
//   const message = { foo: Math.random() };
//   // Publish to my-channel-1 or my-channel-2 randomly.
//   const channel = `my-channel-${1 + Math.round(Math.random())}`;

//   // Message can be either a string or a buffer
//   redis.publish(channel, JSON.stringify(message));
//   console.log("Published %s to %s", message, channel);
// }, 1000);
// var readline = require("readline");
// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   terminal: false,
// });

const zoomId = "zoom1"
const userName = "nguyen"
redis.subscribe(zoomId, (err, count) => {
  if (err) {
    console.log("Failed to subscribe: %s", err.message);
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`
    );
  }
});
redis.on("message", (channel, message) => {
  // const mess = JSON.parse(message.toString());
  console.log(`Received ${message} from ${channel}`);
});
redis.zadd
function sendMessage(from, to , message){
  redis.publish(
    to,
    JSON.stringify({
      from,
      message,
    })
  );
}

setInterval(()=>{
  sendMessage(userName,zoomId,`${Math.random()}`)
},1000)

rl.on("line", function (line) {
  console.log(line);
  sendMessage(userName, zoomId, line);
});
rl.on("close", function () {
  console.log("close");
});