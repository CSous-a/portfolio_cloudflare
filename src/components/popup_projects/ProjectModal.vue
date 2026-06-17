<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="emit('close')">
      <div class="modal" role="dialog" aria-modal="true">

        <button class="modal-close" @click="emit('close')">✕</button>

        <div class="modal-grid">

          <!-- Lado esquerdo: carrossel + tags + links -->
          <div class="modal-left">

            <div class="carousel-stage" @click="openFullscreen">
              <div
                v-for="(slide, i) in slides"
                :key="i"
                class="carousel-slide"
                v-show="currentSlide === i"
              >
                <video
                  v-if="slide.video"
                  :src="slide.video"
                  :ref="el => { if (el) videoRefs[i] = el }"
                  :style="{ objectFit: slide.fit ?? 'cover' }"
                  muted
                  loop
                  playsinline
                  autoplay
                  controls
                  @click.stop
                />
                <img
                  v-else-if="slide.image"
                  :src="slide.image"
                  :alt="`${project.title} - ${slide.title}`"
                  :style="{
                    objectFit: slide.fit ?? 'cover',
                    background: slide.bg ?? 'transparent',
                    padding: slide.fit === 'contain' ? '16px' : '0'
                  }"
                />
                <div v-else class="placeholder">
                  <span class="placeholder-icon">
                    <img v-if="iconIsImage" :src="project.icon" :alt="project.title" />
                    <template v-else>{{ project.icon }}</template>
                  </span>
                  <span class="placeholder-label">// {{ slide.title ? slide.title.toLowerCase().replace(/ /g, '_') : 'preview' }}.png</span>
                </div>
              </div>

              <!-- hint de expand (aparece no hover) -->
              <span class="expand-hint" v-if="currentSlideData?.image || currentSlideData?.video">⛶</span>
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

            <div class="m-tags">
              <span class="badge" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
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

          <!-- Lado direito: título + conteúdo dinâmico por slide -->
          <div class="modal-right">

            <div class="modal-header">
              <span class="m-icon">
                <img v-if="iconIsImage" :src="project.icon" :alt="project.title" />
                <template v-else>{{ project.icon }}</template>
              </span>
              <div class="m-title-group">
                <h2 class="m-title">{{ project.title }}</h2>
                <span class="m-status" :class="project.status">● {{ project.status }}</span>
              </div>
            </div>

            <!-- Slide 0: descrição detalhada do projeto -->
            <div class="m-detail" v-show="currentSlide === 0">
              <component :is="detailComponent" v-if="detailComponent" ref="detailRef" />
            </div>

            <!-- Slides seguintes: caption específico do slide -->
            <div class="m-detail" v-show="currentSlide !== 0">
              <p class="slide-caption-title">// {{ slides[currentSlide]?.title }}</p>
              <p class="slide-caption-desc">{{ slides[currentSlide]?.desc }}</p>
            </div>

          </div>

        </div>
      </div>
    </div>

    <!-- Overlay fullscreen -->
    <div v-if="isFullscreen" class="fs-overlay" @click="isFullscreen = false">
      <button class="fs-close" @click="isFullscreen = false">✕</button>
      <video
        v-if="currentSlideData?.video"
        :src="currentSlideData.video"
        :style="{ objectFit: currentSlideData.fit ?? 'contain' }"
        autoplay
        muted
        loop
        playsinline
        controls
        @click.stop
      />
      <img
        v-else-if="currentSlideData?.image"
        :src="currentSlideData.image"
        :style="{ objectFit: currentSlideData.fit ?? 'contain' }"
        @click.stop
      />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, reactive, defineAsyncComponent, onMounted, onUnmounted } from 'vue';

const props = defineProps({ project: Object });
const emit = defineEmits(['close']);

const componentMap = {
  geotrack:        defineAsyncComponent(() => import('./GeoTrack.vue')),
  bitaiga:         defineAsyncComponent(() => import('./BiTaiga.vue')),
  agileassessment: defineAsyncComponent(() => import('./AgileAssessment.vue')),
  dataflow:        defineAsyncComponent(() => import('./DataFlow.vue')),
  geodoc:          defineAsyncComponent(() => import('./GeoDoc.vue')),
  visiondata:      defineAsyncComponent(() => import('./VisionData.vue')),
  tauriplanner:    defineAsyncComponent(() => import('./TauriPlanner.vue')),
};

const detailComponent = computed(() => componentMap[props.project?.id]);
const detailRef = ref(null);
const slides = ref([]);
const currentSlide = ref(0);
const videoRefs = reactive({});
const isFullscreen = ref(false);

const currentSlideData = computed(() => slides.value[currentSlide.value]);

// Ícone do projeto pode ser um emoji (texto) ou um caminho de imagem a partir de /public.
const iconIsImage = computed(
  () => typeof props.project?.icon === 'string' && props.project.icon.startsWith('/')
);

watch(detailRef, (val) => {
  if (val?.slides) slides.value = val.slides;
});

watch(currentSlide, (newIdx, oldIdx) => {
  const prev = videoRefs[oldIdx];
  if (prev) prev.pause();
  const next = videoRefs[newIdx];
  if (next) next.play().catch(() => {});
});

function openFullscreen() {
  const slide = currentSlideData.value;
  if (slide?.image || slide?.video) isFullscreen.value = true;
}

function prev() {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length;
}
function next() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function onKey(e) {
  if (e.key === 'Escape') {
    if (isFullscreen.value) { isFullscreen.value = false; return; }
    emit('close');
  }
  if (isFullscreen.value) return;
  if (e.key === 'ArrowLeft')  prev();
  if (e.key === 'ArrowRight') next();
}

onMounted(() => {
  document.body.dataset.modalOpen = 'true';
  document.body.style.overflow = 'hidden';
  window.addEventListener('keydown', onKey);
});
onUnmounted(() => {
  delete document.body.dataset.modalOpen;
  document.body.style.overflow = '';
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
  width: min(92vw, 62rem);
  height: 88dvh;
  overflow: hidden;
  animation: slideUp 0.25s ease;
}

@keyframes slideUp {
  from { transform: translateY(1.5rem); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: 1px solid var(--border);
  color: var(--text-dim);
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  z-index: 10;
  transition: border-color 0.2s, color 0.2s;
}
.modal-close:hover { border-color: var(--green); color: var(--green); }

.modal-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  height: 100%;
}

/* ── Lado esquerdo ── */
.modal-left {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  padding: 1.75rem 1.25rem 1.75rem 1.75rem;
  border-right: 1px solid var(--border);
  overflow: hidden;
}

.carousel-stage {
  flex: 1;
  min-height: 0;
  background: var(--bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  cursor: zoom-in;
}

.expand-hint {
  position: absolute;
  bottom: 0.5rem;
  right: 0.625rem;
  font-size: 1.125rem;
  color: rgba(255,255,255,0.5);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}
.carousel-stage:hover .expand-hint { opacity: 1; }

.carousel-slide {
  width: 100%;
  height: 100%;
}

.carousel-slide img,
.carousel-slide video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: default;
  background: repeating-linear-gradient(
    45deg,
    var(--bg),
    var(--bg) 8px,
    var(--bg-card2) 8px,
    var(--bg-card2) 16px
  );
}

.placeholder-icon  { font-size: 3rem; }
.placeholder-icon img {
  width: 4rem;
  height: 4rem;
  object-fit: contain;
  display: block;
}
.placeholder-label {
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
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
  font-size: 1rem;
  padding: 0.125rem 0.625rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}
.nav-btn:hover { border-color: var(--green); color: var(--green); }

.carousel-dots { display: flex; gap: 0.5rem; }

.carousel-dot {
  width: 0.5rem;
  height: 0.5rem;
  border: 1px solid var(--border);
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.carousel-dot.active {
  background: var(--green);
  border-color: var(--green);
}

.m-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  flex-shrink: 0;
  overflow-y: auto;
  max-height: 5.5rem;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
}

.badge {
  font-family: 'VT323', monospace;
  font-size: 0.875rem;
  padding: 0.125rem 0.5rem;
  border: 1px solid var(--border);
  color: var(--purple);
  background: color-mix(in srgb, var(--purple) 5%, transparent);
  height: fit-content;
}

.modal-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex-shrink: 0;
  margin-top: 1.375rem;
}

.pixel-btn {
  font-family: 'VT323', monospace;
  font-size: 1.0625rem;
  padding: 0.25rem 1rem;
  border: 1px solid var(--green);
  color: var(--green);
  background: color-mix(in srgb, var(--green) 5%, transparent);
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.pixel-btn:hover {
  background: color-mix(in srgb, var(--green) 12%, transparent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--green) 30%, transparent);
}
.pixel-btn.secondary {
  border-color: var(--cyan);
  color: var(--cyan);
  background: color-mix(in srgb, var(--cyan) 5%, transparent);
}
.pixel-btn.secondary:hover {
  background: color-mix(in srgb, var(--cyan) 12%, transparent);
  box-shadow: 0 0 8px color-mix(in srgb, var(--cyan) 30%, transparent);
}

/* ── Lado direito ── */
.modal-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 2rem 2.25rem 2rem 1.75rem;
  height: 100%;
  overflow: hidden;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex-shrink: 0;
}

.m-icon { font-size: 2.25rem; }
.m-icon img {
  width: 2.75rem;
  height: 2.75rem;
  object-fit: contain;
  display: block;
}

.m-title-group { display: flex; flex-direction: column; gap: 0.375rem; }

.m-title {
  font-family: 'Press Start 2P', monospace;
  font-size: 0.75rem;
  color: var(--text);
  line-height: 1.5;
}

.m-status {
  font-family: 'VT323', monospace;
  font-size: 1rem;
}
.m-status.online  { color: var(--green); }
.m-status.offline { color: #ff5f57; }

.m-detail {
  flex: 1;
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--border) transparent;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.slide-caption-title {
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  color: var(--cyan);
}

.slide-caption-desc {
  font-family: 'VT323', monospace;
  font-size: 1.125rem;
  color: var(--text-dim);
  line-height: 1.6;
}

/* ── Fullscreen overlay ── */
.fs-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s ease;
  cursor: zoom-out;
}

.fs-overlay img,
.fs-overlay video {
  max-width: 95vw;
  max-height: 95vh;
  object-fit: contain;
  cursor: default;
  box-shadow: 0 0 60px rgba(0,0,0,0.8);
}

.fs-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  background: none;
  border: 1px solid rgba(255,255,255,0.3);
  color: rgba(255,255,255,0.7);
  font-family: 'VT323', monospace;
  font-size: 1.25rem;
  width: 2.25rem;
  height: 2.25rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
  z-index: 10;
}
.fs-close:hover { border-color: #fff; color: #fff; }

@media (max-width: 700px) {
  .modal {
    height: 92dvh;
    width: 95vw;
  }
  .modal-grid {
    grid-template-columns: 1fr;
    overflow-y: auto;
    height: 100%;
  }
  .modal-left {
    border-right: none;
    border-bottom: 1px solid var(--border);
    padding: 1.5rem;
    overflow: visible;
    min-height: 55dvh;
  }
  .modal-right {
    padding: 1.5rem;
    height: auto;
    overflow: visible;
  }
  .m-tags, .m-detail { overflow: visible; max-height: none; }
}
</style>
