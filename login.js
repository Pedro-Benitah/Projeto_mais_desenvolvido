var verificador_senha;
var senha_apagada = "";

function voltar() {
    window.location.href = "login.html";
}

function cadastrar() {
    window.location.href = "cadastro.html";
}

function cadastrar2() {
    document.getElementById("alerta1").innerHTML = "";
    document.getElementById("alerta2").innerHTML = "";
    var cadastro;
    var dataNasc;
    var email;
    cadastro = { nome: "", sobrenome: "", saldo: 0, nasc: "", email: "", senha: "", posicao: lista.length, idade: "", pix1: "", pix2: "", pix3: "", extrato: "", bloqueio: "0" };
    dataNasc = "";
    cadastro.saldo = parseFloat(document.getElementById("extrato").value);
    cadastro.nome = document.getElementById("nome").value;
    cadastro.sobrenome = document.getElementById("sobrenome").value;
    cadastro.nasc = document.getElementById("dataNasc").value;
    cadastro.email = document.getElementById("email").value;
    cadastro.senha = document.getElementById("senha").value;
    cadastro.extrato = `Saldo inicial de: ${cadastro.saldo}<br>`;

    for (i = 0; i < cadastro.email.length; i++) {
        if(cadastro.email[i] == "@") {
            email = 1;
            break;
        } else {
            email = 0;
        }
    } 

    if (email == 1) {
        for (i = 0; i < 4; i++) {
            dataNasc += cadastro.nasc[i];
        }
        cadastro.idade = 2020 - dataNasc;

        confEmail = document.getElementById("confEmail").value;
        confSenha = document.getElementById("confSenha").value;

        if (cadastro.email != confEmail || cadastro.email == "") {
            document.getElementById("alerta1").innerHTML = "<i>Os emails não correspondem.</i>";
        } else if (cadastro.senha != confSenha || cadastro.senha == "") {
            document.getElementById("alerta2").innerHTML = "<i>As senhas não correspondem.</i>";
        } else if (cadastro.saldo > 10000 || cadastro.saldo < 0) {
            document.getElementById("deposito"). innerHTML = "<i>Saldo inválido";
        } else {
            document.getElementById("alerta2").innerHTML = '<i>Confirmado!</i>';
            document.getElementById("alerta1").innerHTML = "<i>Confirmado!</i>";
            document.getElementById("deposito"). innerHTML = "<i>Confirmado!</i>";

            lista.push(cadastro);
            localStorage.setItem("cadastros", JSON.stringify(lista));
        }
    } else {
        document.getElementById("alerta1").innerHTML = "<i>Email inválido.</i>";
    }
}


var lista;
lista = JSON.parse(localStorage.cadastros);

localStorage.setItem("cadastros", JSON.stringify(lista));
clientes = JSON.parse(localStorage.cadastros);

function teclar0() {
    document.getElementById("senhaLogin").value += "0";
}
function teclar1() {
    document.getElementById("senhaLogin").value += "1";
}
function teclar2() {
    document.getElementById("senhaLogin").value += "2";
}
function teclar3() {
    document.getElementById("senhaLogin").value += "3";
}
function teclar4() {
    document.getElementById("senhaLogin").value += "4";
}
function teclar5() {
    document.getElementById("senhaLogin").value += "5";
}
function teclar6() {
    document.getElementById("senhaLogin").value += "6";
}
function teclar7() {
    document.getElementById("senhaLogin").value += "7";
}
function teclar8() {
    document.getElementById("senhaLogin").value += "8";
}
function teclar9() {
    document.getElementById("senhaLogin").value += "9";
}

function teclar10() {
    senha_apagada = "";
    verificador_senha = document.getElementById("senhaLogin").value;
    for (i = 0; i < verificador_senha.length - 1; i++) {
        senha_apagada += verificador_senha[i];
    }
    document.getElementById("senhaLogin").value = senha_apagada;
}

function teclarOK() {
    var email = document.getElementById("emailLogin").value;
    var senha = document.getElementById("senhaLogin").value;

    var p = document.getElementById("welcome");

    if (email != "" && senha != "") {
        for (i = 0; i < lista.length; i++) {
            if (email == lista[i].email && lista[i].bloqueio == 3) {
                document.getElementById("erro1").innerHTML = `Conta bloqueada, dirija-se a sua agencia bancária.`;
                break;
            }
            if (email == lista[i].email && senha == lista[i].senha) {
                localStorage.setItem("cliente", JSON.stringify(lista[i]));
                pessoa = JSON.parse(localStorage.cliente);
                window.location.href = "telaPrincipal.html";
                lista[i].bloqueio = 0;
                localStorage.setItem("cadastros", JSON.stringify(lista));
                break;
            } else if (email == lista[i].email && senha != lista[i].senha) {
                document.getElementById("erro1").innerHTML = `Senha inválida. Tente novamente.Você tem ${3 - lista[i].bloqueio - 1} tentativas restantes`;
                lista[i].bloqueio++;
                localStorage.setItem("cadastros", JSON.stringify(lista));
                if (email == lista[i].email && lista[i].bloqueio >= 3) {
                    document.getElementById("erro1").innerHTML = `Conta bloqueada`;
                    localStorage.setItem("cadastros", JSON.stringify(lista));
                    break;
                }
                break;
            } else {
                document.getElementById("erro1").innerHTML = `  Dados inválidos. Tente novamente. `;
            }
        }
    } else {
        document.getElementById("erro1").innerHTML = ` Dados inválidos. Tente novamente. `;
    }
}
