const mongoose = require('mongoose');

const FichaSchema = new mongoose.Schema({
    nome_personagem: {type: String, required: true},
    nome_jogador: {type: String, required: true},
    raça: {type: String, required: true},
    origem: {type: String, required: true},
    classe: {type: String, required: true},
    classe_secundária: {type: String},
    divindade: {type: String, required: true},
    arkamino: {type: String, required: true},
    pontos_de_vida: {type: String, required: true},
    ponto_de_mana: {type: String, required: true},
    nível: {type: String, required: true},
    atributo:{
        força:{
            type: Number,
            default: 10,
        },
        destreza:{
            type: Number,
            default: 10,
        },
        constituição:{
            type: Number,
            default: 10,
        },
        inteligência:{
            type: Number,
            default: 10,
        },
        sabedoria:{
            type: Number,
            default: 10,
        },
        carisma:{
            type: Number,
            default: 10,
        },
    },
    user_id: {type: mongoose.Schema.Types.ObjectId, ref:'Personagem', required: true},
});



module.exports = mongoose.model('Ficha', FichaSchema);