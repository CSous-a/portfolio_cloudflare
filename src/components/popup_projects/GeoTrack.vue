<script setup>
const slides = [
  { image: null, title: 'Visão Geral', desc: 'Gerenciamento automatizado de dados de geolocalização em tempo real provenientes de dispositivos IoT — wearables, tags e smartphones.' },
  { image: null, title: 'Mapa Interativo', desc: 'Plotagem de rotas e pontos de parada em mapa interativo com suporte a zoom, arrastar e filtros por pessoa e intervalo de tempo.' },
  { image: null, title: 'Autenticação', desc: 'Sistema de login com controle de acesso por credenciais seguras, garantindo que apenas usuários autorizados acessem os dados operacionais.' },
]
defineExpose({ slides })
</script>

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
