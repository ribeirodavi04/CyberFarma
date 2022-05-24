const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

//Retorna todos Clientes
router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT * FROM clientes", (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        clientes: result.map((forn) => {
          return {
            idCliente: forn.idCliente,
            nome: forn.nomeCliente,
            cpf: forn.CPF_Cliente,
            telefone: forn.telefoneCliente,
            endereco: forn.enderecoCliente,
            dataNasc: forn.data_nasc_Cliente,
            deficiencia: forn.deficiencia,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os Clientes",
              url: "http://localhost:3000/clientes/" + forn.idCliente,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

//Insere um cliente
router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO clientes (nomeCliente, CPF_Cliente, telefoneCliente, enderecoCliente, data_nasc_Cliente, deficiencia) VALUES(?, ?, ?, ?, ?, ?);",
      [
        req.body.nome,
        req.body.cpf,
        req.body.telefone,
        req.body.endereco,
        req.body.dataNasc,
        req.body.deficiencia,
      ],
      (err, result, field) => {
        conn.release();
        if (err) {
          return res.status(500).send({ err: err });
        }
        const response = {
          message: "Cliente Inserido com Sucesso! :)",
          fornecedorCriado: {
            idCliente: result.idCliente,
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            dataNasc: req.body.dataNasc,
            deficiencia: req.body.deficiencia,
            request: {
              tipo: "POST",
              descricao: "Adiciona um novo CLiente",
              url: "http://localhost:3000/clientes/",
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

//Retorn os dados de um cliente em especifico.
router.get("/:idCliente", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM clientes WHERE idCliente = ?;",
      [req.params.idCliente],
      (error, result, fiedls) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Cliente não encontrado! :(",
          });
        }
        const response = {
          cliente: {
            idCliente: result[0].idCliente,
            nome: result[0].nomeCliente,
            cpf: result[0].CPF_Cliente,
            telefone: result[0].telefoneCliente,
            endereco: result[0].enderecoCliente,
            dataNasc: result[0].data_nasc_Cliente,
            deficiencia: result[0].deficiencia,
            request: {
              tipo: "GET",
              descricao: "Retorna um Cliente",
              url: "http://localhost:3000/clientes/",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

//Retorn os dados de um cliente em especifico.
router.get("/cpf/:cpfCliente", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM clientes WHERE CPF_Cliente = ?;",
      [req.params.cpfCliente],
      (error, result, fiedls) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Cliente não encontrado! :(",
          });
        }
        const response = {
          cliente: {
            idCliente: result[0].idCliente,
            nome: result[0].nomeCliente,
            cpf: result[0].CPF_Cliente,
            telefone: result[0].telefoneCliente,
            endereco: result[0].enderecoCliente,
            dataNasc: result[0].data_nasc_Cliente,
            deficiencia: result[0].deficiencia,
            request: {
              tipo: "GET",
              descricao: "Retorna um Cliente",
              url: "http://localhost:3000/clientes/",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});


//Altera um Cliente
router.patch("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE clientes
                SET nomeCliente = ?,
                    CPF_Cliente = ?,
                    telefoneCliente = ?,
                    enderecoCliente =?,
                    data_nasc_Cliente = ?,
                    deficiencia = ?
                WHERE idCliente = ?;`,
      [
        req.body.nome,
        req.body.cpf,
        req.body.telefone,
        req.body.endereco,
        req.body.dataNasc,
        req.body.deficiencia,
        req.body.idCliente,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        const response = {
          message: "Cliente atualizado com sucesso! :)",
          clienteAtualizado: {
            idCliente: req.body.idCliente,
            nome: req.body.nome,
            cpf: req.body.cpf,
            telefone: req.body.telefone,
            endereco: req.body.endereco,
            dataNasc: req.body.dataNasc,
            deficiencia: req.body.deficiencia,
            request: {
              tipo: "PATCH",
              descricao: "Atualiza dados de um cliente ",
              url: "http://localhost:3000/clientes/" + req.body.idCliente,
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

// Deleta um Cliente
router.delete("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM clientes WHERE clientes.idCliente = ?;",
      [req.body.idCliente],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Cliente Deleteado com sucesso :/'",
          request: {
            tipo: "POST",
            descricao: "Deleta um Fornecedor.",
            url: "http://localhost:300/clientes ",
            body: {
              nome: "String",
              cpf: "String",
              telefone: "String",
              endereco: "String",
              dataNasc: "date",
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
