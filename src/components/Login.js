import React, { useState } from "react";
import api from "../services/api";
import "../styles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const resposta = await api.post("/auth/login", {
        email,
        senha
      });

      const { token, user } = resposta.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      alert("Login realizado com sucesso!");

      window.location.href = "/home";

    } catch (error) {
      console.log("Erro no login:", error);

      const msg =
        error.response?.data?.mensagem ||
        error.response?.data?.error ||
        "Erro ao fazer login.";

      alert(msg);
    }
  }

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
          Teste: admin@academia.com / admin123 <br />
        </p>
      </div>
    </div>
  );
}

export default Login;
