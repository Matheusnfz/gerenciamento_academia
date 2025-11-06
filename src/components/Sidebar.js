import React from "react";
import { NavLink } from "react-router-dom";
import { FaUserFriends, FaClipboardList, FaDumbbell, FaChalkboardTeacher, FaMoneyBillWave, FaChartBar, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ onLogout, usuario }) {
  return (
    <div className="sidebar">
      <h2 className="logo">Academia Pro</h2>
      <p className="usuario">{usuario}</p>

      <nav className="menu">
        <NavLink to="/alunos" className="menu-link">
          <FaUserFriends /> Alunos
        </NavLink>
        <NavLink to="/planos" className="menu-link">
          <FaClipboardList /> Planos
        </NavLink>
        <NavLink to="/treinos" className="menu-link">
          <FaDumbbell /> Treinos
        </NavLink>
        <NavLink to="/instrutores" className="menu-link">
          <FaChalkboardTeacher /> Instrutores
        </NavLink>
        <NavLink to="/financeiro" className="menu-link">
          <FaMoneyBillWave /> Financeiro
        </NavLink>
        <NavLink to="/relatorios" className="menu-link">
          <FaChartBar /> Relatórios
        </NavLink>
      </nav>

      <button className="logout" onClick={onLogout}>
        <FaSignOutAlt /> Sair
      </button>
    </div>
  );
}

export default Sidebar;
