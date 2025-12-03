import React, { useEffect, useState } from "react";

const Relatorios = () => {
  const [alunos, setAlunos] = useState(0);
  const [planos, setPlanos] = useState(0);
  const [treinos, setTreinos] = useState(0);
  const [financeiro, setFinanceiro] = useState(0);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const token = localStorage.getItem("token");

    try {
      const [resAlunos, resPlanos, resTreinos, resFinanceiro] =
        await Promise.all([
          fetch("http://localhost:3000/alunos", {
            headers: { Authorization: "Bearer " + token }
          }),
          fetch("http://localhost:3000/planos", {
            headers: { Authorization: "Bearer " + token }
          }),
          fetch("http://localhost:3000/treinos", {
            headers: { Authorization: "Bearer " + token }
          }),
          fetch("http://localhost:3000/financeiro", {
            headers: { Authorization: "Bearer " + token }
          }),
        ]);

      const dadosAlunos = await resAlunos.json();
      const dadosPlanos = await resPlanos.json();
      const dadosTreinos = await resTreinos.json();
      const dadosFinanceiro = await resFinanceiro.json();

      setAlunos(dadosAlunos.length || 0);
      setPlanos(dadosPlanos.length || 0);
      setTreinos(dadosTreinos.length || 0);
      setFinanceiro(dadosFinanceiro.length || 0);

    } catch (error) {
      console.log("Erro ao carregar relatórios:", error);
    }
  }

  return (
    <div className="fade-in">
      <h2>📊 Relatórios Gerais</h2>

      <ul>
        <li><strong>Alunos cadastrados:</strong> {alunos}</li>
        <li><strong>Planos disponíveis:</strong> {planos}</li>
        <li><strong>Treinos criados:</strong> {treinos}</li>
        <li><strong>Pagamentos registrados:</strong> {financeiro}</li>
      </ul>
    </div>
  );
};

export default Relatorios;
