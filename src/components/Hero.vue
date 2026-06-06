<template>
  <section id="hero" class="hero section">
    <div class="container">
      <div class="hero-content">
        <p class="hero-greeting">
          <span class="prompt">$</span> Jr Developer
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
          Desenvolvedor apaixonado por construir experiências digitais elegantes,
          escaláveis e cheias de personalidade.
        </p>
        <div class="hero-actions">
          <a href="#projects" class="pixel-btn">Ver projetos</a>
          <a href="#contact" class="pixel-btn secondary">Contato</a>
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
      <span>rolar</span>
      <span class="arrow">▼</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const roles = [
  'Apaixonado por Java',
  'Fã de Vue.js',
  'Solucionador de Problemas',
  'Adepto de SpringBoot',
  'Amigo do Ágil',
  'Aprendizado Contínuo',
  'Trabalho em Equipe',
  'Entusiasta de Rust',
];

const stats = [
  { value: '3', label: 'anos de exp.' },
  { value: '5+', label: 'projetos' },
  { value: '∞', label: 'café' },
];

const tags = ['Vue','Javascript','React' ,'Python','Java', 'SQL','NOSQL', 'Docker','Git', 'Rust', 'Linux Server'];

const displayedRole = ref('');
const typing = ref(true);
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
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
  padding-top: 100px;
  position: relative;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-greeting {
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: var(--text-dim);
  margin-bottom: 12px;
}

.prompt {
  color: var(--green);
  margin-right: 8px;
}

.hero-name {
  font-family: 'Press Start 2P', monospace;
  font-size: clamp(24px, 4vw, 42px);
  line-height: 1.3;
  margin-bottom: 20px;
}

.name-line {
  display: block;
}

.accent {
  color: var(--green);
  text-shadow: 0 0 20px rgba(0,255,65,0.4);
}

.hero-role {
  font-family: 'VT323', monospace;
  font-size: 26px;
  color: var(--cyan);
  margin-bottom: 24px;
  min-height: 32px;
}

.role-prefix {
  color: var(--text-dim);
  margin-right: 8px;
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
  font-size: 20px;
  color: var(--text-dim);
  max-width: 480px;
  margin-bottom: 32px;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  gap: 32px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-value {
  font-family: 'Press Start 2P', monospace;
  font-size: 18px;
  color: var(--green);
}

.stat-label {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
}

/* Pixel avatar */
.hero-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.pixel-avatar {
  border: 2px solid var(--border);
  padding: 12px;
  position: relative;
  background: var(--bg-card);
  display: inline-block;
}

.pixel-avatar::before {
  content: 'avatar.png';
  position: absolute;
  top: -12px;
  left: 12px;
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
  background: var(--bg);
  padding: 0 6px;
}

.avatar-img {
  display: block;
  width: 190px;
  height: auto;
  filter: grayscale(20%) contrast(1.05);
  transition: filter 0.3s;
}

.pixel-avatar:hover .avatar-img {
  filter: grayscale(0%) contrast(1.1) drop-shadow(0 0 12px rgba(0,255,65,0.3));
}

.floating-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.tag {
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  padding: 6px 10px;
  border: 1px solid var(--border);
  color: var(--text-dim);
  background: var(--bg-card);
  transition: all 0.2s;
}

.tag:hover {
  border-color: var(--green);
  color: var(--green);
  background: rgba(0,255,65,0.05);
}

/* scroll hint */
.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-8px); }
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
  .hero-visual {
    display: none;
  }
}
</style>
