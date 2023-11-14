FitLife API:
    Essa é a parte Back-End do aplicativo de exercícios e alimentação FitLife
    (Front-End do projeto disponível em: https://github.com/MatheusFreire7/flutter_TCC)
    Em resumo, com a API será possível fazer o cadastro e login dos usuários, e inserção rápida de novos dados de planos de treino e alimentação para o aplicativo.

Para iniciar a API, deve-se primeiro instalar os pacotes necessários utilize:

        npm install --save

Para salvar alterações feitas deve-se utilizar:

        npx tsc

E por fim, para ligar a API, digite o seguinte comando:

        node dist

=======================================================================================================

Links para rotas:
Rotas que compôem a interação com usuário:

Usuário: 
	
 	http://localhost:{port}/user
	
 InfoUser: 
 
 	http://localhost:{port}/infoUser

=======================================================================================================
Rotas que compôem a alimentação:

Ingrediente: 
	
 	http://localhost:{port}/ingrediente
 	
  Cardapio: 
  
  	http://localhost:{port}/cardapio
	
 Ligação de cardapio e ingrediente:
 	
  	http://localhost:{port}/cardapioIngrediente
  	
   Plano de alimentação:
   	
    	http://localhost:{port}/planoAlimentacao
 	
  Ligação de plano de alimentação com cardapio:
  
  	http://localhost:{port}/alimentacaoCardapio
  	
   Ligação de usuário com plano de alimentação: 
   
   	http://localhost:{port}/usuarioAlimentacao

=======================================================================================================
 
Rotas que compôem o treino:

     
Musculo: 

        http://localhost:{port}/musculo

Exercicio: 
        
        http://localhost:{port}/exercicio
  	
Plano de treino:
        
        http://localhost:{port}/planoTreino
	
Ligação de plano de treino e exercicio: 
 
         http://localhost:{port}/treinoExercicio
  	
Ligação de usuário com plano de treino:
   
        http://localhost:{port}/usuarioTreino


    
