<script setup>
const slides = [
  { image: null, title: 'Repositório de Documentos', desc: 'Centralização de documentos corporativos com busca por metadados, categorias e status de aprovação.' },
  { image: null, title: 'Fluxo de Aprovação', desc: 'Pipeline de revisão e aprovação com rastreabilidade completa de alterações e notificações automáticas aos responsáveis.' },
  { image: null, title: 'Histórico de Versões', desc: 'Versionamento completo com diff entre revisões e possibilidade de restaurar versões anteriores a qualquer momento.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      GeoDoc é uma plataforma de gestão e controle documental voltada para ambientes corporativos,
      centralizando a organização, busca e acompanhamento de documentos digitais. O sistema oferece
      um fluxo estruturado para criação, revisão e aprovação de documentos com rastreabilidade completa
      de alterações e histórico de versões.
    </p>
    <ul class="detail-features">
      <li>Centralização e organização de documentos digitais corporativos</li>
      <li>Fluxo de revisão e aprovação com rastreabilidade de alterações</li>
      <li>Versionamento de documentos com histórico completo</li>
      <li>Infraestrutura containerizada com pipeline CI/CD automatizado</li>
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
