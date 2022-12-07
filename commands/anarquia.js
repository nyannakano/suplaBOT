const filtroescolhido = require("./filtro.js")

module.exports = {
    name: 'anarquia',
    description: 'Filtro da Anarquia',
    cooldown: 5,
    async execute(message, args) {
        let argumento = this.name;
        await filtroescolhido.filtroavatar(message, argumento);
    },
};