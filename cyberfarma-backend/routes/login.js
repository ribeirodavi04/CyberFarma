const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool //conecta com banco
const bcrypt = require('bcrypt')
//const jwt = require("jsonwebtoken");

router.post('/funcionario', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      'SELECT * FROM funcionarios WHERE nomeDeUsuarioFunc=?;',
      [req.body.nomeUsuario],
      (error, results, fields) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        if (results.length < 1) {
          return res.status(401).send({ message: 'Falha na autenticação!' })
        }
        bcrypt.compare(
          req.body.senha,
          results[0].senhaFunc,
          (error, result) => {
            if (error) {
              return res.status(401).send({ message: 'Falha na autenticação!' })
            }

            if (result) {
              /* const token = jwt.sign(
                {
                  idFuncionario: results[0].idFuncionario,
                  nome: results[0].nomeFunc,
                  nomeUsuario: results[0].nomeDeUsuarioFunc,
                },
                `${process.env.JWT_KEY}`,
                {
                  expiresIn: "8h",
                }
              );*/

              return res.status(200).send({
                message: 'Autenticado com sucesso!',
                loginAuth: true,
                // token: token,
              })
            }

            return res.status(401).send({ message: 'Falha na autenticação!' })
          },
        )
      },
    )
  })
})

router.post('/administrador', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error })
    }
    conn.query(
      'SELECT * FROM gerente WHERE nomeDeUsuarioGerente=?;',
      [req.body.nomeUsuario],
      (error, results, fields) => {
        conn.release()
        if (error) {
          return res.status(500).send({ error: error })
        }
        if (results.length < 1) {
          return res.status(401).send({ message: 'Falha na autenticação!' })
        }
        if(req.body.senha === results[0].senhaGerente){
          return res.status(200).send({
            message: 'Autenticado com sucesso!',
            loginAuth: true,
            idFunc: results[0].idFuncionario,
          })
        }
        return res.status(401).send({ message: 'Falha na autenticação!' })
        
      },
    )
  })
})

module.exports = router
