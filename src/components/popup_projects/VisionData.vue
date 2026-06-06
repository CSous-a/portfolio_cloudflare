<script setup>
const slides = [
  { image: '/visionDataLogo.png', fit: 'contain', title: null, desc: null },
  { image: '/visionDataSearch.png', fit:'contain', title: 'Busca Inteligente', desc: 'Busca por palavras-chave em base de conhecimento estruturada com Elasticsearch para localizar soluções de tickets anteriores.' },
  { image: null, title: 'Insights por IA', desc: 'Geração de insights preditivos com MLFlow para identificação de padrões recorrentes e previsão de volume de chamados.' },
  { image: null, title: 'Dashboard de Métricas', desc: 'Visualizações de volume de tickets, tendências e previsões com conformidade à LGPD — anonimização e logs de auditoria.' },
  { image: null, title: 'Controle de Acesso (RBAC)', desc: 'Gestão de permissões por papéis com logs de auditoria completos e mecanismos de exclusão e anonimização de dados pessoais.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      VisionData é um sistema inteligente de gestão do conhecimento desenvolvido em parceria com a Pro4tech,
      que transforma tickets de suporte não estruturados em uma base de conhecimento pesquisável.
      Elimina o ciclo de retrabalho onde colaboradores buscavam repetidamente soluções já encontradas,
      agregando IA para geração de insights preditivos e conformidade com a LGPD.
    </p>
    <ul class="detail-features">
      <li>Busca de tickets por palavras-chave com base de conhecimento estruturada</li>
      <li>Dashboards com métricas, previsões e insights gerados por IA</li>
      <li>Conformidade com LGPD — anonimização, logs de auditoria e exclusão de dados</li>
      <li>Controle de acesso baseado em papéis (RBAC) com gerenciamento de permissões</li>
    </ul>
  </div>
</template>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

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
  color: var(--cyan);
}
</style>
