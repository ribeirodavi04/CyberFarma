const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const auth = require('../middleware/auth');

//RETORNA TODOS FORNECEDORES
router.get("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM fornecedores;", (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        fornecedores: result.map((forn) => {
          return {
            idFornecedor: forn.idFornecedor,
            nome: forn.nomeFornecedor,
            razaoSocial: forn.razaoSocial,
            cnpj: forn.CNPJ_Fornecedor,
            telefone: forn.telFornecedor,
            descricao: forn.descricao,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os fornecedores",
              url: "http://localhost:3000/fornecedores/" + forn.idFornecedor,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

//INSERE UM FORNECEDOR
router.post("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO fornecedores (nomeFornecedor, razaoSocial, CNPJ_Fornecedor, telFornecedor, descricao) VALUES(?,?,?,?,?);",
      [
        req.body.nome,
        req.body.razaoSocial,
        req.body.cnpj,
        req.body.telefone,
        req.body.descricao,
      ],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Fornecedor inserido com sucesso",
          fornecedorCriado: {
            idFornecedor: result.idFornecedor,
            nome: req.body.nome,
            razaoSocial: req.body.razaoSocial,
            cnpj: req.body.cnpj,
            telefone: req.body.telefone,
            descricao: req.body.descricao,
            request: {
              tipo: "POST",
              descricao: "Adiciona um novo Fornecedor",
              url: "http://localhost:3000/fornecedores/",
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

//RETORNA OS DADOS DE UM FORNECEEDOR ESPECIFICO
router.get("/:idFornecedor", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM fornecedores WHERE idFornecedor = ?;",
      [req.params.idFornecedor],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            massage: "Fornecedor não encontrado!",
          });
        }
        const response = {
          fornecedor: {
            idFornecedor: result[0].idFornecedor,
            nome: result[0].nomeFornecedor,
            razaoSocial: result[0].razaoSocial,
            cnpj: result[0].CNPJ_Fornecedor,
            telefone: result[0].telFornecedor,
            descricao: result[0].descricao,
            request: {
              tipo: "GET",
              descricao: "Retorna um Fornecedor",
              url: "http://localhost:3000/fornecedores/",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

//ALTERA UM FORNECEDOR
router.patch("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE fornecedores 
            SET  nomeFornecedor = ?,
                razaoSocial = ?, 
                CNPJ_Fornecedor = ?, 
                telFornecedor = ?,
                descricao = ?
            WHERE idFornecedor = ?;`,
      [
        req.body.nome,
        req.body.razaoSocial,
        req.body.cnpj,
        req.body.telefone,
        req.body.descricao,
        req.body.idFornecedor,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          massage: "Fornecedor atualizado com sucesso!",
          fornecedorAtualizado: {
            idFornecedor: req.body.idFornecedor,
            nome: req.body.nome,
            razaoSocial: req.body.razaoSocial,
            cnpj: req.body.cnpj,
            telefone: req.body.telefone,
            descricao: req.body.descricao,
            request: {
              tipo: "PATCH",
              descricao: "Altera dados de um Fornecedor",
              url:
                "http://localhost:3000/fornecedores/" + req.body.idFornecedor,
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

//DELETA UM FORNECEDOR
router.delete("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM fornecedores WHERE fornecedores.idFornecedor = ?",
      [req.body.idFornecedor],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Fornecedor deletado com sucesso!",
          request: {
            tipo: "POST",
            descricao: "Deleta um Fornecedor.",
            url: "http://localhost:3000/fornecedores",
            body: {
              nome: "String",
              cnpj: "String",
              telefone: "String",
            },
          },
        };

        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
