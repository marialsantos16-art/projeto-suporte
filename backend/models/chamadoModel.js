const db = require('../database/connection');

async function listarChamados(status, prioridade) {
    let sql = `
        SELECT
            c.id,
            c.titulo,
            c.descricao,
            c.prioridade,
            c.status,
            c.categoria,
            c.usuario_id,
            c.data_criacao,
            u.nome AS responsavel
        FROM chamados c
        INNER JOIN usuarios u ON c.usuario_id = u.id
    `;

    const parametros = [];
    const condicoes = [];

    if (status) {
        condicoes.push('c.status = ?');
        parametros.push(status);
    }

    if (prioridade) {
        condicoes.push('c.prioridade = ?');
        parametros.push(prioridade);
    }

    if (condicoes.length > 0) {
        sql += ' WHERE ' + condicoes.join(' AND ');
    }

    sql += ' ORDER BY c.id DESC';

    const [chamados] = await db.execute(sql, parametros);

    return chamados;
}

async function buscarChamadoPorId(id) {
    const [chamados] = await db.execute(
        `
        SELECT
            c.id,
            c.titulo,
            c.descricao,
            c.prioridade,
            c.status,
            c.categoria,
            c.usuario_id,
            c.data_criacao,
            u.nome AS responsavel
        FROM chamados c
        INNER JOIN usuarios u ON c.usuario_id = u.id
        WHERE c.id = ?
        `,
        [id]
    );

    return chamados[0];
}

async function criarChamado(
    titulo,
    descricao,
    prioridade,
    status,
    categoria,
    usuario_id
) {
    const [resultado] = await db.execute(
        `
        INSERT INTO chamados
        (titulo, descricao, prioridade, status, categoria, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
            titulo,
            descricao,
            prioridade,
            status,
            categoria,
            usuario_id
        ]
    );

    return resultado.insertId;
}

async function atualizarChamado(id, prioridade, status) {
    const [resultado] = await db.execute(
        `
        UPDATE chamados
        SET prioridade = ?, status = ?
        WHERE id = ?
        `,
        [prioridade, status, id]
    );

    return resultado.affectedRows;
}

async function excluirChamado(id) {
    const [resultado] = await db.execute(
        `DELETE FROM chamados WHERE id = ?`,
        [id]
    );

    return resultado.affectedRows;
}

module.exports = {
    listarChamados,
    buscarChamadoPorId,
    criarChamado,
    atualizarChamado,
    excluirChamado
};