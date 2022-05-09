const express = require("express")
const router = express.Router()
const mysql = require("../mysql").pool

// Retorna todos as vendas_itens
router.get("/", (req, res, next) =>{
    mysql.getConnection ((error, conn) => {
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query("SELECT * FROM venda_itens;", (error, result, fields) => {
            conn.release()
            if (error){
                return res.status(500).send({error:error})
            }
            const response = {
                quantidade: result.length,
                vendas: result.map((forn) => {
                    return{
                        idVenda_itens: forn.idVenda_itens,
                        idProduto: forn.idProduto,
                        idVenda: forn.idVenda,
                        quantidadeVI: forn.quantidadeVI,
                        precoVI: forn.precoVI,
                        codigoDeBarraVI: forn.codigoDeBarraVI,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna todos as Venda_itens",
                            url: "http://localhost:3000/venda_itens/"
                        }
                    }
                   
                })
            }
            return res.status(202).send(response)

        })
        
    })
})

module.exports = router;