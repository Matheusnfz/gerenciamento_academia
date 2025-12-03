import React, { useState, useEffect } from "react";
import api from "../services/api";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [planoId, setPlanoId] = useState("");

  // Carregar alunos e planos do backend
  useEffect(() => {
    carregarAlunos();
    carregarPlanos();
  }, []);

  async function carregarAlunos() {
    try {
      const resposta = await api.get("/alunos");
      setAlunos(resposta.data);
    } catch (err) {
      console.log("Erro ao carregar alunos:", err);
    }
  }

  async function carregarPlanos() {
    try {
      const resposta = await api.get("/planos");
      setPlanos(resposta.data);
    } catch (err) {
      console.log("Erro ao carregar planos:", err);
    }
  }

  async function adicionarAluno(e) {
    e.preventDefault();

    if (!nome || !email || !cpf || !planoId) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/alunos", {
        nome,
        email,
        cpf,
        plano: planoId,
      });

      setNome("");
      setEmail("");
      setCpf("");
      setPlanoId("");

      carregarAlunos();
    } catch (err) {
      console.log("Erro:", err);
      alert("Erro ao cadastrar aluno");
    }
  }

  async function removerAluno(id) {
    if (!window.confirm("Deseja excluir este aluno?")) return;

    try {
      await api.delete(`/alunos/${id}`);
      carregarAlunos();
    } catch (err) {
      console.log("Erro ao remover aluno:", err);
    }
  }

  const totalPago = alunos.reduce((acc, aluno) => {
    return acc + (aluno.plano?.preco || 0);
  }, 0);

  return (
    <div className="tela-alunos">
      <div className="container-alunos">
        <h1 className="titulo-pagina">Gerenciar Alunos</h1>

        <form className="form-aluno" onSubmit={adicionarAluno}>
          <div className="inputs-linha">
            <input
              type="text"
              placeholder="Nome do aluno"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email do aluno"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />

            <select
              value={planoId}
              onChange={(e) => setPlanoId(e.target.value)}
            >
              <option value="">Selecione um plano</option>
              {planos.length === 0 ? (
                <option disabled>Nenhum plano cadastrado</option>
              ) : (
                planos.map((plano) => (
                  <option key={plano._id} value={plano._id}>
                    {plano.nome} — R$ {plano.preco}
                  </option>
                ))
              )}
            </select>

            <button type="submit" className="btn-azul">
              Adicionar
            </button>
          </div>
        </form>

        <div className="caixa-lista">
          <h2 className="subtitulo">Lista de Alunos</h2>

          <ul className="lista-alunos">
            {alunos.length === 0 ? (
              <p className="vazio">Nenhum aluno cadastrado.</p>
            ) : (
              alunos.map((aluno) => (
                <li key={aluno._id} className="card-aluno">
                  <div className="info-aluno">
                    <strong>{aluno.nome}</strong> <br />
                    <span>{aluno.email}</span> <br />
                    CPF: {aluno.cpf} <br />
                    Plano:{" "}
                    <span className="plano">
                      {aluno.plano?.nome || "Sem plano"}
                    </span>{" "}
                    — R$ {aluno.plano?.preco || 0}
                  </div>

                  <button
                    className="btn-excluir"
                    onClick={() => removerAluno(aluno._id)}
                  >
                    Excluir
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="total">
            💰 <strong>Total Pago pelos Planos:</strong> R$ {totalPago}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alunos;
