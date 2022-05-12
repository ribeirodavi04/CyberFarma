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

buscarFornecedores();
