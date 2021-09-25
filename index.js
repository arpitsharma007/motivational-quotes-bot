const dotenv = require('dotenv').config()
const Discord = require("discord.js")
const fetch = require("node-fetch");

const client = new Discord.Client({
    partials: ["CHANNEL", "MESSAGE"],
    restTimeOffset: 0,
    intents: 513,
})

const sadWords = ["sad", "depressed", "unhappy", "angry"];

const encouragements = ["Cheer up!", "Hang in there!", "You are a great person"]

const getQuote = () => {
    return fetch("https://zenquotes.io/api/random")
    .then(res => {
        return res.json()
    })
    .then(data=> {
        return data[0]["q"] + " " + "-" + " " + data[0]["a"]
    })
}


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("messageCreate", (msg) => {
    if (msg.author.bot) return
    if(msg.content.startsWith("$inspire")) {
        getQuote().then(quote => msg.channel.send({content: quote,}))
    }

    if(sadWords.some(word => msg.content.includes(word))) {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.channel.send({
            content: encouragement,
        })
    }

    if(msg.content.startsWith("ping")) {
        msg.channel.send({
            content: 'pong',
        })
    }
})

client.login(process.env.TOKEN)