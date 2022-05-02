const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//RETORNA TODOS FORNECEDORES
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM fornecedores;", (error, resultado, fields) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      return res.status(200).send({ response: resultado });
    });
  });
});

//INSERE UM FORNECEDOR
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO fornecedores (nomeFornecedor, CNPJ_Fornecedor, telFornecedor) VALUES(?,?,?);",
      [req.body.nome, req.body.cnpj, req.body.telefone],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(201).send({
          message: "Forneceor inserido com sucesso",
          idFornecedor: resultado.insertId,
        });
      }
    );
  });
});

//RETORNA OS DADOS DE UM FORNECEEDOR ESPECIFICO
router.get("/:idFornecedor", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM fornecedores WHERE idFornecedor = ?;",
      [req.params.idFornecedor],
      (error, resultado, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        return res.status(200).send({ response: resultado });
      }
    );
  });
});

//ALTERA UM FORNECEDOR
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE fornecedores 
            SET  nomeFornecedor = ?, 
                CNPJ_Fornecedor = ?, 
                telFornecedor = ?
            WHERE idFornecedor = ?`,
      [req.body.nome, req.body.cnpj, req.body.telefone, req.body.idFornecedor],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(202).send({
          message: "Fornecedores alterado com sucesso",
        });
      }
    );
  });
});

//DELETA UM FORNECEDOR
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM fornecedores WHERE fornecedores.idFornecedor = ?",
      [req.body.idFornecedor],
      (error, resultado, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        res.status(202).send({
          message: "Fornecedor removido com sucesso",
        });
      }
    );
  });
});

module.exports = router;
