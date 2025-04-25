import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8800/user/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuário:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container loading">Carregando...</div>;
  if (error) return <div className="container error">Erro: {error}</div>;
  if (!user) return <div className="container not-found">Usuário não encontrado</div>;

  return (
    <div className="container user-details">
      <header className="header">
        <h1 className="titulo">Detalhes do Usuário</h1>
        <div className="student-name">Francisco Hauch Cardoso</div>
      </header>
      <div className="user-info">
        <p><strong>Nome:</strong> {user.Nome}</p>
        <p><strong>CPF:</strong> {user.CPF}</p>
        <p><strong>Email:</strong> {user.Email}</p>
        <p><strong>Telefone:</strong> {user.telefone}</p>
        <p><strong>Gênero:</strong> {user.Genero}</p>
      </div>
      <button onClick={() => navigate("/")} className="add-button">Voltar</button>
    </div>
  );
}