const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool; //conecta com banco
const bcrypt = require("bcrypt"); //criptografa senha
const auth = require('../middleware/auth');

//RETORNA TODOS FUNCIONARIOS
router.get("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }

    conn.query("SELECT * FROM funcionarios", (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        funcionarios: result.map((func) => {
          return {
            idFuncionario: func.idFuncionario,
            nome: func.nomeFunc,
            nomeUsuario: func.nomeDeUsuarioFunc,
            cpf: func.CPF_Func,
            cargo: func.cargoFunc,
            endereco: func.enderecoFunc,
            telefone: func.telefoneFunc,
            dataNasc: func.data_nasc_Func,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os funcionarios",
              url: "http://localhost:3000/funcionarios/" + func.idFuncionario,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

//CADASTRO DE FUNCIONARIOS
router.post("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM funcionarios WHERE nomeDeUsuarioFunc = ?",
      [req.body.nomeUsuario],
      (error, result, fields) => {
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length > 0) {
          conn.release();
          res.status(409).send({ message: "Usuario ja cadastrado!" });
        } else {
          conn.release;
          //crptografando senha
          bcrypt.hash(req.body.senha, 10, (errorBcrypt, hash) => {
            if (errorBcrypt) {
              return res.status(500).send({ error: errorBcrypt });
            }
            conn.query(
              "INSERT INTO funcionarios(nomeFunc, nomeDeUsuarioFunc, senhaFunc, CPF_Func, cargoFunc, enderecoFunc, telefoneFunc,  data_nasc_Func) VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
              [
                req.body.nome,
                req.body.nomeUsuario,
                hash,
                req.body.cpf,
                req.body.cargo,
                req.body.endereco,
                req.body.telefone,
                req.body.dataNasc,
              ],
              (error, result, field) => {
                conn.release();
                if (error) {
                  return res.status(500).send({ error: error });
                }
                const response = {
                  message: "Funcionario inserido com sucesso",
                  funcionarioCriado: {
                    idFuncionario: result.insertId,
                    nome: req.body.nome,
                    nomeUsuario: req.body.nomeUsuario,
                    cpf: req.body.cpf,
                    cargo: req.body.cargo,
                    endereco: req.body.endereco,
                    telefone: req.body.telefone,
                    dataNasc: req.body.dataNasc,
                    request: {
                      tipo: "POST",
                      descricao: "Adiciona um novo Funcionario",
                      url: "http://localhost:3000/funcionarios/",
                    },
                  },
                };
                return res.status(201).send(response);
              }
            );
          });
        }
      }
    );
  });
});

//RETORNA UM FUNCIONARIO EM ESPECIFICO
router.get("/:idFuncionario", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM funcionarios WHERE idFuncionario = ?;",
      [req.params.idFuncionario],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Funcionario não encontrado!",
          });
        }
        const response = {
          funcionario: {
            idFuncionario: result[0].idFuncionario,
            nome: result[0].nomeFunc,
            nomeUsuario: result[0].nomeDeUsuarioFunc,
            cpf: result[0].CPF_Func,
            cargo: result[0].cargoFunc,
            endereco: result[0].enderecoFunc,
            telefone: result[0].telefoneFunc,
            dataNasc: result[0].data_nasc_Func,
            request: {
              tipo: "GET",
              descricao: "Retorna um funcionario em especifico",
              url: "http://localhost:3000/funcionarios/",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

//ALTERA UM FUNCIONARIO
router.patch("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    bcrypt.hash(req.body.senha, 10, (errorBcrypt, hash) => {
      if (errorBcrypt) {
        return res.status(500).send({ error: errorBcrypt });
      }
      conn.query(
        `UPDATE funcionarios
                          SET nomeFunc = ?,
                              nomeDeUsuarioFunc = ?,
                              senhaFunc = ?,
                              CPF_Func = ?,
                              cargoFunc = ?,
                              enderecoFunc = ?,
                              telefoneFunc =? ,
                              data_nasc_Func= ?
                          WHERE idFuncionario = ?;`,
        [
          req.body.nome,
          req.body.nomeUsuario,
          hash,
          req.body.cpf,
          req.body.cargo,
          req.body.endereco,
          req.body.telefone,
          req.body.dataNasc,
          req.body.idFuncionario,
        ],
        (error, result, field) => {
          conn.release();
          if (error) {
            return res.status(500).send({ error: error });
          }
          const response = {
            message: "Funcionario atualizado com sucesso",
            funcionarioCriado: {
              idFuncionario: req.body.idFuncionario,
              nome: req.body.nome,
              nomeUsuario: req.body.nomeUsuario,
              cpf: req.body.cpf,
              cargo: req.body.cargo,
              endereco: req.body.endereco,
              telefone: req.body.telefone,
              dataNasc: req.body.dataNasc,
              request: {
                tipo: "PATCH",
                descricao: "Altera um Funcionario",
                url: "http://localhost:3000/funcionarios/",
              },
            },
          };
          return res.status(202).send(response);
        }
      );
    });
  });
});

//DELETA UM FUNCIONARIO
router.delete("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM funcionarios WHERE idFuncionario = ?;",
      [req.body.idFuncionario],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status.send({ error: error });
        }
        const response = {
          message: "Funcionario deletado com sucesso!",
          request: {
            tipo: "POST",
            descricao: "Deleta um Funcionario.",
            url: "http://localhost:300/funcionarios",
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
