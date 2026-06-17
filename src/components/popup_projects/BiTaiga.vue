<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'Stratify é uma aplicação web desenvolvida em parceria com a empresa Youtan que integra a plataforma Taiga para consolidar e exibir indicadores estratégicos sobre o progresso de projetos de software. Resolve o problema de baixa visibilidade no gerenciamento de fluxo de trabalho ao centralizar métricas de desempenho, distribuição de tarefas e acompanhamento de equipes em um único dashboard.',
    features: [
      'Dashboard com métricas de cards por status, período e colaborador',
      'Cálculo de tempo médio de execução e identificação de retrabalhos',
      'Controle de acesso em três níveis — Operador, Gerente e Administrador',
      'Exportação de dados em CSV com conformidade por nível de permissão',
    ],
    captions: [
      { title: 'Dashboard Principal', desc: 'Visão consolidada de métricas de cards por status, distribuição de tarefas e acompanhamento de equipes em tempo real.' },
      { title: 'Gestão de Equipes', desc: 'Acompanhamento de desempenho individual com cálculo de tempo médio de execução e identificação de retrabalhos por colaborador.' },
      { title: 'Controle de Acesso', desc: 'Três níveis de perfil — Operador, Gerente e Administrador — com permissões e visibilidades distintas sobre os dados.' },
      { title: 'Exportação de Dados', desc: 'Geração de relatórios em CSV com filtros por período e conformidade com o nível de permissão do usuário logado.' },
    ],
  },
  en: {
    desc: 'Stratify is a web application built in partnership with the company Youtan that integrates the Taiga platform to consolidate and display strategic indicators on software project progress. It solves the problem of low visibility in workflow management by centralizing performance metrics, task distribution and team tracking in a single dashboard.',
    features: [
      'Dashboard with card metrics by status, period and contributor',
      'Average execution-time calculation and rework identification',
      'Three-level access control — Operator, Manager and Administrator',
      'CSV data export compliant with each permission level',
    ],
    captions: [
      { title: 'Main Dashboard', desc: 'Consolidated view of card metrics by status, task distribution and real-time team tracking.' },
      { title: 'Team Management', desc: 'Individual performance tracking with average execution-time calculation and rework identification per contributor.' },
      { title: 'Access Control', desc: 'Three profile levels — Operator, Manager and Administrator — with distinct permissions and data visibility.' },
      { title: 'Data Export', desc: 'CSV report generation with period filters and compliance with the logged-in user\'s permission level.' },
    ],
  },
});

const media = [{ image: null }, { image: null }, { image: null }, { image: null }];
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
