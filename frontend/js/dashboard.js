const API_URL = 'http://localhost:3000';

const token = localStorage.getItem('token');
const usuarioSalvo = localStorage.getItem('usuario');

if (!token || !usuarioSalvo) {
    window.location.href = 'login.html';
}

const usuario = JSON.parse(usuarioSalvo);

document.getElementById('nomeUsuario').textContent =
    `Olá, ${usuario.nome}`;


const tabelaChamados =
    document.getElementById('tabelaChamados');

const chamadoForm =
    document.getElementById('chamadoForm');

const filtroStatus =
    document.getElementById('filtroStatus');

const filtroPrioridade =
    document.getElementById('filtroPrioridade');

const mensagemCadastro =
    document.getElementById('mensagemCadastro');


/* =========================
   SAIR
========================= */

document
    .getElementById('btnSair')
    .addEventListener('click', function () {

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        window.location.href = 'login.html';
    });


/* =========================
   BUSCAR USUÁRIOS
========================= */

async function carregarUsuarios() {

    try {

        const resposta =
            await fetch(`${API_URL}/usuarios`);

        const usuarios =
            await resposta.json();

        const select =
            document.getElementById('usuario_id');

        select.innerHTML =
            '<option value="">Selecione um usuário</option>';

        usuarios.forEach(function (usuario) {

            const option =
                document.createElement('option');

            option.value = usuario.id;

            option.textContent =
                `${usuario.nome} - ${usuario.email}`;

            select.appendChild(option);

        });

    } catch (erro) {

        console.error(erro);

        const select =
            document.getElementById('usuario_id');

        select.innerHTML =
            '<option value="">Erro ao carregar usuários</option>';
    }
}


/* =========================
   BUSCAR CHAMADOS
========================= */

async function carregarChamados() {

    try {

        const status =
            filtroStatus.value;

        const prioridade =
            filtroPrioridade.value;

        const parametros =
            new URLSearchParams();

        if (status) {
            parametros.append('status', status);
        }

        if (prioridade) {
            parametros.append('prioridade', prioridade);
        }

        let url =
            `${API_URL}/chamados`;

        if (parametros.toString()) {
            url += `?${parametros.toString()}`;
        }

        const resposta =
            await fetch(url);

        const chamados =
            await resposta.json();

        if (!resposta.ok) {

            alert(
                chamados.mensagem ||
                'Erro ao carregar chamados.'
            );

            return;
        }

        mostrarChamados(chamados);

        atualizarIndicadores();

    } catch (erro) {

        console.error(erro);

        alert(
            'Não foi possível carregar os chamados.'
        );
    }
}


/* =========================
   MOSTRAR CHAMADOS
========================= */

function mostrarChamados(chamados) {

    tabelaChamados.innerHTML = '';

    if (chamados.length === 0) {

        tabelaChamados.innerHTML = `
            <tr>
                <td colspan="8">
                    Nenhum chamado encontrado.
                </td>
            </tr>
        `;

        return;
    }


    chamados.forEach(function (chamado) {

        const linha =
            document.createElement('tr');

        const data =
            new Date(
                chamado.data_criacao
            ).toLocaleString('pt-BR');


        linha.innerHTML = `

            <td>${chamado.id}</td>

            <td>${chamado.titulo}</td>

            <td>${chamado.categoria}</td>

            <td>${chamado.prioridade}</td>

            <td>${chamado.status}</td>

            <td>${chamado.responsavel}</td>

            <td>${data}</td>

            <td>

                <div class="acoes">

                    <button
                        class="btn btn-editar"
                        onclick="editarChamado(${chamado.id})"
                    >
                        Editar
                    </button>

                    <button
                        class="btn btn-excluir"
                        onclick="excluirChamado(${chamado.id})"
                    >
                        Excluir
                    </button>

                </div>

            </td>

        `;

        tabelaChamados.appendChild(linha);

    });
}


/* =========================
   INDICADORES
========================= */

async function atualizarIndicadores() {

    try {

        const resposta =
            await fetch(`${API_URL}/chamados`);

        const chamados =
            await resposta.json();

        const abertos =
            chamados.filter(
                chamado =>
                    chamado.status === 'aberto'
            ).length;

        const andamento =
            chamados.filter(
                chamado =>
                    chamado.status === 'em andamento'
            ).length;

        const concluidos =
            chamados.filter(
                chamado =>
                    chamado.status === 'concluído'
            ).length;

        const total =
            chamados.length;


        document.getElementById(
            'totalAbertos'
        ).textContent = abertos;

        document.getElementById(
            'totalAndamento'
        ).textContent = andamento;

        document.getElementById(
            'totalConcluidos'
        ).textContent = concluidos;

        document.getElementById(
            'totalChamados'
        ).textContent = total;

    } catch (erro) {

        console.error(
            'Erro ao atualizar indicadores:',
            erro
        );
    }
}


/* =========================
   CADASTRAR CHAMADO
========================= */

chamadoForm.addEventListener(
    'submit',
    async function (event) {

        event.preventDefault();

        const titulo =
            document.getElementById(
                'titulo'
            ).value.trim();

        const descricao =
            document.getElementById(
                'descricao'
            ).value.trim();

        const categoria =
            document.getElementById(
                'categoria'
            ).value.trim();

        const prioridade =
            document.getElementById(
                'prioridade'
            ).value;

        const usuario_id =
            document.getElementById(
                'usuario_id'
            ).value;


        if (
            !titulo ||
            !descricao ||
            !categoria ||
            !prioridade ||
            !usuario_id
        ) {

            mensagemCadastro.textContent =
                'Preencha todos os campos obrigatórios.';

            mensagemCadastro.style.color =
                '#dc2626';

            return;
        }


        try {

            const resposta =
                await fetch(
                    `${API_URL}/chamados`,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            titulo,
                            descricao,
                            categoria,
                            prioridade,
                            usuario_id:
                                Number(usuario_id)
                        })
                    }
                );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                mensagemCadastro.textContent =
                    dados.mensagem ||
                    'Erro ao cadastrar chamado.';

                mensagemCadastro.style.color =
                    '#dc2626';

                return;
            }


            mensagemCadastro.textContent =
                'Chamado cadastrado com sucesso!';

            mensagemCadastro.style.color =
                '#16a34a';


            chamadoForm.reset();

            await carregarChamados();

        } catch (erro) {

            console.error(erro);

            mensagemCadastro.textContent =
                'Erro ao conectar com o servidor.';

            mensagemCadastro.style.color =
                '#dc2626';
        }

    }
);


/* =========================
   EDITAR CHAMADO
========================= */

async function editarChamado(id) {

    const novoStatus =
        prompt(
            'Digite o novo status:\n\n' +
            'aberto\n' +
            'em andamento\n' +
            'concluído'
        );

    if (!novoStatus) {
        return;
    }


    const novaPrioridade =
        prompt(
            'Digite a nova prioridade:\n\n' +
            'baixa\n' +
            'média\n' +
            'alta'
        );

    if (!novaPrioridade) {
        return;
    }


    const statusValidos = [
        'aberto',
        'em andamento',
        'concluído'
    ];

    const prioridadesValidas = [
        'baixa',
        'média',
        'alta'
    ];


    if (!statusValidos.includes(novoStatus)) {

        alert('Status inválido.');

        return;
    }


    if (!prioridadesValidas.includes(novaPrioridade)) {

        alert('Prioridade inválida.');

        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/chamados/${id}`,
                {
                    method: 'PUT',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({
                        status: novoStatus,
                        prioridade: novaPrioridade
                    })
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                'Erro ao atualizar chamado.'
            );

            return;
        }


        alert(
            'Chamado atualizado com sucesso!'
        );

        await carregarChamados();

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao conectar com o servidor.'
        );
    }
}


/* =========================
   EXCLUIR CHAMADO
========================= */

async function excluirChamado(id) {

    const confirmar =
        confirm(
            'Tem certeza que deseja excluir este chamado?'
        );

    if (!confirmar) {
        return;
    }


    try {

        const resposta =
            await fetch(
                `${API_URL}/chamados/${id}`,
                {
                    method: 'DELETE'
                }
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.mensagem ||
                'Erro ao excluir chamado.'
            );

            return;
        }


        alert(
            'Chamado excluído com sucesso!'
        );


        await carregarChamados();

    } catch (erro) {

        console.error(erro);

        alert(
            'Erro ao conectar com o servidor.'
        );
    }
}


/* =========================
   FILTROS
========================= */

filtroStatus.addEventListener(
    'change',
    carregarChamados
);

filtroPrioridade.addEventListener(
    'change',
    carregarChamados
);


document
    .getElementById('btnLimparFiltros')
    .addEventListener(
        'click',
        function () {

            filtroStatus.value = '';

            filtroPrioridade.value = '';

            carregarChamados();
        }
    );


/* =========================
   INICIALIZAÇÃO
========================= */

carregarUsuarios();

carregarChamados();