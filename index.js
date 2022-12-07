const fs = require('fs');
const Discord = require('discord.js');
const {getFrases} = require("./commands/frases");
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
    console.log(`${client.user.username} está online`);
    client.user.setActivity('s!help', { type: 'LISTENING' })
});

function geraNum() {
    let min = Math.ceil(1);
    let max = Math.floor(100);
    return Math.floor(Math.random() * (max - min)) + min;
}



client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith('charan')) {
        message.channel.send('charan')
    } else if (message.content.startsWith('oi')) {
        message.channel.send('hey baby')
    }
    if (geraNum() === 52 || geraNum() === 98 || geraNum() === 12) {
        let replies = getFrases();
        let random = Math.floor(Math.random() * replies.length);
        message.channel.send(replies[random]);
    }
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t do it no privado meu chapa');
    }

    if (command.args && !args.length) {
        let reply = `${message.author} você não escreveu nada dude`;

        if (command.usage) {
            reply += `\no certo é: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait mais ${timeLeft.toFixed(1)} segundos antes de usar o comando \`${command.name}\` again, champs.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);


    try {
        const newCommand = require(`./commands/${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.channel.send('there is something wrong com sua mensagem brother!');
    }
});

client.login(token);