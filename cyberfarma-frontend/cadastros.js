function dataSQL(dataNasc) {
  let ano = dataNasc.substring(0, 4);
  let mes = dataNasc.substring(5, 7);
  let dia = dataNasc.substring(8, 10);
  return ano + "/" + mes + "/" + dia;
}

function cadastrarCliente() {
  event.preventDefault();
  let url = "http://localhost:3000/clientes";

  let nomeCli = document.getElementsByName("nomeCli")[0].value;
  let cpf = document.getElementsByName("cpf")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let endereco = document.getElementsByName("endereco")[0].value;
  let dataNasc = document.getElementsByName("dataNasc")[0].value;
  let deficiencia = document.getElementsByName("deficiencia")[0].value;

  console.log(nomeCli, cpf, telefone, endereco, dataNasc, deficiencia);
  body = {
    nome: nomeCli,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    dataNasc: dataSQL(dataNasc),
    deficiencia: deficiencia,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

function cadastrarFuncionario() {
  event.preventDefault();
  let url = "http://localhost:3000/funcionarios";

  let nome = document.getElementsByName("nome")[0].value;
  let cpf = document.getElementsByName("cpf")[0].value;
  let dataNasc = document.getElementsByName("dataNasc")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let endereco = document.getElementsByName("endereco")[0].value;
  let cargo = document.getElementsByName("cargo")[0].value;
  let nomeUsuario = document.getElementsByName("nomeUsuario")[0].value;
  let senha = document.getElementsByName("senha")[0].value;

  body = {
    nome: nome,
    nomeUsuario: nomeUsuario,
    senha: senha,
    cpf: cpf,
    cargo: cargo,
    endereco: endereco,
    telefone: telefone,
    dataNasc: dataSQL(dataNasc),
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

function cadastrarFornecedor() {
  event.preventDefault();
  let url = "http://localhost:3000/fornecedores";

  let nome = document.getElementsByName("nome")[0].value;
  let razaoSocial = document.getElementsByName("razaoSocial")[0].value;
  let cnpj = document.getElementsByName("cnpj")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let descricao = document.getElementsByName("descricao")[0].value;

  console.log(nome, razaoSocial, cnpj, telefone, descricao);

  body = {
    nome: nome,
    razaoSocial: razaoSocial,
    cnpj: cnpj,
    telefone: telefone,
    descricao: descricao,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

function cadastrarProduto() {
  event.preventDefault();
  let url = "http://localhost:3000/produtos";

  let nome = document.getElementsByName("nome")[0].value;
  let codBarra = document.getElementsByName("codBarra")[0].value;
  let preco = document.getElementsByName("preco")[0].value;
  let marca = document.getElementsByName("marca")[0].value;
  let tipo = document.getElementsByName("tipo")[0].value;
  let dataVal = document.getElementsByName("dataVal")[0].value;
  let lote = document.getElementsByName("lote")[0].value;
  let quantidade = document.getElementsByName("quantidade")[0].value;
  let fornecedor = document.getElementsByName("fornecedor")[0].value;
  let descricao = document.getElementsByName("descricao")[0].value;
  console.log(fornecedor);
  body = {
    idFornecedor: fornecedor,
    codBarra: codBarra,
    nome: nome,
    tipo: tipo,
    marca: marca,
    quantidade: quantidade,
    lote: lote,
    preco: preco,
    dataValidade: dataSQL(dataVal),
    descricao: descricao,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}
