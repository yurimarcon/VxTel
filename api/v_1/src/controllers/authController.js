const express = require('express');

const Cotacao = require('../models/cotacoes');

const router = express.Router();

router.post('/calcula', async (req, res)=>{

    let tabelaValores = 0;
    let tempoDeCobranca = 0;
    let origemLigacao = parseFloat(req.body.origem);
    let destinoLigacao = parseFloat(req.body.destino);
    let tempo = parseFloat(req.body.minutos);
    let plano = req.body.plano;
    let valorComFaleMais = 0;
    let valorSemFaleMais = 0;
    
    if(origemLigacao == 11 && destinoLigacao == 16)tabelaValores = 1.90;
    if(origemLigacao == 16 && destinoLigacao == 11)tabelaValores = 2.90;
    if(origemLigacao == 11 && destinoLigacao == 17)tabelaValores = 1.70;
    if(origemLigacao == 17 && destinoLigacao == 11)tabelaValores = 2.70;
    if(origemLigacao == 11 && destinoLigacao == 18)tabelaValores = 0.90;
    if(origemLigacao == 18 && destinoLigacao == 11)tabelaValores = 1.90;
    
    //DESCONTA O TEMPO CONTEMPLADO PELO PLANO 
    if(plano == 'FaleMais 30' && tempo > 30){

        tempoDeCobranca = (tabelaValores * (tempo - 30));

    }else if(plano == 'FaleMais 60' && tempo > 60){

        tempoDeCobranca = (tabelaValores * (tempo - 60));

    }else if(plano == 'FaleMais 120' && tempo > 120){

        tempoDeCobranca = (tabelaValores * (tempo - 120));

    }

    //TAXA DE 10% SOBRE O EXCEDENTE;
    tempoDeCobranca += (tempoDeCobranca/100)*10;

    valorComFaleMais =  tempoDeCobranca.toFixed(2);
    valorSemFaleMais =  (tempo * tabelaValores).toFixed(2);

    let dataHora = new Date();
    let date = 'Data da simulação ' + dataHora.toLocaleDateString() + ' as '+ dataHora.getHours() +':'+ 
        //TRATANDO FORMATO DOS MINUTOS
        (dataHora.getMinutes().length < 2? 
            '0'+dataHora.getMinutes() :
            dataHora.getMinutes());

    return res.send({ valorComFaleMais, valorSemFaleMais, date, tempo, tabelaValores});
    
});

router.post('/', async(req, res)=>{
    
    try{
        
        const simulacao = await Cotacao.create(req.body);

        return res.send({simulacao});

    }catch(err){

        return res.status(400).send({error: 'Falha ao registrar simulacao'});

    }

});

router.get('/', async(req, res)=>{
    
    try{
        
        const simulacoes = await Cotacao.find();

        return res.send({simulacoes});

    }catch(err){

        return res.status(400).send({error: 'Falha ao buscar simulações'});

    }

});

router.delete('/', async(req, res)=>{

    try {
        if(!req.body)return res.send({msg: 'API não recebeu nenhum parâmetro.'})
        await Cotacao.deleteOne(req.body);
        return res.send({msg: 'Registro removido com sucesso.'})
    }catch(err){
        return res.status(400).send({error: 'Não foi possível deletar objeto com esse _id.'})
    }
});

module.exports = app => app.use('/cotacoes', router);