// main.js - popula tabelas, inicializa charts e controla navegação lateral

// Dados de exemplo
const usuariosExemplo = [
  { id: 1, nome: 'Mariana Silva', email: 'mariana.silva@example.com', data: '10/10/2025', status: 'Ativo' },
  { id: 2, nome: 'Carlos Souza', email: 'carlos.souza@example.com', data: '09/10/2025', status: 'Pendente' },
  { id: 3, nome: 'Ana Pereira', email: 'ana.pereira@example.com', data: '08/10/2025', status: 'Ativo' },
  { id: 4, nome: 'João Lima', email: 'joao.lima@example.com', data: '07/10/2025', status: 'Bloqueado' },
  { id: 5, nome: 'Lucas Alves', email: 'lucas.alves@example.com', data: '06/10/2025', status: 'Ativo' },
  { id: 6, nome: 'Beatriz Rocha', email: 'beatriz.rocha@example.com', data: '05/10/2025', status: 'Ativo' },
  { id: 7, nome: 'Marcos Pinto', email: 'marcos.pinto@example.com', data: '04/10/2025', status: 'Pendente' },
  { id: 8, nome: 'Renata Costa', email: 'renata.costa@example.com', data: '03/10/2025', status: 'Ativo' }
];

// --- TABELA: filtro simples e paginação ---
let currentPage = 1;
let pageSize = 4;
let filteredUsers = [...usuariosExemplo];

function renderTablePage(page = 1) {
  const tbody = document.querySelector('table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const start = (page - 1) * pageSize;
  const pageItems = filteredUsers.slice(start, start + pageSize);
  pageItems.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <th scope="row">${u.id}</th>
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.data}</td>
      <td>${badgeHTML(u.status)}</td>
    `;
    tbody.appendChild(tr);
  });
  renderPagination();
}

function renderPagination() {
  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  let container = document.getElementById('pagination');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pagination';
    container.className = 'mt-3';
    const tableCard = document.querySelector('#usuarios .card-body');
    if (tableCard) tableCard.appendChild(container);
  }
  container.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `btn btn-sm me-1 ${i === currentPage ? 'btn-primary' : 'btn-outline-light'}`;
    btn.textContent = i;
    btn.addEventListener('click', () => { currentPage = i; renderTablePage(i); });
    container.appendChild(btn);
  }
}

function badgeHTML(status) {
  const map = {
    'Ativo': 'bg-success',
    'Pendente': 'bg-secondary',
    'Bloqueado': 'bg-danger'
  };
  const cls = map[status] || 'bg-secondary';
  return `<span class="badge ${cls}">${status}</span>`;
}

function aplicarFiltro(text) {
  const t = text.trim().toLowerCase();
  filteredUsers = usuariosExemplo.filter(u => u.nome.toLowerCase().includes(t) || u.email.toLowerCase().includes(t));
  currentPage = 1;
  renderTablePage(currentPage);
}

// --- CHARTS ---
const vendasMes = [8200, 9100, 7500, 12000, 9800, 11000, 12500, 13200, 9800, 10500, 11800, 12400];
const meses = ['Nov','Dez','Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out'];

function criarChartVendas() {
  const ctx = document.getElementById('chartVendas');
  if (!ctx) return null;
  return new Chart(ctx, {
    type: 'line',
    data: { labels: meses, datasets: [{ label: 'Vendas (R$)', data: vendasMes, borderColor: 'rgba(30,58,138,0.9)', backgroundColor: 'rgba(30,58,138,0.15)', fill: true, tension: 0.3, pointRadius: 3 }] },
    options: { responsive: true, plugins: { legend: { labels: { color: '#cbd5e1' } } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' } } } }
  });
}

function criarChartFontes() {
  const ctx = document.getElementById('chartFontes');
  if (!ctx) return null;
  const colors = ['#06b6d4','#ef4444','#60a5fa','#f59e0b'];
  return new Chart(ctx, { type: 'doughnut', data: { labels: ['Orgânico','Pago','Referência','Outro'], datasets: [{ data: [55,20,15,10], backgroundColor: colors }] }, options: { plugins: { legend: { labels: { color: '#cbd5e1' } }, tooltip: { callbacks: { label: function(ctx) { const v = ctx.raw || 0; return `${ctx.label}: ${v}%`; } } } } } });
}

// Novo gráfico: Pedidos por categoria (bar chart)
function criarChartPedidos() {
  const ctx = document.getElementById('chartPedidos');
  if (!ctx) return null;
  return new Chart(ctx, { type: 'bar', data: { labels: ['Eletrônicos','Casa','Roupas','Outros'], datasets: [{ label: 'Pedidos', data: [120, 90, 150, 60], backgroundColor: ['#1e3a8a','#0ea5a6','#7c3aed','#64748b'] }] }, options: { responsive: true, plugins: { legend: { display: false }, tooltip: { mode: 'index' } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' } } } } });
}

// --- NAVEGAÇÃO LATERAL ---
function ativarNavegacaoLateral() {
  const links = document.querySelectorAll('aside .nav-link, .offcanvas .nav-link');
  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '#inicio';
      if (href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1) || 'inicio';
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('aside .nav-link, .offcanvas .nav-link').forEach(x => x.classList.remove('active'));
        links.forEach(x => { if (x.getAttribute('href') === href) x.classList.add('active'); });
        const offcanvasEl = document.getElementById('offcanvasSidebar');
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
      }
    });
  });
}

function observarSecoes() {
  const sections = document.querySelectorAll('main.content-area section[id]');
  const options = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const selector = `aside .nav-link[href="#${id}"], .offcanvas .nav-link[href="#${id}"]`;
      const links = document.querySelectorAll(selector);
      if (entry.isIntersecting) {
        document.querySelectorAll('aside .nav-link, .offcanvas .nav-link').forEach(l => l.classList.remove('active'));
        links.forEach(l => l.classList.add('active'));
      }
    });
  }, options);
  sections.forEach(s => observer.observe(s));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  // Tabela
  filteredUsers = [...usuariosExemplo];
  renderTablePage(currentPage);
  // Filtro input (cria elemento se não existir)
  if (!document.getElementById('userFilter')) {
    const cardBody = document.querySelector('#usuarios .card-body');
    const div = document.createElement('div');
    div.className = 'mb-3 d-flex';
    div.innerHTML = `\
      <input id="userFilter" class="form-control form-control-sm me-2" placeholder="Filtrar por nome ou email">\
      <button id="clearFilter" class="btn btn-sm btn-outline-light">Limpar</button>`;
    if (cardBody) cardBody.insertBefore(div, cardBody.querySelector('.table-responsive'));
    document.getElementById('userFilter').addEventListener('input', (e) => aplicarFiltro(e.target.value));
    document.getElementById('clearFilter').addEventListener('click', () => { document.getElementById('userFilter').value = ''; aplicarFiltro(''); });
  }

  // Charts
  // Charts will be lazy-loaded when the Relatórios section scrolls into view
  initChartLazyLoader();

  // Navegação
  ativarNavegacaoLateral();
  observarSecoes();
  // Inicializar tooltips (Bootstrap)
  try {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (el) { return new bootstrap.Tooltip(el); });
  } catch (e) { /* ignore if bootstrap not loaded yet */ }
  // Configurações
  initSettings();
});

// --- Lazy-load Chart.js when #relatorios is visible ---
let chartsInitialized = false;
function loadChartJs() {
  return new Promise((resolve, reject) => {
    if (window.Chart) return resolve(window.Chart);
    const existing = document.querySelector('script[data-chart-loader]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Chart));
      existing.addEventListener('error', () => reject(new Error('Failed to load Chart.js')));
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    s.async = true;
    s.setAttribute('data-chart-loader', '1');
    s.onload = () => resolve(window.Chart);
    s.onerror = () => reject(new Error('Failed to load Chart.js'));
    document.body.appendChild(s);
  });
}

function initChartsSafe() {
  if (chartsInitialized) return;
  try {
    criarChartVendas();
    criarChartFontes();
    criarChartPedidos();
    criarChartConversoes();
    criarChartReceitaCanal();
    chartsInitialized = true;
  } catch (err) {
    console.error('Erro inicializando charts após load:', err);
  }
}

function initChartLazyLoader() {
  const target = document.getElementById('relatorios');
  if (!target) return;
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // load Chart.js and initialize
        loadChartJs().then(() => initChartsSafe()).catch(err => console.error(err));
        obs.disconnect();
      }
    });
  }, { root: null, rootMargin: '200px 0px' , threshold: 0.1 });
  observer.observe(target);
  // also attempt a fast-load if user is already near the section
  if (target.getBoundingClientRect().top < window.innerHeight + 200) {
    loadChartJs().then(() => initChartsSafe()).catch(err => console.error(err));
    observer.disconnect();
  }
}

// --- Accessibility: wire offcanvas auth button to open auth modal ---
document.addEventListener('DOMContentLoaded', () => {
  const offBtn = document.getElementById('offcanvasAuthBtn');
  if (offBtn) {
    // ensure keyboard accessibility
    offBtn.setAttribute('aria-haspopup', 'dialog');
    offBtn.setAttribute('aria-label', 'Entrar');
    offBtn.setAttribute('tabindex', '0');
    offBtn.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        const modalEl = document.getElementById('authModal');
        if (!modalEl) return;
        const offEl = document.getElementById('offcanvasSidebar');
        const offInstance = offEl ? (bootstrap.Offcanvas.getInstance(offEl) || bootstrap.Offcanvas.getOrCreateInstance(offEl)) : null;
        const showModal = () => {
          const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
          modal.show();
        };
        if (offInstance && offEl) {
          // wait until offcanvas is fully hidden before showing modal to avoid stacking
          const onHidden = () => { showModal(); offEl.removeEventListener('hidden.bs.offcanvas', onHidden); };
          offEl.addEventListener('hidden.bs.offcanvas', onHidden);
          offInstance.hide();
        } else {
          showModal();
        }
      } catch (err) {
        console.error('Erro abrindo modal via offcanvasAuthBtn', err);
      }
    });
    // keyboard support (Enter / Space)
    offBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        offBtn.click();
      }
    });
  }
});

// ----------------------
// Configurações (localStorage)
// ----------------------
const SETTINGS_KEY = 'admindash_settings';

function defaultSettings() {
  return {
    notifications: 'on',
    accent: '#1e3a8a',
    pageSize: 4
  };
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return defaultSettings();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultSettings(), parsed);
  } catch (e) {
    return defaultSettings();
  }
}

function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

function applySettings(settings) {
  // aplicar cor de destaque (CSS var)
  if (settings.accent) document.documentElement.style.setProperty('--accent', settings.accent);
  // aplicar pageSize para paginação
  if (settings.pageSize && Number(settings.pageSize) > 0) {
    currentPage = 1;
    pageSize = Number(settings.pageSize);
    // re-aplica filtro e renderiza
    filteredUsers = [...usuariosExemplo];
    renderTablePage(1);
  }
  // notificações: atualiza indicador
  updateNotifIndicator(settings.notifications === 'on');
}

function initSettings() {
  const settings = loadSettings();
  // preenche form
  const notif = document.getElementById('settingNotifications');
  const accent = document.getElementById('settingAccent');
  const page = document.getElementById('settingPageSize');
  if (notif) notif.value = settings.notifications;
  if (accent) accent.value = settings.accent;
  if (page) page.value = settings.pageSize;
  applySettings(settings);

  // handlers
  const saveBtn = document.getElementById('saveSettings');
  const resetBtn = document.getElementById('resetSettings');
  if (saveBtn) saveBtn.addEventListener('click', () => {
    const s = {
      notifications: notif ? notif.value : 'on',
      accent: accent ? accent.value : '#1e3a8a',
      pageSize: page ? Number(page.value) : 4
    };
    saveSettings(s);
    applySettings(s);
    // feedback simples
    saveBtn.textContent = 'Salvo ✓';
    setTimeout(() => saveBtn.textContent = 'Salvar', 1200);
    // fechar modal após salvar (se estiver aberto)
    const modalEl = document.getElementById('settingsModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) modalInstance.hide();
    // mostrar toast confirmando
    showToast('Configurações salvas', 'As preferências foram aplicadas localmente.');
  });
  if (resetBtn) resetBtn.addEventListener('click', () => {
    const d = defaultSettings();
    saveSettings(d);
    if (notif) notif.value = d.notifications;
    if (accent) accent.value = d.accent;
    if (page) page.value = d.pageSize;
    applySettings(d);
  });
  // botão de teste de notificação
  const testBtn = document.getElementById('testNotification');
  if (testBtn) testBtn.addEventListener('click', () => {
    const s = loadSettings();
    if (s.notifications === 'off') {
      showToast('Notificações desativadas', 'Ative as notificações nas configurações para testar.');
    } else {
      showToast('Notificação de teste', 'Esta é uma notificação de teste do painel.');
      updateNotifIndicator(true);
    }
  });
  // preview ao vivo: cor e notificações e pageSize
  if (accent) accent.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent', e.target.value);
    if (saveBtn) saveBtn.textContent = 'Salvar*';
  });
  if (notif) notif.addEventListener('change', () => { if (saveBtn) saveBtn.textContent = 'Salvar*'; });
  if (page) page.addEventListener('change', (e) => {
    // aplica pageSize imediatamente como preview
    pageSize = Number(e.target.value);
    currentPage = 1;
    renderTablePage(1);
    if (saveBtn) saveBtn.textContent = 'Salvar*';
  });
}

// --- TOASTS e INDICADOR DE NOTIFICAÇÕES ---
function showToast(title, message, timeout = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const id = 'toast-' + Date.now();
  const toastEl = document.createElement('div');
  toastEl.className = 'toast align-items-center text-bg-dark border-0';
  toastEl.id = id;
  toastEl.setAttribute('role', 'alert');
  toastEl.setAttribute('aria-live', 'assertive');
  toastEl.setAttribute('aria-atomic', 'true');
  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">
        <strong>${title}</strong><div class="small text-muted">${message}</div>
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Fechar"></button>
    </div>`;
  container.appendChild(toastEl);
  const bsToast = new bootstrap.Toast(toastEl, { delay: timeout });
  bsToast.show();
  // remover do DOM quando escondido
  toastEl.addEventListener('hidden.bs.toast', () => { toastEl.remove(); });
}

function updateNotifIndicator(on) {
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  if (on) badge.classList.remove('d-none'); else badge.classList.add('d-none');
}

// --- NOTIFICAÇÕES E MENSAGENS (armazenamento simples + UI) ---
const NOTIF_KEY = 'admindash_notifications';
const MSG_KEY = 'admindash_messages';

function loadNotifs() { try { return JSON.parse(localStorage.getItem(NOTIF_KEY)) || []; } catch(e) { return []; } }
function saveNotifs(list) { localStorage.setItem(NOTIF_KEY, JSON.stringify(list)); }
function loadMsgs() { try { return JSON.parse(localStorage.getItem(MSG_KEY)) || []; } catch(e) { return []; } }
function saveMsgs(list) { localStorage.setItem(MSG_KEY, JSON.stringify(list)); }

// sample initial content if empty
function ensureSampleMessages() {
  if (!loadNotifs().length) {
    const sample = [
      { id: Date.now()-30000, text: 'Nova venda registrada: Pedido #13245', time: 'Agora', read: false },
      { id: Date.now()-60000, text: 'Relatório diário pronto para download', time: '1m', read: false }
    ];
    saveNotifs(sample);
  }
  if (!loadMsgs().length) {
    const sample = [
      { id: Date.now()-45000, from: 'Beatriz', text: 'Você pode revisar o pedido?', time: '1m', read: false },
      { id: Date.now()-120000, from: 'Carlos', text: 'Enviei os relatórios.', time: '3m', read: false }
    ];
    saveMsgs(sample);
  }
}

function renderNotifs() {
  const list = loadNotifs();
  const container = document.getElementById('notifList');
  const badge = document.getElementById('notifBadge');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(n => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = `list-group-item list-group-item-action bg-transparent text-white d-flex justify-content-between align-items-start ${n.read ? 'opacity-75' : ''}`;
    a.innerHTML = `<div><div class="small fw-semibold">${n.text}</div><div class="small text-muted">${n.time}</div></div>`;
    a.addEventListener('click', (e) => { e.preventDefault(); n.read = true; saveNotifs(list); renderNotifs(); showToast('Notificação', n.text); });
    container.appendChild(a);
  });
  const unread = list.filter(x => !x.read).length;
  if (badge) { if (unread) badge.classList.remove('d-none'); else badge.classList.add('d-none'); }
}

function renderMsgs() {
  const list = loadMsgs();
  const container = document.getElementById('msgList');
  if (!container) return;
  container.innerHTML = '';
  list.forEach(m => {
    const a = document.createElement('a');
    a.href = '#';
    a.className = `list-group-item list-group-item-action bg-transparent text-white d-flex gap-2 ${m.read ? 'opacity-75' : ''}`;
    a.innerHTML = `<div class="flex-grow-1"><div class="small fw-semibold">${m.from}</div><div class="small text-muted">${m.text}</div></div><div class="small text-muted">${m.time}</div>`;
    a.addEventListener('click', (e) => { e.preventDefault(); m.read = true; saveMsgs(list); renderMsgs(); showToast('Mensagem', `${m.from}: ${m.text}`); });
    container.appendChild(a);
  });
}

function markAllNotifsRead() { const l = loadNotifs(); l.forEach(x=>x.read=true); saveNotifs(l); renderNotifs(); }
function clearNotifs() { saveNotifs([]); renderNotifs(); }
function markAllMsgsRead() { const l = loadMsgs(); l.forEach(x=>x.read=true); saveMsgs(l); renderMsgs(); }
function clearMsgs() { saveMsgs([]); renderMsgs(); }

// wire dropdown buttons after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  try {
    ensureSampleMessages();
    renderNotifs();
    renderMsgs();
    // bind actions
    const markBtn = document.getElementById('markAllRead');
    const clearBtn = document.getElementById('clearNotifs');
    const markMsgs = document.getElementById('markAllMsgRead');
    const clearMsgsBtn = document.getElementById('clearMsgs');
    if (markBtn) markBtn.addEventListener('click', (e) => { e.preventDefault(); markAllNotifsRead(); });
    if (clearBtn) clearBtn.addEventListener('click', (e) => { e.preventDefault(); clearNotifs(); });
    if (markMsgs) markMsgs.addEventListener('click', (e) => { e.preventDefault(); markAllMsgsRead(); });
    if (clearMsgsBtn) clearMsgsBtn.addEventListener('click', (e) => { e.preventDefault(); clearMsgs(); });
    // view all links (just show toast for demo)
    const viewAllNotifs = document.getElementById('viewAllNotifs');
    const viewAllMsgs = document.getElementById('viewAllMsgs');
    if (viewAllNotifs) viewAllNotifs.addEventListener('click', (e) => { e.preventDefault(); showToast('Notificações', 'Página de notificações (não implementada)'); });
    if (viewAllMsgs) viewAllMsgs.addEventListener('click', (e) => { e.preventDefault(); showToast('Mensagens', 'Página de mensagens (não implementada)'); });
  } catch (err) { console.error('Erro inicializando notificações/mensagens:', err); }
});

// --- AUTENTICAÇÃO SIMPLES (FRONT-END) ---
const USERS_KEY = 'admindash_users';
const SESSION_KEY = 'admindash_session';

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch(e) { return []; }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function registerUser({ name, email, password }) {
  const users = loadUsers();
  if (users.find(u => u.email === email)) return { ok: false, message: 'Email já cadastrado' };
  const id = Date.now();
  users.push({ id, name, email, password });
  saveUsers(users);
  return { ok: true, user: { id, name, email } };
}

function loginUser({ email, password }) {
  const users = loadUsers();
  const u = users.find(x => x.email === email && x.password === password);
  if (!u) return { ok: false, message: 'Credenciais inválidas' };
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: u.id, name: u.name, email: u.email }));
  return { ok: true, user: { id: u.id, name: u.name, email: u.email } };
}

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  renderAuthArea();
  showToast('Logout', 'Você saiu da sessão.');
}

function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch(e) { return null; }
}

function renderAuthArea() {
  const authArea = document.getElementById('authArea');
  const offcanvasAuthFooterArea = document.getElementById('offcanvasAuthFooterArea');
  const session = getSession();
  console.debug('renderAuthArea session=', session);
  if (!authArea || !offcanvasAuthFooterArea) return;

  // limpar área
  authArea.innerHTML = '';
  offcanvasAuthFooterArea.innerHTML = '';
  // update sidebar user display if present
  const sidebarName = document.getElementById('sidebarUserName');
  const sidebarText = document.getElementById('sidebarUserText');
  const statusDot = document.getElementById('userStatusDot');
  // offcanvas (mobile) copies
  const offName = document.getElementById('offcanvasUserName');
  const offText = document.getElementById('offcanvasUserText');
  const offDot = document.getElementById('offUserStatusDot');
  const offcanvasAuthBtn = document.getElementById('offcanvasAuthBtn');
  if (sidebarName) sidebarName.textContent = session ? (session.name || 'Usuário') : 'Convidado';
  if (sidebarText) sidebarText.textContent = session ? 'Online' : 'Offline';
  if (statusDot) statusDot.style.background = session ? '#10b981' : '#9ca3af';
  if (offName) offName.textContent = session ? (session.name || 'Usuário') : 'Convidado';
  if (offText) offText.textContent = session ? 'Online' : 'Offline';
  if (offDot) offDot.style.background = session ? '#10b981' : '#9ca3af';

  if (session) {
    // Se logado, o botão do topo do offcanvas não deve abrir o modal
    if (offcanvasAuthBtn) {
      offcanvasAuthBtn.removeAttribute('data-bs-toggle');
      offcanvasAuthBtn.removeAttribute('data-bs-target');
      offcanvasAuthBtn.setAttribute('title', session.name);
    }

    // Função para criar o botão de logout e o nome do usuário
    const createLogoutUI = () => {
      const wrap = document.createElement('div');
      wrap.className = 'd-flex align-items-center';
      const nameSpan = document.createElement('span');
      nameSpan.className = 'me-2 small text-muted';
      nameSpan.textContent = session.name;
      const btnLogout = document.createElement('button');
      btnLogout.className = 'btn btn-sm btn-outline-light';
      btnLogout.type = 'button';
      btnLogout.textContent = 'Sair';
      btnLogout.addEventListener('click', () => logoutUser());
      wrap.appendChild(nameSpan);
      wrap.appendChild(btnLogout);
      return wrap;
    };
    authArea.appendChild(createLogoutUI());
    offcanvasAuthFooterArea.appendChild(createLogoutUI());
    console.debug('renderAuthArea inserted user area (DOM)');
  } else {
    // Se deslogado, o botão do topo do offcanvas deve abrir o modal de login
    if (offcanvasAuthBtn) {
      offcanvasAuthBtn.setAttribute('data-bs-toggle', 'modal');
      offcanvasAuthBtn.setAttribute('data-bs-target', '#authModal');
      offcanvasAuthBtn.setAttribute('title', 'Entrar');
    }


    const btn = document.createElement('button');
    btn.id = 'btnLoginOpen';
    btn.className = 'btn btn-outline-light btn-sm me-2';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Entrar');
    // keep data attributes for Bootstrap if it wires them
    btn.setAttribute('data-bs-toggle', 'modal');
    btn.setAttribute('data-bs-target', '#authModal');
    btn.textContent = 'Entrar';
    // attach robust click to open modal
    btn.addEventListener('click', (e) => {
      try {
        const modalEl = document.getElementById('authModal');
        if (!modalEl) return;
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        modal.show();
      } catch (err) {
        console.error('Erro abrindo modal via btnLoginOpen', err);
      }
    });
    authArea.appendChild(btn);
    offcanvasAuthFooterArea.appendChild(btn.cloneNode(true)); // Clona o botão para o rodapé do offcanvas
    console.debug('renderAuthArea inserted login button (DOM)');
  }
}

function handleForgotPassword(email) {
  const users = loadUsers();
  const u = users.find(x => x.email === email);
  if (!u) { showToast('Erro', 'Email não encontrado.'); return; }
  // Simula envio: apenas mostra toast com instrução
  showToast('Instruções enviadas', `Enviamos instruções para ${email} (simulado).`);
}

// Validações auxiliares
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function passwordStrength(pass) {
  if (!pass || pass.length < 8) return { ok: false, msg: 'Mínimo 8 caracteres' };
  if (!/[0-9]/.test(pass)) return { ok: false, msg: 'Incluir ao menos um número' };
  if (!/[A-Z]/.test(pass)) return { ok: false, msg: 'Incluir ao menos uma letra maiúscula' };
  return { ok: true };
}

function showInlineFeedback(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = message;
  el.style.display = 'block';
}

function clearInlineFeedback(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '';
  el.style.display = 'none';
}

// ligar formulários do modal
document.addEventListener('DOMContentLoaded', () => {
  // Auth rendering
  renderAuthArea();

  const formLogin = document.getElementById('formLogin');
  if (formLogin) formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPassword').value;
    // validações simples
    if (!isValidEmail(email)) { showInlineFeedback('loginFeedback', 'Email inválido'); return; }
    clearInlineFeedback('loginFeedback');
    const res = loginUser({ email, password: pass });
    if (!res.ok) { showToast('Erro', res.message); return; }
    showToast('Bem-vindo', `Olá, ${res.user.name}`);
    renderAuthArea();
    const modalEl = document.getElementById('authModal');
    const modalInst = bootstrap.Modal.getInstance(modalEl);
    if (modalInst) modalInst.hide();
  });

  const formRegister = document.getElementById('formRegister');
  if (formRegister) formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    const passConfirm = document.getElementById('regPasswordConfirm') ? document.getElementById('regPasswordConfirm').value : '';
    // validações:
    if (!isValidEmail(email)) { showInlineFeedback('regEmailFeedback', 'Email inválido'); return; } else { clearInlineFeedback('regEmailFeedback'); }
    const pw = passwordStrength(pass);
    if (!pw.ok) { showInlineFeedback('regPasswordFeedback', pw.msg); return; } else { clearInlineFeedback('regPasswordFeedback'); }
    if (pass !== passConfirm) { showInlineFeedback('regPasswordConfirmFeedback', 'As senhas não coincidem'); return; } else { clearInlineFeedback('regPasswordConfirmFeedback'); }
    const res = registerUser({ name, email, password: pass });
    if (!res.ok) { showToast('Erro', res.message); return; }
    showToast('Cadastro realizado', 'Você pode entrar com suas credenciais.');
    // ir para aba de login
    const loginTab = new bootstrap.Tab(document.querySelector('#tab-login'));
    loginTab.show();
  });

  const formForgot = document.getElementById('formForgot');
  if (formForgot) formForgot.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    if (!isValidEmail(email)) { showInlineFeedback('forgotEmailFeedback', 'Email inválido'); return; } else { clearInlineFeedback('forgotEmailFeedback'); }
    handleForgotPassword(email);
  });
  // limpar feedbacks enquanto digita
  [['regEmail','regEmailFeedback'],['regPassword','regPasswordFeedback'],['regPasswordConfirm','regPasswordConfirmFeedback'],['loginEmail','loginFeedback'],['forgotEmail','forgotEmailFeedback']].forEach(pair => {
    const input = document.getElementById(pair[0]);
    if (!input) return;
    input.addEventListener('input', () => clearInlineFeedback(pair[1]));
  });
});

// Gráfico: Taxa de conversão (scatter) - últimos 7 dias
// Gráfico: Taxa de conversão (linha) - últimos 7 dias
function criarChartConversoes() {
  const canvas = document.getElementById('chartConversoes');
  if (!canvas) return null;
  const dias = ['Seg','Ter','Qua','Qui','Sex','Sab','Dom'];
  const dados = [2.4, 2.7, 3.1, 2.9, 3.3, 3.8, 4.0]; // porcentagem
  // converter para pontos scatter (x = índice, y = valor)
  const pontos = dados.map((v, i) => ({ x: i, y: v }));
  return new Chart(canvas, {
    type: 'scatter',
    data: { datasets: [{ label: 'Taxa de conversão (%)', data: pontos, backgroundColor: '#3b82f6', borderColor: '#3b82f6', pointRadius: 5 }] },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: '#cbd5e1' } } },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: 0,
          max: 6,
          ticks: {
            stepSize: 1,
            callback: function(value) { return dias[value] || ''; },
            color: '#94a3b8'
          },
          grid: { color: 'rgba(255,255,255,0.02)' }
        },
        y: {
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255,255,255,0.02)' },
          beginAtZero: true
        }
      }
    }
  });
}

// Gráfico: Receita por canal (doughnut)
function criarChartReceitaCanal() {
  const ctx = document.getElementById('chartReceitaCanal');
  if (!ctx) return null;
  const labels = ['Orgânico','Paid','Email','Parcerias','Outro'];
  const dados = [42000, 28000, 15000, 9000, 3000];
  const colors = ['#06b6d4','#ef4444','#60a5fa','#f59e0b','#64748b'];
  return new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Receita (R$)', data: dados, backgroundColor: colors }] },
    options: {
      responsive: true,
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(ctx) { const v = ctx.raw || 0; return `R$ ${v.toLocaleString()}`; } } } },
      scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.02)' }, beginAtZero: true } }
    }
  });
}

// Fallback: delegação para garantir que clicar no botão de login abra o modal
document.addEventListener('click', (e) => {
  try {
    const target = e.target;
    if (!target || target.nodeType !== 1) return; // só elementos
    const btn = target.closest('#btnLoginOpen');
    if (btn) {
      const modalEl = document.getElementById('authModal');
      if (!modalEl) return;
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }
  } catch (err) {
    console.error('Erro ao tentar abrir modal de login:', err);
    try { showToast('Erro', 'Não foi possível abrir o modal de login — veja o console.'); } catch(e) { /* ignore */ }
  }
});
