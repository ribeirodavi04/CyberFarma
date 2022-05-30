//Produto
produtosVet = [];
clienteVet = {};
idFuncc = null;

async function buscarIdFuncionario(){
    const url = 'http://localhost:3000/login/idFuncionario';
    let idFunc = await fetch(url).then((res)=>res.json());
    console.log(idFunc.idFunc)
    idFuncc = idFunc.idFunc;
}
buscarIdFuncionario();

async function buscarProduto() {
    let codBarra = document.getElementsByName("codigoBarra")[0].value;
    console.log(codBarra)
    const url = `http://localhost:3000/produtos/codigoDeBarras/${codBarra}`;
    const produto = await fetch(url).then((res) => res.json());
    produtosVet.push(produto.produtos);
    attTabela();
    attPrecoTotal();
}

function attTabela(){
    let output = "";
    
    for(let i in produtosVet){
        output += `
        <tr>
            <th>
                <button type="button" class="btn btn-outline-danger" onclick="removerProduto(${i})"> - </button>
            </th>
            <td>${produtosVet[i].codBarra}</td>
            <td>${produtosVet[i].nome}</td>
            <td>${produtosVet[i].preco}</td> 
        </tr>`;
        //console.log(produtosVet)
    }
      
    document.getElementById("produtostbl").innerHTML = output;
}

function attPrecoTotal(){
    let precoTotal = 0;
    produtosVet.map((item)=>{
        precoTotal = precoTotal + item.preco
        //console.log(item.preco);
    })
    //console.log(precoTotal);
    document.getElementById("precoTotal").innerText = precoTotal;
}

function removerProduto(index){
    console.log(index)
    document.getElementsByTagName("tr")[index+1].style.display = 'none';
    produtosVet.splice(index, 1); 
    attTabela();
    attPrecoTotal();
}

async function buscarCliente(){
    let cpfCliente = document.getElementsByName("cpfCliente")[0].value;
    document.getElementById("cliente").style.display = "block";
    const url = `http://localhost:3000/clientes/cpf/${cpfCliente}`;
    const cliente = await fetch(url).then((res) => res.json());
    clienteVet = cliente.cliente;
    //console.log(clienteVet.idCliente)
    document.getElementById("clienteInfo").innerText = cliente.cliente.nome;
    //console.log(cliente.cliente);
}

async function finalizarVenda(){
    let idCliente = null;

    let idFuncionario = idFuncc;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    
    let valorTotal = document.getElementById("precoTotal").innerText;
    
    let formaPagamento = document.getElementsByName("formaPagamento")[0].value;
    
    if(Object.keys(clienteVet).length != 0){
        idCliente = clienteVet.idCliente;
        console.log(idCliente)
    }

    //venda BD
    let url = "http://localhost:3000/vendas";
    let url2 = "http://localhost:3000/venda_itens";
    let url3 = "http://localhost:3000/venda_itens/attprodutos"
    let vendaCriada;

    body = {
      idCliente: idCliente,
      idFuncionario: idFuncionario,
      data: today,
      valorVenda: valorTotal,
      formaPagamento: formaPagamento,
    };
  
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
            console.log(json);
            vendaCriada = json.vendaCriada;
        })
      .catch((err) => console.log(err));
    
    const idVenda = vendaCriada.idVenda;
    

    for(let i in produtosVet){
        body2 = {
            idProduto: produtosVet[i].idProduto,
            idVenda: idVenda,
            quantidadeVI: 1,
            precoVI: produtosVet[i].preco,
            codigoDeBarraVI: produtosVet[i].codBarra
        }
        await fetch(url2, {
            method: "POST",
            body: JSON.stringify(body2),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
        
            const url4 = `http://localhost:3000/produtos/${produtosVet[i].idProduto}`;
            const produtoQtde = await fetch(url4).then((res) => res.json());
            //console.log(produtoQtde.produtos.quantidade);
            
            body = {
                quantidade: --produtoQtde.produtos.quantidade,
                idProduto: produtosVet[i].idProduto,
            };
            
            await fetch(url3, {
                method: "PATCH",
                body: JSON.stringify(body),
                headers: { "Content-type": "application/json; charset=UTF-8" },
            })
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((err) => console.log(err));
            
        //console.log(produtosVet)
    }

    
    document.getElementsByName("cpfCliente")[0].value = "";
    document.getElementById("cliente").style.display = "none";
    produtosVet = [];
    attTabela();
    attPrecoTotal();
}

  