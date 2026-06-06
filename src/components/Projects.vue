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
      <div class="projects-scroll">
        <div class="projects-grid">
          <div
            class="project-card"
            v-for="project in filtered"
            :key="project.title"
            :class="{ featured: project.featured }"
          >
            <div class="card-header">
              <div class="card-status">
                <span class="status-dot" :class="project.status"></span>
                <span class="status-text" :class="project.status">{{ project.status }}</span>
              </div>
              <div class="card-links">
                <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="card-link">demo</a>
                <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer" class="card-link">código</a>
              </div>
            </div>
            <div class="card-icon">{{ project.icon }}</div>
            <h3 class="card-title">{{ project.title }}</h3>
            <p class="card-desc">{{ project.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';

const projects = [
  {
    icon: '🗺️',
    title: 'GeoTrack',
    desc: 'API Rest de visualização de dados geoespaciais com mapas interativos e análises de rotas. Feito em parceria com a empresa ITO1',
    tags: ['Vue.js', 'PostGIS', 'Springboot', 'Java','Oracle','PostgreSQL'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/CSous-a/GeoTrack-4Sem2024Main',
  },
  {
    icon: '📊',
    title: 'BI Taiga',
    desc: 'Plataforma de Business Intelligence integrada ao Taiga para monitoramento de métricas, desempenho de equipes e acompanhamento estratégico de projetos por meio de dashboards interativos.',
    tags: ['Vue.js','Vuetify', 'PostgreSQL','Java','SonarCloud','Docker','SpringBoot','Junit','DataWarehouse'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/QuantumBitBR/API_5SEM',
  },
  {
  icon: '⏪',
  title: 'Agile Assessment',
  desc: 'Plataforma de avaliação 360° baseada na Escala Likert para acompanhamento de desempenho, feedbacks internos e evolução de equipes Scrum.',
  tags: ['Python', 'Flask', 'TinyDB', 'HTML', 'CSS'],
  status: 'offline',
  featured: false,
  demo: null,
  repo: 'https://github.com/CSous-a/AgileAssessment'
},
{
  icon: '🔄',
  title: 'DataFlow',
  desc: 'Plataforma de configuração e gerenciamento de pipelines de dados, permitindo mapeamento de metadados, regras de negócio e análise operacional.',
  tags: ['Java', 'SpringBoot', 'Vue.js', 'JavaScript', 'MySQL', 'HTML', 'CSS'],
  status: 'offline',
  featured: true,
  demo: null,
  repo: 'https://github.com/CSous-a/DataFlow-3Sem2024'
},
  {
    icon: '📝',
    title: 'GeoDoc',
    desc: 'Plataforma de gestão e controle documental para centralização, organização e acompanhamento de documentos digitais em ambiente corporativo.',
    tags: ['Next.js','Docker', 'PostgreSQL','DataWarehouse','SonarCloud','Docker','Springboot','Claude MCP','MDX','typescript'],
    status: 'offline',
    featured: true,
    demo: null,
    repo: 'https://github.com/CSous-a/supdoc',
  },
  {
  icon: '🧠',
  title: 'VisionData',
  desc: 'Plataforma de Business Intelligence para consolidação de tickets de suporte, busca inteligente de soluções recorrentes e geração de insights estratégicos e preditivos.',
  tags: ['Go', 'Nuxt.js', 'Python', 'Elasticsearch', 'MLFlow', 'SQL Server', 'Docker'],
  status: 'offline',
  featured: true,
  demo: '#',
  repo: 'https://github.com/iNineBD/VisionData-6Sem2025Main',
},
];

const categoryMap = {
  Backend:  ['Java', 'SpringBoot', 'Python', 'Rust', 'Go', 'Flask', 'Junit'],
  DevOps:   ['Docker', 'SonarCloud', 'Claude MCP' , 'Linux Server'],
  Database: ['PostgreSQL', 'PostGIS', 'MongoDB', 'MySQL', 'Oracle', 'TinyDB', 'Elasticsearch', 'SQL Server', 'DataWarehouse', 'MLFlow'],
  Frontend: ['Vue.js', 'Vuetify', 'React', 'Next.js', 'Nuxt.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'MDX', 'typescript'],
};

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

const filtered = computed(() => {
  if (activeCategory.value === 'todos') return projects;
  const techs = categoryMap[activeCategory.value];
  if (activeTech.value) return projects.filter(p => p.tags.includes(activeTech.value));
  return projects.filter(p => p.tags.some(t => techs.includes(t)));
});
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tech-bar {
  margin-bottom: 24px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-left: 2px solid var(--green);
  background: rgba(0,255,65,0.02);
}

.tech-btn {
  font-size: 14px;
  padding: 2px 10px;
  opacity: 0.8;
}

.filter-btn {
  font-family: 'VT323', monospace;
  font-size: 16px;
  padding: 4px 14px;
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
  background: rgba(0,255,65,0.05);
}

.projects-scroll {
  max-height: 344px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;
  padding-top: 4px;
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
  gap: 20px;
}

.project-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.2s, transform 0.2s;
  position: relative;
  overflow: hidden;
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
  transform: translateY(-4px);
}

.project-card:hover::before {
  height: 100%;
}

.project-card.featured {
  border-color: rgba(0,255,65,0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px; height: 8px;
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
  font-size: 14px;
}

.status-text.online  { color: var(--green); }
.status-text.offline { color: #ff5f57; }

.card-links {
  display: flex;
  gap: 12px;
}

.card-link {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
}

.card-link:hover {
  color: var(--cyan);
}

.card-icon {
  font-size: 32px;
}

.card-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  color: var(--text);
  line-height: 1.6;
}

.card-desc {
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: var(--text-dim);
  line-height: 1.5;
  flex: 1;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;
}

.badge {
  font-family: 'VT323', monospace;
  font-size: 14px;
  padding: 2px 8px;
  border: 1px solid var(--border);
  color: var(--purple);
  background: rgba(191,90,242,0.05);
}

@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .projects-scroll {
    max-height: 688px;
  }
}

@media (max-width: 580px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .projects-scroll {
    max-height: 344px;
  }
}
</style>
