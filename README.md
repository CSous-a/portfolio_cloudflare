# Portfólio — Caio Sousa

Portfólio pessoal de desenvolvimento, construído com uma identidade visual **pixel-art / retrô-terminal**. A ideia é fugir do portfólio genérico: em vez de uma lista estática de projetos, o site é uma vitrine interativa onde cada trabalho pode ser explorado a fundo — com print, vídeo, descrição e stack — sem sair da página.

## 🎯 A proposta

Para quem está visitando, o objetivo é simples: **entender rápido quem eu sou e o que eu já construí.**

- **Apresentação direta** — hero, skills, sobre e contato em uma única página de rolagem.
- **Projetos como protagonistas** — cada projeto abre um modal com carrossel de imagens/vídeos, descrição detalhada, tecnologias usadas e links para código, demo ou download.
- **Filtros por área e tecnologia** — dá pra filtrar os projetos por Backend, Frontend, DevOps ou Database e, dentro de cada um, por tecnologia específica (Java, Vue, Docker, etc.).
- **Prioridade de destaque** — projetos no ar (`online`) aparecem antes dos arquivados (`offline`), sinalizando o que está vivo agora.
- **3 temas** — escuro, claro e cyberpunk, alternáveis na hora (com um efeito de _glitch_ na transição pra ficar maneiro).
- **Bilíngue (PT/EN)** — todo o conteúdo do site tem tradução nativa, alternável na hora por um botão `PT / EN` ao lado do seletor de tema.

Tudo pensado para ser leve, responsivo e funcionar bem tanto no desktop (com rolagem full-page) quanto no mobile.

## 🛠️ Tecnologias

- **[Astro](https://astro.build)** — framework do site (geração estática, zero JS por padrão).
- **[Vue 3](https://vuejs.org)** — componentes interativos (cards de projeto, modais, filtros, troca de tema).
- **CSS puro** com variáveis de tema (sem framework de UI) — fontes pixel `Press Start 2P` e `VT323`.
- **pnpm** — gerenciador de pacotes.
- Deploy pensado para **Cloudflare**, utilizando vps pessoal para hospedagem de projetos e portfólio.

## 📁 Estrutura

```text
/
├── public/                  # assets estáticos (imagens, vídeos, instaladores)
│   ├── tauriplanner/         # mídia de cada projeto, separada por pasta
│   └── visiondata/
├── src/
│   ├── components/
│   │   ├── Hero.vue / Navbar.vue / Skills.vue / About.vue / Contact.vue / Footer.vue
│   │   ├── Projects.vue      # grade de projetos, filtros e ordenação
│   │   └── popup_projects/   # um componente de detalhe por projeto + o ProjectModal
│   ├── i18n/locale.js        # idioma global (PT/EN) + helper de tradução tr()
│   ├── layouts/Layout.astro
│   ├── pages/index.astro
│   └── styles/global.css
└── package.json
```

### Como adicionar um projeto

1. Adicione um objeto ao array `baseProjects` em `src/components/Projects.vue` com os campos neutros de idioma (id, título, ícone, tags, status e links) e registre a descrição curta do card no objeto `descriptions` (`pt` **e** `en`), usando o mesmo `id` como chave.
2. Crie o componente de detalhe em `src/components/popup_projects/<Nome>.vue` e registre-o no `componentMap` de `ProjectModal.vue`. As mídias do carrossel ficam num array neutro (`media`: image/video/fit) e os textos (`desc`, `features` e as legendas de cada slide) em `tr({ pt, en })`; o `slides` exposto é o computed que junta os dois (veja a seção de Internacionalização).
3. Coloque as mídias em `public/<projeto>/` (uma pasta por projeto).

## 🌐 Internacionalização (PT/EN)

O site tem tradução nativa, alternável na hora sem recarregar a página. O idioma é PT por padrão.

### Como funciona

- **Estado global** — o idioma vive num único `ref` reativo em `src/i18n/locale.js`. Em Astro cada componente `client:*` é hidratado como um app Vue separado, mas todos importam esse **mesmo módulo** (chunk único), então o `ref` é um singleton: trocar o idioma em um lugar re-renderiza **todas** as seções de uma vez.
- **Persistência e sem _flash_** — a escolha é salva no `localStorage` (`lang`) e o atributo `<html lang>` é definido **antes da pintura** por um inline script no `Layout.astro` (mesma estratégia do tema), evitando o flash de idioma errado no carregamento.
- **Botão** — fica no `Navbar`, ao lado do seletor de tema (`PT / EN`).

### Helpers de `locale.js`

| Export          | O que faz                                                            |
| :-------------- | :------------------------------------------------------------------- |
| `locale`        | `ref` com o idioma ativo (`'pt'` ou `'en'`).                         |
| `setLocale(l)`  | Define o idioma, persiste no `localStorage` e atualiza `<html lang>`.|
| `toggleLocale()`| Alterna entre PT e EN (usado pelo botão).                            |
| `tr({ pt, en })`| Devolve um `computed` com o conteúdo do idioma ativo.                |

### Como traduzir texto novo

**Nunca** deixe texto fixo (hardcoded) no template. Embrulhe o conteúdo em `tr({ pt, en })` e referencie no template — refs de topo são desempacotados automaticamente, então `t.chave` funciona direto:

```vue
<script setup>
import { tr } from '../i18n/locale.js'; // '../../i18n/...' dentro de popup_projects/

const t = tr({
  pt: { titulo: 'Olá', botao: 'Enviar' },
  en: { titulo: 'Hello', botao: 'Send' },
});
</script>

<template>
  <h2>{{ t.titulo }}</h2>
  <button>{{ t.botao }}</button>
</template>
```

Notas:

- O conteúdo fica **co-localizado** em cada componente (não há arquivo central de traduções).
- Em **código** (fora do template) acesse via `.value`, ex.: `t.value.titulo`.
- Listas e objetos podem ir dentro do `tr` normalmente (ex.: `roles`, `cards`, `features`). Para misturar texto traduzido com dados neutros (como a mídia dos modais), mantenha o dado neutro num array à parte e una com um `computed`.
- Termos universais (nomes de tecnologias, status `online`/`offline`, categorias técnicas) são mantidos iguais nos dois idiomas de propósito.
- Componentes que precisam reagir à troca de idioma devem ser hidratados (`client:load`) — foi por isso que o `Footer` passou a ter `client:load`.

## 🧞 Comandos

Rodados a partir da raiz do projeto:

| Comando         | Ação                                                |
| :-------------- | :-------------------------------------------------- |
| `pnpm install`  | Instala as dependências                             |
| `pnpm dev`      | Sobe o servidor local em `localhost:4321`           |
| `pnpm build`    | Gera o site de produção em `./dist/`                |
| `pnpm preview`  | Pré-visualiza o build localmente antes do deploy    |
| `pnpm astro ...`| Comandos da CLI do Astro (`astro add`, `astro check`)|
