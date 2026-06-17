<script setup>
const slides = [
  { image: '/tauriplanner/tauri_planner_display.svg', fit: 'contain', title: null, desc: null },
  { image: '/tauriplanner/login_example.png', fit: 'contain', title: 'Acesso ao sistema', desc: 'Entre com seu usuário e senha. O acesso é restrito: não há autocadastro — as contas são criadas por um administrador. É possível alternar entre tema claro e escuro na própria tela. Na versão de teste, acesse com user: admin, pass: admin.' },
  { image: '/tauriplanner/projetos_example.png', fit: 'contain', title: 'Projetos', desc: 'A tela inicial lista os projetos em andamento. Cada projeto mostra o progresso em porcentagem, calculado pelo peso das etapas concluídas. Clique em um projeto para abri-lo.' },
  { image: '/tauriplanner/steps_example.png', fit: 'contain', title: 'Etapas e progresso', desc: 'O trabalho é dividido em etapas, cada uma com um peso de 1 a 5 e um status (A fazer, Em andamento ou Concluída). O progresso do projeto avança conforme as etapas de maior peso são concluídas.' },
  { image: '/tauriplanner/kanbam_example.png', fit: 'contain', title: 'Quadro Kanban', desc: 'Arraste as etapas entre as colunas (A fazer → Em andamento → Concluída) para mudar o status. Use a busca no topo para encontrar uma etapa pelo nome. A barra mostra o progresso geral.' },
  { image: '/tauriplanner/gantt_example.png', fit: 'contain', title: 'Linha do tempo (Gantt)', desc: 'Planeje início e fim de cada etapa e visualize tudo numa linha do tempo. As etapas ganham uma borda colorida conforme o prazo: verde (no prazo), amarelo (atenção) e vermelho (urgente/vencido).' },
  { image: '/tauriplanner/templates_example.png', fit: 'contain', title: 'Templates', desc: 'Crie modelos reutilizáveis de etapas e gere novos projetos a partir deles. Ao instanciar um template, todas as etapas são copiadas para o projeto já prontas para o planejamento.' },
  { image: '/tauriplanner/cliente_example.png', fit: 'contain', title: 'Clientes', desc: 'Cadastre clientes com nome, documento (CPF ou CNPJ, validados automaticamente) e e-mail. Um projeto pode ser vinculado a um cliente e a um número de nota fiscal.' },
  { image: '/tauriplanner/concluido_example.png', fit: 'contain', title: 'Projetos concluídos', desc: 'Quando todas as etapas de um projeto ficam concluídas, ele sai da lista de projetos em andamento e vai para a aba Concluídos (disponível ao administrador), onde pode ser buscado por nome, cliente ou nota fiscal.' },
  { image: '/tauriplanner/user_example.png', fit: 'contain', title: 'Perfis de acesso', desc: 'Há dois perfis. O Comum acompanha e movimenta etapas (muda status e reordena). O Administrador faz tudo: cria projetos, etapas, templates, clientes e usuários, e edita títulos, pesos e datas.' },
]
defineExpose({ slides })
</script>

<template>
  <div class="detail">
    <p class="detail-desc">
      Tauri Planner é um aplicativo desktop para gestão de projetos por etapas, construído com Tauri (Rust)
      e Vue. O trabalho é dividido em etapas com peso e status, e o progresso de cada projeto é calculado
      automaticamente conforme as etapas de maior peso são concluídas. Oferece quadro Kanban com arrastar e soltar,
      linha do tempo (Gantt) com alertas de prazo, templates reutilizáveis e cadastro de clientes com validação
      de CPF/CNPJ. O acesso é restrito por perfis (Comum e Administrador), sem autocadastro.
    </p>
    <ul class="detail-features">
      <li>Etapas com peso (1–5) e status, com progresso calculado por peso</li>
      <li>Quadro Kanban com arrastar e soltar entre colunas e busca por etapa</li>
      <li>Linha do tempo (Gantt) com bordas coloridas por prazo (no prazo / atenção / vencido)</li>
      <li>Templates reutilizáveis para gerar projetos prontos para planejamento</li>
      <li>Clientes com CPF/CNPJ validados e vínculo a projeto e nota fiscal</li>
      <li>Controle de acesso por perfis (Comum e Administrador), sem autocadastro</li>
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
  color: var(--cyan);
}
</style>
