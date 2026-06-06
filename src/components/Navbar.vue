<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container nav-inner">
      <a href="#hero" class="nav-logo">
        <span class="logo-bracket">[</span>CS<span class="logo-bracket">]</span>
      </a>
      <button class="menu-toggle" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links" :class="{ open: menuOpen }">
        <li v-for="item in links" :key="item.href">
          <a :href="item.href" @click="menuOpen = false">
            <span class="nav-prefix">~/</span>{{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isScrolled = ref(false);
const menuOpen = ref(false);

const links = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#contact', label: 'contact' },
];

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

onMounted(() => window.addEventListener('scroll', handleScroll));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 20px 0;
  transition: background 0.3s, padding 0.3s;
}

.navbar.scrolled {
  background: rgba(13, 13, 13, 0.95);
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(8px);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'Press Start 2P', monospace;
  font-size: 16px;
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
  gap: 32px;
}

.nav-links a {
  font-family: 'VT323', monospace;
  font-size: 20px;
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
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--green);
}

@media (max-width: 640px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: rgba(13,13,13,0.98);
    border-bottom: 1px solid var(--border);
    padding: 16px 0;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    padding: 10px 24px;
  }
}
</style>
