const express = require('express');
const chamadoController = require('../controllers/chamadoController');

const router = express.Router();

router.get('/chamados', chamadoController.listarChamados);

router.get('/chamados/:id', chamadoController.buscarChamado);

router.post('/chamados', chamadoController.criarChamado);

router.put('/chamados/:id', chamadoController.atualizarChamado);

router.delete('/chamados/:id', chamadoController.excluirChamado);

module.exports = router;