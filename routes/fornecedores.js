const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//RETORNA TODOS FORNECEDORES
router.get("/", (req, res, next) => {
  res.status(200).send({
    message: "Retorna Fornecedores",
  });
});

//INSERE UM FORNECEDOR
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    conn.query(
      "INSERT INTO fornecedor (nomeFornecedor, CNPJ_Fornecedor, telFornecedor) VALUES(?,?,?);",
      [req.body.nome, req.body.cnpj, req.body.telefone],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({
            error: error,
            response: null,
          });
        }

        res.status(201).send({
          message: "Produto inserido com sucesso",
          id_produto: resultado.insertId,
        });
      }
    );
  });
});

//RETORNA OS DADOS DE UM FORNECEEDOR ESPECIFICO
router.get("/:idFornecedor", (req, res, next) => {
  const id = req.params.idFornecedor;
  res.status(200).send({
    message: "Detalhes de um fornecedor",
    id: id,
  });
});

//ALTERA UM FORNECEDOR
router.patch("/", (req, res, next) => {
  res.status(201).send({
    message: "0 fornecedor alterado",
  });
});

//DELETA UM FORNECEDOR
router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "forncedor deletado",
  });
});

module.exports = router;
