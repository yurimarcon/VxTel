<template>
    <div>
        <h1 class="h2">Historico de consulta de valores</h1>
        <!-- <hr> -->
        <div class="card mt-0">
            <div class="card-body">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Origem</th>
                            <th scope="col">Destino</th>
                            <th scope="col">Tempo</th>
                            <th scope="col">Plano FaleMais</th>
                            <th scope="col">Com FaleMais</th>
                            <th class="d-none d-md-block">Sem FaleMais</th>
                            <th scope="col">Remover</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="registro in registros" :key="registro.valor">
                            <td hidden>{{registro._id}}</td>
                            <td>{{registro.origem}}</td>
                            <td>{{registro.destino}}</td>
                            <td>{{registro.minutos}}</td>   
                            <td>{{registro.plano}}</td>   
                            <td>{{registro.valorFaleMais}}</td>
                            <td class="d-none d-md-block">{{registro.valor}}</td>   
                            <td>
                                <button class="btn btn-danger" @click='removeRegistro(registro._id)'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
</svg>
                                </button>
                            </td>   
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Historico",
    data(){
        return{
            registros:[]
        }
    },
    methods:{
        async removeRegistro(idLinha){
            await axios({
                method: 'delete',
                url: 'http://localhost:3000/cotacoes/',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : {"_id": idLinha}
            });
            await axios.get('http://localhost:3000/cotacoes/')
                .then(res=>{
                    this.registros = res.data.simulacoes;
            });
        }
    },
    mounted(){
        const buscaRegistros = async () => {
            await axios.get('http://localhost:3000/cotacoes/')
                .then(res=>{
                    this.registros = res.data.simulacoes;
            });
        }
        buscaRegistros();
    }           
}
</script>

<style>
h1{
    padding: 4% 0 2% 2%;
}
</style>