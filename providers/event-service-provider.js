const subscriber = require('../subscriber');

class EventServiceProvider {
  constructor() {
    const { name } = EventServiceProvider;
    this.subscriber = subscriber;
    this.clazzName = name;
    this.subscribeToChannel = this.subscribeToChannel.bind(this);
  }

  subscribeToChannel(userId, domain, channel) {
    const channelName = `${userId}::${domain}::${channel}`;
    this.subscriber.subscribe(channelName, (err, count) => {
      // TODO: [Logging] - use appropriate logging functionality
      // eslint-disable-next-line no-console
      console.log(`Subscribed to following channel: ${channelName}`);
      // eslint-disable-next-line no-console
      console.log(err, count);
    });
  }
}

module.exports = new EventServiceProvider();
