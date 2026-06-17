<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'Tauri Planner é um aplicativo desktop para gestão de projetos por etapas, construído com Tauri (Rust) e Vue. O trabalho é dividido em etapas com peso e status, e o progresso de cada projeto é calculado automaticamente conforme as etapas de maior peso são concluídas. Oferece quadro Kanban com arrastar e soltar, linha do tempo (Gantt) com alertas de prazo, templates reutilizáveis e cadastro de clientes com validação de CPF/CNPJ. O acesso é restrito por perfis (Comum e Administrador), sem autocadastro.',
    features: [
      'Etapas com peso (1–5) e status, com progresso calculado por peso',
      'Quadro Kanban com arrastar e soltar entre colunas e busca por etapa',
      'Linha do tempo (Gantt) com bordas coloridas por prazo (no prazo / atenção / vencido)',
      'Templates reutilizáveis para gerar projetos prontos para planejamento',
      'Clientes com CPF/CNPJ validados e vínculo a projeto e nota fiscal',
      'Controle de acesso por perfis (Comum e Administrador), sem autocadastro',
    ],
    captions: [
      { title: null, desc: null },
      { title: 'Acesso ao sistema', desc: 'Entre com seu usuário e senha. O acesso é restrito: não há autocadastro — as contas são criadas por um administrador. É possível alternar entre tema claro e escuro na própria tela. Na versão de teste, acesse com user: admin, pass: admin.' },
      { title: 'Projetos', desc: 'A tela inicial lista os projetos em andamento. Cada projeto mostra o progresso em porcentagem, calculado pelo peso das etapas concluídas. Clique em um projeto para abri-lo.' },
      { title: 'Etapas e progresso', desc: 'O trabalho é dividido em etapas, cada uma com um peso de 1 a 5 e um status (A fazer, Em andamento ou Concluída). O progresso do projeto avança conforme as etapas de maior peso são concluídas.' },
      { title: 'Quadro Kanban', desc: 'Arraste as etapas entre as colunas (A fazer → Em andamento → Concluída) para mudar o status. Use a busca no topo para encontrar uma etapa pelo nome. A barra mostra o progresso geral.' },
      { title: 'Linha do tempo (Gantt)', desc: 'Planeje início e fim de cada etapa e visualize tudo numa linha do tempo. As etapas ganham uma borda colorida conforme o prazo: verde (no prazo), amarelo (atenção) e vermelho (urgente/vencido).' },
      { title: 'Templates', desc: 'Crie modelos reutilizáveis de etapas e gere novos projetos a partir deles. Ao instanciar um template, todas as etapas são copiadas para o projeto já prontas para o planejamento.' },
      { title: 'Clientes', desc: 'Cadastre clientes com nome, documento (CPF ou CNPJ, validados automaticamente) e e-mail. Um projeto pode ser vinculado a um cliente e a um número de nota fiscal.' },
      { title: 'Projetos concluídos', desc: 'Quando todas as etapas de um projeto ficam concluídas, ele sai da lista de projetos em andamento e vai para a aba Concluídos (disponível ao administrador), onde pode ser buscado por nome, cliente ou nota fiscal.' },
      { title: 'Perfis de acesso', desc: 'Há dois perfis. O Comum acompanha e movimenta etapas (muda status e reordena). O Administrador faz tudo: cria projetos, etapas, templates, clientes e usuários, e edita títulos, pesos e datas.' },
    ],
  },
  en: {
    desc: 'Tauri Planner is a desktop app for step-based project management, built with Tauri (Rust) and Vue. Work is split into steps with a weight and status, and each project\'s progress is calculated automatically as the heaviest steps are completed. It offers a drag-and-drop Kanban board, a timeline (Gantt) with deadline alerts, reusable templates and client registration with CPF/CNPJ validation. Access is restricted by profiles (Standard and Administrator), with no self-registration.',
    features: [
      'Steps with weight (1–5) and status, with progress calculated by weight',
      'Drag-and-drop Kanban board across columns and step search',
      'Timeline (Gantt) with colored borders by deadline (on time / warning / overdue)',
      'Reusable templates to generate projects ready for planning',
      'Clients with validated CPF/CNPJ linked to a project and invoice',
      'Profile-based access control (Standard and Administrator), no self-registration',
    ],
    captions: [
      { title: null, desc: null },
      { title: 'System access', desc: 'Sign in with your username and password. Access is restricted: there is no self-registration — accounts are created by an administrator. You can switch between light and dark themes right on the screen. In the trial version, log in with user: admin, pass: admin.' },
      { title: 'Projects', desc: 'The home screen lists projects in progress. Each project shows progress as a percentage, calculated from the weight of completed steps. Click a project to open it.' },
      { title: 'Steps and progress', desc: 'Work is split into steps, each with a weight from 1 to 5 and a status (To do, In progress or Done). Project progress advances as the heaviest steps are completed.' },
      { title: 'Kanban board', desc: 'Drag steps between columns (To do → In progress → Done) to change their status. Use the search at the top to find a step by name. The bar shows overall progress.' },
      { title: 'Timeline (Gantt)', desc: 'Plan the start and end of each step and view everything on a timeline. Steps get a colored border based on the deadline: green (on time), yellow (warning) and red (urgent/overdue).' },
      { title: 'Templates', desc: 'Create reusable step templates and generate new projects from them. When you instantiate a template, all steps are copied into the project ready for planning.' },
      { title: 'Clients', desc: 'Register clients with a name, document (CPF or CNPJ, validated automatically) and email. A project can be linked to a client and an invoice number.' },
      { title: 'Completed projects', desc: 'When all of a project\'s steps are done, it leaves the in-progress list and moves to the Completed tab (available to the administrator), where it can be searched by name, client or invoice.' },
      { title: 'Access profiles', desc: 'There are two profiles. The Standard one tracks and moves steps (changes status and reorders). The Administrator does everything: creates projects, steps, templates, clients and users, and edits titles, weights and dates.' },
    ],
  },
});

const media = [
  { image: '/tauriplanner/tauri_planner_display.svg', fit: 'contain' },
  { image: '/tauriplanner/login_example.png', fit: 'contain' },
  { image: '/tauriplanner/projetos_example.png', fit: 'contain' },
  { image: '/tauriplanner/steps_example.png', fit: 'contain' },
  { image: '/tauriplanner/kanbam_example.png', fit: 'contain' },
  { image: '/tauriplanner/gantt_example.png', fit: 'contain' },
  { image: '/tauriplanner/templates_example.png', fit: 'contain' },
  { image: '/tauriplanner/cliente_example.png', fit: 'contain' },
  { image: '/tauriplanner/concluido_example.png', fit: 'contain' },
  { image: '/tauriplanner/user_example.png', fit: 'contain' },
];
const slides = computed(() => media.map((m, i) => ({ ...m, ...t.value.captions[i] })));
defineExpose({ slides });
</script>

<template>
  <div class="detail">
    <p class="detail-desc">{{ t.desc }}</p>
    <ul class="detail-features">
      <li v-for="(f, i) in t.features" :key="i">{{ f }}</li>
    </ul>
  </div>
</template>

<style scoped>
.detail { display: flex; flex-direction: column; gap: 1rem; }

.detail-desc {
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  color: var(--text-dim);
  line-height: 1.6;
}

.detail-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.detail-features li {
  font-family: 'VT323', monospace;
  font-size: 1.0625rem;
  color: var(--text);
  padding-left: 1rem;
  position: relative;
  line-height: 1.4;
}

.detail-features li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--cyan);
}
</style>
