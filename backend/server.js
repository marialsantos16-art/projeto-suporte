const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database/connection');

const usuarioRoutes = require('./routes/usuarioRoutes');
const chamadoRoutes = require('./routes/chamadoRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(chamadoRoutes);
app.use(authRoutes);

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API do Sistema de Suporte Técnico funcionando!'
    });
});

async function iniciarServidor() {
    try {
        await db.query('SELECT 1');

        console.log('Banco de dados conectado com sucesso!');

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    } catch (erro) {
        console.error('Erro ao conectar ao banco de dados:');
        console.error(erro);
    }
}

iniciarServidor();