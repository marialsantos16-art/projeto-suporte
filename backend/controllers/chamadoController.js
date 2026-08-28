const chamadoModel = require('../models/chamadoModel');
const usuarioModel = require('../models/usuarioModel');

const prioridadesPermitidas = [
    'baixa',
    'média',
    'alta'
];

const statusPermitidos = [
    'aberto',
    'em andamento',
    'concluído'
];

async function listarChamados(req, res) {
    try {
        const { status, prioridade } = req.query;

        if (status && !statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status inválido'
            });
        }

        if (prioridade && !prioridadesPermitidas.includes(prioridade)) {
            return res.status(400).json({
                mensagem: 'Prioridade inválida'
            });
        }

        const chamados =
            await chamadoModel.listarChamados(status, prioridade);

        res.status(200).json(chamados);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar chamados'
        });
    }
}

async function buscarChamado(req, res) {
    try {
        const { id } = req.params;

        const chamado =
            await chamadoModel.buscarChamadoPorId(id);

        if (!chamado) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        res.status(200).json(chamado);

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao buscar chamado'
        });
    }
}

async function criarChamado(req, res) {
    try {
        const {
            titulo,
            descricao,
            categoria,
            prioridade,
            usuario_id
        } = req.body;

        if (
            !titulo ||
            !descricao ||
            !categoria ||
            !prioridade ||
            !usuario_id
        ) {
            return res.status(400).json({
                mensagem: 'Título, descrição, categoria, prioridade e usuário responsável são obrigatórios'
            });
        }

        if (!prioridadesPermitidas.includes(prioridade)) {
            return res.status(400).json({
                mensagem: 'Prioridade inválida'
            });
        }

        const usuario =
            await usuarioModel.buscarUsuarioPorId(usuario_id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: 'Usuário responsável não encontrado'
            });
        }

        const id = await chamadoModel.criarChamado(
            titulo,
            descricao,
            prioridade,
            'aberto',
            categoria,
            usuario_id
        );

        res.status(201).json({
            mensagem: 'Chamado cadastrado com sucesso',
            id: id
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao cadastrar chamado'
        });
    }
}

async function atualizarChamado(req, res) {
    try {
        const { id } = req.params;
        const { prioridade, status } = req.body;

        if (!prioridade || !status) {
            return res.status(400).json({
                mensagem: 'Prioridade e status são obrigatórios'
            });
        }

        if (!prioridadesPermitidas.includes(prioridade)) {
            return res.status(400).json({
                mensagem: 'Prioridade inválida'
            });
        }

        if (!statusPermitidos.includes(status)) {
            return res.status(400).json({
                mensagem: 'Status inválido'
            });
        }

        const chamado =
            await chamadoModel.buscarChamadoPorId(id);

        if (!chamado) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        await chamadoModel.atualizarChamado(
            id,
            prioridade,
            status
        );

        res.status(200).json({
            mensagem: 'Chamado atualizado com sucesso'
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao atualizar chamado'
        });
    }
}

async function excluirChamado(req, res) {
    try {
        const { id } = req.params;

        const chamado =
            await chamadoModel.buscarChamadoPorId(id);

        if (!chamado) {
            return res.status(404).json({
                mensagem: 'Chamado não encontrado'
            });
        }

        await chamadoModel.excluirChamado(id);

        res.status(200).json({
            mensagem: 'Chamado excluído com sucesso'
        });

    } catch (erro) {
        console.error(erro);

        res.status(500).json({
            mensagem: 'Erro ao excluir chamado'
        });
    }
}

module.exports = {
    listarChamados,
    buscarChamado,
    criarChamado,
    atualizarChamado,
    excluirChamado
};