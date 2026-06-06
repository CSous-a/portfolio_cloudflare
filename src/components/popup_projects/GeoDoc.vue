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
  color: var(--green);
}
</style>
