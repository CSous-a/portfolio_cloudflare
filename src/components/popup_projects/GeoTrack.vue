<template>
  <div class="detail">
    <p class="detail-desc">
      GeoTrack é uma solução para gerenciamento automatizado de dados de geolocalização em tempo real
      provenientes de dispositivos IoT — wearables, tags e smartphones. O sistema reduz a dependência
      de técnicos especializados ao automatizar a configuração e o monitoramento operacional,
      garantindo integridade, consistência e segurança dos dados. Desenvolvido em parceria com a empresa ITO1.
    </p>
    <ul class="detail-features">
      <li>Plotagem de rotas e pontos de parada em mapa interativo com zoom e arrastar</li>
      <li>Filtros por pessoa, intervalo de tempo e seções geográficas personalizadas</li>
      <li>Autenticação segura com controle de acesso por credenciais</li>
      <li>Infraestrutura escalável para armazenamento e consulta rápida de dados IoT</li>
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
