<template>
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">projects</h2>
      <div class="filter-bar">
        <button
          v-for="tag in allTags"
          :key="tag"
          class="filter-btn"
          :class="{ active: activeTag === tag }"
          @click="activeTag = tag"
        >{{ tag }}</button>
      </div>
      <div class="projects-grid">
        <div
          class="project-card"
          v-for="project in filtered"
          :key="project.title"
          :class="{ featured: project.featured }"
        >
          <div class="card-header">
            <div class="card-status">
              <span class="status-dot"></span>
              <span class="status-text">{{ project.status }}</span>
            </div>
            <div class="card-links">
              <a v-if="project.demo" :href="project.demo" target="_blank" class="card-link">demo</a>
              <a v-if="project.repo" :href="project.repo" target="_blank" class="card-link">code</a>
            </div>
          </div>
          <div class="card-icon">{{ project.icon }}</div>
          <h3 class="card-title">{{ project.title }}</h3>
          <p class="card-desc">{{ project.desc }}</p>
          <div class="card-tags">
            <span class="badge" v-for="t in project.tags" :key="t">{{ t }}</span>
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
    title: 'GeoPixel Dashboard',
    desc: 'Plataforma de visualização de dados geoespaciais com mapas interativos e análises em tempo real.',
    tags: ['Vue.js', 'PostGIS', 'Mapbox', 'Node.js'],
    status: 'live',
    featured: true,
    demo: '#',
    repo: '#',
  },
  {
    icon: '🛒',
    title: 'E-Commerce API',
    desc: 'API REST completa para e-commerce com autenticação JWT, pagamentos e gestão de estoque.',
    tags: ['Node.js', 'PostgreSQL', 'Docker'],
    status: 'live',
    featured: true,
    demo: null,
    repo: '#',
  },
  {
    icon: '🤖',
    title: 'Chat Bot CLI',
    desc: 'Bot de linha de comando integrando Claude API para automação de tarefas repetitivas.',
    tags: ['Python', 'Claude API', 'CLI'],
    status: 'dev',
    featured: false,
    demo: null,
    repo: '#',
  },
  {
    icon: '📊',
    title: 'Analytics SaaS',
    desc: 'Dashboard de métricas em tempo real para pequenas empresas, com relatórios customizáveis.',
    tags: ['Astro', 'Vue.js', 'Supabase'],
    status: 'live',
    featured: false,
    demo: '#',
    repo: null,
  },
  {
    icon: '🎮',
    title: 'Pixel Runner',
    desc: 'Jogo de plataforma 2D feito com canvas puro — sem engines, só criatividade.',
    tags: ['JavaScript', 'Canvas', 'Game'],
    status: 'live',
    featured: false,
    demo: '#',
    repo: '#',
  },
  {
    icon: '📦',
    title: 'Deploy CLI',
    desc: 'Ferramenta CLI para automatizar deploys em VPS com rollback e health-checks.',
    tags: ['Node.js', 'Docker', 'Bash'],
    status: 'dev',
    featured: false,
    demo: null,
    repo: '#',
  },
];

const allTags = ['todos', ...new Set(projects.flatMap(p => p.tags))];
const activeTag = ref('todos');

const filtered = computed(() =>
  activeTag.value === 'todos'
    ? projects
    : projects.filter(p => p.tags.includes(activeTag.value))
);
</script>

<style scoped>
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
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
  background: var(--green);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
}

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
}

@media (max-width: 580px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
