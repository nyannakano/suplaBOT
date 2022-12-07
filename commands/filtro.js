module.exports = {
    filtroavatar : async function filtroEscolhido(message, argumento) {
        const jimp = require('jimp');
        let filtro = await jimp.read(`./img/${argumento}.png`);
        filtro.resize(400,400);

        if (!message.mentions.users.size) {
            jimp.read(message.author.avatarURL({
                "format": "png",
                "size": 512
            })).then(image => {
                image.resize(400, 400);
                image.composite(filtro, 0, 0);
                image.write('./img/avatar.png');
                message.channel.send({
                    files: [
                        './img/avatar.png'
                    ]
                });
            }).catch(err => {
                console.log('Imagem não foi encontrada.')
            })
        }
        else {
            const taggedUser = message.mentions.users.first();
            jimp.read(taggedUser.avatarURL({
                "format": "png",
                "size": 512
            })).then(image => {
                image.resize(400, 400);
                image.composite(filtro, 0, 5);
                image.write('./img/avatar.png');
                message.channel.send({
                    files: [
                        './img/avatar.png'
                    ]
                });
            }).catch(err => {
                console.log('Imagem não foi encontrada.')
            })
        }
    }
}