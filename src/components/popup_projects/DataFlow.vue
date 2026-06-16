<script setup>
const slides = [
  { image: null, title: 'Upload de Arquivos', desc: 'Interface de upload para CSV e Excel com detecção automática da estrutura do arquivo e apresentação dos campos disponíveis.' },
  { image: null, title: 'Mapeamento de Campos', desc: 'Configuração visual de regras "de/para" para mapeamento de campos entre a fonte de dados e o destino do pipeline.' },
  { image: null, title: 'Dashboard Analítico', desc: 'Visualizações quantitativas das configurações de pipeline com exportação das regras definidas em formato YAML.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      DataFlow é um sistema back-end que oferece uma interface para configuração de fontes de dados
      em pipelines de processamento. Resolve o problema de configuração manual que consumia recursos
      técnicos excessivos e criava dependência de especialistas, permitindo upload de arquivos,
      mapeamento de campos e aplicação de regras de negócio sem código.
    </p>
    <ul class="detail-features">
      <li>Upload de arquivos CSV e Excel com apresentação automática da estrutura</li>
      <li>Interface de mapeamento de campos-chave e regras de negócio "de/para"</li>
      <li>Dashboard administrativo com visualizações quantitativas dos dados</li>
      <li>Exportação de configurações de pipeline em formato YAML</li>
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
  color: var(--purple);
}
</style>
