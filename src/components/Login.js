import React, { useState } from "react";
import "../styles.css"; 

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    onLogin(email, senha);
  };

  return (
    <div className="login-page">
      <div className="login-box">
      
        <h2 className="login-title">Academia Pro System</h2>

       
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar</button>
        </form>

        <p className="login-info">
          Teste: admin@academia.com / 1234 <br />
          ou instrutor@academia.com / 1234
        </p>
      </div>
    </div>
  );
}

export default Login;
