const express = require('express');
const usuarioController = require('../controllers/usuarioController');

const router = express.Router();

router.post('/usuarios', usuarioController.criarUsuario);

router.get('/usuarios', usuarioController.listarUsuarios);

module.exports = router;