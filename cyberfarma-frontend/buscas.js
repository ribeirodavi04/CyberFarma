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
async function buscarFornecedoresTBL() {
  const url = "http://localhost:3000/fornecedores";
  const fornecedores = await fetch(url).then((res) => res.json());
  console.log(fornecedores);

  let output = "";

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
}
