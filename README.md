# SCOUT — Sistema de Análise Esportiva
Plataforma web desenvolvida para o time Hípica de Campinas, voltada para scouts
e comissões técnicas acompanharem atletas, jogos e desempenho esportivo.

---

## Sobre o projeto

O SCOUT foi criado para atender às necessidades do time Hípica de Campinas.
Através da plataforma é possível monitorar atletas, consultar jogos, assistir
transmissões ao vivo e gerenciar o perfil do usuário. A interface é responsiva
e funciona bem tanto no celular quanto no desktop.

---

## Telas

| Tela        | Arquivo                       |
|-------------|-------------------------------|
| Início      | index.html                    |
| Login       | login.html                    |
| Scout Live  | pages/scout-live.html         |
| Jogos       | pages/jogos.html              |
| Atletas     | pages/atletas.html            |
| Perfil      | pages/perfil.html             |

---

## Estrutura de arquivos
```
TCC/
├── index.html
├── login.html
├── vite.config.js
├── package.json
├── README.md
├── .gitignore
│
├── pages/
│   ├── scout-live.html
│   ├── jogos.html
│   ├── atletas.html
│   └── perfil.html
│
├── css/
│   ├── inicial.css
│   ├── login.css
│   ├── scout-live.css
│   ├── jogos.css
│   ├── atletas.css
│   └── perfil.css
│
├── js/
│   ├── home.js
│   ├── login.js
│   ├── scout-live.js
│   ├── jogos.js
│   ├── atletas.js
│   └── perfil.js
│
└── src/
    └── assets/
        ├── IMG/
        │   ├── hipica.png
        │   ├── voleibol.png
        │   ├── bola.png
        │   ├── perfil.png
        │   ├── 1.jpg
        │   ├── 2.jpg
        │   ├── 3.jpg
        │   └── 4.jpg
        └── fontes/
            ├── Nexa-ExtraLight.ttf
            └── Nexa-Heavy.ttf
```

---

## Como funciona

**HTML**
Estrutura dividida em cabeçalho, carrossel de imagens e grade com 4 botões de navegação.
A tela de login tem dois formulários — entrar e cadastrar — alternados por abas.

**CSS**
Usa variáveis de cor, Flexbox e Grid. Responsivo com breakpoints para celular,
tablet, desktop e tela grande. Fonte Nexa importada via @font-face.

**JS**
Carrossel com suporte a clique, swipe e avanço automático a cada 4 segundos.
Login e cadastro salvos no localStorage. Após login o cabeçalho atualiza com
o nome e iniciais do usuário e exibe o botão de sair.

---

## Como rodar

1. Instale as dependências:
   npm install

2. Inicie o servidor:
   npm run dev

3. Acesse no navegador:
   http://localhost:5173

---

## Integrantes

NOMES: João Lucas Pardinho dos Santos
       Fabrizio Casarini Casado Matias
       Felipe Gianinni De Paula
       Emily Emerenciano Da Silva
       Sara Carolyne Godoi Dos Santos
       Pietro De Souza Rodrigues

Hípica de Campinas — 2025
3º C Tec