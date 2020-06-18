const Base = require("./BaseCollector");

class MessageCollector extends Base {

    constructor(client, channel, filter, options = {}) {
        super(filter, options);
        this.channel = channel;
        this.received = 0;

        const bulkDeleteListener = messages => {
            for (const message of messages.values()) this.handleDispose(message);
        };
        this._handleChannelDeletion = this._handleChannelDeletion.bind(this);
        this._handleGuildDeletion = this._handleGuildDeletion.bind(this);

        client.on("messageCreate", this.handleCollect);
        client.on("messageDelete", this.handleDispose);
        client.on("MessageDeleteBulk", bulkDeleteListener);
        client.on("channelDelete", this._handleChannelDeletion);
        client.on("guildDelete", this._handleGuildDeletion);

        this.once("end", () => {
            client.removeListener("messageCreate", this.handleCollect);
            client.removeListener("messageDelete", this.handleDispose);
            client.removeListener("MessageDeleteBulk", bulkDeleteListener);
            client.removeListener("channelDelete", this._handleChannelDeletion);
            client.removeListener("guildDelete", this._handleGuildDeletion);
        });
    }

    collect(message) {
        if (message.channel.id !== this.channel.id) return null;
        this.received++;
        return message.id;
    }

    dispose(message) {
        return message.channel.id === this.channel.id ? message.id : null;
    }

    endReason() {
        if (this.options.max && this.collected.size >= this.options.max) return "limit";
        if (this.options.maxProcessed && this.received === this.options.maxProcessed) return "processedLimit";
        return null;
    }

    _handleChannelDeletion(channel) {
        if (channel.id === this.channel.id) {
            this.stop("channelDelete");
        }
    }

    _handleGuildDeletion(guild) {
        if (this.channel.guild && guild.id === this.channel.guild.id) {
            this.stop("guildDelete");
        }
    }
}

module.exports = MessageCollector;