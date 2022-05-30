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

//Insere uma venda
router.post("/", (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query(
            "INSERT INTO venda_itens (idProduto, idVenda, quantidadeVI, precoVI, codigoDeBarraVI ) VALUES (?, ?, ?, ?, ?);",
            [
                req.body.idProduto,
                req.body.idVenda,
                req.body.quantidadeVI, 
                req.body.precoVI, 
                req.body.codigoDeBarraVI],
            (error, result, field) =>{
                conn.release()
                if (error) {
                    return res.status(500).send({error:error})
                }
                const response = {
                    message: "Venda inserida com sucesso! :)",
                    vendaCriada: {
                        idVenda_itens: result.idVenda,
                        idProduto: req.body.idProduto,
                        idVenda: req.body.idVenda,
                        quantidadeVI: req.body.quantidadeVI,
                        precoVI: req.body.precoVI,
                        codigoDeBarraVI: req.body.codigoDeBarraVI,
                        request: {
                            tipo: "POST",
                            descricao: "Adiciona uma nova venda",
                            url: "http://localhost:3000/vendas_itens/",
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    })
})

//Retorna os dados de uma venda em específico
router.get("/:idVenda_itens", (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) {
            return res.status(500).send({error:error})
        }
        conn.query(
            "SELECT * FROM venda_itens WHERE idVenda_itens = ?;",
            [req.params.idVenda_itens],
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
                        idVenda_itens: result[0].idVenda_itens,
                        idProduto: result[0].idProduto,
                        idVenda: result[0].idVenda,
                        quantidadeVI: result[0].quantidadeVI,
                        precoVI: result[0].precoVI,
                        codigoDeBarraVI: result[0].codigoDeBarraVI,
                        request: {
                            tipo: "GET",
                            descricao: "Retorna uma venda",
                            url: "https://localhost:3000/vendas_itens/",
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
})

router.patch("/attprodutos", (req, res, next) => {
    mysql.getConnection((error, conn) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      conn.query(
        `UPDATE produtos
                  SET quantidadeProd =?      
                  WHERE idProduto = ?;`,
  
        [
          req.body.quantidade,
          req.body.idProduto
        ],
        (error, result, field) => {
          conn.release();
          if (error) {
            return res.status(500).send({ error: error });
          }
          const response = {
            message: "Produto Atualizado com sucesso! ;)",
            ProdutoAtualizado: {
              idProduto: req.body.idProduto,
              quantidade: req.body.quantidade,
              request: {
                tipo: "PATCH",
                descricao: "Atualiza os dados do produto",
              },
            },
          };
          return res.status(202).send(response);
        }
      );
    });
  });
  

module.exports = router;
