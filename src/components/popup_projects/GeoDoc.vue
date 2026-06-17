<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'GeoDoc é uma plataforma de gestão e controle documental voltada para ambientes corporativos, centralizando a organização, busca e acompanhamento de documentos digitais. O sistema oferece um fluxo estruturado para criação, revisão e aprovação de documentos com rastreabilidade completa de alterações e histórico de versões.',
    features: [
      'Centralização e organização de documentos digitais corporativos',
      'Fluxo de revisão e aprovação com rastreabilidade de alterações',
      'Versionamento de documentos com histórico completo',
      'Infraestrutura containerizada com pipeline CI/CD automatizado',
    ],
    captions: [
      { title: 'Repositório de Documentos', desc: 'Centralização de documentos corporativos com busca por metadados, categorias e status de aprovação.' },
      { title: 'Fluxo de Aprovação', desc: 'Pipeline de revisão e aprovação com rastreabilidade completa de alterações e notificações automáticas aos responsáveis.' },
      { title: 'Histórico de Versões', desc: 'Versionamento completo com diff entre revisões e possibilidade de restaurar versões anteriores a qualquer momento.' },
    ],
  },
  en: {
    desc: 'GeoDoc is a document management and control platform aimed at corporate environments, centralizing the organization, search and tracking of digital documents. The system offers a structured flow for creating, reviewing and approving documents with full change traceability and version history.',
    features: [
      'Centralization and organization of corporate digital documents',
      'Review and approval flow with change traceability',
      'Document versioning with full history',
      'Containerized infrastructure with an automated CI/CD pipeline',
    ],
    captions: [
      { title: 'Document Repository', desc: 'Centralization of corporate documents with search by metadata, categories and approval status.' },
      { title: 'Approval Flow', desc: 'Review and approval pipeline with full change traceability and automatic notifications to the people responsible.' },
      { title: 'Version History', desc: 'Full versioning with diff between revisions and the ability to restore previous versions at any time.' },
    ],
  },
});

const media = [{ image: null }, { image: null }, { image: null }];
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
  color: var(--green);
}
</style>
