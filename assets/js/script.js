function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "admin@admin.com" && senha === "1234") {
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
  mostrarUsuariosNaTabela();
  limpar();
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
      } else {
        alert("Usuário não localizado.")
      }
    }
  }
  document.querySelector("#buscar").value = "";
}

function atualizar() {
  var dados = JSON.parse(localStorage.getItem("bdl"));
  let idString = document.querySelector("#id").value;
  let login = document.querySelector("#login_usuario").value;
  let senha = document.querySelector("#senha_usuario").value;

  let id = parseInt(idString);
  let itemEncontrado = false;

  for (let i = 0; dados.length > i; i++) {
    if (dados[i] && dados[i].id === id) {
      let user = { id: id, nome: login, senha: senha };
      dados[i] = user;
      itemEncontrado = true;
      localStorage.setItem("bdl", JSON.stringify(dados));

      ClienteArray = dados;
      alert("Atualizado!");
      break;
    }
  }
  mostrarUsuariosNaTabela();
  limpar();
}

function apagarItemVetor() {
  let id = parseInt(document.querySelector("#id").value);
  let login = document.querySelector("#login_usuario").value;

  if (!id || !login) {
    alert("Preencha o ID e o Login para apagar.");
    return;
  }

  var dados = JSON.parse(localStorage.getItem("bdl"));

  if (!dados || !Array.isArray(dados)) {
    alert("Nenhum dado de usuário encontrado para apagar.");
    limpar();
    return;
  }

  let itemApagado = false;

  for (let i = 0; i < dados.length; i++) {
    if (dados[i] && dados[i].id === id && dados[i].nome === login) {
      dados.splice(i, 1);
      itemApagado = true;

      localStorage.setItem("bdl", JSON.stringify(dados));

      ClienteArray = dados;

      alert("Usuário apagado com sucesso!");
      limpar();
      break;
    }
  }

  if (!itemApagado) {
    alert("Usuário com ID e Login informados não encontrado.");
    limpar();
  }
  mostrarUsuariosNaTabela();
}

function limpar() {
  document.querySelector("#id").value = "";
  document.querySelector("#login_usuario").value = "";
  document.querySelector("#senha_usuario").value = "";
  document.querySelector("#buscar").value = "";
}

function mostrarUsuariosNaTabela() {
  const tabelaBody = document.getElementById("tabela");

  if (!tabelaBody) {
    console.error("Elemento <tbody> com ID 'tabela' não encontrado.");
    return;
  }

  tabelaBody.innerHTML = "";

  ClienteArray.forEach((user) => {
    if (
      user &&
      user.id !== undefined &&
      user.nome !== undefined &&
      user.senha !== undefined
    ) {
      const row = document.createElement("tr");

      const idCell = document.createElement("td");
      const loginCell = document.createElement("td");
      const senhaCell = document.createElement("td");

      idCell.textContent = user.id;
      loginCell.textContent = user.nome;

      senhaCell.textContent = user.senha;

      row.appendChild(idCell);
      row.appendChild(loginCell);
      row.appendChild(senhaCell);

      tabelaBody.appendChild(row);
    }
  });
}

document.addEventListener("DOMContentLoaded", mostrarUsuariosNaTabela);
