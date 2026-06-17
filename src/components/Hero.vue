<template>
  <section id="hero" class="hero section">
    <div class="container">
      <div class="hero-content">
        <p class="hero-greeting">
          <span class="prompt">$</span> {{ t.greeting }}
        </p>
        <h1 class="hero-name">
          <span class="name-line">Caio</span>
          <span class="name-line accent">Sousa</span>
        </h1>
        <div class="hero-role">
          <span class="role-prefix">&gt;&gt;</span>
          <span class="typewriter" ref="typewriterEl">{{ displayedRole }}</span>
          <span class="cursor" :class="{ blink: !typing }">_</span>
        </div>
        <p class="hero-desc">
          {{ t.desc }}
        </p>
        <div class="hero-actions">
          <a href="#projects" class="pixel-btn">{{ t.ctaProjects }}</a>
          <a href="#contact" class="pixel-btn secondary">{{ t.ctaContact }}</a>
        </div>
        <div class="hero-stats">
          <div class="stat" v-for="s in stats" :key="s.label">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
      <div class="hero-visual" aria-hidden="true">
        <div class="pixel-avatar">
          <img src="/hero_avatar.png" alt="Caio Sousa" class="avatar-img" />
        </div>
        <div class="floating-tags">
          <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
    <div class="scroll-hint">
      <span>{{ t.scroll }}</span>
      <span class="arrow">▼</span>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { tr } from '../i18n/locale.js';

const t = tr({
  pt: {
    greeting: 'Software Developer - Backend',
    desc: 'Desenvolvedor apaixonado por construir experiências digitais elegantes, escaláveis e cheias de personalidade.',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Contato',
    scroll: 'rolar',
    roles: [
      'Apaixonado por Java',
      'Arquiteto de APIs REST',
      'Solucionador de Problemas',
      'Adepto de SpringBoot',
      'Amigo do Ágil',
      'Aprendizado Contínuo',
      'Especialista em Banco de Dados',
      'Entusiasta de Rust',
    ],
    stats: [
      { value: '1', label: 'ano de exp.' },
      { value: '5+', label: 'projetos' },
      { value: '∞', label: 'café' },
    ],
  },
  en: {
    greeting: 'Software Developer - Backend',
    desc: 'Developer passionate about building elegant, scalable digital experiences full of personality.',
    ctaProjects: 'View projects',
    ctaContact: 'Contact',
    scroll: 'scroll',
    roles: [
      'In love with Java',
      'REST API Architect',
      'Problem Solver',
      'SpringBoot Adept',
      'Agile Friend',
      'Continuous Learning',
      'Database Specialist',
      'Rust Enthusiast',
    ],
    stats: [
      { value: '1', label: 'year of exp.' },
      { value: '5+', label: 'projects' },
      { value: '∞', label: 'coffee' },
    ],
  },
});

const stats = computed(() => t.value.stats);
const tags = ['Java','Python','Rust','Node','JavaScript','SQL','NOSQL', 'Docker','Git', 'Linux Server'];

const displayedRole = ref('');
const typing = ref(true);
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  const roles = t.value.roles;
  // Idioma pode mudar no meio da digitação — mantém o índice dentro do array.
  if (roleIndex >= roles.length) roleIndex = 0;
  const current = roles[roleIndex];
  if (!deleting) {
    displayedRole.value = current.slice(0, ++charIndex);
    typing.value = true;
    if (charIndex === current.length) {
      deleting = true;
      typing.value = false;
      setTimeout(tick, 1800);
      return;
    }
    setTimeout(tick, 80);
  } else {
    displayedRole.value = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
    setTimeout(tick, 40);
  }
}


onMounted(() => setTimeout(tick, 500));
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 6.25rem;
  position: relative;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-greeting {
  font-family: 'VT323', monospace;
  font-size: 1.375rem;
  color: var(--text-dim);
  margin-bottom: 0.75rem;
}

.prompt {
  color: var(--green);
  margin-right: 0.5rem;
}

.hero-name {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(1.5rem, 4vw, 2.625rem);
  line-height: 1.3;
  margin-bottom: 1.25rem;
}

.name-line {
  display: block;
}

.accent {
  color: var(--green);
  text-shadow: 0 0 20px color-mix(in srgb, var(--green) 40%, transparent);
}

.hero-role {
  font-family: 'VT323', monospace;
  font-size: 1.625rem;
  color: var(--cyan);
  margin-bottom: 1.5rem;
  min-height: 2rem;
}

.role-prefix {
  color: var(--text-dim);
  margin-right: 0.5rem;
}

.cursor {
  color: var(--green);
  font-weight: bold;
}

.cursor.blink {
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero-desc {
  font-family: 'VT323', monospace;
  font-size: 1.25rem;
  color: var(--text-dim);
  max-width: 30rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.hero-stats {
  display: flex;
  gap: 2rem;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-family: 'Press Start 2P', monospace;
  font-size: 1.125rem;
  color: var(--green);
}

.stat-label {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  color: var(--text-dim);
}

/* Pixel avatar */
.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.pixel-avatar {
  border: 2px solid var(--border);
  padding: 0.75rem;
  position: relative;
  background: var(--bg-card);
  display: inline-block;
}

.pixel-avatar::before {
  content: 'avatar.png';
  position: absolute;
  top: -0.75rem;
  left: 0.75rem;
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
  color: var(--text-dim);
  background: var(--bg);
  padding: 0 0.375rem;
}

.avatar-img {
  display: block;
  width: clamp(11.875rem, 16vw, 17rem);
  height: auto;
  filter: grayscale(20%) contrast(1.05);
  transition: filter 0.3s;
}

.pixel-avatar:hover .avatar-img {
  filter: grayscale(0%) contrast(1.1) drop-shadow(0 0 12px color-mix(in srgb, var(--green) 30%, transparent));
}

.floating-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5625rem;
  padding: 0.375rem 0.625rem;
  border: 1px solid var(--border);
  color: var(--text-dim);
  background: var(--bg-card);
  transition: all 0.2s;
}

.tag:hover {
  border-color: var(--green);
  color: var(--green);
  background: color-mix(in srgb, var(--green) 5%, transparent);
}

/* scroll hint */
.scroll-hint {
  position: absolute;
  bottom: calc(var(--footer-h) + 0.6rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
  color: var(--text-dim);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-0.5rem); }
}

@media (max-width: 768px) {
  .hero {
    min-height: 100dvh;
    padding-top: 6rem;
    padding-bottom: 4rem;
  }
  .container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .hero-visual {
    order: -1;
  }
  .avatar-img {
    width: clamp(8rem, 38vw, 11rem);
  }
  .scroll-hint {
    display: none;
  }
}
</style>
