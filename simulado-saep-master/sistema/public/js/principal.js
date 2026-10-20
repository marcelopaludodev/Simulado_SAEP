// ============================================================
// public/js/principal.js
// ============================================================
// ESTE ARQUIVO É COM VOCÊ (ALUNO DESENVOLVE).
//
// O que falta aqui:
//   - recuperar o nome do usuário autenticado e exibir no
//     elemento #nome-usuario
//   - implementar o logout no botão #btn-sair
//
// A navegação para Clientes, Veículos e Ordens de Serviço já está
// pronta no HTML (são apenas links <a>), vocês não precisam
// mexer nisso.
// ============================================================

const nomeUsuarioEl = document.getElementById("nome-usuario");
const btnSair = document.getElementById("btn-sair");

inicializar();

async function inicializar() {
    await carregarUsuarioLogado();
}

async function carregarUsuarioLogado() {
    try {
        const resposta = await fetch("/api/auth/sessao", {
            credentials: "include"
        });

        if (resposta.status === 401) {
            window.location.href = "/";
            return;
        }

        if (!resposta.ok) {
            throw new Error("Erro ao buscar usuário da sessão.");
        }

        const dados = await resposta.json();

        // Exibe o nome do usuário autenticado
        nomeUsuarioEl.textContent = dados.usuario.nome;

    } catch (erro) {
        console.error("Erro ao verificar sessão:", erro);
    }
}

btnSair.addEventListener("click", async () => {
    try {
        const resposta = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include"
        });

        if (resposta.ok) {
            window.location.href = "/";
            return;
        }

        const dados = await resposta.json();
        alert(dados.erro || "Não foi possível encerrar a sessão.");

    } catch (erro) {
        console.error("Erro ao realizar logout:", erro);
        alert("Erro de conexão ao tentar sair.");
    }
});