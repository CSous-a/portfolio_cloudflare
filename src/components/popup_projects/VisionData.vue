<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'VisionData é um sistema inteligente de gestão do conhecimento desenvolvido em parceria com a Pro4tech, que transforma tickets de suporte não estruturados em uma base de conhecimento pesquisável. Elimina o ciclo de retrabalho onde colaboradores buscavam repetidamente soluções já encontradas, agregando IA para geração de insights preditivos e conformidade com a LGPD.',
    features: [
      'Busca de tickets por palavras-chave com base de conhecimento estruturada',
      'Dashboards com métricas, previsões e insights gerados por IA',
      'Conformidade com LGPD — anonimização, logs de auditoria e exclusão de dados',
      'Controle de acesso baseado em papéis (RBAC) com gerenciamento de permissões',
    ],
    captions: [
      { title: null, desc: null },
      { title: 'Busca Inteligente', desc: 'Busca por palavras-chave em base de conhecimento estruturada com Elasticsearch para localizar soluções de tickets anteriores.' },
      { title: 'Insights por IA', desc: 'Geração de insights preditivos com MLFlow para identificação de padrões recorrentes e previsão de volume de chamados.' },
      { title: 'Dashboard de Métricas', desc: 'Visualizações de volume de tickets, tendências e previsões com conformidade à LGPD — anonimização e logs de auditoria.' },
      { title: 'Controle de Acesso (RBAC)', desc: 'Gestão de permissões por papéis com logs de auditoria completos e mecanismos de exclusão e anonimização de dados pessoais.' },
    ],
  },
  en: {
    desc: 'VisionData is an intelligent knowledge-management system built in partnership with Pro4tech that turns unstructured support tickets into a searchable knowledge base. It eliminates the rework cycle in which staff repeatedly looked for solutions that had already been found, adding AI for predictive insights and LGPD (Brazilian data protection law) compliance.',
    features: [
      'Keyword ticket search backed by a structured knowledge base',
      'Dashboards with metrics, forecasts and AI-generated insights',
      'LGPD compliance — anonymization, audit logs and data deletion',
      'Role-based access control (RBAC) with permission management',
    ],
    captions: [
      { title: null, desc: null },
      { title: 'Smart Search', desc: 'Keyword search over a structured knowledge base powered by Elasticsearch to find solutions from previous tickets.' },
      { title: 'AI Insights', desc: 'Generation of predictive insights with MLFlow to identify recurring patterns and forecast ticket volume.' },
      { title: 'Metrics Dashboard', desc: 'Visualizations of ticket volume, trends and forecasts with LGPD compliance — anonymization and audit logs.' },
      { title: 'Access Control (RBAC)', desc: 'Role-based permission management with full audit logs and mechanisms for deleting and anonymizing personal data.' },
    ],
  },
});

const media = [
  { image: '/visiondata/visionDataLogo.png', fit: 'contain' },
  { image: '/visiondata/visionDataSearch.png', fit: 'contain' },
  { video: '/visiondata/visionDataMLInsight.mp4', fit: 'contain' },
  { image: '/visiondata/visionDataDashboard.png', fit: 'contain' },
  { video: '/visiondata/visionDataUserMenagement.mp4', fit: 'contain' },
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
.detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

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
