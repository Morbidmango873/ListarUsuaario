import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UserEdit() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({Nome:"",CPF:"",Email:"",telefone:"",Genero:""});
  const [newUser, setNewUser] = useState({Nome:"",CPF:"",Email:"",telefone:"",Genero:""});
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {fetchUsers();}, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:8800/")
      .then(response => {
        if (!response.ok) throw new Error("Erro ao buscar usuários");
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Erro ao buscar usuários:", err);
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSelectUser = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setEditForm({Nome:user.Nome,CPF:user.CPF,Email:user.Email,telefone:user.telefone,Genero:user.Genero});
      setActiveTab("edit");
    }
  };

  const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === "edit") {
      setEditForm(prev => ({...prev,[name]:value}));
    } else if (formType === "add") {
      setNewUser(prev => ({...prev,[name]:value}));
    }
  };

  const handleSave = () => {
    if (!selectedUser) return;
    fetch(`http://localhost:8800/${selectedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao atualizar usuário");
        return response.json();
      })
      .then(() => {
        alert("Usuário atualizado com sucesso!");
        setSelectedUser(null);
        setActiveTab("list");
        fetchUsers();
      })
      .catch(err => {
        console.error("Erro ao atualizar usuário:", err);
        alert("Erro ao atualizar usuário");
      });
  };

  const handleAdd = () => {
    fetch("http://localhost:8800/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao adicionar usuário");
        return response.json();
      })
      .then(() => {
        alert("Usuário adicionado com sucesso!");
        setNewUser({Nome:"",CPF:"",Email:"",telefone:"",Genero:""});
        setActiveTab("list");
        fetchUsers();
      })
      .catch(err => {
        console.error("Erro ao adicionar usuário:", err);
        alert("Erro ao adicionar usuário");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      fetch(`http://localhost:8800/${id}`, {method:"DELETE"})
        .then(response => {
          if (!response.ok) throw new Error("Erro ao excluir usuário");
          return response.json();
        })
        .then(() => {
          alert("Usuário excluído com sucesso!");
          fetchUsers();
        })
        .catch(err => {
          console.error("Erro ao excluir usuário:", err);
          alert("Erro ao excluir usuário");
        });
    }
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setActiveTab("list");
  };

  if (loading && activeTab === "list") return <div className="container loading">Carregando...</div>;
  if (error) return <div className="container error">Erro: {error}</div>;

  return (
    <div className="container edit-container">
      <header className="header">
        <h1 className="titulo">Gerenciamento de Usuários</h1>
        <div className="student-name">Francisco Hauch Cardoso</div>
      </header>
      
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'list' ? 'active' : ''}`} onClick={() => setActiveTab("list")}>Lista de Usuários</button>
        <button className={`tab-button ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab("add")}>Adicionar Usuário</button>
      </div>
      
      {activeTab === "list" && (
        <div className="user-selection">
          <h3>Usuários Cadastrados</h3>
          <ul className="user-list-edit">
            {users.map(user => (
              <li key={user.id} className="user-select-item">
                <span>{user.Nome}</span>
                <div className="user-actions">
                  <button onClick={() => handleSelectUser(user.id)} className="add-button">Editar</button>
                  <button onClick={() => handleDelete(user.id)} className="add-button">Excluir</button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate("/")} className="add-button back-btn">Voltar para Home</button>
        </div>
      )}
      
      {activeTab === "edit" && selectedUser && (
        <div className="edit-form">
          <h3>Editando: {selectedUser.Nome}</h3>
          <div className="input-container">
            <input type="text" name="Nome" value={editForm.Nome} onChange={(e) => handleInputChange(e, "edit")} placeholder="Nome" className="input-field"/>
            <input type="text" name="CPF" value={editForm.CPF} onChange={(e) => handleInputChange(e, "edit")} placeholder="CPF" className="input-field"/>
            <input type="email" name="Email" value={editForm.Email} onChange={(e) => handleInputChange(e, "edit")} placeholder="Email" className="input-field"/>
            <input type="text" name="telefone" value={editForm.telefone} onChange={(e) => handleInputChange(e, "edit")} placeholder="Telefone" className="input-field"/>
            <input type="text" name="Genero" value={editForm.Genero} onChange={(e) => handleInputChange(e, "edit")} placeholder="Gênero" className="input-field"/>
            <div className="button-group">
              <button onClick={handleSave} className="add-button">Salvar</button>
              <button onClick={handleCancel} className="add-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "add" && (
        <div className="add-form">
          <h3>Adicionar Novo Usuário</h3>
          <div className="input-container">
            <input type="text" name="Nome" value={newUser.Nome} onChange={(e) => handleInputChange(e, "add")} placeholder="Nome" className="input-field"/>
            <input type="text" name="CPF" value={newUser.CPF} onChange={(e) => handleInputChange(e, "add")} placeholder="CPF" className="input-field"/>
            <input type="email" name="Email" value={newUser.Email} onChange={(e) => handleInputChange(e, "add")} placeholder="Email" className="input-field"/>
            <input type="text" name="telefone" value={newUser.telefone} onChange={(e) => handleInputChange(e, "add")} placeholder="Telefone" className="input-field"/>
            <input type="text" name="Genero" value={newUser.Genero} onChange={(e) => handleInputChange(e, "add")} placeholder="Gênero" className="input-field"/>
            <div className="button-group">
              <button onClick={handleAdd} className="add-button">Adicionar</button>
              <button onClick={() => setActiveTab("list")} className="add-button">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}