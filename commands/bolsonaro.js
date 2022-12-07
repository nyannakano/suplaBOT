const filtroescolhido = require("./filtro.js")

module.exports = {
    name: 'bolsonaro',
    description: 'Filtro do Bolsonaro',
    cooldown: 5,
    async execute(message, args) {
        let argumento = this.name;
        await filtroescolhido.filtroavatar(message, argumento);
    },
};

