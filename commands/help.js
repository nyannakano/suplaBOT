const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Lista todos os comandos.',
    aliases: ['commands'],
    usage: '[nome do comando]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list de todos meus comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [nome do comando]\` to get informações sobre um comando específico!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('te mandei uma DM with all my commands. olha lá champs');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('pelo visto I can\'t send DMs para você champs...');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('esse comando não existe champs');
        }

        data.push(`**Nome:** ${command.name}`);

        if (command.aliases) data.push(`**Também pode usar com:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descrição:** ${command.description}`);
        if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });
    },
};