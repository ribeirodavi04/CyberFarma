let idFunc;

async function login() {
  event.preventDefault();

  let nomeUsuario = document.getElementsByName("nomeUsuario")[0].value;
  let senha = document.getElementsByName("senha")[0].value;
  let adm = document.getElementsByName("adm")[0];

  console.log(nomeUsuario, senha, adm.checked);

  body = {
    nomeUsuario: nomeUsuario,
    senha: senha,
  };


  if (adm.checked === false) {
    //funcionario
    let url = "http://localhost:3000/login/funcionario";

    let auth = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json())
    

    if (auth.loginAuth === true) {
      console.log(auth)
      idFunc = auth.idFunc;
      localStorage.setItem('idFuncionario', idFunc);
      window.location.href = "TelaRelatoriosFunc.html";
    } else {
      alert("Nome de usuário ou senha foram digitado errado.");
    }
  } else {
    //administrador
    let url = "http://localhost:3000/login/administrador";

    

    let auth = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((response) => response.json());

    if (auth.loginAuth === true) {
      window.location.href = "TelaDeRelatorios.html";
    } else {
      alert("Nome de usuário ou senha foram digitado errado.");
    }
  }
}