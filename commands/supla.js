const {getFrases} = require("./frases");
module.exports = {
    name: 'supla',
    description: 'Eu falo uma frase aleatória',
    cooldown: 2,
    execute: function (message, args) {
        let respostas = getFrases();
        let random = Math.floor(Math.random() * respostas.length);
        message.channel.send('' + respostas[random]);
    },
};