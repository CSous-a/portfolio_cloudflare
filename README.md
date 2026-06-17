# Portfólio — Caio Sousa

Portfólio pessoal de desenvolvimento, construído com uma identidade visual **pixel-art / retrô-terminal**. A ideia é fugir do portfólio genérico: em vez de uma lista estática de projetos, o site é uma vitrine interativa onde cada trabalho pode ser explorado a fundo — com print, vídeo, descrição e stack — sem sair da página.

## 🎯 A proposta

Para quem está visitando, o objetivo é simples: **entender rápido quem eu sou e o que eu já construí.**

- **Apresentação direta** — hero, skills, sobre e contato em uma única página de rolagem.
- **Projetos como protagonistas** — cada projeto abre um modal com carrossel de imagens/vídeos, descrição detalhada, tecnologias usadas e links para código, demo ou download.
- **Filtros por área e tecnologia** — dá pra filtrar os projetos por Backend, Frontend, DevOps ou Database e, dentro de cada um, por tecnologia específica (Java, Vue, Docker, etc.).
- **Prioridade de destaque** — projetos no ar (`online`) aparecem antes dos arquivados (`offline`), sinalizando o que está vivo agora.
- **3 temas** — escuro, claro e cyberpunk, alternáveis na hora (com um efeito de _glitch_ na transição pra ficar maneiro).

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
│   ├── layouts/Layout.astro
│   ├── pages/index.astro
│   └── styles/global.css
└── package.json
```

### Como adicionar um projeto

1. Adicione um objeto ao array `projects` em `src/components/Projects.vue` (id, título, ícone, descrição, tags, status e links).
2. Crie o componente de detalhe em `src/components/popup_projects/<Nome>.vue` expondo `slides` (imagens/vídeos do carrossel) e registre-o no `componentMap` de `ProjectModal.vue`.
3. Coloque as mídias em `public/<projeto>/` (uma pasta por projeto).

## 🧞 Comandos

Rodados a partir da raiz do projeto:

| Comando         | Ação                                                |
| :-------------- | :-------------------------------------------------- |
| `pnpm install`  | Instala as dependências                             |
| `pnpm dev`      | Sobe o servidor local em `localhost:4321`           |
| `pnpm build`    | Gera o site de produção em `./dist/`                |
| `pnpm preview`  | Pré-visualiza o build localmente antes do deploy    |
| `pnpm astro ...`| Comandos da CLI do Astro (`astro add`, `astro check`)|
