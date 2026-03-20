// ═══════════════════════════════════════════
// ABAS — alterna entre Login e Cadastro
// ═══════════════════════════════════════════

function trocarAba(aba) {
  // Pega os dois blocos de formulário e as duas abas
  const blocoEntrar   = document.getElementById('blocoEntrar');
  const blocoCadastro = document.getElementById('blocoCadastro');
  const abaEntrar     = document.getElementById('abaEntrar');
  const abaCadastro   = document.getElementById('abaCadastro');

  if (aba === 'entrar') {
    // Mostra o formulário de login e esconde o de cadastro
    blocoEntrar.classList.remove('oculto');
    blocoCadastro.classList.add('oculto');

    // Marca a aba "Entrar" como ativa e desmarca a de cadastro
    abaEntrar.classList.add('aba--ativa');
    abaCadastro.classList.remove('aba--ativa');

  } else {
    // Mostra o formulário de cadastro e esconde o de login
    blocoCadastro.classList.remove('oculto');
    blocoEntrar.classList.add('oculto');

    // Marca a aba "Cadastrar" como ativa e desmarca a de login
    abaCadastro.classList.add('aba--ativa');
    abaEntrar.classList.remove('aba--ativa');
  }
}


// ═══════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════

function fazerLogin() {
  // Lê os valores digitados pelo usuário
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  const erro  = document.getElementById('erroLogin');

  // Limpa mensagem de erro anterior
  erro.textContent = '';

  // Verifica se os campos foram preenchidos
  if (!email || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    return; // Para a execução aqui
  }

  // Busca a lista de usuários cadastrados no localStorage
  // Se não houver nenhum, usa uma lista vazia
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Procura um usuário com o e-mail e senha digitados
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  // Se não encontrou nenhum usuário com essas credenciais
  if (!usuario) {
    erro.textContent = 'E-mail ou senha incorretos.';
    return;
  }

  // Login bem-sucedido — salva a sessão do usuário no localStorage
  // Isso permite que outras páginas saibam quem está logado
  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

  // Redireciona para a tela inicial
  window.location.href = 'index.html';
}

// Permite fazer login pressionando Enter no campo de senha
document.getElementById('loginSenha').addEventListener('keydown', e => {
  if (e.key === 'Enter') fazerLogin();
});


// ═══════════════════════════════════════════
// CADASTRO
// ═══════════════════════════════════════════

function fazerCadastro() {
  // Lê todos os campos do formulário de cadastro
  const nome  = document.getElementById('cadastroNome').value.trim();
  const cpf   = document.getElementById('cadastroCpf').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const senha = document.getElementById('cadastroSenha').value;
  const erro  = document.getElementById('erroCadastro');

  // Limpa mensagem de erro anterior
  erro.textContent = '';

  // Verifica se todos os campos foram preenchidos
  if (!nome || !cpf || !email || !senha) {
    erro.textContent = 'Preencha todos os campos.';
    return;
  }

  // Verifica se o CPF tem o tamanho correto com a máscara (000.000.000-00 = 14 chars)
  if (cpf.length < 14) {
    erro.textContent = 'CPF inválido.';
    return;
  }

  // Verifica se a senha tem pelo menos 6 caracteres
  if (senha.length < 6) {
    erro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
    return;
  }

  // Busca os usuários já cadastrados no localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verifica se já existe um cadastro com esse e-mail
  const existe = usuarios.find(u => u.email === email);
  if (existe) {
    erro.textContent = 'Este e-mail já está cadastrado.';
    return;
  }

  // Gera as iniciais do usuário para exibir no chip do cabeçalho
  // Ex: "João Silva" → "JS"
  const palavras = nome.split(' ');
  const iniciais = palavras.length >= 2
    ? palavras[0][0] + palavras[palavras.length - 1][0]  // Primeira e última palavra
    : palavras[0].substring(0, 2);                        // Só uma palavra: pega 2 letras

  // Monta o objeto com os dados do novo usuário
  const novoUsuario = {
    nome,
    cpf,
    email,
    senha,
    iniciais: iniciais.toUpperCase()
  };

  // Adiciona o novo usuário na lista e salva de volta no localStorage
  usuarios.push(novoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Faz login automático após o cadastro — salva a sessão
  localStorage.setItem('usuarioLogado', JSON.stringify(novoUsuario));

  // Redireciona para a tela inicial já logado
  window.location.href = 'index.html';
}

// Permite fazer cadastro pressionando Enter no campo de senha
document.getElementById('cadastroSenha').addEventListener('keydown', e => {
  if (e.key === 'Enter') fazerCadastro();
});


// ═══════════════════════════════════════════
// MÁSCARA DE CPF
// ═══════════════════════════════════════════

function mascaraCpf(campo) {
  // Remove tudo que não for número (letras, pontos, traços etc.)
  let valor = campo.value.replace(/\D/g, '');

  // Aplica a máscara progressivamente conforme o usuário digita
  // Formato final: 000.000.000-00
  if (valor.length <= 3) {
    // Ex: "123"
    campo.value = valor;

  } else if (valor.length <= 6) {
    // Ex: "123.456"
    campo.value = valor.slice(0,3) + '.' + valor.slice(3);

  } else if (valor.length <= 9) {
    // Ex: "123.456.789"
    campo.value = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6);

  } else {
    // Ex: "123.456.789-00"
    campo.value = valor.slice(0,3) + '.' + valor.slice(3,6) + '.' + valor.slice(6,9) + '-' + valor.slice(9,11);
  }
}


// ═══════════════════════════════════════════
// MOSTRAR / OCULTAR SENHA
// ═══════════════════════════════════════════

function toggleSenha(campoId, botao) {
  // Pega o campo de senha pelo ID passado como parâmetro
  const campo = document.getElementById(campoId);

  if (campo.type === 'password') {
    // Senha estava oculta — agora mostra em texto puro
    campo.type = 'text';

    // Troca o ícone para "olho riscado" (indicando que está visível)
    botao.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
      </svg>`;

  } else {
    // Senha estava visível — agora oculta novamente
    campo.type = 'password';

    // Troca o ícone de volta para "olho normal" (indicando que está oculta)
    botao.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>`;
  }
}
