// ============================================================
// public/js/clientes.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊ (ALUNO DESENVOLVE).
//
// A estrutura abaixo (elementos, eventos já conectados, nomes de
// função) já está pronta: inicializar() no topo, funções
// carregarX() e renderizarX() separadas. O que falta é o conteúdo
// de cada função marcada com TODO.
//
// Exemplo completo do mesmo fluxo: exemplos/exemplo-crud-completo/livros.js
// ============================================================

const corpoTabela = document.getElementById("corpo-tabela-clientes");
const tabela = document.getElementById("tabela-clientes");
const mensagemClientes = document.getElementById("mensagem-clientes");

const inputBusca = document.getElementById("input-busca");
const btnBuscar = document.getElementById("btn-buscar");

const formCliente = document.getElementById("form-cliente");
const clienteIdInput = document.getElementById("cliente-id");
const clienteNomeInput = document.getElementById("cliente-nome");
const clienteCpfInput = document.getElementById("cliente-cpf");
const clienteTelefoneInput = document.getElementById("cliente-telefone");
const btnCancelarEdicao = document.getElementById("btn-cancelar-edicao");

inicializar();

async function inicializar() {
    await carregarClientes();
}

// ------------------------------------------------------------
// Listar clientes (também usada para a busca - aceita um termo
// opcional)
// ------------------------------------------------------------
async function carregarClientes(termoBusca = "") {
    try {
        let url = "/api/clientes";

        if (termoBusca.trim() !== "") {
            url += "?busca=" + encodeURIComponent(termoBusca);
        }

        const resposta = await fetch(url, {
            credentials: "include"
        });

        if (resposta.status === 401) {
            window.location.href = "/";
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao buscar clientes.");
        }

        const clientes = await resposta.json();

        renderizarClientes(clientes);

    } catch (erro) {
        mensagemClientes.textContent = "Erro ao carregar clientes.";
        mensagemClientes.classList.remove("escondido");
        console.error(erro);
    }
}

// ------------------------------------------------------------
// Desenha a tabela de clientes na tela
// ------------------------------------------------------------
function renderizarClientes(clientes) {
    corpoTabela.innerHTML = "";

    if (clientes.length === 0) {
        mensagemClientes.textContent = "Nenhum cliente encontrado.";
        mensagemClientes.classList.remove("escondido");
        tabela.classList.add("escondido");
        return;
    }

    mensagemClientes.classList.add("escondido");
    tabela.classList.remove("escondido");

    clientes.forEach((cliente) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.telefone}</td>
        `;

        corpoTabela.appendChild(linha);
    });
}

// ------------------------------------------------------------
// Busca
// ------------------------------------------------------------
btnBuscar.addEventListener("click", () => {
    // TODO: pegue o valor de inputBusca.value e chame
    // carregarClientes(termo)
});

// ------------------------------------------------------------
// Salvar (inserir novo ou editar existente)
// ------------------------------------------------------------
formCliente.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const cliente = {
        nome: clienteNomeInput.value.trim(),
        cpf: clienteCpfInput.value.trim(),
        telefone: clienteTelefoneInput.value.trim()
    };

    const id = clienteIdInput.value;

    try {
        // TODO: se "id" estiver preenchido, é uma edição ->
        //   fetch PUT /api/clientes/{id}
        // Se estiver vazio, é um novo cadastro ->
        //   fetch POST /api/clientes
        // Em ambos os casos: enviar "cliente" como JSON no body,
        // conferir resposta.ok, e se der certo:
        //   - limpar o formulário (formCliente.reset() e clienteIdInput.value = "")
        //   - esconder o botão de cancelar edição
        //   - chamar carregarClientes() de novo para atualizar a lista

    } catch (erro) {
        alert("Erro ao salvar cliente.");
        console.error(erro);
    }
});

btnCancelarEdicao.addEventListener("click", () => {
    formCliente.reset();
    clienteIdInput.value = "";
    btnCancelarEdicao.classList.add("escondido");
});

// ------------------------------------------------------------
// Chamada pelos botões "Editar" criados em renderizarClientes()
// ------------------------------------------------------------
function preencherFormularioParaEdicao(cliente) {
    // TODO: preencher clienteIdInput, clienteNomeInput, clienteCpfInput,
    // clienteTelefoneInput com os dados de "cliente", e mostrar o
    // botão btnCancelarEdicao (remover a classe "escondido")
}

// ------------------------------------------------------------
// Excluir cliente
// Chamada pelos botões "Excluir" criados em renderizarClientes()
// ------------------------------------------------------------
async function excluirCliente(id) {
    if (!confirm("Deseja realmente excluir este cliente?")) return;

    try {
        // TODO: fetch DELETE /api/clientes/{id}, conferir resposta.ok,
        // e se der certo, chamar carregarClientes() de novo.
        // Se der errado, mostre o erro que veio da API (alert).

    } catch (erro) {
        alert("Erro ao excluir cliente.");
        console.error(erro);
    }
}
