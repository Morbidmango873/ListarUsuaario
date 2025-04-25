import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8800/")
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        setLoading(false);
      });
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="body">
      <header className="header">
        <h1 className="titulo">Lista de Usuários</h1>
        <div className="student-name">Francisco Hauch Cardoso</div>
      </header>
      <div className="container">
        <div className="actions-bar">
          <button className="add-button" onClick={() => navigate("/edit")}>Gerenciar Usuários</button>
        </div>
        <div className="user-list">
          {data.map((user) => (
            <div key={user.id} className="user-card">
              <p><strong>Nome:</strong> {user.Nome}</p>
              <p><strong>CPF:</strong> {user.CPF}</p>
              <p><strong>Email:</strong> {user.Email}</p>
              <p><strong>Telefone:</strong> {user.telefone}</p>
              <p><strong>Genero:</strong> {user.Genero}</p>
              <div className="card-actions">
                <button onClick={() => navigate(`/user/${user.id}`)} className="add-button">Ver Mais</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}