import React, { useState, useEffect } from "react";

const Treinos = ({ usuario }) => {
  const [treinos, setTreinos] = useState([]);
  const [aluno, setAluno] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [reps, setReps] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const tipo = usuario?.tipo || "admin"; // admin | estagiario

  // 🔹 Carregar dados do localStorage (temporário até integrar API)
  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("treinos")) || [];
    setTreinos(dados);
  }, []);

  // 🔹 Salvar após mudanças
  useEffect(() => {
    localStorage.setItem("treinos", JSON.stringify(treinos));
  }, [treinos]);

  const limpar = () => {
    setAluno("");
    setExercicio("");
    setReps("");
    setEditIndex(null);
  };

  const salvar = (e) => {
    e.preventDefault();

    if (!aluno || !exercicio || !reps) {
      return alert("Preencha todos os campos!");
    }

    const novo = { aluno, exercicio, reps };

    if (editIndex !== null) {
      const copia = [...treinos];
      copia[editIndex] = novo;
      setTreinos(copia);
    } else {
      setTreinos([...treinos, novo]);
    }

    limpar();
  };

  const editar = (index) => {
    const t = treinos[index];
    setAluno(t.aluno);
    setExercicio(t.exercicio);
    setReps(t.reps);
    setEditIndex(index);
  };

  const excluir = (index) => {
    if (tipo === "estagiario") {
      return alert("Estagiários não podem excluir treinos.");
    }

    if (window.confirm("Excluir treino?")) {
      setTreinos(treinos.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fade-in">
      <h2>🏋️ Gerenciar Treinos</h2>

      <form onSubmit={salvar} className="form-box">
        <input
          placeholder="Nome do aluno"
          value={aluno}
          onChange={(e) => setAluno(e.target.value)}
        />

        <input
          placeholder="Exercício"
          value={exercicio}
          onChange={(e) => setExercicio(e.target.value)}
        />

        <input
          placeholder="Repetições"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />

        <button className="btn-primary">
          {editIndex !== null ? "Salvar Alterações" : "Adicionar Treino"}
        </button>
      </form>

      <ul className="lista-box">
        {treinos.length === 0 && <p>Nenhum treino cadastrado.</p>}

        {treinos.map((t, i) => (
          <li key={i} className="item-linha">
            <div>
              <strong>{t.aluno}</strong> — {t.exercicio} ({t.reps})
            </div>

            <div className="acoes">
              <button
                className="btn-warning"
                onClick={() => editar(i)}
              >
                Editar
              </button>

              <button
                className={`btn-danger ${tipo === "estagiario" ? "btn-disabled" : ""}`}
                onClick={() => excluir(i)}
                disabled={tipo === "estagiario"}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Treinos;
