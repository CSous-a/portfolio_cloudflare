<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">projetos</h2>
      <div class="filter-bar">
        <button
          v-for="cat in categoryList"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="selectCategory(cat)"
        >{{ cat }}</button>
      </div>
      <div class="filter-bar tech-bar" v-if="activeCategory !== 'todos'">
        <button
          v-for="tech in availableTechs"
          :key="tech"
          class="filter-btn tech-btn"
          :class="{ active: activeTech === tech }"
          @click="activeTech = activeTech === tech ? null : tech"
        >{{ tech }}</button>
      </div>
      <div class="projects-scroll" ref="scrollEl">
        <div class="projects-grid">
          <div
            class="project-card"
            v-for="project in filtered"
            :key="project.title"
            :class="{ featured: project.featured }"
            @click="selectedProject = project"
          >
            <div class="card-header">
              <div class="card-status">
                <span class="status-dot" :class="project.status"></span>
                <span class="status-text" :class="project.status">{{ project.status }}</span>
              </div>
              <div class="card-links">
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="card-link">demo</a>
                <a v-if="project.download" :href="project.download" download class="card-link" @click.stop>download</a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer" class="card-link">código</a>
              </div>
            </div>
            <div class="card-icon">
              <img v-if="isImageIcon(project.icon)" :src="project.icon" :alt="project.title" />
              <template v-else>{{ project.icon }}</template>
            </div>
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-desc">{{ project.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <ProjectModal
    v-if="selectedProject"
    :project="selectedProject"
    @close="selectedProject = null"
  />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import ProjectModal from './popup_projects/ProjectModal.vue';

const projects = [
  {
    id: 'geotrack',
    icon: '🗺️',
    title: 'GeoTrack',
    desc: 'API Rest de visualização de dados geoespaciais com mapas interativos e análises de rotas. Feito em parceria com a empresa ITO1',
    tags: ['Vue.js', 'PostGIS', 'Springboot', 'Java', 'Oracle', 'PostgreSQL'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/CSous-a/GeoTrack-4Sem2024Main',
  },
  {
    id: 'bitaiga',
    icon: '📊',
    title: 'BI Taiga',
    desc: 'Plataforma de Business Intelligence integrada ao Taiga para monitoramento de métricas, desempenho de equipes e acompanhamento estratégico de projetos por meio de dashboards interativos.',
    tags: ['Vue.js', 'Vuetify', 'PostgreSQL', 'Java', 'SonarCloud', 'Docker', 'SpringBoot', 'Junit', 'DataWarehouse'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/QuantumBitBR/API_5SEM',
  },
  {
    id: 'agileassessment',
    icon: '⏪',
    title: 'Agile Assessment',
    desc: 'Plataforma de avaliação 360° baseada na Escala Likert para acompanhamento de desempenho, feedbacks internos e evolução de equipes Scrum.',
    tags: ['Python', 'Flask', 'TinyDB', 'HTML', 'CSS'],
    status: 'offline',
    featured: false,
    demo: null,
    repo: 'https://github.com/CSous-a/AgileAssessment',
  },
  {
    id: 'dataflow',
    icon: '🔄',
    title: 'DataFlow',
    desc: 'Plataforma de configuração e gerenciamento de pipelines de dados, permitindo mapeamento de metadados, regras de negócio e análise operacional.',
    tags: ['Java', 'SpringBoot', 'Vue.js', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/CSous-a/DataFlow-3Sem2024',
  },
  {
    id: 'geodoc',
    icon: '📝',
    title: 'GeoDoc',
    desc: 'Plataforma de gestão e controle documental para centralização, organização e acompanhamento de documentos digitais em ambiente corporativo.',
    tags: ['Next.js', 'Docker', 'PostgreSQL', 'DataWarehouse', 'SonarCloud', 'Springboot', 'Claude MCP', 'MDX', 'typescript'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/CSous-a/supdoc',
  },
  {
    id: 'tauriplanner',
    icon: '/tauriplanner/tauri_planner.svg',
    title: 'Tauri Planner',
    desc: 'Aplicativo desktop para gestão de projetos por etapas com peso e progresso automático, quadro Kanban, linha do tempo (Gantt), templates reutilizáveis e cadastro de clientes com validação de CPF/CNPJ.',
    tags: ['Tauri', 'Rust', 'Vue.js', 'TypeScript', 'PostgreSQL'],
    status: 'online',
    featured: true,
    demo: null,
    download: '/tauriplanner/TauriPlanner_0.1.0_x64-setup.exe',
    repo: 'https://github.com/CSous-a/tauriKanbam',
  },
  {
    id: 'visiondata',
    icon: '🧠',
    title: 'VisionData',
    desc: 'Plataforma de Business Intelligence para consolidação de tickets de suporte, busca inteligente de soluções recorrentes e geração de insights estratégicos e preditivos.',
    tags: ['Go', 'Nuxt.js', 'Python', 'Elasticsearch', 'MLFlow', 'SQL Server', 'Docker'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/iNineBD/VisionData-6Sem2025Main',
  },
];

const categoryMap = {
  Backend:  ['Java', 'SpringBoot', 'Python', 'Rust', 'Go', 'Flask', 'Junit'],
  DevOps:   ['Docker', 'SonarCloud', 'Claude MCP' , 'Linux Server'],
  Database: ['PostgreSQL', 'PostGIS', 'MongoDB', 'MySQL', 'Oracle', 'TinyDB', 'Elasticsearch', 'SQL Server', 'DataWarehouse', 'MLFlow'],
  Frontend: ['Vue.js', 'Vuetify', 'React', 'Next.js', 'Nuxt.js', 'Tauri', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'MDX', 'typescript'],
};

// Ícone pode ser um emoji (texto) ou um caminho de imagem a partir de /public.
function isImageIcon(icon) {
  return typeof icon === 'string' && icon.startsWith('/');
}

const categoryList = ['todos', ...Object.keys(categoryMap)];
const activeCategory = ref('todos');
const activeTech = ref(null);

function selectCategory(cat) {
  activeCategory.value = cat;
  activeTech.value = null;
}

const availableTechs = computed(() => {
  if (activeCategory.value === 'todos') return [];
  return categoryMap[activeCategory.value].filter(tech =>
    projects.some(p => p.tags.includes(tech))
  );
});

// Online primeiro (prioridade visual); empate mantém a ordem original (sort estável).
const onlineFirst = list =>
  [...list].sort((a, b) => (a.status === 'online' ? 0 : 1) - (b.status === 'online' ? 0 : 1));

const filtered = computed(() => {
  if (activeCategory.value === 'todos') return onlineFirst(projects);
  const techs = categoryMap[activeCategory.value];
  if (activeTech.value) return onlineFirst(projects.filter(p => p.tags.includes(activeTech.value)));
  return onlineFirst(projects.filter(p => p.tags.some(t => techs.includes(t))));
});

const selectedProject = ref(null);
const scrollEl = ref(null);

// Ajusta a altura do scroll de projetos para o maior número de fileiras COMPLETAS
// que cabem no espaço disponível — nunca corta uma fileira (e portanto nenhuma
// descrição) pela metade. Quantas fileiras aparecem depende do tamanho da tela.
function applyRowClamp() {
  const el = scrollEl.value;
  if (!el) return;

  // Mobile: sem clamp, a grade flui na altura natural da seção.
  if (!window.matchMedia('(min-width: 769px)').matches) {
    el.style.maxHeight = '';
    return;
  }

  // Mede o espaço vertical reservado (height: 70vh do CSS) sem o clamp aplicado.
  el.style.maxHeight = '';
  const budget = el.clientHeight;

  const grid = el.querySelector('.projects-grid');
  const cards = grid ? Array.from(grid.querySelectorAll('.project-card')) : [];
  if (!grid || !cards.length) return;

  // Posições relativas ao topo da grade (getBoundingClientRect cancela o
  // translate do fullpage, então funciona mesmo com a seção fora de tela).
  const gridTop = grid.getBoundingClientRect().top;

  // Agrupa os cards por fileira e guarda o "fundo" (bottom) de cada fileira,
  // usando o card mais alto da fileira.
  const rowBottoms = [];
  let currentTop = null;
  for (const card of cards) {
    const r = card.getBoundingClientRect();
    const top = r.top - gridTop;
    const bottom = r.bottom - gridTop;
    if (currentTop === null || top > currentTop + 1) {
      rowBottoms.push(bottom);
      currentTop = top;
    } else {
      const last = rowBottoms.length - 1;
      rowBottoms[last] = Math.max(rowBottoms[last], bottom);
    }
  }

  // Maior fileira completa que ainda cabe no budget (mínimo: 1 fileira).
  let fit = rowBottoms[0];
  for (const b of rowBottoms) {
    if (b <= budget + 1) fit = b;
    else break;
  }

  el.style.maxHeight = Math.ceil(fit) + 'px';
}

let resizeRaf = 0;
function onResize() {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(applyRowClamp);
}

onMounted(async () => {
  await nextTick();
  applyRowClamp();
  // Recalcula quando a fonte pixel termina de carregar (muda a altura dos cards).
  window.addEventListener('load', applyRowClamp);
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  window.removeEventListener('load', applyRowClamp);
  window.removeEventListener('resize', onResize);
});

// Refiltrar muda o conjunto/altura dos cards → recalcula após o DOM atualizar.
watch(filtered, async () => {
  await nextTick();
  applyRowClamp();
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.tech-bar {
  margin-bottom: 1.5rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--border);
  border-left: 2px solid var(--green);
  background: color-mix(in srgb, var(--green) 2%, transparent);
}

.tech-btn {
  font-size: 0.875rem;
  padding: 0.125rem 0.625rem;
  opacity: 0.8;
}

.filter-btn {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  padding: 0.25rem 0.875rem;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover,
.filter-btn.active {
  border-color: var(--green);
  color: var(--green);
  background: color-mix(in srgb, var(--green) 5%, transparent);
}

.projects-scroll {
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 0.375rem;
  padding-top: 1px;
  height: 70vh;
  scrollbar-width: thin;
  scrollbar-color: var(--green) var(--bg);
}

.projects-scroll::-webkit-scrollbar {
  width: 4px;
}

.projects-scroll::-webkit-scrollbar-track {
  background: var(--bg);
  border: 1px solid var(--border);
}

.projects-scroll::-webkit-scrollbar-thumb {
  background: var(--green);
  box-shadow: 0 0 6px var(--green);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 3px;
  height: 0;
  background: var(--green);
  transition: height 0.3s;
}

.project-card:hover {
  border-color: var(--border);
  transform: translateY(-0.25rem);
}

.project-card:hover::before {
  height: 100%;
}

.project-card.featured {
  border-color: color-mix(in srgb, var(--green) 20%, transparent);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-status {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.status-dot {
  width: 0.5rem; height: 0.5rem;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.status-dot.online  { background: var(--green); box-shadow: 0 0 6px var(--green); }
.status-dot.offline { background: #ff5f57;      box-shadow: 0 0 6px #ff5f57; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
}

.status-text.online  { color: var(--green); }
.status-text.offline { color: #ff5f57; }

.card-links {
  display: flex;
  gap: 0.75rem;
}

.card-link {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
}

.card-link:hover {
  color: var(--cyan);
}

.card-icon {
  font-size: 2rem;
}

.card-icon img {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  display: block;
}

.card-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.625rem;
  color: var(--text);
  line-height: 1.6;
}

.card-desc {
  font-family: 'VT323', monospace;
  font-size: 1.0625rem;
  color: var(--text-dim);
  line-height: 1.5;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: auto;
}

.badge {
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--border);
  color: var(--purple);
  background: color-mix(in srgb, var(--purple) 5%, transparent);
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: sem scroll interno — a grade flui na altura natural da seção */
@media (max-width: 768px) {
  .projects-scroll {
    height: auto;
    max-height: none !important;
    overflow: visible;
  }
}

@media (max-width: 580px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
