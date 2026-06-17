<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-inner">
      <a href="#hero" class="nav-logo">
        <span class="logo-bracket">[</span>CS<span class="logo-bracket">]</span>
      </a>

      <div class="nav-controls">
        <ul class="nav-links" :class="{ open: menuOpen }">
          <li v-for="item in links" :key="item.href">
            <a :href="item.href" @click="menuOpen = false">
              <span class="nav-prefix">~/</span>{{ item.label }}
            </a>
          </li>
        </ul>

        <button
          class="lang-toggle"
          :title="t.langTitle"
          :aria-label="t.langTitle"
          @click="toggleLocale"
        >
          <span class="lang-seg" :class="{ active: locale === 'pt' }">PT</span>
          <span class="lang-sep">/</span>
          <span class="lang-seg" :class="{ active: locale === 'en' }">EN</span>
        </button>

        <button
          class="theme-toggle"
          :title="t.themeTitle(currentLabel)"
          :aria-label="t.themeAria(currentLabel)"
          @click="cycleTheme"
        >
          <span class="toggle-track" :class="`is-${theme}`">
            <!-- Lua (escuro) -->
            <svg class="ti ti-moon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>

            <!-- Sol (claro) -->
            <svg class="ti ti-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none" />
              <line x1="12" y1="1.5" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="22.5" />
              <line x1="1.5" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="22.5" y2="12" />
              <line x1="4.4" y1="4.4" x2="6.1" y2="6.1" />
              <line x1="17.9" y1="17.9" x2="19.6" y2="19.6" />
              <line x1="19.6" y1="4.4" x2="17.9" y2="6.1" />
              <line x1="6.1" y1="17.9" x2="4.4" y2="19.6" />
            </svg>

            <!-- Samurai/Oni (cyberpunk) -->
            <img class="ti ti-samurai" src="/samurai.svg" alt="" aria-hidden="true" />
          </span>
        </button>

        <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <Teleport to="body">
    <div class="glitch-overlay" :class="{ active: glitching }" aria-hidden="true"></div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { locale, toggleLocale, tr } from '../i18n/locale.js';

const isScrolled = ref(false);
const menuOpen = ref(false);

const t = tr({
  pt: {
    links: [
      { href: '#about', label: 'sobre' },
      { href: '#skills', label: 'skills' },
      { href: '#projects', label: 'projetos' },
      { href: '#contact', label: 'contato' },
    ],
    langTitle: 'Mudar idioma (Português / English)',
    themeLabels: { dark: 'escuro', light: 'claro', cyberpunk: 'cyberpunk' },
    themeTitle: (l) => `Tema: ${l} — clique para alternar`,
    themeAria: (l) => `Tema atual: ${l}. Clique para alternar.`,
  },
  en: {
    links: [
      { href: '#about', label: 'about' },
      { href: '#skills', label: 'skills' },
      { href: '#projects', label: 'projects' },
      { href: '#contact', label: 'contact' },
    ],
    langTitle: 'Switch language (Português / English)',
    themeLabels: { dark: 'dark', light: 'light', cyberpunk: 'cyberpunk' },
    themeTitle: (l) => `Theme: ${l} — click to cycle`,
    themeAria: (l) => `Current theme: ${l}. Click to cycle.`,
  },
});

const links = computed(() => t.value.links);

const themeOrder = ['dark', 'light', 'cyberpunk'];
const theme = ref('dark');
const currentLabel = computed(() => t.value.themeLabels[theme.value] ?? theme.value);

function applyTheme(t) {
  if (t === 'dark') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = t;
}

function setTheme(t) {
  theme.value = t;
  applyTheme(t);
  try { localStorage.setItem('theme', t); } catch (e) {}
}

const glitching = ref(false);
let glitchTimer;

function triggerGlitch() {
  const html = document.documentElement;
  glitching.value = false;
  html.classList.remove('theme-glitching');
  // Reinicia a animação no próximo frame (permite reativar mesmo se já estava ativa)
  requestAnimationFrame(() => {
    glitching.value = true;
    html.classList.add('theme-glitching');
    clearTimeout(glitchTimer);
    glitchTimer = setTimeout(() => {
      glitching.value = false;
      html.classList.remove('theme-glitching');
    }, 700);
  });
}

function cycleTheme() {
  const i = themeOrder.indexOf(theme.value);
  const next = themeOrder[(i + 1) % themeOrder.length];
  // Glitch ao ENTRAR ou SAIR do cyberpunk
  if (theme.value === 'cyberpunk' || next === 'cyberpunk') triggerGlitch();
  setTheme(next);
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => {
  theme.value = document.documentElement.dataset.theme || 'dark';
  window.addEventListener('scroll', handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(glitchTimer);
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.25rem 0;
  transition: background 0.3s, padding 0.3s;
}

.navbar.scrolled {
  background: color-mix(in srgb, var(--bg) 95%, transparent);
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-controls {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}

/* Seletor de idioma — pílula PT / EN ao lado do tema */
.lang-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  flex-shrink: 0;
  height: 2.25rem;
  padding: 0 0.6rem;
  border: 1px solid var(--border);
  border-radius: 1.125rem;
  background: var(--bg-card);
  cursor: pointer;
  font-family: 'Press Start 2P', monospace;
  font-size: 0.5rem;
  letter-spacing: 0.5px;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.3s;
}

.lang-toggle:hover {
  border-color: var(--green);
  transform: translateY(-1px);
  box-shadow: 0 0 10px color-mix(in srgb, var(--green) 25%, transparent);
}

.lang-seg {
  color: var(--text-dim);
  transition: color 0.2s, text-shadow 0.2s;
}

.lang-seg.active {
  color: var(--green);
  text-shadow: 0 0 8px color-mix(in srgb, var(--green) 50%, transparent);
}

.lang-sep {
  color: var(--border);
}

/* Seletor de temas — botão circular único que cicla dark → light → cyberpunk */
.theme-toggle {
  position: relative;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--bg-card);
  cursor: pointer;
  display: grid;
  place-items: center;
  overflow: hidden;
  transition: border-color 0.2s, transform 0.2s, box-shadow 0.3s;
}

.theme-toggle:hover {
  border-color: var(--green);
  transform: translateY(-1px) rotate(8deg);
  box-shadow: 0 0 10px color-mix(in srgb, var(--green) 25%, transparent);
}

.toggle-track {
  position: relative;
  width: 1.3rem;
  height: 1.3rem;
}

.ti {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transform: scale(0.2) rotate(-160deg);
  transition: opacity 0.4s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Mostra só o ícone do tema ativo (os outros giram/encolhem pra fora) */
.toggle-track.is-dark .ti-moon,
.toggle-track.is-light .ti-sun,
.toggle-track.is-cyberpunk .ti-samurai {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.ti-moon    { color: var(--cyan); }
.ti-sun     { color: var(--yellow); }

/* ── Glitch de transição (ao entrar/sair do cyberpunk) ── */
.glitch-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0;
}

.glitch-overlay.active {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  mix-blend-mode: overlay;
  animation: glitch-flicker 0.7s steps(2, end) forwards,
             glitch-noise 0.7s steps(5, end) forwards;
}

.glitch-overlay.active::before,
.glitch-overlay.active::after {
  content: '';
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
}

.glitch-overlay.active::before {
  background:
    repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 2px,
      rgba(0, 0, 0, 0.35) 2px,
      rgba(0, 0, 0, 0.35) 3px
    ),
    color-mix(in srgb, var(--cyan) 70%, transparent);
  animation: glitch-slice-1 0.7s steps(6, end) forwards;
}

.glitch-overlay.active::after {
  background: color-mix(in srgb, var(--pink) 70%, transparent);
  animation: glitch-slice-2 0.7s steps(6, end) forwards;
}

@keyframes glitch-flicker {
  0%   { opacity: 0; }
  5%   { opacity: 1; }
  25%  { opacity: 0.4; }
  35%  { opacity: 1; }
  55%  { opacity: 0.7; }
  70%  { opacity: 1; }
  85%  { opacity: 0.5; }
  100% { opacity: 0; }
}

@keyframes glitch-noise {
  0%   { background-position: 0 0; }
  25%  { background-position: -60px 30px; }
  50%  { background-position: 40px -50px; }
  75%  { background-position: -30px -20px; }
  100% { background-position: 50px 40px; }
}

@keyframes glitch-slice-1 {
  0%   { clip-path: inset(8% 0 78% 0);  transform: translateX(-12px) scaleX(1.02); }
  20%  { clip-path: inset(62% 0 22% 0); transform: translateX(9px); }
  40%  { clip-path: inset(33% 0 52% 0); transform: translateX(-6px); }
  55%  { clip-path: inset(88% 0 2% 0);  transform: translateX(14px) scaleX(1.04); }
  70%  { clip-path: inset(20% 0 66% 0); transform: translateX(-10px); }
  85%  { clip-path: inset(46% 0 39% 0); transform: translateX(7px); }
  100% { clip-path: inset(0 0 100% 0);  transform: translateX(0); }
}

@keyframes glitch-slice-2 {
  0%   { clip-path: inset(70% 0 14% 0); transform: translateX(11px); }
  20%  { clip-path: inset(20% 0 66% 0); transform: translateX(-11px); }
  40%  { clip-path: inset(50% 0 36% 0); transform: translateX(8px); }
  55%  { clip-path: inset(4% 0 88% 0);  transform: translateX(-14px) scaleX(1.03); }
  70%  { clip-path: inset(78% 0 8% 0);  transform: translateX(12px); }
  85%  { clip-path: inset(38% 0 47% 0); transform: translateX(-7px); }
  100% { clip-path: inset(100% 0 0 0);  transform: translateX(0); }
}

/* Acessibilidade: sem animação agressiva pra quem prefere movimento reduzido */
@media (prefers-reduced-motion: reduce) {
  .glitch-overlay.active,
  .glitch-overlay.active::before,
  .glitch-overlay.active::after {
    animation: none;
  }
}

.nav-logo {
  font-family: 'Press Start 2P', monospace;
  font-size: 1rem;
  color: var(--text);
  text-decoration: none;
  letter-spacing: 2px;
}

.logo-bracket {
  color: var(--green);
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-links a {
  font-family: 'VT323', monospace;
  font-size: 1.25rem;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
  letter-spacing: 1px;
}

.nav-links a:hover {
  color: var(--green);
}

.nav-prefix {
  color: var(--green);
  opacity: 0.6;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 0.3125rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.menu-toggle span {
  display: block;
  width: 1.375rem;
  height: 2px;
  background: var(--green);
}

@media (max-width: 640px) {
  .menu-toggle {
    display: flex;
  }

  .nav-controls {
    gap: 0.85rem;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: color-mix(in srgb, var(--bg) 98%, transparent);
    border-bottom: 1px solid var(--border);
    padding: 1rem 0;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    padding: 0.625rem 1.5rem;
  }
}
</style>
