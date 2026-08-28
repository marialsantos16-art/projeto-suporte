const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

async function criarUsuario(req, res) {
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha || !perfil) {
            return res.status(400).json({
                mensagem: 'Nome, e-mail, senha e perfil são obrigatórios'
            });
        }

        const usuarioExistente =
            await usuarioModel.buscarUsuarioPorEmail(email);

        if (usuarioExistente) {
            return res.status(409).json({
                mensagem: 'E-mail já cadastrado'
            });
        }

        const senhaCriptografada =
            await bcrypt.hash(senha, 10);

        const id = await usuarioModel.criarUsuario(
            nome,
            email,
            senhaCriptografada,
            perfil
        );

        res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso',
            id: id
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao cadastrar usuário'
        });
    }
}

async function listarUsuarios(req, res) {
    try {
        const usuarios = await usuarioModel.listarUsuarios();

        res.status(200).json(usuarios);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar usuários'
        });
    }
}

module.exports = {
    criarUsuario,
    listarUsuarios
};