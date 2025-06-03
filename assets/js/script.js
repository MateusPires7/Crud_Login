function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "admin@admin.com" && senha === "1234") {
    localStorage.setItem("admin", "logado");
    window.location.href = "admin.html";
    alert("Você está Logado!");
  } else {
    alert("Login incorreto");
  }
}

// Declaração da variável ClienteArray uma única vez, globalmente
var ClienteArray = JSON.parse(localStorage.getItem("bdl")) || [];

function adicionar() {
  let login = document.querySelector("#login_usuario").value;
  let senha = document.querySelector("#senha_usuario").value;

  // Verifica se os campos não estão vazios
  if (!login || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  let user = { id: Date.now(), nome: login, senha: senha };

  ClienteArray.push(user);
  localStorage.setItem("bdl", JSON.stringify(ClienteArray));
  alert("Registro adicionado.");
}

function buscar() {
  var dados = JSON.parse(localStorage.getItem("bdl"));
  let login = document.querySelector("#buscar").value;

  for (let i = 0; dados.length > i; i++) {
    if (dados[i] == null && dados[i] != login) {
    } else {
      if (login == dados[i].nome) {
        //alert("encontrou: " + dados[i].nome + ":" + i)
        document.querySelector("#id").value = dados[i].id;
        document.querySelector("#login_usuario").value = dados[i].nome;
        document.querySelector("#senha_usuario").value = dados[i].senha;
        break;
      }
    }
  }
}

function atualizar() {
  var dados = JSON.parse(localStorage.getItem("bdl"));
 // localStorage.removeItem("bdl");
  let id = document.querySelector("#id").value;
  let login = document.querySelector("#login_usuario").value;
  let senha = document.querySelector("#senha_usuario").value;

  for (let i = 0; dados.length > i; i++) {
    if (id == dados[i].id) {
      let user = { id: id, nome: login, senha: senha };
      dados[i] = user;
      localStorage.setItem("bdl", JSON.stringify(dados));
      alert("Atualizado!");
      break;
    }
  }
}

function apagarItemVetor() {
  let id = parseInt(document.querySelector("#id").value);
  let login = document.querySelector("#login_usuario").value;
  var dados = JSON.parse(localStorage.getItem("bdl"));
  localStorage.removeItem("bdl");

  for (let i = 0; dados.length > i; i++) {
    if (dados[i] == null) {
    } else {
      if (id == dados[i].id && login == dados[i].nome) {
        delete dados[i];
        break;
      }
    }
  }
  localStorage.setItem("bdl", JSON.stringify(dados));
  limpar()
}

function limpar() {
  document.querySelector("#id").value = "";
  document.querySelector("#login_usuario").value = "";
  document.querySelector("#senha_usuario").value = "";
}
