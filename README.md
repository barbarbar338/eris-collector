(DEPRECATED) Eris Collector: Create reaction and message collector easily with Eris
======
> (DEPRECATED) I do not intend to develop it anymore due to the many alternative packages. ~barbarbar338
<p>Discrod.js collectors have been adapted to eris to make the work of Eris users easier.</p>

<b>[Discord: https://discord.com/invite/BjEJFwh](https://discord.com/invite/BjEJFwh)</b>
-------

<b>[NPM Page](https://www.npmjs.com/package/eris-collector) [GITHUB Page](https://github.com/barbarbar338/eris-collector)</b>
-------

Usage
------------
<p>Here is a simple but effective example!</p>

```js
/* Eris packages */
const Eris = require("eris");
const client = new Eris("BOT_TOKEN");

/* Eris Collector packages */
const { ReactionCollector, MessageCollector } = require("eris-collector");

/* Emitted when bot is ready */
client.on("ready", () => {
    console.log("Ready!");
});

/* Emitted when someone sends message */
client.on("messageCreate", async (message) => {

    /* Creating reaction collector */
    if(message.content === "createReactionCollector") {

        /* Send informative message */
        let msg = await client.createMessage(message.channel.id, "This is a reaction collector example!");
        await msg.addReaction("▶️");

        /* Create reaction filter */
        let filter = (m, emoji, userID) => emoji.name === "▶️" && userID === message.author.id;

        /* Create collector */
        let collector = new ReactionCollector(client, msg, filter, {
            time: 1000 * 20
        });

        /* 
         * Emitted when collector collects something suitable for filter 
         * For more information, please see discord.js docs: https://discord.js.org/#/docs/main/stable/class/ReactionCollector
        */
        collector.on("collect", (m, emoji, userID) => {
            console.log(userID);
        });
    }

    /* Creating message collector */
    if (message.content == "createMessageCollector") {

        /* Send informative message */
        await client.createMessage(message.channel.id, "Send \"TEST\" message to channel.");

        /* Create messsage filter */
        let filter = (m) => m.content === "TEST" && m.author.id === message.author.id;

        /* Create collector */
        let collector = new MessageCollector(client, message.channel, filter, {
            time: 1000 * 20
        });

        /* 
         * Emitted when collector collects something suitable for filter 
         * For more information, please see discord.js docs: https://discord.js.org/#/docs/main/stable/class/MessageCollector
        */
        collector.on("collect", (m) => {
            console.log(m.author.id);
        });

    }
});

/* Connect to Discord API */
client.connect();
```

Create Reaction Collector
-------

```js
/* Send informative message */
let msg = await client.createMessage(Channel.id, "This is a reaction collector example!");
await msg.addReaction("▶️");

/* Create reaction filter */
let filter = (m, emoji, userID) => emoji.name === "▶️" && userID === User.id;

/* Create collector */
let collector = new ReactionCollector(client, msg, filter, {
    time: 1000 * 20
});

/* 
* Emitted when collector collects something suitable for filter 
* For more information, please see discord.js docs: https://discord.js.org/#/docs/main/stable/class/ReactionCollector
*/
collector.on("collect", (m, emoji, userID) => {
    console.log(userID);
});
```

Create Message Collector
-------

```js
/* Send informative message */
await client.createMessage(Channel.id, "Send \"TEST\" message to channel.");

/* Create messsage filter */
let filter = (m) => m.content === "TEST" && m.author.id === User.id;

/* Create collector */
let collector = new MessageCollector(client, Channel, filter, {
    time: 1000 * 20
});

/* 
    * Emitted when collector collects something suitable for filter 
    * For more information, please see discord.js docs: https://discord.js.org/#/docs/main/stable/class/MessageCollector
*/
collector.on("collect", (m) => {
    console.log(m.author.id);
});
```

[Contact Me For More Help](https://www.is-my.fun/ulas)
-------------------

\ ゜o゜)ノ
