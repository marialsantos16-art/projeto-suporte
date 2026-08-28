const db = require('../database/connection');

async function criarUsuario(nome, email, senha, perfil) {
    const [resultado] = await db.execute(
        `INSERT INTO usuarios (nome, email, senha, perfil)
         VALUES (?, ?, ?, ?)`,
        [nome, email, senha, perfil]
    );

    return resultado.insertId;
}

async function listarUsuarios() {
    const [usuarios] = await db.execute(
        `SELECT id, nome, email, perfil FROM usuarios`
    );

    return usuarios;
}

async function buscarUsuarioPorEmail(email) {
    const [usuarios] = await db.execute(
        `SELECT * FROM usuarios WHERE email = ?`,
        [email]
    );

    return usuarios[0];
}

async function buscarUsuarioPorId(id) {
    const [usuarios] = await db.execute(
        `SELECT id, nome, email, perfil FROM usuarios WHERE id = ?`,
        [id]
    );

    return usuarios[0];
}

module.exports = {
    criarUsuario,
    listarUsuarios,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId
};