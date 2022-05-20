
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
      <th scope="col">Funções</th>
    </tr>` 
  clientes.clientes.map((item) => {
    output += `<tr>
      <th>${item.idCliente}</th>
      <td>${item.nome}</td>
      <td>${item.cpf}</td>
      <td>${item.telefone}</td>
      <td>${item.endereco}</td>
      <td><button class="btn btn-outline-danger" onclick="deleteRow(${item.idCliente}, 1)">Excluir</button></td> 
      <td><button class="btn btn-warning" onclick="">Alterar</button></td> 
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
  <th scope="col">Funções</th>
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
      <td><button class="btn btn-outline-danger" onclick="deleteRow(${item.idFuncionario}, 2)">Excluir</button></td>
      <td><button class="btn btn-warning" onclick="">Alterar</button></td>  
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2

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
  <th scope="col">Funções</th>
  </tr>
  `
  
  let i = 0;
  fornecedores.fornecedores.map((item) => {
    output += `<tr>
      <th>${item.idFornecedor}</th>
      <td>${item.nome}</td>
      <td>${item.razaoSocial}</td>
      <td>${item.cnpj}</td>
      <td>${item.descricao}</td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteRow(${item.idFornecedor}, 3)">Excluir</button>
        <button class="btn btn-warning" onclick="buscarFornecedor(${item.idFornecedor})">Alterar</button>
      </td>
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;
  //document.getElementsByClassName("telaformulario").innerHTML += output3;
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
  <th scope="col">Funções</th>
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
      <td><button class="btn btn-outline-danger" onclick="deleteRow(${item.idProduto}, 4)">Excluir</button></td> 
      <td><button class="btn btn-warning" onclick="">Alterar</button></td> 
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
      output = `
        <h5>Alterar Informações do Fornecedor:</h5>
        <p></p>
        <table>
          <tbody id="alterar">
            <tr>
              <td>
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="basic-addon1"
                  required
                  name="id"
                  size="2"
                  disabled
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nome"
                  aria-label="Digite o nome"
                  aria-describedby="basic-addon1"
                  required
                  name="nome"
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite a razão social"
                  aria-label="Digite a razão social"
                  aria-describedby="basic-addon1"
                  name="razaoSocial"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o CNPJ"
                  aria-label="Digite o CNPJ"
                  aria-describedby="basic-addon1"
                  maxlength="14"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                  name="cnpj"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o telefone"
                  aria-label="Digite o CNPJ"
                  aria-describedby="basic-addon1"
                  maxlength="11"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                  name="telefone"
                  required
                />
              </td>

              <td>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="1"
                  placeholder="Digite aqui a Descrição"
                  aria-label="Digite a Descrição"
                  name="descricao"
                ></textarea>
              </td>

              <td>                
                <input type="submit" class="btn btn-outline-success" value="Alterar" onclick="alterarFornecedor()"/>
              </td>

              <td>
                <input type="reset" value="Cancelar" class="btn btn-outline-danger" onclick="cancelarAlteracao()"/>
              </td>
            </tr>
          </tbody>
        </table>
      `
      document.getElementById('alterarInfos').innerHTML+= output;
    }else if (index === 4){
      buscarProdutosTBL()
    }else{

    }

  }

//----------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------DELETAR-------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

async function deleteRow(id, i){
  let url = '';
  let body = {};

  if(i==1){
    url = 'http://localhost:3000/clientes';
    body = {
      idCliente: id
    };
    await deleteSQL(url, body);
    menuControl(i);
  }else if(i==2){
    url = 'http://localhost:3000/funcionarios';
    body = {
      idFuncionario: id
    };
    await deleteSQL(url, body)
    menuControl(i);
  }else if(i==3){
    url = 'http://localhost:3000/fornecedores';
    body = {
      idFornecedor: id
    };
    await deleteSQL(url, body)
    menuControl(i);
  }else if(i==4){
    url = 'http://localhost:3000/produtos';
    body = {
      idProduto: id
    };
    await deleteSQL(url, body)
    menuControl(i);
  }  
}

async function deleteSQL(url, body){
  await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
}

//----------------------------------------------------------------------------------------------------------------------
//---------------------------------------------alterarações-------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

function cancelarAlteracao(){
  document.getElementById('alterarInfos').style.display = "none";
}

async function buscarFornecedor(id){
  document.getElementById('alterarInfos').style.display = "block";
  const url = `http://localhost:3000/fornecedores/${id}`;
  const fornecedor = await fetch(url).then((res) => res.json());

  document.getElementsByTagName('input')[0].value = fornecedor.fornecedor.idFornecedor
  document.getElementsByTagName('input')[1].value = fornecedor.fornecedor.nome
  document.getElementsByTagName('input')[2].value = fornecedor.fornecedor.razaoSocial
  document.getElementsByTagName('input')[3].value = fornecedor.fornecedor.cnpj
  document.getElementsByTagName('input')[4].value = fornecedor.fornecedor.telefone
  document.getElementsByTagName('textarea')[0].value = fornecedor.fornecedor.descricao
  console.log(fornecedor.fornecedor);
  
}


async function alterarFornecedor(){
  
  let id = document.getElementsByName("id")[0].value;
  let nome = document.getElementsByName("nome")[0].value;
  let razaoSocial = document.getElementsByName("razaoSocial")[0].value;
  let cnpj = document.getElementsByName("cnpj")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let descricao = document.getElementsByName("descricao")[0].value;

  let url = `http://localhost:3000/fornecedores`;
  console.log(nome, razaoSocial, cnpj, telefone, descricao);

  body = {
    nome: nome,
    razaoSocial: razaoSocial,
    cnpj: cnpj,
    telefone: telefone,
    descricao: descricao,
    idFornecedor: id
  };

  await fetch(url, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));

  document.getElementById('alterarInfos').style.display = "none";
  buscarFornecedoresTBL()
}


