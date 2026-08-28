const API_URL = 'http://localhost:3000';

const loginForm = document.getElementById('loginForm');
const mensagemErro = document.getElementById('mensagemErro');

loginForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value;

    mensagemErro.textContent = '';

    if (!email || !senha) {
        mensagemErro.textContent =
            'E-mail e senha são obrigatórios.';
        return;
    }

    try {

        const resposta = await fetch(`${API_URL}/login`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email: email,
                senha: senha
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            mensagemErro.textContent =
                dados.mensagem || 'Erro ao realizar login.';
            return;
        }

        localStorage.setItem('token', dados.token);

        localStorage.setItem(
            'usuario',
            JSON.stringify(dados.usuario)
        );

        window.location.href = 'dashboard.html';

    } catch (erro) {

        console.error(erro);

        mensagemErro.textContent =
            'Não foi possível conectar com o servidor.';
    }

});