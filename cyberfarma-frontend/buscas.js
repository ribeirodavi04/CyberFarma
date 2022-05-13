async function buscarFornecedores() {
  const url = "http://localhost:3000/fornecedores";
  const fornecedores = await fetch(url).then((res) => res.json());
  console.log(fornecedores);

  let output = "";

  fornecedores.fornecedores.map((item) => {
    output += `<option value="${item.idFornecedor}">${item.nome}</option>`;
  });
  document.getElementById("fornecedores").innerHTML = output;
}

// Fornecedor 
async function buscarFornecedoresTBL() {

  const url = "http://localhost:3000/fornecedores";
  const fornecedores = await fetch(url).then((res) => res.json());
  console.log(fornecedores);

  let output = "";
  let output2 = `
  <tr>
  <th scope="col">Id</th>
  <th scope="col">Nome</th>
  <th scope="col">Razão Social</th>
  <th scope="col">CNPJ</th>
  <th scope="col">Descrição</th>
</tr>
  
  `
  
  fornecedores.fornecedores.map((item) => {
    output += `<tr>
      <th>${item.idFornecedor}</th>
      <td>${item.nome}</td>
      <td>${item.razaoSocial}</td>
      <td>${item.cnpj}</td>
      <td>${item.descricao}</td>
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;
}


// Cliente
async function buscarClientesTBL() {
  const url = "http://localhost:3000/clientes";
  const clientes = await fetch(url).then((res) => res.json());
  console.log(clientes);

  let output = "";
  let output2 = `
  <tr>
  <th scope="col">Id</th>
  <th scope="col">Nome</th>
  <th scope="col">CPF</th>
  <th scope="col">Telefone</th>
  <th scope="col">Endereço</th>
</tr>
` 
  clientes.clientes.map((item) => {
    output += `<tr>
      <th>${item.idCliente}</th>
      <td>${item.nome}</td>
      <td>${item.cpf}</td>
      <td>${item.telefone}</td>
      <td>${item.endereco}</td>
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;

}


//Funcionario
async function buscarFuncionariosTBL() {
  const url = "http://localhost:3000/funcionarios";
  const funcionarios = await fetch(url).then((res) => res.json());
  console.log(funcionarios);

  let output = "";
  let output2 = `
  <tr>
  <th scope="col">Id</th>
  <th scope="col">Nome</th>
  <th scope="col">Nome de Usuario</th>
  <th scope="col">CPF</th>
  <th scope="col">Cargo</th>
  <th scope="col">Endereço</th>
  <th scope="col">Telefone</th>
  <th scope="col">Data de Nascimento</th>
</tr>
` 

  funcionarios.funcionarios.map((item) => {
    let dataStr = item.dataNasc
    
    output += `<tr>
      <th>${item.idFuncionario}</th>
      <td>${item.nome}</td>
      <td>${item.nomeUsuario}</td>
      <td>${item.cpf}</td>
      <td>${item.cargo}</td>
      <td>${item.telefone}</td>
      <td>${item.endereco}</td>
      <td>${dataStr.substring(0, 10)}</td>
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2

}


//Produto

async function buscarProdutosTBL() {
  const url = "http://localhost:3000/produtos";
  const produtos = await fetch(url).then((res) => res.json());
  console.log(produtos);

  
  let output = "";
  let output2 = `
  <tr>
  <th scope="col">id</th>
  <th scope="col">Nome</th>
  <th scope="col">Código de Barras</th>
  <th scope="col">Tipo</th>
  <th scope="col">Marca</th>
  <th scope="col">Quantidade</th>
  <th scope="col">Preço</th>
  <th scope="col">Lote</th>
  <th scope="col">Data de Validade</th>
  <th scope="col">Fornecedor</th>
  <th scope="col">Descrição</th>
</tr>
` 

  produtos.produtos.map((item) => {

    let dataStr = item.dataValidade
    
    output += `<tr>
      <th>${item.idProduto}</th>
      <td>${item.nome}</td>
      <td>${item.codBarra}</td>
      <td>${item.tipo}</td>
      <td>${item.marca}</td>
      <td>${item.quantidade}</td>
      <td>${item.preco}</td>
      <td>${item.lote}</td>
      <td>${dataStr.substring(0,10)}</td>
      <td>${item.nomeFornecedor}</td>
      <td>${item.descricao}</td>

  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;

}

  function menuControl (index){
    if (index === 1){
      buscarClientesTBL()
    }else if (index ===2){
      buscarFuncionariosTBL()
    }else if (index === 3){
      buscarFornecedoresTBL()
    }else if (index === 4){
      buscarProdutosTBL()
    }else{

    }

  }