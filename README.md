# Projeto_2 — Dashboard Administrativo (Front-end com IA — SENAC RJ)

[![Demo](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://your-username.github.io/your-repo)
[![License: MIT](https://img.shields.io/badge/license-MIT-yellow)](LICENSE)

![screenshot](assets/screenshot.svg)

> Protótipo responsivo de painel administrativo — pronto para apresentação em portfólio. Inclui gráficos interativos, tabelas com filtro/paginação, autenticação simulada e um sistema de notificações.


## Resumo (PT-BR)

`Projeto_2` é um dashboard administrativo responsivo desenvolvido para o curso "Front-end com IA" do SENAC RJ. A aplicação é estática (HTML/CSS/JS) e usa Bootstrap 5 e Chart.js via CDN para fornecer um layout escuro, componentes interativos e gráficos.

Principais funcionalidades:
- Layout responsivo com Navbar, Sidebar fixa (desktop) e Offcanvas (mobile);
- Cards de métricas com faixas coloridas;
- Tabela de usuários com filtro e paginação simples;
- Vários gráficos (Chart.js) — linha, barras, doughnut, polarArea;
- Modal de configurações com persistência em `localStorage` (notificações, cor de destaque, itens por página);
- Sistema de toasts para notificações;
- Modal de autenticação (Entrar / Cadastrar / Esqueci senha) — implementação front-end com sessão simulada via `localStorage`;
- Validações de formulário (email, força de senha, confirmação de senha) com feedback inline.

Atualizações recentes:
- Os dois últimos gráficos foram alterados: "Taxa de Conversão" agora é um gráfico de dispersão (scatter) e "Receita por Canal" agora é exibido como gráfico de barras (bar).
- Navbar agora é fixa no topo durante o scroll; o `main.content-area` recebeu um offset para evitar sobreposição do conteúdo.
- Melhoria de contraste: a cor padrão `--muted` foi escurecida/clareada para melhorar legibilidade em tema escuro; `.text-muted` foi reforçado para maior contraste.
- Sidebar (desktop) e Offcanvas (mobile) agora mostram um bloco de usuário com nome e indicador Online/Offline, sincronizado com a sessão simulada.
- Tooltips foram adicionados a ícones importantes (navbar, cards de métricas) e inicializados via Bootstrap para melhor usabilidade.
- Ajustes de responsividade: regras CSS adicionadas para breakpoints de tablet (1024px) e mobile (768px); canvases de chart agora são responsivos e se adaptam à largura do contêiner.
- Removido footer duplicado e limpa validação do HTML no fim do arquivo.

---

## Como executar (PT-BR)

1. Abra o arquivo `index.html` no seu navegador (duplo clique ou arraste para a janela do navegador).
2. Recomendado: usar Chrome, Edge ou Firefox atualizados para melhor compatibilidade com Bootstrap e Chart.js.
3. O projeto não precisa de servidor — é uma aplicação estática. Se preferir, pode servir com um servidor local (ex.: `http-server`, VSCode Live Server).

---

## Estrutura de arquivos (PT-BR)

- `index.html` — página principal com todo o markup.
- `style.css` — estilos customizados (tema escuro, faixas dos cards, ajustes de modal/toasts).
- `main.js` — lógica: popula tabela, inicializa charts, navegação lateral, configurações (localStorage), autenticação simulada e toasts.

---

## Dependências (CDN) (PT-BR)

- Bootstrap 5 (CSS + bundle JS) — componentes e utilitários.
- Bootstrap Icons — ícones usados na UI.
- Chart.js — gráficos.

Essas dependências são carregadas via CDN diretamente no `index.html`.

---

## Segurança e limitações (PT-BR)

- A autenticação aqui é apenas para demonstração: senhas são armazenadas em plaintext no `localStorage` (apenas para demo). Não use este método em produção.
- Não há backend; todas as operações (registro, login, persistência de configurações) são simuladas no lado do cliente.
- Para produção, implemente um backend seguro, criptografe senhas (bcrypt), e proteja endpoints com autenticação adequada.

---

## Testes e QA (PT-BR)

Testes manuais sugeridos:
- Abrir o modal de configurações e alterar cor, notificações e itens por página — salvar e recarregar para verificar persistência.
- Abrir o modal de autenticação: testar cadastro (campo confirmar senha, validação de força de senha), login e logout.
- Filtrar a tabela de usuários, navegar páginas e verificar comportamento responsivo (mobile/desktop).
- Verificar toasts (teste de notificação e mensagens de erro/confirmacao).

---

## Notificações e Mensagens (PT-BR)

Foi adicionada uma área de Notificações e Mensagens no canto direito da navbar. Cada item abre um dropdown interativo com as seguintes capacidades:

- Lista rolável de itens com marcação visual para lidos/não-lidos.
- Ações em lote: "Marcar todas" e "Limpar" para cada painel.
- Clique em um item abre um toast com o conteúdo e marca o item como lido.
- Persistência básica usando `localStorage` (chaves: `admindash_notifications` e `admindash_messages`).

Como testar:

1. Abra `index.html` no navegador.
2. Clique no ícone da campainha para abrir o dropdown de Notificações; clique em um item para marcá-lo como lido e ver o toast.
3. Use "Marcar todas" e "Limpar" para manipular a lista. O estado é mantido no `localStorage`.

Observações:

- Atualmente o link "Ver todas" mostra um toast de demonstração; pode ser facilmente ligado a uma rota, modal ou página dedicada no futuro.
- As mensagens e notificações de exemplo são geradas na primeira carga se o `localStorage` estiver vazio.


## Próximos passos (PT-BR)

- Substituir o armazenamento de senhas por hashing seguro e adicionar um backend para autenticação.
- Adicionar testes automatizados (Jest / Testing Library) para funções JS puras.
- Melhorar acessibilidade (foco em toasts, roles ARIA, contraste).
- Adicionar integração com APIs reais para dados de usuários e métricas.

Notas pendentes / melhorias sugeridas:
- Tornar o indicador Online/Offline verdadeiramente em tempo real (WebSocket) para presença real.
- Adicionar avatar de usuário (upload ou URL) e exibi-lo na sidebar/offcanvas.
- Expandir verificações de acessibilidade (WCAG) e adicionar testes automatizados de UI.

---

## Credits / Créditos (PT-BR)

- Autor principal: Yuri Teixeira (maior parte da implementação e design deste projeto).
- Assistente: adições de sugestões, ideias de layout, melhorias de UX e correções de sintaxe/JS/HTML.

---

# Project_2 — Admin Dashboard (Front-end with AI — SENAC RJ)

## Summary (English)

`Project_2` is a responsive admin dashboard created for the "Front-end with AI" course at SENAC RJ. It's a static front-end project (HTML/CSS/JS) using Bootstrap 5 and Chart.js via CDN to provide a dark-themed dashboard with interactive components and charts.

Key features:
- Responsive layout with Navbar, fixed Sidebar (desktop) and Offcanvas (mobile);
- Metric cards with colored accent bars;
- Users table with simple filter and pagination;
- Multiple charts (Chart.js) — line, bar, doughnut, polarArea;
- Settings modal persisted in `localStorage` (notifications toggle, accent color, items per page);
- Toast notifications for user feedback;
- Authentication modal (Login / Register / Forgot password) — front-end simulation using `localStorage`;
- Form validations (email format, password strength, password confirmation) with inline feedback.

---

## How to run (English)

1. Open `index.html` in your browser (double click or drag & drop into the browser window).
2. Recommended browsers: Chrome, Edge or Firefox (latest versions).
3. The project is static — no build is required. Optionally, run a small local server (e.g. `http-server` or VSCode Live Server) if you prefer.

---

## File structure (English)

- `index.html` — main markup.
- `style.css` — custom styles (dark theme, card accents, modal/toast tweaks).
- `main.js` — logic: table population, charts, sidebar navigation, settings (localStorage), auth simulation and toasts.

---

## Dependencies (CDN) (English)

- Bootstrap 5 (CSS + JS bundle)
- Bootstrap Icons
- Chart.js

These are loaded from CDNs directly in `index.html`.

---

## Security & Limitations (English)

- Authentication here is for demonstration only: passwords are stored in plaintext in `localStorage` (demo-only). Do not use this in production.
- There is no backend; all data and actions are simulated client-side.
- For production, add a secure backend, hash passwords (bcrypt), and protect endpoints with proper authentication.

---

## Testing & QA (English)

Manual checks to perform:
- Change settings in the settings modal and verify they persist after reload.
- Use the auth modal to register (with password confirmation and strength), login and logout.
- Filter and paginate the users table; check responsiveness.
- Trigger toasts and ensure messages display.

---

## Notifications & Messages (English)

A Notifications and Messages area was added to the top-right of the navbar. Items in these dropdowns are sample/demo data generated locally on first load if `localStorage` is empty. The UI provides simple client-side controls and persistence for demo purposes only:

- Scrollable list with read / unread state
- Batch actions: "Mark all" and "Clear"
- Clicking an item displays a toast and marks it as read

These controls demonstrate UI patterns; they are not connected to any server by default. If you want, I can:

- Link "View all" to a dedicated page or modal
- Replace the demo data with an API endpoint to fetch real notifications/messages
- Export the data format used so it can be integrated with a backend


## Next steps (English)

- Replace plaintext password storage with secure hashing and add a backend.
- Add automated tests (Jest / Testing Library) for pure JS functions.
- Improve accessibility (focus management, ARIA attributes, contrast improvements).
- Integrate with real APIs for users and metrics.

---

## Acknowledgements / Notes

- Project completed for the course "Front-end with AI" at SENAC RJ.
- If you reuse or extend parts of this project, please be mindful of the security notes above.

---

## Notificações e Mensagens (Atualização)

Foi adicionada uma área de Notificações e Mensagens no canto direito da navbar. Cada item abre um dropdown interativo com as seguintes capacidades:

- Lista rolável de itens com marcação visual para lidos/não-lidos.
- Ações em lote: "Marcar todas" e "Limpar" para cada painel.
- Clique em um item abre um toast com o conteúdo e marca o item como lido.
- Persistência básica usando `localStorage` (chaves: `admindash_notifications` e `admindash_messages`).

Como testar:

1. Abra `index.html` no navegador.
2. Clique no ícone da campainha para abrir o dropdown de Notificações; clique em um item para marcá-lo como lido e ver o toast.
3. Use "Marcar todas" e "Limpar" para manipular a lista. O estado é mantido no `localStorage`.

Observações:

- Atualmente o link "Ver todas" mostra um toast de demonstração; pode ser facilmente ligado a uma rota, modal ou página dedicada no futuro.
- As mensagens e notificações de exemplo são geradas na primeira carga se o `localStorage` estiver vazio.

---

## Notifications & Messages (notes)

A Notifications and Messages area was added to the top-right of the navbar. Items in these dropdowns are sample/demo data generated locally on first load if `localStorage` is empty. The UI provides simple client-side controls and persistence for demo purposes only:

- Scrollable list with read / unread state
- Batch actions: "Mark all" and "Clear"
- Clicking an item displays a toast and marks it as read

These controls demonstrate UI patterns; they are not connected to any server by default. If you want, I can:

- Link "View all" to a dedicated page or modal
- Replace the demo data with an API endpoint to fetch real notifications/messages
- Export the data format used so it can be integrated with a backend


If you want, I can also add a short CONTRIBUTING guide, a LICENSE file, or screenshots/examples for the README.
