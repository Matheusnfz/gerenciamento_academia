import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Alunos from "./components/Alunos";
import Planos from "./components/Planos";
import Treinos from "./components/Treinos";
import Instrutores from "./components/Instrutores";
import Financeiro from "./components/Financeiro";
import Relatorios from "./components/Relatorios";
import "./styles.css";

function App() {
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || null);

  const handleLogin = (email, senha) => {
    if (email === "admin@academia.com" && senha === "1234") {
      localStorage.setItem("usuario", "Administrador");
      setUsuario("Administrador");
    } else if (email === "instrutor@academia.com" && senha === "1234") {
      localStorage.setItem("usuario", "Instrutor");
      setUsuario("Instrutor");
    } else {
      alert("Usuário ou senha inválidos!");
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  if (!usuario) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <Sidebar onLogout={handleLogout} usuario={usuario} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/alunos" />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/treinos" element={<Treinos />} />
          <Route path="/instrutores" element={<Instrutores />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
