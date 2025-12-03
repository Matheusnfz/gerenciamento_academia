import React, { useState, useEffect } from "react";
import api from "../services/api";

const Instrutores = () => {
  const [instrutores, setInstrutores] = useState([]);
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [telefone, setTelefone] = useState("");
  const [editId, setEditId] = useState(null);

  // ==============================
  //  CARREGAR LISTA DO BACKEND
  // ==============================
  useEffect(() => {
    carregarInstrutores();
  }, []);

  async function carregarInstrutores() {
    try {
      const resposta = await api.get("/instrutores");
      setInstrutores(resposta.data);
    } catch (error) {
      console.log("Erro ao carregar instrutores:", error);
    }
  }

  // ==============================
  //  SALVAR (CRIAR OU EDITAR)
  // ==============================
  async function salvar(e) {
    e.preventDefault();

    if (!nome || !especialidade || !telefone) {
      alert("Preencha todos os campos!");
      return;
    }

    const payload = {
      nome,
      especialidade,
      telefone,
    };

    try {
      // EDITAR
      if (editId) {
        await api.put(`/instrutores/${editId}`, payload);
      } 
      // CRIAR
      else {
        await api.post("/instrutores", payload);
      }

      limpar();
      carregarInstrutores();
    } catch (error) {
      console.log("Erro ao salvar instrutor:", error);
    }
  }

  // ==============================
  //  EDITAR
  // ==============================
  function editar(instrutor) {
    setEditId(instrutor._id);
    setNome(instrutor.nome);
    setEspecialidade(instrutor.especialidade);
    setTelefone(instrutor.telefone);
  }

  // ==============================
  //  EXCLUIR
  // ==============================
  async function excluir(id) {
    if (!window.confirm("Tem certeza que deseja excluir este instrutor?")) return;

    try {
      await api.delete(`/instrutores/${id}`);
      carregarInstrutores();
    } catch (error) {
      console.log("Erro ao excluir instrutor:", error);
    }
  }

  // ==============================
  //  LIMPAR FORMULÁRIO
  // ==============================
  function limpar() {
    setNome("");
    setEspecialidade("");
    setTelefone("");
    setEditId(null);
  }

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
            {editId ? "Salvar Alterações" : "Adicionar Instrutor"}
          </button>
        </div>
      </form>

      <ul className="list-container">
        {instrutores.length === 0 ? (
          <p className="lista-vazia">Nenhum instrutor cadastrado ainda.</p>
        ) : (
          instrutores.map((inst) => (
            <li key={inst._id} className="card-item">
              <div className="info">
                <strong>{inst.nome}</strong> — {inst.especialidade}
                <br />
                📞 {inst.telefone}
              </div>

              <div className="btn-group">
                <button className="btn-editar" onClick={() => editar(inst)}>
                  Editar
                </button>

                <button className="btn-excluir" onClick={() => excluir(inst._id)}>
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
