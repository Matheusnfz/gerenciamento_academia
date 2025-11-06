import React, { useState, useEffect } from "react";

function Financeiro() {
  const [transacoes, setTransacoes] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const transacoesSalvas = JSON.parse(localStorage.getItem("financeiro")) || [];
    setTransacoes(transacoesSalvas);
  }, []);

  useEffect(() => {
    localStorage.setItem("financeiro", JSON.stringify(transacoes));
  }, [transacoes]);

  const adicionarTransacao = (e) => {
    e.preventDefault();

    if (!descricao || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const novaTransacao = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
    };

    setTransacoes([...transacoes, novaTransacao]);
    setDescricao("");
    setValor("");
  };

  const removerTransacao = (id) => {
    const listaAtualizada = transacoes.filter((t) => t.id !== id);
    setTransacoes(listaAtualizada);
  };

  const total = transacoes.reduce((acc, t) => acc + t.valor, 0);

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
            <li key={t.id} className="card-item">
              <div className="info">
                <strong>{t.descricao}</strong>
                <span>R$ {t.valor.toFixed(2)}</span>
              </div>
              <button onClick={() => removerTransacao(t.id)} className="btn-excluir">
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
