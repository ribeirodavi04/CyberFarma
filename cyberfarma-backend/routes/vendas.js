const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool
const auth = require('../middleware/auth')

// Retorna todos as vendas
/*router.get("/", (req, res, next) =>{
    mysql.getConnection ((error, conn) => {
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query("SELECT * FROM vendas;", (error, result, fields) => {
            conn.release()
            if (error){
                return res.status(500).send({error:error})
            }
            const response = {
                quantidade: result.length,
                vendas: result.map((forn) => {
                    return{
                        idVenda: forn.idVenda,
                        idCliente: forn.idCliente,
                        idFuncionario: forn.idFuncionario,
                        data: forn.dataVenda,
                        valorVenda: forn.valorTotalVenda,
                        formaPagamento: forn.formaPagamentoVenda,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna todos as Vendas",
                            url: "http://localhost:3000/vendas/"
                        }
                    }
                   
                })
            }
            return res.status(202).send(response)

        })
        
    })
})*/

// Retorna todos as vendas
router.get("/", auth,(req, res, next) =>{
    mysql.getConnection ((error, conn) => {
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query("SELECT v.idVenda, c.nomeCliente, f.nomeFunc, v.dataVenda, v.valorTotalVenda, v.formaPagamentoVenda FROM vendas v LEFT JOIN clientes c ON v.idCliente = c.idCliente LEFT JOIN funcionarios f ON v.idFuncionario = f.idFuncionario; ", 
        (error, result, fields) => {
            conn.release()
            if (error){
                return res.status(500).send({error:error})
            }
            const response = {
                quantidade: result.length,
                vendas: result.map((forn) => {
                    return{
                        idVenda: forn.idVenda,
                        nomeCliente: forn.nomeCliente,
                        nomeFuncionario: forn.nomeFunc,
                        dataVenda: forn.dataVenda,
                        valorVenda: forn.valorTotalVenda,
                        formaPagamento: forn.formaPagamentoVenda,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna todos as Vendas",
                            url: "http://localhost:3000/vendas/"
                        }
                    }
                   
                })
            }
            return res.status(202).send(response)

        })
        
    })
})



//Insere uma venda
router.post("/", auth, (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query(
            "INSERT INTO vendas (idCliente, idFuncionario, dataVenda, valorTotalVenda, formaPagamentoVenda) VALUES (?, ?, ?, ?, ?);",
            [
                req.body.idCliente,
                req.body.idFuncionario,
                req.body.data, 
                req.body.valorVenda, 
                req.body.formaPagamento],
            (error, result, field) =>{
                conn.release()
                if (error) {
                    return res.status(500).send({error:error})
                }
                const response = {
                    message: "Venda inserida com sucesso! :)",
                    vendaCriada: {
                        idVenda: result.insertId,
                        idCliente: req.body.idCliente,
                        idFuncionario: req.body.idFuncionario,
                        data: req.body.data,
                        valorVenda: req.body.valorVenda,
                        formaPagamento: req.body.formaPagamento,
                        request: {
                            tipo: "POST",
                            descricao: "Adiciona uma nova venda",
                            url: "http://localhost:3000/clientes/",
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
})

//Retorna os dados de uma venda em especifico.
router.get("/:idVenda", auth, (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query(
            "SELECT * FROM vendas WHERE idVenda = ?;",
            [req.params.idVenda],
            (error, result, fields) =>{
                conn.release()
                if (error) {
                    return res.status(500).send ({error:error})
                }
                if (result.length === 0){
                    return res.status(404).send({
                        message: "Venda não encontrada :(",
                    })
                }
                const response = {
                    venda: {
                        idVenda: result[0].idVenda,
                        idCliente: result[0].idCliente,
                        idFuncionario: result[0].idFuncionario,
                        data: result[0].dataVenda,
                        valorVenda: result[0].valorTotalVenda,
                        formaPagamento: result[0].formaPagamentoVenda,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna uma venda",
                            url: "https://localhost:3000/vendas/",
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    })//s
})

module.exports = router;
