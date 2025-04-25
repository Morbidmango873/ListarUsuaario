import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {
    const { Nome, CPF, Email, telefone, Genero } = req.body;
    console.log("Recebido no backend:", req.body);
    const q = "INSERT INTO usuarios (Nome, CPF, Email, telefone, Genero) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [Nome, CPF, Email, telefone, Genero], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Usuário adicionado com sucesso" });
    });
};

export const deleteUser = (req, res) => {
    const { id } = req.params;
    const q = "DELETE FROM usuarios WHERE id = ?";
    db.query(q, [id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Usuário removido com sucesso" });
    });
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { Nome, CPF, Email , telefone, Genero} = req.body;
    const q = "UPDATE usuarios SET Nome = ?, CPF = ?, Email = ? , telefone = ? , Genero = ? WHERE id = ?";
    db.query(q, [Nome, CPF, Email, telefone, Genero, id], (err) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    });
};

export const getUserById = (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM usuarios WHERE id = ?";
    db.query(q, [id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data[0]);
    });
};
