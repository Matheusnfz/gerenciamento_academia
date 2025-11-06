import React, { useState, useEffect } from "react";

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [planoSelecionado, setPlanoSelecionado] = useState("");
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    const alunosSalvos = JSON.parse(localStorage.getItem("alunos")) || [];
    const planosSalvos = JSON.parse(localStorage.getItem("planos")) || [];
    setAlunos(alunosSalvos);
    setPlanos(planosSalvos);
  }, []);

  useEffect(() => {
    localStorage.setItem("alunos", JSON.stringify(alunos));
  }, [alunos]);

  const adicionarAluno = (e) => {
    e.preventDefault();

    if (!nome || !email || !planoSelecionado) {
      alert("Preencha todos os campos!");
      return;
    }

    const planoEscolhido = planos.find((p) => p.nome === planoSelecionado);

    const novoAluno = {
      id: Date.now(),
      nome,
      email,
      plano: planoEscolhido.nome,
      valor: planoEscolhido.valor,
    };

    setAlunos([...alunos, novoAluno]);
    setNome("");
    setEmail("");
    setPlanoSelecionado("");
  };

  const removerAluno = (id) => {
    const listaAtualizada = alunos.filter((a) => a.id !== id);
    setAlunos(listaAtualizada);
  };

  const totalPago = alunos.reduce((acc, aluno) => acc + Number(aluno.valor || 0), 0);

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
            <select
              value={planoSelecionado}
              onChange={(e) => setPlanoSelecionado(e.target.value)}
            >
              <option value="">Selecione um plano</option>
              {planos.length === 0 ? (
                <option disabled>Nenhum plano cadastrado</option>
              ) : (
                planos.map((plano) => (
                  <option key={plano.id} value={plano.nome}>
                    {plano.nome} — R$ {plano.valor}
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
                <li key={aluno.id} className="card-aluno">
                  <div className="info-aluno">
                    <strong>{aluno.nome}</strong> <br />
                    <span>{aluno.email}</span> <br />
                    Plano: <span className="plano">{aluno.plano}</span> —{" "}
                    <span className="valor">R$ {aluno.valor}</span>
                  </div>
                  <button
                    className="btn-excluir"
                    onClick={() => removerAluno(aluno.id)}
                  >
                    Excluir
                  </button>
                </li>
              ))
            )}
          </ul>

          <div className="total">
            💰 <strong>Total Pago:</strong> R$ {totalPago}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alunos;
