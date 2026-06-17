<script setup>
import { computed } from 'vue';
import { tr } from '../../i18n/locale.js';

const t = tr({
  pt: {
    desc: 'DataFlow é um sistema back-end que oferece uma interface para configuração de fontes de dados em pipelines de processamento. Resolve o problema de configuração manual que consumia recursos técnicos excessivos e criava dependência de especialistas, permitindo upload de arquivos, mapeamento de campos e aplicação de regras de negócio sem código.',
    features: [
      'Upload de arquivos CSV e Excel com apresentação automática da estrutura',
      'Interface de mapeamento de campos-chave e regras de negócio "de/para"',
      'Dashboard administrativo com visualizações quantitativas dos dados',
      'Exportação de configurações de pipeline em formato YAML',
    ],
    captions: [
      { title: 'Upload de Arquivos', desc: 'Interface de upload para CSV e Excel com detecção automática da estrutura do arquivo e apresentação dos campos disponíveis.' },
      { title: 'Mapeamento de Campos', desc: 'Configuração visual de regras "de/para" para mapeamento de campos entre a fonte de dados e o destino do pipeline.' },
      { title: 'Dashboard Analítico', desc: 'Visualizações quantitativas das configurações de pipeline com exportação das regras definidas em formato YAML.' },
    ],
  },
  en: {
    desc: 'DataFlow is a back-end system that provides an interface for configuring data sources in processing pipelines. It solves the problem of manual configuration that consumed excessive technical resources and created reliance on specialists, allowing file uploads, field mapping and business-rule application without code.',
    features: [
      'CSV and Excel file uploads with automatic structure presentation',
      'Key-field mapping interface and "source/target" business rules',
      'Administrative dashboard with quantitative data visualizations',
      'Export of pipeline configurations in YAML format',
    ],
    captions: [
      { title: 'File Upload', desc: 'Upload interface for CSV and Excel with automatic file-structure detection and presentation of available fields.' },
      { title: 'Field Mapping', desc: 'Visual configuration of "source/target" rules for mapping fields between the data source and the pipeline destination.' },
      { title: 'Analytics Dashboard', desc: 'Quantitative visualizations of pipeline configurations with export of defined rules in YAML format.' },
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
  color: var(--purple);
}
</style>
