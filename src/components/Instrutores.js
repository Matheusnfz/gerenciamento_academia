import React, { useState, useEffect } from "react";

const Instrutores = () => {
  const [instrutores, setInstrutores] = useState([]);
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("instrutores")) || [];
    setInstrutores(dados);
  }, []);

  useEffect(() => {
    localStorage.setItem("instrutores", JSON.stringify(instrutores));
  }, [instrutores]);

  const limpar = () => {
    setNome("");
    setEspecialidade("");
    setTelefone("");
    setEditIndex(null);
  };

  const salvar = (e) => {
    e.preventDefault();
    if (!nome || !especialidade || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    const novoInstrutor = { nome, especialidade, telefone };

    if (editIndex !== null) {
      const lista = [...instrutores];
      lista[editIndex] = novoInstrutor;
      setInstrutores(lista);
    } else {
      setInstrutores([...instrutores, novoInstrutor]);
    }

    limpar();
  };

  const editar = (index) => {
    const inst = instrutores[index];
    setNome(inst.nome);
    setEspecialidade(inst.especialidade);
    setTelefone(inst.telefone);
    setEditIndex(index);
  };

  const excluir = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este instrutor?")) {
      setInstrutores(instrutores.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="main-content fade-in">
      <div className="page-header">
        <h1>👨‍🏫 Gerenciar Instrutores</h1>
        <p className="subtitle">Cadastre, edite e visualize seus instrutores</p>
      </div>

      <form onSubmit={salvar} className="form-container">
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome do instrutor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="Especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
        </div>

        <div className="btn-container">
          <button type="submit" className="btn-adicionar">
            {editIndex !== null ? "Salvar Alterações" : "Adicionar Instrutor"}
          </button>
        </div>
      </form>

      <ul className="list-container">
        {instrutores.length === 0 ? (
          <p className="lista-vazia">Nenhum instrutor cadastrado ainda.</p>
        ) : (
          instrutores.map((inst, index) => (
            <li key={index} className="card-item">
              <div className="info">
                <strong>{inst.nome}</strong> — {inst.especialidade}
                <br />
                📞 {inst.telefone}
              </div>
              <div className="btn-group">
                <button className="btn-editar" onClick={() => editar(index)}>
                  Editar
                </button>
                <button className="btn-excluir" onClick={() => excluir(index)}>
                  Excluir
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Instrutores;
