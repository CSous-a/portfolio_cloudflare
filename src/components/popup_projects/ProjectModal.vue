<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true">

        <button class="modal-close" @click="emit('close')">✕</button>

        <div class="modal-grid">

          <!-- Lado esquerdo: carrossel -->
          <div class="modal-left">

            <div class="carousel-stage">
              <div
                v-for="(slide, i) in slides"
                :key="i"
                class="carousel-slide"
                v-show="currentSlide === i"
              >
                <img
                  v-if="slide.image"
                  :src="slide.image"
                  :alt="`${project.title} - ${slide.title}`"
                />
                <div v-else class="placeholder">
                  <span class="placeholder-icon">{{ project.icon }}</span>
                  <span class="placeholder-label">// {{ slide.title.toLowerCase().replace(/ /g, '_') }}.png</span>
                </div>
              </div>
            </div>

            <div class="carousel-nav">
              <button class="nav-btn" @click="prev">◀</button>
              <div class="carousel-dots">
                <span
                  v-for="(_, i) in slides"
                  :key="i"
                  class="carousel-dot"
                  :class="{ active: currentSlide === i }"
                  @click="currentSlide = i"
                />
              </div>
              <button class="nav-btn" @click="next">▶</button>
            </div>

            <div class="slide-caption" v-if="currentSlideData">
              <p class="caption-title">// {{ currentSlideData.title }}</p>
              <p class="caption-desc">{{ currentSlideData.desc }}</p>
            </div>

            <div class="modal-links">
              <a
                v-if="project.demo && project.demo !== '#'"
                :href="project.demo"
                target="_blank"
                rel="noopener noreferrer"
                class="pixel-btn"
              >↗ demo</a>
              <a
                v-if="project.repo"
                :href="project.repo"
                target="_blank"
                rel="noopener noreferrer"
                class="pixel-btn secondary"
              >↗ github</a>
            </div>

          </div>

          <!-- Lado direito: descrição -->
          <div class="modal-right">

            <div class="modal-header">
              <span class="m-icon">{{ project.icon }}</span>
              <div class="m-title-group">
                <h2 class="m-title">{{ project.title }}</h2>
                <span class="m-status" :class="project.status">● {{ project.status }}</span>
              </div>
            </div>

            <div class="m-tags">
              <span class="badge" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
            </div>

            <div class="m-detail">
              <component :is="detailComponent" v-if="detailComponent" />
            </div>

          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, defineAsyncComponent, onMounted, onUnmounted } from 'vue';

const props = defineProps({ project: Object });
const emit = defineEmits(['close']);

const componentMap = {
  geotrack:        defineAsyncComponent(() => import('./GeoTrack.vue')),
  bitaiga:         defineAsyncComponent(() => import('./BiTaiga.vue')),
  agileassessment: defineAsyncComponent(() => import('./AgileAssessment.vue')),
  dataflow:        defineAsyncComponent(() => import('./DataFlow.vue')),
  geodoc:          defineAsyncComponent(() => import('./GeoDoc.vue')),
  visiondata:      defineAsyncComponent(() => import('./VisionData.vue')),
};

const detailComponent = computed(() => componentMap[props.project?.id]);
const slides = computed(() => props.project?.slides ?? []);

const currentSlide = ref(0);
const currentSlideData = computed(() => slides.value[currentSlide.value]);

function prev() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
}
function next() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function onKey(e) {
  if (e.key === 'Escape')     emit('close');
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
}

onMounted(() => {
  document.body.dataset.modalOpen = 'true';
  window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
  delete document.body.dataset.modalOpen;
  window.removeEventListener('keydown', onKey);
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.modal {
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border);
  width: 90%;
  max-width: 960px;
  height: 88vh;
  overflow: hidden;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(24px); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'VT323', monospace;
  font-size: 18px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 10;
  transition: border-color 0.2s, color 0.2s;
}
.modal-close:hover { border-color: var(--green); color: var(--green); }

.modal-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  height: 100%;
}

/* ── Lado esquerdo ── */
.modal-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 24px 32px 32px;
  border-right: 1px solid var(--border);
  overflow: hidden;
}

.carousel-stage {
  aspect-ratio: 4/3;
  flex-shrink: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
}

.carousel-slide {
  width: 100%;
  height: 100%;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: repeating-linear-gradient(
    45deg,
    var(--bg),
    var(--bg) 8px,
    var(--bg-card2) 8px,
    var(--bg-card2) 16px
  );
}

.placeholder-icon  { font-size: 48px; }
.placeholder-label {
  font-family: 'VT323', monospace;
  font-size: 14px;
  color: var(--text-dim);
}

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.nav-btn {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'VT323', monospace;
  font-size: 16px;
  padding: 2px 10px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.nav-btn:hover { border-color: var(--green); color: var(--green); }

.carousel-dots { display: flex; gap: 8px; }

.carousel-dot {
  width: 8px;
  height: 8px;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.carousel-dot.active {
  background: var(--green);
  border-color: var(--green);
}

.slide-caption {
  flex: 1;
  border-top: 1px solid var(--border);
  padding-top: 14px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.caption-title {
  font-family: 'VT323', monospace;
  font-size: 16px;
  color: var(--cyan);
  flex-shrink: 0;
}

.caption-desc {
  font-family: 'VT323', monospace;
  font-size: 17px;
  color: var(--text-dim);
  line-height: 1.5;
}

.modal-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  flex-shrink: 0;
}

/* ── Lado direito ── */
.modal-right {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 40px 32px 28px;
  height: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0;
}

.m-icon { font-size: 36px; }

.m-title-group { display: flex; flex-direction: column; gap: 6px; }

.m-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 12px;
  color: var(--text);
  line-height: 1.5;
}

.m-status {
  font-family: 'VT323', monospace;
  font-size: 16px;
}
.m-status.online  { color: var(--green); }
.m-status.offline { color: #ff5f57; }

.m-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-shrink: 0;
}

.badge {
  font-family: 'VT323', monospace;
  font-size: 14px;
  padding: 2px 8px;
  border: 1px solid var(--border);
  color: var(--purple);
  background: rgba(191, 90, 242, 0.05);
}

.m-detail {
  flex: 1;
  border-top: 1px solid var(--border);
  padding-top: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

@media (max-width: 700px) {
  .modal {
    height: 95vh;
    width: 95%;
  }
  .modal-grid {
    grid-template-columns: 1fr;
    overflow-y: auto;
    height: 100%;
  }
  .modal-left {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 24px;
    overflow: visible;
  }
  .modal-right {
    padding: 24px;
    height: auto;
    overflow: visible;
  }
  .slide-caption, .m-detail { overflow: visible; }
}
</style>
