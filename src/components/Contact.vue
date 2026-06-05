<template>
  <section id="contact" class="section contact-section">
    <div class="container">
      <h2 class="section-title">contact</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <p class="contact-intro">
            Pronto para trabalhar juntos? Manda uma mensagem.<br />
            <span class="accent">Respondo rápido.</span>
          </p>
          <div class="contact-links">
            <a
              v-for="link in links"
              :key="link.label"
              :href="link.href"
              target="_blank"
              class="contact-link"
            >
              <span class="link-icon">{{ link.icon }}</span>
              <div>
                <span class="link-label">{{ link.label }}</span>
                <span class="link-val">{{ link.value }}</span>
              </div>
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>

        <form class="contact-form" @submit.prevent="send">
          <div class="form-group">
            <label class="form-label">// nome</label>
            <input
              v-model="form.name"
              class="form-input"
              type="text"
              placeholder="seu nome"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">// email</label>
            <input
              v-model="form.email"
              class="form-input"
              type="email"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">// mensagem</label>
            <textarea
              v-model="form.message"
              class="form-input form-textarea"
              placeholder="Olá, quero conversar sobre..."
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit" class="pixel-btn" :disabled="sending || sent">
            <span v-if="sending">// enviando...</span>
            <span v-else-if="sent">✓ enviado!</span>
            <span v-else>> enviar mensagem</span>
          </button>
          <p v-if="sent" class="success-msg">Mensagem recebida! Falarei em breve.</p>
          <p v-if="error" class="error-msg">Erro ao enviar. Tente novamente ou manda direto pro email.</p>
        </form>
      </div>
    </div>

    <footer class="footer">
      <div class="container footer-inner">
        <span class="footer-logo">
          <span class="bracket">[</span>CS<span class="bracket">]</span>
        </span>
        <span class="footer-text">
          Built with <span class="accent">Astro</span> + <span class="accent">Vue.js</span>
          &nbsp;·&nbsp; {{ new Date().getFullYear() }}
        </span>
        <span class="footer-copy">Feito com ☕ e pixels</span>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue';

const WEB3FORMS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY;

const sending = ref(false);
const sent = ref(false);
const error = ref(false);
const form = reactive({ name: '', email: '', message: '' });

const links = [
  { icon: '📧', label: 'Email', value: 'csousa.profissional@gmail.com', href: 'mailto:cmsousa.profissional@gmail.com' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/CSous-a', href: 'https://github.com/CSous-a' },
  { icon: '💼', label: 'LinkedIn', value: '/in/caio-sousa', href: 'https://linkedin.com/in/caio--sousa' },
];

async function send() {
  sending.value = true;
  error.value = false;
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[Portfólio] Mensagem de ${form.name}`,
        name: form.name,
        email: form.email,
        message: form.message,
      }),
    });
    const data = await res.json();
    if (data.success) {
      sent.value = true;
      Object.assign(form, { name: '', email: '', message: '' });
      setTimeout(() => { sent.value = false; }, 5000);
    } else {
      error.value = true;
    }
  } catch {
    error.value = true;
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
.contact-section {
  border-top: 1px solid var(--border);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: start;
}

.contact-intro {
  font-family: 'VT323', monospace;
  font-size: 22px;
  color: var(--text-dim);
  line-height: 1.6;
  margin-bottom: 32px;
}

.accent {
  color: var(--green);
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  text-decoration: none;
  transition: border-color 0.2s, transform 0.2s;
}

.contact-link:hover {
  border-color: var(--green);
  transform: translateX(4px);
}

.link-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.link-label {
  display: block;
  font-family: 'Press Start 2P', monospace;
  font-size: 9px;
  color: var(--text-dim);
  margin-bottom: 4px;
}

.link-val {
  display: block;
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: var(--text);
}

.link-arrow {
  margin-left: auto;
  color: var(--green);
  font-size: 20px;
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
}

.form-input {
  font-family: 'VT323', monospace;
  font-size: 18px;
  padding: 10px 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.form-input:focus {
  border-color: var(--green);
}

.form-input::placeholder {
  color: var(--text-dim);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.success-msg {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--green);
}

.error-msg {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: #ff4444;
}

/* Footer */
.footer {
  margin-top: 80px;
  padding: 24px 0;
  border-top: 1px solid var(--border);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.footer-logo {
  font-family: 'Press Start 2P', monospace;
  font-size: 14px;
  color: var(--text-dim);
}

.bracket {
  color: var(--green);
}

.footer-text {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--text-dim);
}

.footer-text .accent {
  color: var(--green);
}

.footer-copy {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
