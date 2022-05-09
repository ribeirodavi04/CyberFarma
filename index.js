const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); //só aceita json de etrada no body

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "PUT",
      "POST",
      "PATCH",
      "DELETE",
      "GET"
    );
    return res.status(200).send({
      message: "ok",
    });
  }

  next();
});

const rotaFornecedores = require("./routes/fornecedores");
const rotaCLientes = require("./routes/clientes");
const rotaFuncionarios = require("./routes/funcionarios");
const rotaProdutos = require("./routes/produtos")
app.use("/fornecedores", rotaFornecedores);
app.use("/clientes", rotaCLientes);
app.use("/funcionarios", rotaFuncionarios);
app.use("/Produtos", rotaProdutos);

//Quando não encotra a rota
app.use((req, res, next) => {
  const erro = new Error("Não encontrado");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

app.listen(3000, () => console.log("Server rodando na porta 3000!"));

// Pão
