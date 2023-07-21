const Redis = require("ioredis");
const redis = new Redis();
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
// redis.subscribe("my-channel-1", "my-channel-2", (err, count) => {
//   if (err) {
//     // Just like other commands, subscribe() can fail for some reasons,
//     // ex network issues.
//     console.error("Failed to subscribe: %s", err.message);
//   } else {
//     // `count` represents the number of channels this client are currently subscribed to.
//     console.log(
//       `Subscribed successfully! This client is currently subscribed to ${count} channels.`
//     );
//   }
// });

// redis.on("message", (channel, message) => {
//   // const mess = JSON.parse(message.toString());
//   console.log(`Received ${message} from ${channel}`);
// });

// // There's also an event called 'messageBuffer', which is the same as 'message' except
// // it returns buffers instead of strings.
// // It's useful when the messages are binary data.
// // redis.on("messageBuffer", (channel, message) => {
// //   // Both `channel` and `message` are buffers.
// //   console.log(channel, message);
// // });

const zoomId = "zoom1";
const userName = "linh";
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
function sendMessage(from, to, message) {
  redis.publish(
    to,
    JSON.stringify({
      from,
      message,
    })
  );
}

rl.on("line", function (line) {
  console.log(line);
  sendMessage(userName, zoomId, line);
});
rl.on("close", function () {
  console.log("close");
});
