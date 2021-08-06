var lista;
lista = JSON.parse(localStorage.cadastros);

pessoa = JSON.parse(localStorage.cliente);

localStorage.setItem("cadastros", JSON.stringify(lista));
clientes = JSON.parse(localStorage.cadastros);

function sair() {
    window.location.href = "login.html";
    localStorage.setItem("cadastros", JSON.stringify(lista));
}

function depositarValor() {
    var p = document.getElementById("depositar");
    if(lista[pessoa.posicao].extrato == "") {
        lista[pessoa.posicao].extrato = `Saldo inicial de: ${lista[pessoa.posicao].saldo}<br>`;
    }
    p.innerHTML = ``;
    document.getElementById("retirar").innerHTML = ``;
    document.getElementById("retirar2").innerHTML = ``;
    document.getElementById("visualizar").innerHTML = ``;
    document.getElementById("CC").innerHTML = ``;
    document.getElementById("CC2").innerHTML = ``;
    document.getElementById("CC3").innerHTML = ``;
    document.getElementById("extrato").innerHTML = ``;

    p.innerHTML += `Quanto você deseja depositar? <br>`;
    p.innerHTML += `<input type="number" id="depositado" placeholder="valor para depositar"> `;
    p.innerHTML += `<br>Digite sua senha para confirmar o depósito: <br>`;
    p.innerHTML += `<input type="password" id="senhaD" placeholder="senha..."> `;
    p.innerHTML += `<br><button class="redondo"  onclick="depositar2()">OK</button> <br>`;
    p.innerHTML += `Saldo inicial = ${lista[pessoa.posicao].saldo} <br>`;
}



function depositar2() {
    var grana = parseFloat(document.getElementById("depositado").value);
    var senha = document.getElementById("senhaD").value;

    if (senha == lista[pessoa.posicao].senha) {
        if (grana > 0) {
            document.getElementById("depositar2").innerHTML = ``;
            lista[pessoa.posicao].saldo = ((lista[pessoa.posicao].saldo * 100) + (grana * 100)) / 100;
            document.getElementById("depositar2").innerHTML += `Valor total = ${lista[pessoa.posicao].saldo} <br>`;
            lista[pessoa.posicao].extrato += `Deposito de R$${grana}<br>`;
            localStorage.setItem("cadastros", JSON.stringify(lista));
        } else {
            document.getElementById("depositar2").innerHTML = `Dados inválidos`;
        }
    } else {
        document.getElementById("depositar2").innerHTML = `Dados inválidos`;
    }
}


function retirarValor() {
    var p = document.getElementById("retirar");
    if(lista[pessoa.posicao].extrato == "") {
        lista[pessoa.posicao].extrato = `Saldo inicial de: ${lista[pessoa.posicao].saldo}<br>`;
    }
    p.innerHTML = ``;
    document.getElementById("CC").innerHTML = ``;
    document.getElementById("CC2").innerHTML = ``;
    document.getElementById("CC3").innerHTML = ``;
    document.getElementById("depositar").innerHTML = ``;
    document.getElementById("depositar2").innerHTML = ``;
    document.getElementById("visualizar").innerHTML = ``;
    document.getElementById("extrato").innerHTML = ``;

    p.innerHTML += `Quanto você deseja retirar? <br>`;
    p.innerHTML += `<input type="number" id="retirado" placeholder="valor para retirar"> `;
    p.innerHTML += `<br>Digite sua senha para confirmar o depósito: <br>`;
    p.innerHTML += `<input type="password" id="senhaR" placeholder="senha..."> `;
    p.innerHTML += `<br> <button class="redondo" onclick="retirar2()">OK</button> <br>`;
    p.innerHTML += `Saldo Inicial = ${lista[pessoa.posicao].saldo} <br>`;
}


function retirar2() {
    var grana = parseFloat(document.getElementById("retirado").value);
    var senhaR = document.getElementById("senhaR").value;

    if (senhaR == lista[pessoa.posicao].senha) {
        if (grana <= lista[pessoa.posicao].saldo && lista[pessoa.posicao].saldo > 0 && grana <= 1000) {
            document.getElementById("retirar2").innerHTML = ``;
            lista[pessoa.posicao].saldo = ((lista[pessoa.posicao].saldo * 100) - (grana * 100)) / 100;
            document.getElementById("retirar2").innerHTML += `Valor total = ${lista[pessoa.posicao].saldo} <br>`;
            lista[pessoa.posicao].extrato += `Retirada de R$${grana}<br>`;
            localStorage.setItem("cadastros", JSON.stringify(lista));

        } else {
            document.getElementById("retirar2").innerHTML = `Saldo indisponível <br>`;
        }
    } else {
        document.getElementById("retirar2").innerHTML = `Dados inválidos <br>`;
    }
}


function visualizarSaldo() {
    document.getElementById("depositar").innerHTML = ``;
    document.getElementById("depositar2").innerHTML = ``;
    document.getElementById("retirar").innerHTML = ``;
    document.getElementById("retirar2").innerHTML = ``;
    document.getElementById("CC").innerHTML = ``;
    document.getElementById("CC2").innerHTML = ``;
    document.getElementById("CC3").innerHTML = ``;
    document.getElementById("extrato").innerHTML = ``;

    document.getElementById("visualizar").innerHTML = `Saldo atual: ${lista[pessoa.posicao].saldo}<br>`;
}


function visualizarExtrato() {
    document.getElementById("visualizar").innerHTML = ``;
    document.getElementById("depositar").innerHTML = ``;
    document.getElementById("depositar2").innerHTML = ``;
    document.getElementById("retirar").innerHTML = ``;
    document.getElementById("retirar2").innerHTML = ``;
    document.getElementById("CC").innerHTML = ``;
    document.getElementById("CC2").innerHTML = ``;
    document.getElementById("CC3").innerHTML = ``;
    if(lista[pessoa.posicao].extrato == "") {
        lista[pessoa.posicao].extrato = `Saldo inicial de: ${lista[pessoa.posicao].saldo}<br>`;
    }
    localStorage.setItem("cadastros", JSON.stringify(lista));
    document.getElementById("extrato").innerHTML = "Extrato da conta: <br>" + lista[pessoa.posicao].extrato;
}


function transferirValor() {
    var p = document.getElementById("CC");
    document.getElementById("visualizar").innerHTML = ``;
    document.getElementById("depositar").innerHTML = ``;
    document.getElementById("depositar2").innerHTML = ``;
    document.getElementById("retirar").innerHTML = ``;
    document.getElementById("retirar2").innerHTML = ``;
    document.getElementById("CC").innerHTML = ``;
    document.getElementById("CC2").innerHTML = ``;
    document.getElementById("CC3").innerHTML = ``;
    document.getElementById("extrato").innerHTML = ``;

    document.getElementById("CC2").innerHTML = "";
    p.innerHTML = "";
    p.innerHTML += `<button  class="redondo" onclick = "ContaCorrente()">Conta Corrente</button>`;
    p.innerHTML += `<button  class="redondo" onclick = "pix()">Pix</button>`;
}

function ContaCorrente() {
    var p;
    p = document.getElementById("CC");

    p.innerHTML = "";

    p.innerHTML = `Email da conta a qual desejas transferir : <input type="email" id="emailCC" placeholder="email"><br>`;
    p.innerHTML += `Nome do usario da conta a qual desejas transferir : <input type="text" id="nomeCC" placeholder="nome">`;
    p.innerHTML += `<br><button class="redondo"  onclick = fazertransferencia()>Confirmar</button>`;
}

var alvo;

function fazertransferencia() {
    var email = document.getElementById("emailCC").value;
    var nome = document.getElementById("nomeCC").value;
    var p = document.getElementById("CC2");
    if(lista[pessoa.posicao].extrato == "") {
        lista[pessoa.posicao].extrato = `Saldo inicial de: ${lista[pessoa.posicao].saldo}<br>`;
    }
    for (i = 0; i < clientes.length; i++) {
        if (email == clientes[i].email && nome == clientes[i].nome && pessoa.nome != clientes[i].nome && pessoa.email != clientes[i].email) {
            p.innerHTML = `Tranferir para ${clientes[i].nome} ${clientes[i].sobrenome} <br>`;
            document.getElementById("CC").innerHTML = "";
            p.innerHTML += ` BUSCAR OUTRO USUÁRIO <br><button onclick = transferirValor()>Buscar</button> <br>`;
            p.innerHTML += ` REALIZAR TRANSFERENCIA <br><button onclick = finalizartransferecia()>Transferir</button>`;
            p.innerHTML += `<input type="number" id="retirarM" placeholder="valor..."> <br>`;
            document.getElementById("CC3").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            alvo = i;
            break;
        } else {
            p.innerHTML = `Dados inválidos`;
        }
    }
    localStorage.setItem("cadastros", JSON.stringify(lista));
}

function finalizartransferecia() {
    var p;
    p = document.getElementById("CC3");

    p.innerHTML += `<br>Digite sua senha para confirmar a transferência:<br> <input type="password" id="senhaT" placeholder="senha...">`;
    p.innerHTML += `<br><button onclick="finalizartransferecia2()">CONFIRMAR</button>`;
}

function finalizartransferecia2() {
    var grana;
    var senhaT;
    grana = parseFloat(document.getElementById("retirarM").value);
    senhaT = document.getElementById("senhaT").value;

    if (senhaT == lista[pessoa.posicao].senha) {
        if (grana < lista[pessoa.posicao].saldo && grana <= 10000 && lista[pessoa.posicao].idade > 60) {
            lista[pessoa.posicao].saldo = ((lista[pessoa.posicao].saldo * 100) - (grana * 100)) / 100;
            lista[alvo].saldo = ((lista[alvo].saldo * 100) + (grana * 100)) / 100;
            document.getElementById("CC3").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            document.getElementById("CC3").innerHTML += `<br>Transferência Aprovada!`;
            lista[pessoa.posicao].extrato += `Transferência de R$${grana} para ${lista[alvo].nome} ${lista[alvo].sobrenome}<br>`;
        lista[alvo].extrato += `Valor de R$${grana} recebido de ${lista[pessoa.posicao].nome} ${lista[pessoa.posicao].sobrenome}<br>`;
        } else if (grana < lista[pessoa.posicao].saldo && grana <= 10000 && lista[pessoa.posicao].idade <= 60) {
            lista[pessoa.posicao].saldo = ((lista[pessoa.posicao].saldo * 100) - (grana * 100)) / 100;
            lista[alvo].saldo = ((lista[alvo].saldo * 100) + (grana * 100)) / 100;
            lista[pessoa.posicao].saldo -= (grana*100 * 5 / 100)/100;
            document.getElementById("CC3").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            lista[pessoa.posicao].extrato += `Transferência de R$${grana} para ${lista[alvo].nome} ${lista[alvo].sobrenome}, com R$${+(grana*100 * 5 / 100)/100} de juros cobrado<br>`;
            lista[alvo].extrato += `Valor de R$${grana} recebido de ${lista[pessoa.posicao].nome} ${lista[pessoa.posicao].sobrenome}<br>`;
        } else {
            document.getElementById("CC3").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            document.getElementById("CC3").innerHTML += `<br>Saldo indisponível`;
        }
    } else {
        document.getElementById("CC3").innerHTML = `Dados inválidos. Tente novamente`;
    }
    localStorage.setItem("cadastros", JSON.stringify(lista));
}


function pix() {
    var p = document.getElementById("CC");
    if(lista[pessoa.posicao].extrato == "") {
        lista[pessoa.posicao].extrato = `Saldo inicial de: ${lista[pessoa.posicao].saldo}<br>`;
    }
    p.innerHTML = `<button class="redondo" onclick="verPix()">VER CHAVES PIX</button>
    <button class="redondo"  onclick="pixB()">CRIAR CHAVE PIX</button>
    <button  class="redondo" onclick="pixTrans()">TRANSFERIR</button>`;
}

function pixB() {
    var p = document.getElementById("CC");

    p.innerHTML = `Crie sua(s) chave(s) Pix: <br>`;
    p.innerHTML += `<input type="text" id="pix1" placeholder="chave pix 1..."><br><input type="text" id="pix2" placeholder="chave pix 2..."><br><input type="text" id="pix3" placeholder="chave pix 3...">`;
    p.innerHTML += `<br> <button class="redondo"  onclick="pixCad()">CADASTRAR</button>`;
}


function pixCad() {
    var pix1 = document.getElementById("pix1").value;
    var pix2 = document.getElementById("pix2").value;
    var pix3 = document.getElementById("pix3").value;

    var p = document.getElementById("CC");

    var pix = [pix1, pix2, pix3];
    console.log(pix1, pix2, pix3);

    var tamPix = 6;


    for (var i = 0; i < 3; i++) {
        var auxiliar = -1;
        var pixAle = "";
        if (pix[i] == "") {
            caracteres = [
                ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m"],
                ["a", "e", "i", "o", "u"],
                ["1", "2", "3", "4", "5"],
                ["@", "#", "$", "%", "&", "?"],
                ["n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"],
                ["6", "7", "8", "9", "0"]
            ];
            for (var j = 0; j < tamPix; j++) {
                auxiliar += 1;
                pixAle += caracteres[auxiliar][parseInt(Math.random() * caracteres[auxiliar].length)];
            }
            pix[i] = pixAle;
            console.log(pix[i]);
        }
    }
    lista[pessoa.posicao].pix1 = pix[0];
    lista[pessoa.posicao].pix2 = pix[1];
    lista[pessoa.posicao].pix3 = pix[2];

    p.innerHTML = `Chave Pix 1: ${pix[0]}<br>Chave Pix 2: ${pix[1]}<br>Chave Pix 3: ${pix[2]}`;
    p.innerHTML += `<br> <button class="redondo" onclick="pix()">VOLTAR</button>`;
    localStorage.setItem("cadastros", JSON.stringify(lista));
}


function verPix() {
    localStorage.setItem("cadastros", JSON.stringify(lista));
    var p = document.getElementById("CC");

    p.innerHTML = `Chave Pix 1: ${lista[pessoa.posicao].pix1}<br>Chave Pix 2: ${lista[pessoa.posicao].pix2}<br>Chave Pix 3: ${lista[pessoa.posicao].pix3}`;
    p.innerHTML += `<br> <button class="redondo" onclick="pix()">VOLTAR</button>`;
}

function pixTrans() {
    var p = document.getElementById("CC");

    p.innerHTML = `Digite a chave PIX da conta que você deseja transferir: <br><input id="chavePix" placeholder="chave PIX...">`;
    p.innerHTML += `<br> <button class="redondo"  onclick="pixT2()">AVANÇAR</button>`;
}

var alvo2;

function pixT2() {
    var p = document.getElementById("CC");
    var chavePix = document.getElementById("chavePix").value;

    for (var i = 0; i < lista.length; i++) {
        if (chavePix == lista[i].pix1 && chavePix != "" || chavePix == lista[i].pix2 && chavePix != "" || chavePix == lista[i].pix3 && chavePix != ""
            && chavePix != lista[pessoa.posicao].pix1 && chavePix != lista[pessoa.posicao].pix2 && chavePix != lista[pessoa.posicao].pix3) {
            p.innerHTML = `Tranferir para ${lista[i].nome} ${lista[i].sobrenome}<br><br>`;
            p.innerHTML += `Digite o valor da transferência: <br><input type="number" id="valorP">`;
            p.innerHTML += `<br>Digite sua senha para confirmar a transferência:<br> <input type="password" id="senhaP" placeholder="senha...">`;
            p.innerHTML += `<br><button onclick="pixFim()">CONFIRMAR</button>`;

            document.getElementById("CC2").innerHTML = `Saldo = ${lista[pessoa.posicao].saldo}`;

            alvo2 = i;
            break;
        } else {
            document.getElementById("CC2").innerHTML = "Pix inválido";
        }
    }
}


function pixFim() {
    var valor = parseFloat(document.getElementById("valorP").value);
    var senhaP = document.getElementById("senhaP").value;

    if (senhaP == lista[pessoa.posicao].senha) {
        if (valor < lista[pessoa.posicao].saldo && valor <= 10000) {
            lista[pessoa.posicao].saldo = ((lista[pessoa.posicao].saldo * 100) - (valor * 100)) / 100;
            lista[alvo2].saldo = ((lista[alvo2].saldo * 100) + (valor * 100)) / 100;
            lista[pessoa.posicao].extrato += `Transferência de PIX de R$${valor} para ${lista[alvo2].nome} ${lista[alvo2].sobrenome}<br>`;
            lista[alvo2].extrato += `Valor de PIX de R$${valor} recebido de ${lista[pessoa.posicao].nome} ${lista[pessoa.posicao].sobrenome}<br>`;
            document.getElementById("CC2").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            document.getElementById("CC2").innerHTML += `<br>Transferência Aprovada!`;
        } else {
            document.getElementById("CC2").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
            document.getElementById("CC2").innerHTML += `<br>Saldo indisponível.`;
        }
    } else {
        document.getElementById("CC2").innerHTML = `Saldo atual = ${lista[pessoa.posicao].saldo}`;
        document.getElementById("CC2").innerHTML += `<br>Dados inválidos. Tente novamente.`;
    }
    localStorage.setItem("cadastros", JSON.stringify(lista));
}