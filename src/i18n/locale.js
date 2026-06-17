import { ref, computed } from 'vue';

// Idioma global do site, compartilhado entre TODAS as ilhas Vue da página.
// Em Astro cada componente client:* é hidratado como um app Vue separado, mas
// todos importam ESTE mesmo módulo (chunk único do Vite), então este `ref` é
// um singleton: mudar o idioma em um lugar re-renderiza todas as ilhas.

const SUPPORTED = ['pt', 'en'];
const STORAGE_KEY = 'lang';

function detectInitial() {
  // O atributo lang do <html> já foi definido antes da pintura pelo inline
  // script do Layout (a partir do localStorage), então é a fonte da verdade.
  if (typeof document !== 'undefined') {
    const l = document.documentElement.lang || '';
    if (l.toLowerCase().startsWith('en')) return 'en';
  }
  return 'pt';
}

export const locale = ref(detectInitial());

export function setLocale(l) {
  if (!SUPPORTED.includes(l) || l === locale.value) return;
  locale.value = l;
  try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
  if (typeof document !== 'undefined') {
    document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR';
  }
}

export function toggleLocale() {
  setLocale(locale.value === 'pt' ? 'en' : 'pt');
}

// Açúcar: recebe { pt, en } e devolve um computed com o valor do idioma ativo.
// No template, refs de topo são desempacotados, então `t.algo` funciona direto.
export function tr(dict) {
  return computed(() => dict[locale.value] ?? dict.pt);
}
