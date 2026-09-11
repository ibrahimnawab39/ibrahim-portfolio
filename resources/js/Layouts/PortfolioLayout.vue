<script setup>
import SeoHead from '@/Components/Portfolio/SeoHead.vue';
import { Link, router, usePage } from '@inertiajs/vue3';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

defineProps({ profile: Object });

const page = usePage();
const menuOpen = ref(false);
const scrollProgress = ref(0);
const showBackToTop = ref(false);
const pointerX = ref('72%');
const pointerY = ref('18%');

const path = computed(() => page.url.split('#')[0]);
const isAdmin = computed(() => page.props.auth?.user?.is_admin);
const isActive = (href) => href === '/' ? path.value === '/' : path.value.startsWith(href);

const updateScroll = () => {
    const available = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.value = available > 0 ? (window.scrollY / available) * 100 : 0;
    showBackToTop.value = window.scrollY > 700;
};

const updatePointer = (event) => {
    pointerX.value = `${event.clientX}px`;
    pointerY.value = `${event.clientY}px`;
};

const closeMenu = () => { menuOpen.value = false; };
const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

let removeInertiaListener;
onMounted(() => {
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    removeInertiaListener = router.on('navigate', closeMenu);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScroll);
    window.removeEventListener('pointermove', updatePointer);
    removeInertiaListener?.();
});
</script>

<template>
    <SeoHead />
    <div
        class="pf-site"
        :class="{ 'menu-is-open': menuOpen }"
        :style="{ '--pointer-x': pointerX, '--pointer-y': pointerY }"
    >
        <a class="skip-link" href="#main-content">Skip to content</a>
        <div class="scroll-progress" :style="{ transform: `scaleX(${scrollProgress / 100})` }"></div>
        <div class="pointer-aura" aria-hidden="true"></div>

        <header class="pf-head">
            <div>
                <Link href="/" class="pf-brand" aria-label="Ibrahim Nawab — Home" @click="closeMenu">
                    IBRAHIM<span>.</span>
                </Link>

                <nav class="pf-nav" aria-label="Primary navigation">
                    <Link href="/about" :class="{ active: isActive('/about') }">About</Link>
                    <Link href="/experience" :class="{ active: isActive('/experience') }">Experience</Link>
                    <Link href="/work" :class="{ active: isActive('/work') }">Work</Link>
                    <a href="/#skills">Expertise</a>
                    <a v-if="profile?.resume_available" href="/resume">Resume ↓</a>
                    <Link href="/contact" class="nav-contact" :class="{ active: isActive('/contact') }">Let’s talk ↗</Link>
                </nav>

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

            <nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">
                <Link href="/" @click="closeMenu"><span>00</span>Home</Link>
                <Link href="/about" @click="closeMenu"><span>01</span>About</Link>
                <Link href="/experience" @click="closeMenu"><span>02</span>Experience</Link>
                <Link href="/work" @click="closeMenu"><span>03</span>Work</Link>
                <a href="/#certificates" @click="closeMenu"><span>04</span>Certificates</a>
                <Link href="/contact" @click="closeMenu"><span>05</span>Contact</Link>
            </nav>
        </header>

        <main id="main-content" class="pf-main"><slot /></main>

        <footer class="pf-foot">
            <span>© {{ new Date().getFullYear() }} {{ profile?.name ?? 'Ibrahim Nawab' }}</span>
            <div>
                <Link v-if="isAdmin" href="/admin">Admin CMS ↗</Link>
                <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a v-if="profile?.github_url && !profile.github_url.endsWith('github.com/')" :href="profile.github_url" target="_blank" rel="noreferrer">GitHub ↗</a>
                <span>Karachi · Available globally</span>
            </div>
        </footer>

        <button v-show="showBackToTop" class="back-top" type="button" aria-label="Back to top" @click="scrollTop">↑</button>
    </div>
</template>
