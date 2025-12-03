import React, { useState, useEffect } from "react";

function Planos() {
  const [planos, setPlanos] = useState([]);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    carregarPlanos();
  }, []);

  // Buscar planos do backend
  async function carregarPlanos() {
    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch("http://localhost:3000/planos", {
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      const dados = await resposta.json();
      setPlanos(dados);
    } catch (error) {
      console.log("Erro ao carregar planos:", error);
    }
  }

  // Adicionar plano no backend
  async function adicionarPlano(e) {
    e.preventDefault();

    if (!nome || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const resposta = await fetch("http://localhost:3000/planos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
          nome,
          valor: Number(valor),
        }),
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.mensagem || "Erro ao cadastrar plano");
        return;
      }

      setNome("");
      setValor("");

      carregarPlanos(); // atualizar lista

    } catch (error) {
      console.log("Erro ao adicionar plano:", error);
    }
  }

  // Remover plano do backend
  async function removerPlano(id) {
    const token = localStorage.getItem("token");

    if (!window.confirm("Deseja remover este plano?")) return;

    try {
      await fetch(`http://localhost:3000/planos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      });

      carregarPlanos(); // atualizar lista

    } catch (error) {
      console.log("Erro ao excluir plano:", error);
    }
  }

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
        {planos.length === 0 ? (
          <p>Nenhum plano cadastrado.</p>
        ) : (
          planos.map((plano) => (
            <li key={plano._id}>
              <div>
                <strong>{plano.nome}</strong> — R$ {plano.valor}
              </div>
              <button onClick={() => removerPlano(plano._id)}>Excluir</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Planos;
