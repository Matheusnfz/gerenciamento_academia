import React, { useState, useEffect } from "react";
import api from "../services/api";

function Financeiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  // ==============================
  //  CARREGAR TRANSAÇÕES DO BACKEND
  // ==============================
  useEffect(() => {
    carregarTransacoes();
  }, []);

  async function carregarTransacoes() {
    try {
      const resposta = await api.get("/financeiro");
      setTransacoes(resposta.data);
    } catch (error) {
      console.log("Erro ao carregar financeiro:", error);
    }
  }

  // ==============================
  //  ADICIONAR TRANSAÇÃO
  // ==============================
  async function adicionarTransacao(e) {
    e.preventDefault();

    if (!descricao || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/financeiro", {
        descricao,
        valor: Number(valor),
      });

      setDescricao("");
      setValor("");

      carregarTransacoes();
    } catch (error) {
      console.log("Erro ao adicionar transação:", error);
      alert("Erro ao adicionar transação.");
    }
  }

  // ==============================
  //  REMOVER TRANSAÇÃO
  // ==============================
  async function removerTransacao(id) {
    if (!window.confirm("Deseja excluir esta transação?")) return;

    try {
      await api.delete(`/financeiro/${id}`);
      carregarTransacoes();
    } catch (error) {
      console.log("Erro ao remover:", error);
    }
  }

  // ==============================
  //  CALCULAR TOTAL
  // ==============================
  const total = transacoes.reduce((acc, t) => acc + Number(t.valor || 0), 0);

  return (
    <div className="main-content fade-in">
      <div className="page-header">
        <h1>💰 Controle Financeiro</h1>
        <p className="subtitle">Gerencie suas entradas e saídas de forma prática</p>
      </div>

      <form onSubmit={adicionarTransacao} className="form-container">
        <div className="form-group">
          <input
            type="text"
            placeholder="Descrição da transação"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <button type="submit" className="btn-adicionar">Adicionar</button>
        </div>
      </form>

      <div className="financeiro-total">
        <h2>Total: <span>R$ {total.toFixed(2)}</span></h2>
      </div>

      <ul className="list-container">
        {transacoes.length === 0 ? (
          <p className="lista-vazia">Nenhuma transação cadastrada ainda.</p>
        ) : (
          transacoes.map((t) => (
            <li key={t._id} className="card-item">
              <div className="info">
                <strong>{t.descricao}</strong>
                <span>R$ {Number(t.valor).toFixed(2)}</span>
              </div>

              <button
                onClick={() => removerTransacao(t._id)}
                className="btn-excluir"
              >
                Excluir
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Financeiro;
