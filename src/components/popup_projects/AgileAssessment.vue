<script setup>
const slides = [
  { image: null, title: 'Formulário de Avaliação', desc: 'Formulário estruturado com critérios baseados na Escala Likert, aplicado ao final de cada sprint da equipe Scrum.' },
  { image: null, title: 'Resultados Individuais', desc: 'Histórico de evolução individual com gráficos comparativos entre sprints para acompanhamento da progressão do membro.' },
  { image: null, title: 'Feedback Anônimo', desc: 'Mecanismo de feedback anônimo entre membros para redução de viés e maior honestidade nas avaliações periódicas.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      Plataforma de avaliação 360° baseada na Escala Likert para acompanhamento contínuo de desempenho
      em equipes que utilizam Scrum. Permite a coleta estruturada de feedbacks internos entre membros,
      facilitando a identificação de pontos de melhoria individuais e coletivos ao longo das sprints.
    </p>
    <ul class="detail-features">
      <li>Avaliação 360° com formulários baseados na Escala Likert</li>
      <li>Acompanhamento de evolução individual e de equipe por sprint</li>
      <li>Feedbacks internos anônimos para redução de viés nas avaliações</li>
      <li>Relatórios de desempenho com histórico de evolução ao longo do tempo</li>
    </ul>
  </div>
</template>

<style scoped>
.detail { display: flex; flex-direction: column; gap: 16px; }

.detail-desc {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--text-dim);
  line-height: 1.6;
}

.detail-features {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail-features li {
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: var(--text);
  padding-left: 16px;
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
