const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;
const auth = require('../middleware/auth');

//Retorna todos os Produtos
router.get("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query("SELECT produtos.idProduto, produtos.codBarraProd, produtos.nomeProd, produtos.tipoProd, produtos.marcaProd, produtos.quantidadeProd, produtos.loteProd, produtos.precoProd, produtos.dataValidade, produtos.descricao, fornecedores.nomeFornecedor FROM produtos LEFT JOIN fornecedores ON produtos.idFornecedorProd = fornecedores.idFornecedor;", (error, result, fields) => {
      conn.release();
      if (error) {
        return res.status(500).send({ error: error });
      }
      const response = {
        quantidade: result.length,
        produtos: result.map((forn) => {
          return {
            idProduto: forn.idProduto,
            nomeFornecedor: forn.nomeFornecedor,
            codBarra: forn.codBarraProd,
            nome: forn.nomeProd,
            tipo: forn.tipoProd,
            marca: forn.marcaProd,
            quantidade: forn.quantidadeProd,
            lote: forn.loteProd,
            preco: forn.precoProd,
            dataValidade: forn.dataValidade,
            descricao: forn.descricao,
            request: {
              tipo: "GET",
              descricao: "Retorna todos os produtos",
              url: "http://localhost:3000/produtos/" + forn.idProduto,
            },
          };
        }),
      };
      return res.status(200).send(response);
    });
  });
});

//Insere um Produto
router.post("/", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO produtos (idFornecedorProd, codBarraProd, nomeProd, tipoProd, marcaProd, quantidadeProd, loteProd, precoProd, dataValidade, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ",
      [
        req.body.idFornecedor,
        req.body.codBarra,
        req.body.nome,
        req.body.tipo,
        req.body.marca,
        req.body.quantidade,
        req.body.lote,
        req.body.preco,
        req.body.dataValidade,
        req.body.descricao,
      ],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Produto inserido com Sucesso! :)",
          ProdutoCriado: {
            idProduto: result.idProduto,
            idFornecedor: result.idFornecedor,
            nome: req.body.nome,
            tipo: req.body.tipo,
            marca: req.body.marca,
            quantidade: req.body.quantidade,
            lote: req.body.lote,
            preco: req.body.preco,
            dataValidade: req.body.dataValidade,
            descricao: req.body.descricao,
            request: {
              tipo: "POST",
              descricao: "Adiciona um novo Produto",
              url: "http://localhost:3000/produtos/",
            },
          },
        };
        return res.status(201).send(response);
      }
    );
  });
});

//Retorna os dados de um produto em especifico
router.get("/:idProduto", auth, (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE idProduto =?;",
      [req.params.idProduto],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Produto não encontrado",
          });
        }
        const response = {
          produtos: {
            idProduto: result[0].idProduto,
            idFornecedor: result[0].idFornecedorProd,
            codBarra: result[0].codBarraProd,
            nome: result[0].nomeProd,
            tipo: result[0].tipoProd,
            marca: result[0].marcaProd,
            quantidade: result[0].quantidadeProd,
            lote: result[0].loteProd,
            preco: result[0].precoProd,
            dataValidade: result[0].dataValidade,
            descricao: result[0].descricao,
            request: {
              tipo: "GET",
              descricao: "Retorna um Produto",
              url: "http://localhost:3000/produtos",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});


router.get("/codigoDeBarras/:codBarra", auth,(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM produtos WHERE codBarraProd =?;",
      [req.params.codBarra],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        if (result.length === 0) {
          return res.status(404).send({
            message: "Produto não encontrado",
          });
        }
        const response = {
          produtos: {
            idProduto: result[0].idProduto,
            idFornecedor: result[0].idFornecedorProd,
            codBarra: result[0].codBarraProd,
            nome: result[0].nomeProd,
            tipo: result[0].tipoProd,
            marca: result[0].marcaProd,
            quantidade: result[0].quantidadeProd,
            lote: result[0].loteProd,
            preco: result[0].precoProd,
            dataValidade: result[0].dataValidade,
            descricao: result[0].descricao,
            request: {
              tipo: "GET",
              descricao: "Retorna um Produto",
              url: "http://localhost:3000/produtos",
            },
          },
        };
        return res.status(200).send(response);
      }
    );
  });
});

// Altera um Produto
router.patch("/", auth,(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      `UPDATE produtos
                SET idFornecedorProd = ?,
                    codBarraProd = ?,
                    nomeProd = ?,
                    tipoProd = ?,
                    marcaProd = ?,
                    quantidadeProd =?,
                    loteProd = ?,
                    precoProd = ?,
                    dataValidade = ?,
                    descricao = ?      
                WHERE idProduto = ?;`,

      [
        req.body.idFornecedor,
        req.body.codBarra,
        req.body.nome,
        req.body.tipo,
        req.body.marca,
        req.body.quantidade,
        req.body.lote,
        req.body.preco,
        req.body.dataValidade,
        req.body.descricao,
        req.body.idProduto,
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
            idFornecedor: req.body.idFornecedor,
            nome: req.body.nome,
            tipo: req.body.tipo,
            marcaProd: req.body.marca,
            quantidade: req.body.quantidade,
            lote: req.body.lote,
            preco: req.body.preco,
            dataValidade: req.body.dataValidade,
            descricao: req.body.descricao,
            request: {
              tipo: "PATCH",
              descricao: "Atualiza os dados do produto",
              url: "http://localhost:3000/clientes/" + req.body.idProduto,
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

// Deleta um produto
router.delete("/", auth,(req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "DELETE FROM produtos WHERE produtos.idProduto =?;",
      [req.body.idProduto],
      (error, result, field) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }
        const response = {
          message: "Produto deletado com sucesso /:",
          request: {
            tipo: "POST",
            descricao: "Deleta um Produto",
            url: "http://localhost:300/cliente ",
            body: {
              idFornecedor: "int",
              codBarra: "String",
              nome: "String",
              tipo: "String",
              marca: "String",
              lote: "String",
              preco: "float",
              dataValidade: "date",
              descricao: "String",
            },
          },
        };
        return res.status(202).send(response);
      }
    );
  });
});

module.exports = router;
