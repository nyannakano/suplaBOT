const filtroescolhido = require("./filtro.js")

module.exports = {
    name: 'urss',
    description: 'Filtro da URSS',
    aliases: ['comunismo', 'comunista'],
    cooldown: 5,
    async execute(message, args) {
        let argumento = this.name;
        await filtroescolhido.filtroavatar(message, argumento);
    },
};