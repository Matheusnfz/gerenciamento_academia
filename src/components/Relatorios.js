import React, { useEffect, useState } from "react";

const Relatorios = () => {
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [treinos, setTreinos] = useState([]);
  const [financeiro, setFinanceiro] = useState([]);

  useEffect(() => {
    setAlunos(JSON.parse(localStorage.getItem("alunos")) || []);
    setPlanos(JSON.parse(localStorage.getItem("planos")) || []);
    setTreinos(JSON.parse(localStorage.getItem("treinos")) || []);
    setFinanceiro(JSON.parse(localStorage.getItem("financeiro")) || []);
  }, []);


  return (
    <div className="fade-in">
      <h2>📊 Relatórios Gerais</h2>
      <ul>
        <li><strong>Alunos cadastrados:</strong> {alunos.length}</li>
        <li><strong>Planos disponíveis:</strong> {planos.length}</li>
        <li><strong>Treinos criados:</strong> {treinos.length}</li>
        <li><strong>Pagamentos registrados:</strong> {financeiro.length}</li>
      </ul>
    </div>
  );
};

export default Relatorios;
