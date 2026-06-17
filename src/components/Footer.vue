<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">
          <span class="bracket">[</span>CS<span class="bracket">]</span>
        </span>
        <span class="footer-text">
          {{ t.builtWith }} <span class="accent">Astro</span> + <span class="accent">Vue.js</span>
          &nbsp;·&nbsp; {{ year }}
        </span>
      </div>

      <nav class="footer-social" :aria-label="t.contactAria">
        <a
          v-for="item in footerLinks"
          :key="item.label"
          :href="item.href"
          target="_blank"
          rel="noopener noreferrer"
          class="footer-social-link"
          :title="item.label"
        >
          <span class="footer-social-icon">{{ item.icon }}</span>
          <span class="footer-social-label">{{ item.label }}</span>
        </a>
        <!-- 👉 Para adicionar mais métodos de contato, inclua um item em `footerLinks` -->
      </nav>

      <span class="footer-copy">{{ t.copy }}</span>
    </div>
  </footer>
</template>

<script setup>
import { tr } from '../i18n/locale.js';

const t = tr({
  pt: { builtWith: 'Feito com', contactAria: 'Outros métodos de contato', copy: 'Feito com ☕ e pixels' },
  en: { builtWith: 'Built with', contactAria: 'Other contact methods', copy: 'Made with ☕ and pixels' },
});

const year = new Date().getFullYear();

// Métodos de contato rápidos exibidos na faixa do rodapé.
// Adicione novos itens aqui (ex.: WhatsApp, Telegram, X, etc.).
const footerLinks = [
  { icon: '📧', label: 'Email', href: 'mailto:cmsousa.profissional@gmail.com' },
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/CSous-a' },
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/caio--sousa' },
];
</script>

<style scoped>
/* Faixa fixa no rodapé da viewport — acompanha o usuário em todas as seções. */
.site-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 90;
  padding: 0.7rem 0;
  border-top: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-card) 95%, transparent);
  backdrop-filter: blur(8px);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.footer-logo {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.875rem;
  color: var(--text-dim);
}

.bracket {
  color: var(--green);
}

.footer-text {
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  color: var(--text-dim);
}

.accent {
  color: var(--green);
}

/* Métodos de contato rápidos */
.footer-social {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer-social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'VT323', monospace;
  font-size: 1rem;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.footer-social-link:hover {
  border-color: var(--green);
  color: var(--green);
  background: color-mix(in srgb, var(--green) 5%, transparent);
}

.footer-social-icon {
  font-size: 1.05rem;
}

.footer-copy {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  color: var(--text-dim);
}

/* Mobile: scroll nativo → o footer deixa de ser fixo e fica no fim do fluxo. */
@media (max-width: 768px) {
  .site-footer {
    position: static;
    backdrop-filter: none;
    background: var(--bg-card);
    padding: 1.25rem 0;
  }
  .footer-inner {
    justify-content: center;
    text-align: center;
  }
}
</style>
