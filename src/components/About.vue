<template>
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">sobre_mim</h2>
      <div class="about-grid">
        <div class="about-text">
          <div class="terminal-window">
            <div class="terminal-bar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="terminal-title">sobre.txt</span>
            </div>
            <div class="terminal-body">
              <p v-for="(line, i) in lines" :key="i" class="terminal-line">
                <span v-if="line.comment" class="comment">{{ line.text }}</span>
                <span v-else-if="line.key">
                  <span class="key">{{ line.key }}</span>
                  <span class="sep">: </span>
                  <span :class="line.type || 'string'">{{ line.val }}</span>
                </span>
                <span v-else class="plain">{{ line.text }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="about-details">
          <div class="detail-card" v-for="card in cards" :key="card.title">
            <div class="card-icon">{{ card.icon }}</div>
            <div>
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-desc">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const lines = [
  { comment: true, text: '// quem sou eu' },
  { key: 'Nome', val: '"Caio Sousa"' },
  { key: 'Localização', val: '"Brasil"' },
  { key: 'Cargo', val: '"Software Developer"' },
  { text: '' },
  { comment: true, text: '// o que faço' },
  { key: 'Foco', val: '["Web Apps", "APIs", "GeoData","Database","DevOps"]', type: 'array' },
  { key: 'disponível', val: 'true', type: 'bool' },
  { text: '' },
  { comment: true, text: '// idiomas' },
  { key: 'Idiomas', val: '["Inglês - B2", "Português - Nativo"]', type: 'array' },
  { text: '' },
  { comment: true, text: '// fora do teclado' },
  { key: 'Hobbies', val: '["trilhas", "café", "games", "motos"]', type: 'array' },
];

const cards = [
  {
    icon: '⚡',
    title: 'Performance',
    desc: 'Código limpo e rápido, sem gordura. Cada byte importa.',
  },
  {
    icon: '🎨',
    title: 'Design',
    desc: 'Interface que comunica, não apenas existe.',
  },
  {
    icon: '🔧',
    title: 'Engenharia',
    desc: 'Arquitetura sólida para sistemas que crescem.',
  },
  {
    icon: '🌍',
    title: 'Geodados',
    desc: 'Especialidade em serviços geoespaciais e visualização de mapas.',
  },
  {
    icon: '🎲',
    title: 'Banco de dados',
    desc: 'Formação em bancos de dados escalonáveis e ágeis.',
  },
];
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Terminal */
.terminal-window {
  background: var(--bg-card);
  border: 1px solid var(--border);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--bg-card2);
  border-bottom: 1px solid var(--border);
}

.dot {
  width: 10px; height: 10px;
  border-radius: 50%;
}
.dot.red    { background: #ff5f57; }
.dot.yellow { background: #ffd60a; }
.dot.green  { background: #28c840; }

.terminal-title {
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
  margin-left: auto;
  margin-right: auto;
}

.terminal-body {
  padding: 20px;
}

.terminal-line {
  font-family: 'VT323', monospace;
  font-size: 18px;
  line-height: 1.8;
  min-height: 1.8em;
}

.comment { color: #444; }
.key     { color: var(--cyan); }
.sep     { color: var(--text-dim); }
.string  { color: var(--yellow); }
.array   { color: var(--purple); }
.bool    { color: var(--green); }
.plain   { color: var(--text-dim); }

/* Cards */
.about-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.detail-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: border-color 0.2s, transform 0.2s;
}

.detail-card:hover {
  border-color: var(--green);
  transform: translateY(-2px);
}

.card-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.card-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 10px;
  color: var(--text);
  margin-bottom: 6px;
}

.card-desc {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
  line-height: 1.4;
}

@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .about-details {
    grid-template-columns: 1fr;
  }
}
</style>
