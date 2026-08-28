CREATE DATABASE suporte_tecnico;
USE suporte_tecnico;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    perfil VARCHAR(50) NOT NULL
);

CREATE TABLE chamados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    prioridade VARCHAR(20) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'aberto',
    categoria VARCHAR(100) NOT NULL,
    usuario_id INT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id),

    CHECK (prioridade IN ('baixa', 'média', 'alta')),

    CHECK (status IN ('aberto', 'em andamento', 'concluído'))
);

INSERT INTO usuarios (nome, email, senha, perfil)
VALUES
('Administrador', 'admin@email.com', '123456', 'admin'),
('João', 'joao@email.com', '123456', 'tecnico');

INSERT INTO chamados
(titulo, descricao, prioridade, status, categoria, usuario_id)
VALUES
(
    'Computador não liga',
    'O computador do setor administrativo não está ligando.',
    'alta',
    'aberto',
    'Hardware',
    1
);