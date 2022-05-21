//-----------------------Cliente
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
      <th scope="col">Data de Nascimento</th>
      <th scope="col">Deficiência</th>
      <th scope="col">Funções</th>
    </tr>` 
  clientes.clientes.map((item) => {
    let dataStr = item.dataNasc;

    output += `<tr>
      <th>${item.idCliente}</th>
      <td>${item.nome}</td>
      <td>${item.cpf}</td>
      <td>${item.telefone}</td>
      <td>${item.endereco}</td>
      <td>${dataStr.substring(0,10)}</td>
      <td>${item.deficiencia}</td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteRow(${item.idCliente}, 1)">Excluir</button>
        <button class="btn btn-warning" onclick="buscarCliente(${item.idCliente})">Alterar</button>
      </td> 
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;

}


//----------------------Funcionario
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
  <th scope="col">Telefone</th>
  <th scope="col">Endereço</th>
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
      <td>
        <button class="btn btn-outline-danger" onclick="deleteRow(${item.idFuncionario}, 2)">Excluir</button>
        <button class="btn btn-warning" onclick="buscarFuncionario(${item.idFuncionario})">Alterar</button>
      </td>
        
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2

}


//------------------------Fornecedor 
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
  <th scope="col">Telefone</th>
  <th scope="col">Descrição</th>
  <th scope="col">Funções</th>
  </tr>
  `
  fornecedores.fornecedores.map((item) => {
    
    output += `<tr>
      <th>${item.idFornecedor}</th>
      <td>${item.nome}</td>
      <td>${item.razaoSocial}</td>
      <td>${item.cnpj}</td>
      <td>${item.telefone}</td>
      <td>${item.descricao}</td>
      <td>
        <button class="btn btn-outline-danger" onclick="deleteRow(${item.idFornecedor}, 3)">Excluir</button>
        <button class="btn btn-warning" onclick="buscarFornecedor(${item.idFornecedor})">Alterar</button>
      </td>
  </tr>`;
  });
  document.getElementById("bodyinfos").innerHTML = output;
  document.getElementById("headerId").innerHTML = output2;
}


//--------------------Produto
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

//----------------------------------------------FORNECEDORES------------------------------------------------------------
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

//--------------------------------------------------CLIENTES------------------------------------------------------------
async function buscarCliente(id){
  document.getElementById('alterarInfos').style.display = "block";
  const url = `http://localhost:3000/clientes/${id}`;
  const cliente = await fetch(url).then((res)=> res.json());

  document.getElementsByTagName('input')[0].value = cliente.cliente.idCliente
  document.getElementsByTagName('input')[1].value = cliente.cliente.nome
  document.getElementsByTagName('input')[2].value = cliente.cliente.cpf
  document.getElementsByTagName('input')[3].value = cliente.cliente.telefone
  document.getElementsByTagName('input')[4].value = cliente.cliente.endereco
  document.getElementsByTagName('input')[5].value = cliente.cliente.dataNasc
  document.getElementsByTagName('input')[6].value = cliente.cliente.deficiencia 
  console.log(cliente.cliente);
}
async function alterarCliente(){
  let id = document.getElementsByName("id")[0].value;
  let nome = document.getElementsByName("nome")[0].value;
  let cpf = document.getElementsByName("cpf")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let endereco = document.getElementsByName("endereco")[0].value;
  let dataNasc = document.getElementsByName("dataNasc")[0].value;
  let deficiencia = document.getElementsByName("deficiencia")[0].value;
 
  let url = `http://localhost:3000/clientes`;
  body = {
    nome: nome,
    cpf: cpf,
    telefone: telefone,
    endereco: endereco,
    dataNasc: dataNasc,
    deficiencia: deficiencia,
    idCliente: id
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
  buscarClientesTBL()
}

//----------------------------------------------FUNCIONARIOS-----------------------------------------------------------
async function buscarFuncionario(id){
  document.getElementById('alterarInfos').style.display = "block";
  const url = `http://localhost:3000/funcionarios/${id}`;
  const funcionario = await fetch(url).then((res)=> res.json());

  document.getElementsByTagName('input')[0].value = funcionario.funcionario.idFuncionario
  document.getElementsByTagName('input')[1].value = funcionario.funcionario.nome
  document.getElementsByTagName('input')[2].value = funcionario.funcionario.nomeUsuario
  document.getElementsByTagName('input')[4].value = funcionario.funcionario.cpf
  document.getElementsByTagName('input')[5].value = funcionario.funcionario.cargo
  document.getElementsByTagName('input')[6].value = funcionario.funcionario.telefone
  document.getElementsByTagName('input')[7].value = funcionario.funcionario.endereco
  document.getElementsByTagName('input')[8].value = funcionario.funcionario.dataNasc 
  console.log(funcionario.funcionario);
}
async function alterarFuncionario(){
  let id = document.getElementsByName("id")[0].value;
  let nome = document.getElementsByName("nome")[0].value;
  let nomeUsuario = document.getElementsByName("nomeUsuario")[0].value;
  let senha = document.getElementsByName("senha")[0].value;
  let cpf = document.getElementsByName("cpf")[0].value;
  let cargo = document.getElementsByName("cargo")[0].value;
  let telefone = document.getElementsByName("telefone")[0].value;
  let endereco = document.getElementsByName("endereco")[0].value;
  let dataNasc = document.getElementsByName("dataNasc")[0].value;
 
  let url = `http://localhost:3000/funcionarios`;
  body = {
    nome: nome,
    nomeUsuario:nomeUsuario,
    senha: senha,
    cpf: cpf,
    cargo: cargo,
    telefone: telefone,
    endereco: endereco,
    dataNasc: dataNasc,
    idFuncionario: id
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
  buscarFuncionariosTBL()
}








//----------------------------------------------------------------------------------------------------------------------

function menuControl (index){
    if (index === 1){
      buscarClientesTBL()
      let output = `
        <h5>Alterar Informações do Cliente:</h5>
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
                  placeholder="Digite o CPF"
                  aria-label="Digite o CPF"
                  aria-describedby="basic-addon1"
                  name="cpf"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o Telefone"
                  aria-label="Digite o Telefone"
                  aria-describedby="basic-addon1"
                  maxlength="14"
                  name="telefone"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o endereço"
                  aria-label="Digite o endereço"
                  aria-describedby="basic-addon1"
                  maxlength="30"
                  name="endereco"
                  required
                />
              </td>

              <td>
                <input
                  type="date"
                  name="dataNasc"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                  data-date-format="DD MMMM YYYY"
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite a deficiencia"
                  aria-label="Digite a deficiencia"
                  aria-describedby="basic-addon1"
                  maxlength="30"
                  name="deficiencia"
                  required
                />
              </td>
              <td>                
                <input type="submit" class="btn btn-outline-success" value="Alterar" onclick="alterarCliente()"/>
              </td>

              <td>
                <input type="reset" value="Cancelar" class="btn btn-outline-danger" onclick="cancelarAlteracao()"/>
              </td>
            </tr>
          </tbody>
        </table>
      `
      document.getElementById('alterarInfos').innerHTML = output;
    }else if (index ===2){
      buscarFuncionariosTBL()
      let output = `
        <h5>Alterar Informações do Funcionario:</h5>
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
                  placeholder="Nome De Usuario"
                  aria-label="Digite o nome de usuario"
                  aria-describedby="basic-addon1"
                  required
                  name="nomeUsuario"
                />
              </td>

              <td>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Nova senha"
                  aria-label="Digite a nova senha"
                  aria-describedby="basic-addon1"
                  required
                  name="senha"
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o CPF"
                  aria-label="Digite o CPF"
                  aria-describedby="basic-addon1"
                  name="cpf"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o Cargo"
                  aria-label="Digite o Cargo"
                  aria-describedby="basic-addon1"
                  maxlength="14"
                  name="cargo"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o telefone"
                  aria-label="Digite o telefone"
                  aria-describedby="basic-addon1"
                  maxlength="30"
                  name="telefone"
                  required
                />
              </td>

              <td>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Digite o endereço"
                  aria-label="Digite o endereco"
                  aria-describedby="basic-addon1"
                  maxlength="30"
                  name="endereco"
                  required
                />
              </td>

              <td>
                <input
                  type="date"
                  name="dataNasc"
                  class="form-control"
                  placeholder=""
                  aria-label=""
                  aria-describedby="basic-addon1"
                  data-date-format="DD MMMM YYYY"
                />
              </td>

              <td>                
                <input type="submit" class="btn btn-outline-success" value="Alterar" onclick="alterarFuncionario()"/>
              </td>

              <td>
                <input type="reset" value="Cancelar" class="btn btn-outline-danger" onclick="cancelarAlteracao()"/>
              </td>
            </tr>
          </tbody>
        </table>
      `
      document.getElementById('alterarInfos').innerHTML = output;
    }else if (index === 3){
      buscarFornecedoresTBL()
      let output = `
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
                  maxlength="30"
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
      document.getElementById('alterarInfos').innerHTML = output;
    }else if (index === 4){
      buscarProdutosTBL()
    }else{

    }
}

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
  
  







