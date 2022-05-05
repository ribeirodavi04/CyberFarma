const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool; //conecta com banco
const bcrypt = require("bcrypt"); //criptografa senha

//CADASTRO DE FUNCIONARIOS
router.post("/", (req, res, next) => {
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

module.exports = router;
