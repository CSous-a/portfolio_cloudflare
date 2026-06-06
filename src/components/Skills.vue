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
                <span class="skill-level">{{ skill.level }}%</span>
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
const groups = [
  {
    name: 'Frontend',
    color: 'green',
    skills: [
      { name: 'Vue.js', level: 70 },
      { name: 'React', level: 50 },
      { name: 'TypeScript', level: 60 },
      { name: 'CSS / Tailwind', level: 65 },
    ],
  },
  {
    name: 'Backend',
    color: 'cyan',
    skills: [
      { name: 'Java', level: 75 },
      { name: 'Python', level: 55 },
      { name: 'Rust', level: 40 },
      { name: 'SpringBoot', level: 75 },
    ],
  },
  {
    name: 'Data & Geo',
    color: 'purple',
    skills: [
      { name: 'PostGIS', level: 75 },
      { name: 'Postgres', level: 95 },
      { name: 'MongoDB', level: 60 },
      { name: 'MySQL', level: 75 },
    ],
  },
  {
    name: 'DevOps',
    color: 'yellow',
    skills: [
      { name: 'Docker', level: 70 },
      { name: 'Git', level: 90 },
      { name: 'Linux Server', level: 80 },
      { name: 'Cloudflare', level: 56 },
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
  gap: 32px;
  margin-bottom: 48px;
}

.group-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 11px;
  color: var(--text-dim);
  margin-bottom: 20px;
}

.group-bracket {
  color: var(--green);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-height: 188px;
  overflow-y: auto;
  padding-right: 6px;
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
  margin-bottom: 6px;
}

.skill-name {
  font-family: 'VT323', monospace;
  font-size: 18px;
  color: var(--text);
}

.skill-level {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--text-dim);
}

.skill-bar {
  height: 8px;
  background: var(--bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  transition: width 1s ease;
}

.skill-fill.green  { background: var(--green);  box-shadow: 0 0 8px rgba(0,255,65,0.5); }
.skill-fill.cyan   { background: var(--cyan);   box-shadow: 0 0 8px rgba(0,229,255,0.5); }
.skill-fill.purple { background: var(--purple); box-shadow: 0 0 8px rgba(191,90,242,0.5); }
.skill-fill.yellow { background: var(--yellow); box-shadow: 0 0 8px rgba(255,214,10,0.5); }

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
  padding-top: 32px;
  border-top: 1px solid var(--border);
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tool-badge {
  font-family: 'VT323', monospace;
  font-size: 16px;
  padding: 4px 12px;
  border: 1px solid var(--border);
  color: var(--text-dim);
  background: var(--bg);
  transition: all 0.2s;
  cursor: default;
}

.tool-badge:hover {
  border-color: var(--cyan);
  color: var(--cyan);
  background: rgba(0,229,255,0.05);
}

@media (max-width: 640px) {
  .skills-layout {
    grid-template-columns: 1fr;
  }
}
</style>
