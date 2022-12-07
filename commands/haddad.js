const filtroescolhido = require("./filtro.js")

module.exports = {
    name: 'haddad',
    description: 'Filtro do Haddad',
    cooldown: 5,
    async execute(message, args) {
        let argumento = this.name;
        await filtroescolhido.filtroavatar(message, argumento);
    },
};