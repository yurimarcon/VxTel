<template>
    <div class="my-auto">
        <div class="card text-center">
            <div class="card-header">
                <span>Calcule o valor da sua ligação</span>
            </div>
            <div class="card-body">

                <div class="d-block d-md-flex">
                    <div class="form-group col-12 col-md-2">
                        <label for="origem">Origem</label>
                        <select class="form-control" id="origem" v-model="origemLigacao">
                            <option v-for="origem in origens" :key="origem">{{origem}}</option>
                        </select>
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <label for="destino">Destino</label>
                        <select class="form-control" id="destino" v-model="destinoLigacao">
                            <option v-for="destino in destinos" :key="destino">{{destino}}</option>
                        </select>
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <label for="tempo">Tempo em minutos</label>
                        <input type="number" min='0' class="form-control" id="tempo" v-model="tempo">
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <label for="plano">Plano FaleMais</label>
                        <select class="form-control" id="plano" v-model="plano">
                            <option>FaleMais 30</option>
                            <option>FaleMais 60</option>
                            <option>FaleMais 120</option>
                        </select>
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <label for="valorFaleMais">Valor com FaleMais</label>
                        <input type="number" class="form-control" id="valorFaleMais" readonly v-model="valorFaleMais">
                    </div>
                    <div class="form-group col-12 col-md-2">
                        <label for="valor">Valor sem FaleMais</label>
                        <input type="number" class="form-control" id="valor" readonly v-model="valor">
                    </div>
                </div>
                
                <a href="#" class="btn btn-primary m-2" @click="calculaValor">Calcular</a>
                <a href="#" class="btn btn-success m-2" @click="guardaCotacao">Guardar no histórico</a>
            </div>
            <div class="card-footer text-muted">
                {{ date }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Home",
    data() {
        return{
            date: '',
            origens:[11,16,17,18],
            destinos:[11,16,17,18],
            origemLigacao: 11,
            destinoLigacao: 11,
            tempo: 0,
            plano: 'FaleMais 30',
            valorFaleMais: 0,
            valor: 0,
        }
    },
    methods:{
        calculaValor(){

            if ((this.origemLigacao != 11 && this.destinoLigacao != 11) || 
                (this.origemLigacao == 11 && this.destinoLigacao == 11)){

                alert('Não possuimos planos de ligações entre o DDD '+ this.origemLigacao + ' e o DDD '+ this.destinoLigacao );
                return;

            }else if(this.tempo <= 0){

                alert('Informe o tempo da ligação.');
                return;

            }

            const calculoDoValor = async ()=>{
                await axios.post('http://localhost:3000/cotacoes/calcula', {
                    "origem"    : this.origemLigacao,
                    "destino"   : this.destinoLigacao,
                    "minutos"   : this.tempo,
                    "plano"     : this.plano
                }).then((res)=>{
                    console.log(res.data);
                    this.valorFaleMais =  res.data.valorComFaleMais;
                    this.valor = res.data.valorSemFaleMais;
                    this.date = res.data.date;
                })
            }
            calculoDoValor();


        },
        guardaCotacao(){
            const criaRegistro = async () => {
                await axios.post('http://localhost:3000/cotacoes/',{
                    "origem"        : this.origemLigacao,
                    "destino"       : this.destinoLigacao,
                    "minutos"       : this.tempo,
                    "plano"         : this.plano,
                    "valorFaleMais" : this.valorFaleMais,
                    "valor"         : this.valor
                });
            }
            criaRegistro();

            this.origemLigacao = '11'
            this.destinoLigacao = '11'
            this.tempo = '0'
            this.plano = 'FaleMais 30'
            this.valorFaleMais = '0'
            this.valor = '0'

        }
    }
}
</script>

<style>
.card{
    margin-top: 100px;
}
span{
    font-size: 1.5rem;
    font: bold;
}

</style>