import React, { useState, useEffect } from "react";

const Treinos = () => {
  const [treinos, setTreinos] = useState([]);
  const [aluno, setAluno] = useState("");
  const [exercicio, setExercicio] = useState("");
  const [reps, setReps] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("treinos")) || [];
    setTreinos(dados);
  }, []);

  useEffect(() => {
    localStorage.setItem("treinos", JSON.stringify(treinos));
  }, [treinos]);

  const limpar = () => {
    setAluno(""); setExercicio(""); setReps(""); setEditIndex(null);
  };

  const salvar = (e) => {
    e.preventDefault();
    if (!aluno || !exercicio || !reps) return alert("Preencha todos os campos!");
    const novo = { aluno, exercicio, reps };
    if (editIndex !== null) {
      const copia = [...treinos];
      copia[editIndex] = novo;
      setTreinos(copia);
    } else setTreinos([...treinos, novo]);
    limpar();
  };

  const editar = (i) => {
    const t = treinos[i];
    setAluno(t.aluno); setExercicio(t.exercicio); setReps(t.reps); setEditIndex(i);
  };

  const excluir = (i) => {
    if (window.confirm("Excluir treino?")) setTreinos(treinos.filter((_, x) => x !== i));
  };

  return (
    <div className="fade-in">
      <h2>🏋️ Gerenciar Treinos</h2>
      <form onSubmit={salvar}>
        <input placeholder="Nome do aluno" value={aluno} onChange={(e) => setAluno(e.target.value)} />
        <input placeholder="Exercício" value={exercicio} onChange={(e) => setExercicio(e.target.value)} />
        <input placeholder="Repetições" value={reps} onChange={(e) => setReps(e.target.value)} />
        <button>{editIndex !== null ? "Salvar Alterações" : "Adicionar Treino"}</button>
      </form>

      <ul>
        {treinos.map((t, i) => (
          <li key={i}>
            <div>
              <strong>{t.aluno}</strong> — {t.exercicio} ({t.reps})
            </div>
            <div>
              <button style={{ background: "#ffb703", marginRight: 5 }} onClick={() => editar(i)}>Editar</button>
              <button style={{ background: "#e63946" }} onClick={() => excluir(i)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Treinos;
