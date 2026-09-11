<script setup>
import BrandMark from '@/Components/Portfolio/BrandMark.vue';
import SeoHead from '@/Components/Portfolio/SeoHead.vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({ profile: Object });

const page = usePage();
const menuOpen = ref(false);
const theme = ref('dark');
const customCursor = ref(false);
const hoveringInteractive = ref(false);
const syncThemeMeta = (value) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', value === 'dark' ? '#11131b' : '#eef0f5');
};
const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme.value;
    syncThemeMeta(theme.value);
    try { localStorage.setItem('portfolio-theme', theme.value); } catch {}
};
const scrollProgress = ref(0);
const showBackToTop = ref(false);
const pointerX = ref('72%');
const pointerY = ref('18%');
const cursorX = ref(0);
const cursorY = ref(0);
const ringX = ref(0);
const ringY = ref(0);

const path = computed(() => page.url.split('#')[0]);
const isActive = (href) => href === '/' ? path.value === '/' : path.value.startsWith(href);

const updateScroll = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = available > 0 ? (window.scrollY / available) * 100 : 0;
    showBackToTop.value = window.scrollY > 700;
};

let targetX = 0;
let targetY = 0;
let ringFrame = 0;

const updatePointer = (event) => {
    pointerX.value = `${event.clientX}px`;
    pointerY.value = `${event.clientY}px`;
    targetX = event.clientX;
    targetY = event.clientY;
    cursorX.value = event.clientX;
    cursorY.value = event.clientY;

    const interactive = event.target?.closest?.('a, button, .folio-button, .pill, .toolkit-card, .studio-chip, .work-gallery-link');
    hoveringInteractive.value = !!interactive;
};

const animateRing = () => {
    ringX.value += (targetX - ringX.value) * 0.18;
    ringY.value += (targetY - ringY.value) * 0.18;
    ringFrame = requestAnimationFrame(animateRing);
};

const closeMenu = () => { menuOpen.value = false; };
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

let removeInertiaListener;
onMounted(() => {
    theme.value = document.documentElement.dataset.theme || 'dark';
    syncThemeMeta(theme.value);
    updateScroll();
    customCursor.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (customCursor.value) {
        ringFrame = requestAnimationFrame(animateRing);
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    removeInertiaListener = router.on('navigate', closeMenu);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('pointermove', updatePointer);
    cancelAnimationFrame(ringFrame);
    removeInertiaListener?.();
});
</script>

<template>
    <SeoHead />
    <div
        class="pf-site"
        :class="{
            'menu-is-open': menuOpen,
            'has-custom-cursor': customCursor,
            'is-hovering-interactive': hoveringInteractive,
        }"
        :style="{ '--pointer-x': pointerX, '--pointer-y': pointerY }"
    >
        <a class="skip-link" href="#main-content">Skip to content</a>
        <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress / 100})` }"></div>
        <div class="pointer-aura" aria-hidden="true"></div>
        <template v-if="customCursor">
            <div class="cursor-dot" aria-hidden="true" :style="{ transform: `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)` }"></div>
            <div class="cursor-ring" aria-hidden="true" :style="{ transform: `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)` }"></div>
        </template>

        <header class="pf-head">
            <div>
                <Link href="/" class="pf-brand" aria-label="Ibrahim Nawab — Home" @click="closeMenu">
                    <BrandMark />
                </Link>

                <nav class="pf-nav" aria-label="Primary navigation">
                    <Link href="/about" :class="{ active: isActive('/about') }">About</Link>
                    <Link href="/experience" :class="{ active: isActive('/experience') }">Experience</Link>
                    <Link href="/work" :class="{ active: isActive('/work') }">Work</Link>
                    <a href="/#skills">Expertise</a>
                    <a v-if="profile?.resume_available" href="/resume">Resume ↓</a>
                    <Link href="/contact" class="nav-contact" :class="{ active: isActive('/contact') }">Let’s talk ↗</Link>
                </nav>

                <div class="pf-head-tools">
                    <button class="theme-toggle" type="button" :aria-label="`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`" @click="toggleTheme">
                        <svg v-if="theme === 'dark'" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"/><path d="M12 2v2.2M12 19.8V22M4.2 12H2M22 12h-2.2M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                        <svg v-else viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.2A7.4 7.4 0 0 1 9.8 4.5 7.8 7.8 0 1 0 19.5 14.2Z" fill="currentColor"/></svg>
                    </button>
                    <button
                        class="menu-toggle"
                        type="button"
                        :aria-expanded="menuOpen"
                        aria-controls="mobile-navigation"
                        :aria-label="menuOpen ? 'Close navigation' : 'Open navigation'"
                        @click="menuOpen = !menuOpen"
                    >
                        <span></span><span></span>
                    </button>
                </div>
            </div>
        </header>

        <nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
            <Link href="/" @click="closeMenu"><span>00</span>Home</Link>
            <Link href="/about" @click="closeMenu"><span>01</span>About</Link>
            <Link href="/experience" @click="closeMenu"><span>02</span>Experience</Link>
            <Link href="/work" @click="closeMenu"><span>03</span>Work</Link>
            <a href="/#certificates" @click="closeMenu"><span>04</span>Certificates</a>
            <Link href="/contact" @click="closeMenu"><span>05</span>Contact</Link>
        </nav>

        <main id="main-content" class="pf-main"><slot /></main>

        <footer class="pf-foot">
            <span>© {{ new Date().getFullYear() }} {{ profile?.name ?? 'Ibrahim Nawab' }}</span>
            <div>
                <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a v-if="profile?.github_url && !profile.github_url.endsWith('github.com/')" :href="profile.github_url" target="_blank" rel="noreferrer">GitHub ↗</a>
                <a v-if="profile?.whatsapp_number" :href="`https://wa.me/${profile.whatsapp_number.replace(/\D/g, '')}`" target="_blank" rel="noreferrer">WhatsApp ↗</a>
                <span>Karachi · Available globally</span>
            </div>
        </footer>

        <button v-show="showBackToTop" class="back-top" type="button" aria-label="Back to top" @click="scrollTop">↑</button>
    </div>
</template>
