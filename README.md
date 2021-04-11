# VxTel
Passo a passo para rodar o projeto

Para rodar o projeto utilize o Docker, para ficar mais fácil de rodar o frontend feito em Vue.js e o backend feito com node.js, o Docker vai cuidar de colocar todas as dependências que usei compiladas dentro do container.
Caso não tenha o Docker instalado na máquina precisará instalar, ou executar cada projeto unitariamente, entrando na pasta ./app  e rodando “npm run serve”( para rodar o frontend ), e depois em outro terminal entrar na pasta ./api/v_1/src e executar “node index”( para rodar o backend ).

1-	Abra o cmd e navegue até a pasta do projeto e rode o comando “Docker-compose up”( isso pode demorar alguns minutos na primeira vez ):

 	![image](https://user-images.githubusercontent.com/44410208/114288273-9bf65d80-9a44-11eb-9be7-135cd9ba9c70.png) 	

2-	Após isso o projeto estará rodando na porta :8080 e o cmd deverá conter essas informações a baixo. E o projeto estará rodando na url: http://localhost:8080/

 	![image](https://user-images.githubusercontent.com/44410208/114288280-aa447980-9a44-11eb-9114-f2328e3908e8.png)

3-	Nesse projeto foram utilizados as seguintes tecnologias: 
FrontEnd:
- Vue.js 
- Vue-router
- Bootstrap
Backend:
	- Node.js
	- Axios
	- Express
	- Body-parser
	- Cors
	- Mongoose
Orquestrador:
- Docker
Banco de dados:
	- MongoDB

4-	Na tela de “Home” você faz as simulações colocando os dados na tela e clicando no botão “Calcular” (chama a 1ª API), caso queira gravar a sua cotação no banco de dados é só clicar no botão “Gravar no histórico”(2ª API).

	![image](https://user-images.githubusercontent.com/44410208/114288289-c0ead080-9a44-11eb-97cd-6db33a91aff5.png)

5-	Ao clicar no canto superior em “Histórico” (3ª API), você pode consultar as simulações que estão gravadas no banco de dados. Caso queira remover algum registro, basta clicar na lixeira que está na última coluna de cada linha (4ª API), assim remove o registro do MongoDB.

	![image](https://user-images.githubusercontent.com/44410208/114288300-d65ffa80-9a44-11eb-9fbd-e837f17b766c.png)

6-	APIs criadas:
Foram criadas 4 APIs:
POST
	1ª API – Envia a solicitação e recebe o valor calculado.
	2ª API – Envia os dados para a API, onde está os dados do banco MongoDB onde será gravado as informações.
GET
	3ª API – Busca os registros no MongoDB para popular a tabela na tela.
DELETE
	4ª API – Envia o “_id” da linha que foi clicada na lixeira, para ser apagado o registro no MongoDB.

	
