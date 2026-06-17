<template>
  <section id="skills" class="section skills-section">
    <div class="container">
      <h2 class="section-title">skills.json</h2>
      <div class="skills-layout">
        <div class="skill-group" v-for="group in groups" :key="group.name">
          <h3 class="group-title">
            <span class="group-bracket">[</span>
            {{ group.name }}
            <span class="group-bracket">]</span>
          </h3>
          <div class="skill-list" :style="{ '--group-color': `var(--${group.color})` }">
            <div class="skill-item" v-for="skill in group.skills" :key="skill.name">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ levelLabel(skill.level) }}</span>
              </div>
              <div class="skill-bar">
                <div class="skill-fill" :style="{ width: skill.level + '%' }"
                  :class="group.color"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { tr } from '../i18n/locale.js';

const t = tr({
  pt: { levels: ['Iniciante', 'Aprendiz', 'Intermediário', 'Avançado', 'Experiente', 'Especialista'] },
  en: { levels: ['Beginner', 'Apprentice', 'Intermediate', 'Advanced', 'Proficient', 'Specialist'] },
});

function levelLabel(level) {
  const L = t.value.levels;
  if (level <= 30) return L[0];
  if (level <= 50) return L[1];
  if (level <= 65) return L[2];
  if (level <= 80) return L[3];
  if (level <= 95) return L[4];
  return L[5];
}

const groups = [
  {
    name: 'Backend',
    color: 'cyan',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'SpringBoot', level: 75 },
      { name: 'Python', level: 55 },
      { name: 'Rust', level: 40 },
    ],
  },
  {
    name: 'Data & Geo',
    color: 'purple',
    skills: [
      { name: 'Postgres', level: 95 },
      { name: 'PostGIS', level: 75 },
      { name: 'MySQL', level: 75 },
      { name: 'MongoDB', level: 60 },
    ],
  },
  {
    name: 'DevOps',
    color: 'yellow',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Linux Server', level: 80 },
      { name: 'Docker', level: 70 },
      { name: 'Cloudflare', level: 56 },
    ],
  },
  {
    name: 'Frontend',
    color: 'green',
    skills: [
      { name: 'Vue.js', level: 70 },
      { name: 'TypeScript', level: 60 },
      { name: 'CSS / Tailwind', level: 65 },
      { name: 'React', level: 50 },
    ],
  },
];


</script>

<style scoped>
.skills-section {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.skills-layout {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.group-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.6875rem;
  color: var(--text-dim);
  margin-bottom: 1.25rem;
}

.group-bracket {
  color: var(--green);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-height: 11.75rem;
  overflow-y: auto;
  padding-right: 0.375rem;
  scrollbar-width: thin;
  scrollbar-color: var(--group-color) var(--bg);
}

.skill-list::-webkit-scrollbar {
  width: 4px;
}

.skill-list::-webkit-scrollbar-track {
  background: var(--bg);
  border: 1px solid var(--border);
}

.skill-list::-webkit-scrollbar-thumb {
  background: var(--group-color);
  box-shadow: 0 0 6px var(--group-color);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.375rem;
}

.skill-name {
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  color: var(--text);
}

.skill-level {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  color: var(--text-dim);
}

.skill-bar {
  height: 0.5rem;
  background: var(--bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  transition: width 1s ease;
}

.skill-fill.green  { background: var(--green);  box-shadow: 0 0 8px color-mix(in srgb, var(--green) 50%, transparent); }
.skill-fill.cyan   { background: var(--cyan);   box-shadow: 0 0 8px color-mix(in srgb, var(--cyan) 50%, transparent); }
.skill-fill.purple { background: var(--purple); box-shadow: 0 0 8px color-mix(in srgb, var(--purple) 50%, transparent); }
.skill-fill.yellow { background: var(--yellow); box-shadow: 0 0 8px color-mix(in srgb, var(--yellow) 50%, transparent); }

/* pixelated bar segments */
.skill-fill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 6px,
    rgba(0,0,0,0.3) 6px,
    rgba(0,0,0,0.3) 8px
  );
}

/* Tools */
.tools-section {
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
}

.tool-badge {
  font-family: 'VT323', monospace;
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border: 1px solid var(--border);
  color: var(--text-dim);
  background: var(--bg);
  transition: all 0.2s;
  cursor: default;
}

.tool-badge:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background: color-mix(in srgb, var(--cyan) 5%, transparent);
}

@media (max-width: 640px) {
  .skills-layout {
    grid-template-columns: 1fr;
  }
}
</style>
