<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'GeoTrack é uma solução para gerenciamento automatizado de dados de geolocalização em tempo real provenientes de dispositivos IoT — wearables, tags e smartphones. O sistema reduz a dependência de técnicos especializados ao automatizar a configuração e o monitoramento operacional, garantindo integridade, consistência e segurança dos dados. Desenvolvido em parceria com a empresa ITO1.',
    features: [
      'Plotagem de rotas e pontos de parada em mapa interativo com zoom e arrastar',
      'Filtros por pessoa, intervalo de tempo e seções geográficas personalizadas',
      'Autenticação segura com controle de acesso por credenciais',
      'Infraestrutura escalável para armazenamento e consulta rápida de dados IoT',
    ],
    captions: [
      { title: 'Visão Geral', desc: 'Gerenciamento automatizado de dados de geolocalização em tempo real provenientes de dispositivos IoT — wearables, tags e smartphones.' },
      { title: 'Mapa Interativo', desc: 'Plotagem de rotas e pontos de parada em mapa interativo com suporte a zoom, arrastar e filtros por pessoa e intervalo de tempo.' },
      { title: 'Autenticação', desc: 'Sistema de login com controle de acesso por credenciais seguras, garantindo que apenas usuários autorizados acessem os dados operacionais.' },
    ],
  },
  en: {
    desc: 'GeoTrack is a solution for automated management of real-time geolocation data from IoT devices — wearables, tags and smartphones. The system reduces reliance on specialized technicians by automating operational setup and monitoring, ensuring data integrity, consistency and security. Built in partnership with the company ITO1.',
    features: [
      'Plotting of routes and stop points on an interactive map with zoom and pan',
      'Filters by person, time range and custom geographic sections',
      'Secure authentication with credential-based access control',
      'Scalable infrastructure for storing and quickly querying IoT data',
    ],
    captions: [
      { title: 'Overview', desc: 'Automated management of real-time geolocation data from IoT devices — wearables, tags and smartphones.' },
      { title: 'Interactive Map', desc: 'Plotting of routes and stop points on an interactive map with support for zoom, pan and filters by person and time range.' },
      { title: 'Authentication', desc: 'Login system with secure credential-based access control, ensuring only authorized users reach operational data.' },
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
