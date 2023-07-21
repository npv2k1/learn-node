import Redis from 'ioredis';
const redis = new Redis(6379, 'redis');
redis.set('foo', 'bar');
redis.get('foo', function(err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result); // Promise resolves to "bar"
  }
});
setInterval(() => {
  const message = { foo: Math.random() };
  // Publish to my-channel-1 or my-channel-2 randomly.
  const channel = `my-channel-${1 + Math.round(Math.random())}`;

  // Message can be either a string or a buffer
  redis.publish(channel, JSON.stringify(message));
  console.log('Published %s to %s', message, channel);
}, 1000);
redis.subscribe('my-channel-1', 'my-channel-2', (err, count) => {
  if (err) {
    // Just like other commands, subscribe() can fail for some reasons,
    // ex network issues.
    console.error('Failed to subscribe: %s', err.message);
  } else {
    // `count` represents the number of channels this client are currently subscribed to.
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
    );
  }
});

redis.on('message', (channel, message) => {
  console.log(`Received ${message} from ${channel}`);
});
