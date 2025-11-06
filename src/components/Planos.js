import React, { useState, useEffect } from "react";

function Planos() {
  const [planos, setPlanos] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const planosSalvos = JSON.parse(localStorage.getItem("planos")) || [];
    setPlanos(planosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem("planos", JSON.stringify(planos));
  }, [planos]);

  const adicionarPlano = (e) => {
    e.preventDefault();

    if (!nome || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoPlano = {
      id: Date.now(),
      nome,
      valor,
    };

    setPlanos([...planos, novoPlano]);
    setNome("");
    setValor("");
  };

  const removerPlano = (id) => {
    const listaAtualizada = planos.filter((p) => p.id !== id);
    setPlanos(listaAtualizada);
  };

  return (
    <div className="main-content fade-in">
      <h1>Gerenciar Planos</h1>

      <form onSubmit={adicionarPlano}>
        <input
          type="text"
          placeholder="Nome do plano"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <button type="submit">Adicionar Plano</button>
      </form>

      <ul>
        {planos.map((plano) => (
          <li key={plano.id}>
            <div>
              <strong>{plano.nome}</strong> — R$ {plano.valor}
            </div>
            <button onClick={() => removerPlano(plano.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Planos;
