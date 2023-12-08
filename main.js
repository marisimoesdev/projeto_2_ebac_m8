const form = document.getElementById('form-contato') //alocando o formulário em um constante
const numero = []; //criando vetor/array/objeto que irá alocar os números telefonicos
const nome = []; //criando vetor/array/objeto que irá alocar os nomes
const inputNomeContato = document.getElementById('nome-contato') //alocando o input que recebe os nomes em uma constante
const inputNumContato = document.getElementById('num-contato') //alocando o input que recebe os números em uma constante
const inputSelect = document.getElementById('tipo-de-contato') //alocando o input de seleção em uma constante
const pessoal = '<span class="pessoal">P</span>'; //constante que aloca a formatação, caso o usuário coloque “pessoal”
const comercial = '<span class="comercial">C</span>'; //constante que aloca a formatação, caso o usuário coloque “comercial”
const opcao = `Pessoal`; //String criada com o objetivo de fazer a comparação no operador ternário da função “adicionaContato”

let contatos = ''; /*string criada com o objetivo de adicionar linha na tabela. Ela irá receber a formatação da linha da tabela, porém
quando o formulário for submetido ela ficará vazia novamente e assim possibilitando a inserção de uma nova linha*/

//EVENTO QUE OCORRE DEPOIS DE APERTAR O BOTÃO
form.addEventListener('submit', function(e) {
    e.preventDefault(); //tirando da página a caractrísca de recarregar após o formulário ser submetido

    adicionaContato(); //chamando a função que cria as linhas da tabela
    atulizacaoContatos(); //chamando a função que formata as linhas da tabela para HTML
    atulizacaoQuantContato(); //chamando a função que atualiza e formata a quantidade de constatos totais
})

function adicionaContato() {
    let nomeExistente = nome.includes(inputNomeContato.value); /*perguntado para o objeto “nome” se o nome que foi inserido no input nome
    dentro dele, e alocando a resposta dentro de uma variável*/
    let numeroExistente = numero.includes((inputNumContato.value));/*perguntado para o objeto “numero” se o número telefonico que foi 
    inserido no input número dentro dele, e alocando a resposta dentro de uma variável*/
    
    if(nomeExistente || numeroExistente){ //aqui é se caso nome já está incluído OU se o número já está incluido
        if (nomeExistente && numeroExistente){//aqui é se caso nome já está incluído E se o número já está incluido
            alert(`O nome ${inputNomeContato.value} e o número ${inputNumContato.value} já foram inseridos na agenda`)
        }
        else if(nomeExistente) //aqui é o caso de SÓ o nome estar incluído
        {
            alert(`O nome ${inputNomeContato.value} já foi inserido`);
        }   
        else if (numeroExistente) //aqui é o caso de SÓ o número estar incluído
        {
            alert(`O número ${inputNumContato.value} já foi inserido`)
        }   
    } else{
        numero.push((inputNumContato.value)) //alocando o número inserido na agenda no array/vetor/objeto 
        nome.push(inputNomeContato.value) //alocando o nome inserido na agenda no array/vetor/objeto
        /*eles precisam estar aqui embaixo, pois se ficarem lá em cima tanto o nome quanto o número já estaram incluídos, porque 
        a função “nome.includes(inputNomeContato)” está perguntado se já está incluído e se essa parte do push ficar lá em cima o 
        if sempre será verdadeiro*/
        
        let contato = '<tr>' //acessando a tag tr para formatação da tabela
        contato += `<td> ${inputNomeContato.value}</td>` //passando o valor o input nome para a formatação da linha
        //para escrever dentro da string é o sinal de crase
        //por ser uma tag dentro de outra tag, você usa crase (``) para acessar
        //o sinal += é considerado a concatenação
        //primeira coluna
        contato += `<td> ${inputNumContato.value}</td>` //passando o valor o input nome para a formatação da linha
        //segunda coluna
        contato += `<td> ${inputSelect.value == opcao ? pessoal : comercial}</td>` /*operador ternário, ele irá comparar o seleção
        do usuário com a variável “opção” que possui o valor de ´Pessoal´*/
        //Lembrando que defini valores para as opções no documento HTML, sem essa prévia definição não seria possível a comparação
        //Lembrando que por se tratar de strings o sinal de igual é ==, somente 1 = é atribuição 
        //? significa if
        //: significa else
        //terceira coluna
        contato+= '</tr>'//acessando a tag tr para formatação da tabela
        
        contatos += contato; //concatenando a string vazia com a string que tem a formatação das linhas
    }
    
    inputNomeContato.value = ''; //limpando o campo do nome depois que o botão é apertado
    inputNumContato.value = ''; //limpando o campo do número depois que o botão é apertado
    inputSelect.value = ''; //limpando o campo de seleção do tipo de telefone
}

function atulizacaoContatos(){ //função responsável por inserir a linha que foi formatada na função acima no HTML
    const conteudoTabela = document.querySelector('tbody')//constante que irá alocar a tag tbody
    conteudoTabela.innerHTML = contatos; /*chamando a constante que possui o corpo da tabela e colocando a formatação da linha dentro
    dela*/
}

function atulizacaoQuantContato (){ //função que atualiza o número de contatos totais
    const total = quantContato(); /*recebendo a informação da quantidade e elementos que o array possui dentro de si e alocando
    o resultado em uma constante*/
    
    document.getElementById('quant-contato').innerHTML = total; /*selecionando no HTML a parte que irá apecer o número total
    e passando a informação do número total para o HTML*/ 
}

function quantContato(){
    return Object.keys(numero).length /*comando responsável por descobrir a quantidade de elementos que possuem
    dentro objeto/array/vetor. E returnando a quantidade de elementos*/
}

//EVENTO QUE OCORRE ENQUANTO O INPUT DO NÚMERO É PREENCHIDO
inputNumContato.addEventListener('input', function(e){ /*não tem a letra “e” como parâmetro, pois ela é usada pra obter informações sobre o evento ou passar informação como é o caso lá de cima*/
    
    let campoNum = e.target/*variável que irá alocar o elemento que disparou o evento*/
    
    let mascara = campoNum.value.substring(0,15)//variável que receberá o valor do input
    /*substring é uma propridade que limita a quantidade de caracteres, nesse caso aceita até quinze digito, na conta além dos números
    está os parênteses o hífen e o espaço que separa o último parêntese do DD dos números*/

    //ABAIXO ESTÁ UMA DAS FUNÇÕES DA PROPRIEDADE REGEX, NESSE CASO EU ESTOU USANDO O REPLACE, QUE SERVE PRA SUBSTITUIR
    /*IMPORTANTE: NESSE CASO, POR E TRATAR DE UMA VARIÁVEL QUE ALOCA O E.TARGET.VALUE DE UM INPUT, PODE SER ESCRITO DESSA FORMA:
    MASCARA = MASCARA.REPLACE, PORÉM SE FOSSEM O CASO DE UMA STRING O REPLACE TERIA QUE SER ALOCA EM UMA NOVA STRING, EX: 
    TEXTO = TEXTO2.REPLACE*/
    mascara = mascara.replace(/\D/g,''); //aqui você está atribuindo o valor ao que está sendo digitado, pelo replace. 
    //Regex: o valor que você quer procurar precisa estar entre essas barras: //
    //O “\D” ele é um tipo de metacaracter de descrição, ele encontra TUDO MENOS os números
    //O “g” é um tipo de modificador, ele irá fazer a procura global (existem modificadores que para a pesquisa na 1º que satisfazer o requisitos)
    //Depois de colocar a descrição da sua procura e a pesquisa que deve ser feita, após a vígurla no caso do replace você coloca o valor que você quer colocar na substituição
    //O replace de cima está fazendo uma pesquisa global(g) de tudo o que não for números (\D), e se achar algo que satisfaça esse requisito, será substituído por uma espaço em branco ('')
    //Com esse replace o usuário não comsiguirá colocar letras
    mascara = mascara.replace(/(\d{2})(\d)/,"($1) $2");
    //O metacaracter de descrição “\d” encontra NÚMEROS, tambpem dá pra usar nessa situação o conjunto: [0-9] os colchetes representam “conjunto” e o “hífen” representa o “até”, então resumindo números de 0 até 9
    //As {} é um tipo de quantificador, que significa “intervalo”, nesse ele vai encontrar o 1º e o 2º e parar
    //Depois vêm mais um “\d”, representando mais um grupo de números
    //Após a descrição o que vêm a diante depois da vígula é o que deve ser substituido, nesse caso o “$ + algum número” representa gurpo
    //Então o 1º grupo: “($1)”, que são os 2 primeros números: “\d{2}” ficarão entre parêntreses
    //O 2º grupo: “ $2” terá um espaço entre ele e o gurpo $1, se você reparar tem um espaço entre esse 2 grupos
    //Então nesse replace ele pegará os 2 primeiros números “\d{2}” e colocará entre parênteses: “($1)”. E terá um espaço entre o 1º grupo e o 2º grupo, sendo o 2º grupo: “\d”, e representação do espaço: “ $2”,
    mascara = mascara.replace(/(\d)(\d{4})$/,"$1-$2");
    //Aqui a decrição também é de números, porém o segundo grupo é composto por 4 números
    //O “$” no final da descrição significa “final”, ou seja, na parte “(\d{4})$” a descrição é que nesse 2º grupo será compostos pelos 4 ÚLTIMOS NÚMERO
    //Então nesse replace terá o 1º grupo: “\d”, e o 2º grupo: “(\d{4})$”, eles serão separados por um hífen: "$1-$2"

    /*IMPORTANTE: NESSE CASO, POR E TRATAR DE UMA VARIÁVEL QUE ALOCA O E.TARGET.VALUE DE UM INPUT, PODE SER ESCRITO DESSA FORMA:
    MASCARA = MASCARA.REPLACE, PORÉM SE FOSSEM O CASO DE UMA STRING O REPLACE TERIA QUE SER ALOCA EM UMA NOVA STRING, EX: 
    TEXTO = TEXTO2.REPLACE*/

    campoNum.value = mascara;
    /*aqui você está atribuindo um valor ao input (local do evento), então o valor do input será igual ao que está sendo digitado na
    variável “mascara”, já que a mesma tem o valor de: “e.target.value”, sem isso o input não irá fazer as substituições em tempo real*/
})

