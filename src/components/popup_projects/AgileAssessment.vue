<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'Plataforma de avaliação 360° baseada na Escala Likert para acompanhamento contínuo de desempenho em equipes que utilizam Scrum. Permite a coleta estruturada de feedbacks internos entre membros, facilitando a identificação de pontos de melhoria individuais e coletivos ao longo das sprints.',
    features: [
      'Avaliação 360° com formulários baseados na Escala Likert',
      'Acompanhamento de evolução individual e de equipe por sprint',
      'Feedbacks internos anônimos para redução de viés nas avaliações',
      'Relatórios de desempenho com histórico de evolução ao longo do tempo',
    ],
    captions: [
      { title: 'Formulário de Avaliação', desc: 'Formulário estruturado com critérios baseados na Escala Likert, aplicado ao final de cada sprint da equipe Scrum.' },
      { title: 'Resultados Individuais', desc: 'Histórico de evolução individual com gráficos comparativos entre sprints para acompanhamento da progressão do membro.' },
      { title: 'Feedback Anônimo', desc: 'Mecanismo de feedback anônimo entre membros para redução de viés e maior honestidade nas avaliações periódicas.' },
    ],
  },
  en: {
    desc: '360° assessment platform based on the Likert Scale for continuous performance tracking in teams that use Scrum. It enables structured collection of internal peer feedback, making it easier to spot individual and collective areas for improvement across sprints.',
    features: [
      '360° assessment with Likert Scale-based forms',
      'Individual and team progress tracking per sprint',
      'Anonymous internal feedback to reduce bias in reviews',
      'Performance reports with evolution history over time',
    ],
    captions: [
      { title: 'Assessment Form', desc: 'Structured form with Likert Scale-based criteria, applied at the end of each Scrum team sprint.' },
      { title: 'Individual Results', desc: 'Individual evolution history with comparative charts across sprints to track a member\'s progression.' },
      { title: 'Anonymous Feedback', desc: 'Anonymous peer feedback mechanism to reduce bias and increase honesty in periodic reviews.' },
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
  color: var(--yellow);
}
</style>
