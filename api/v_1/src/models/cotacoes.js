const mongoose = require('../database');

const CotacaoSchema = new mongoose.Schema({
    origem:{
        type:String,
        require: true,
    },
    destino:{
        type: String,
        require: true,
    },
    minutos:{
        type: Number,
        requied: true,
    },
    plano:{
        type: String,
        required: true,
    },
    valorFaleMais:{
        type: String,
        required: true,
    },
    valor:{
        type: String,
        required: true,
    },
});

const Cotacoes = mongoose.model('Cotacoes', CotacaoSchema);

module.exports = Cotacoes;