// ==========================================
// CONTROLE DO MENU LATERAL E RODAPÉ
// ==========================================
const sideMenu = document.getElementById('sideMenu');
const closeMenuBtn = document.getElementById('closeMenu');
const menuTopoButtons = document.querySelectorAll('.menu-topo-btn');
const grupoSubmenus = document.querySelectorAll('.grupo-submenu');
const fecharLinks = document.querySelectorAll('.fechar-link');

menuTopoButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        
        // Garante que o elemento alvo existe antes de tentar abrir
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            grupoSubmenus.forEach(grupo => grupo.classList.remove('show'));
            targetElement.classList.add('show');
            if (sideMenu) sideMenu.classList.add('active');
        }
    });
});

if (closeMenuBtn && sideMenu) {
    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
    });
}

fecharLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sideMenu) sideMenu.classList.remove('active');
    });
});

// DATA ATUAL DO RODAPÉ
const campoData = document.getElementById('data-atual');
if (campoData) {
    const hoje = new Date();
    campoData.textContent = hoje.toLocaleDateString('pt-BR');
}


// ==========================================
// FUNÇÃO DA TELA DE CADASTRO
// ==========================================
function salvarCadastro() {
    // Captura os valores de todos os campos do formulário da barbearia
    const usuario = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("senha").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        cpf: document.getElementById("cpf").value,
        dataCriacao: new Date().toLocaleDateString("pt-BR")
    };

    // Validação básica para garantir os dados essenciais
    if (!usuario.nome || !usuario.email || !usuario.senha) {
        alert("Por favor, preencha o Nome, Email e Senha para realizar o cadastro!");
        return; 
    }

    // BUSCA A LISTA EXISTENTE OU CRIA UMA NOVA SE ESTIVER VAZIA
    let listaClientes = JSON.parse(localStorage.getItem("listaClientes")) || [];

    // Evita cadastrar o mesmo e-mail duas vezes
    const emailExistente = listaClientes.find(cliente => cliente.email === usuario.email);
    if (emailExistente) {
        alert("Este e-mail já está cadastrado! Tente fazer o login ou use outro e-mail.");
        return;
    }

    // Adiciona o novo usuário na lista e salva no navegador
    listaClientes.push(usuario);
    localStorage.setItem("listaClientes", JSON.stringify(listaClientes));

    alert(`Cadastro de ${usuario.nome} realizado com sucesso! Redirecionando para o login...`);
    
    // Redireciona o usuário para a página de login
    window.location.href = "login.html";
}


// ==========================================
// FUNÇÃO DA TELA DE LOGIN
// ==========================================
function autenticarUsuario() {
    const emailDigitado = document.getElementById("loginEmail").value;
    const senhaDigitada = document.getElementById("loginSenha").value;

    // Busca a lista completa de registros salvos anteriormente
    const dadosOriginais = localStorage.getItem("listaClientes");

    if (!dadosOriginais) {
        alert("Nenhum usuário cadastrado neste navegador! Por favor, faça o cadastro primeiro.");
        return;
    }

    // Transforma a string JSON de volta na lista de objetos
    const listaClientes = JSON.parse(dadosOriginais);

    // Percorre todos os cadastros antigos procurando o e-mail e senha correspondentes
    const usuarioEncontrado = listaClientes.find(cliente => 
        cliente.email === emailDigitado && cliente.senha === senhaDigitada
    );

    // Se encontrar a combinação correta na lista
    if (usuarioEncontrado) {
        alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}! Login realizado com sucesso.`);
        
        // Redireciona o usuário para a página principal da barbearia
        window.location.href = "principal.html";
    } else {
        alert("E-mail ou senha incorretos! Tente novamente.");
    }
}

