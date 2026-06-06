<script setup>
const slides = [
  { image: null, title: 'Dashboard Principal', desc: 'Visão consolidada de métricas de cards por status, distribuição de tarefas e acompanhamento de equipes em tempo real.' },
  { image: null, title: 'Gestão de Equipes', desc: 'Acompanhamento de desempenho individual com cálculo de tempo médio de execução e identificação de retrabalhos por colaborador.' },
  { image: null, title: 'Controle de Acesso', desc: 'Três níveis de perfil — Operador, Gerente e Administrador — com permissões e visibilidades distintas sobre os dados.' },
  { image: null, title: 'Exportação de Dados', desc: 'Geração de relatórios em CSV com filtros por período e conformidade com o nível de permissão do usuário logado.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      Stratify é uma aplicação web desenvolvida em parceria com a empresa Youtan que integra a plataforma
      Taiga para consolidar e exibir indicadores estratégicos sobre o progresso de projetos de software.
      Resolve o problema de baixa visibilidade no gerenciamento de fluxo de trabalho ao centralizar métricas
      de desempenho, distribuição de tarefas e acompanhamento de equipes em um único dashboard.
    </p>
    <ul class="detail-features">
      <li>Dashboard com métricas de cards por status, período e colaborador</li>
      <li>Cálculo de tempo médio de execução e identificação de retrabalhos</li>
      <li>Controle de acesso em três níveis — Operador, Gerente e Administrador</li>
      <li>Exportação de dados em CSV com conformidade por nível de permissão</li>
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
  color: var(--cyan);
}
</style>
