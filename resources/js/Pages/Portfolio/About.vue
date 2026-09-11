<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, skills: Object, experiences: Array, certificates: Array });
</script>

<template>
    <Head>
        <title>About — Ibrahim Nawab</title>
        <meta name="description" :content="profile?.summary">
    </Head>
    <PortfolioLayout :profile="profile">
        <div class="inner-page">
            <header class="page-hero about-hero">
                <motion.span class="section-kicker" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">01 / About Ibrahim</motion.span>
                <motion.h1 :initial="{ opacity: 0, y: 35 }" :animate="{ opacity: 1, y: 0 }">An engineer who thinks in <em>complete systems.</em></motion.h1>
            </header>

            <section class="about-editorial">
                <div class="portrait-panel"><img v-if="profile?.photo_path" :src="profile.photo_path" :alt="profile.name"><span v-else>IN</span><small>Karachi · Pakistan</small></div>
                <motion.div :initial="{ opacity: 1, y: 30 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true }">
                    <span class="section-kicker">The approach</span>
                    <p class="lead-copy">{{ profile?.bio }}</p>
                    <p>I work across product thinking, backend architecture, interface engineering and infrastructure—so the result stays coherent from the first interaction to the final deployment.</p>
                    <div class="fact-grid">
                        <div><strong>{{ profile?.years_experience ?? 10 }}+</strong><span>Years in technology</span></div>
                        <div><strong>{{ Object.values(skills ?? {}).flat().length }}</strong><span>Core capabilities</span></div>
                        <div><strong>Global</strong><span>Remote collaboration</span></div>
                    </div>
                </motion.div>
            </section>

            <section class="inner-section">
                <span class="section-kicker">Capabilities</span>
                <h2>One partner across the critical layers.</h2>
                <div class="capability-list">
                    <motion.div v-for="(items, category, index) in skills" :key="category" :initial="{ opacity: 1, y: 20 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true }">
                        <span>0{{ index + 1 }}</span><h3>{{ category }}</h3><p>{{ items.map(item => item.name).join(' · ') }}</p>
                    </motion.div>
                </div>
            </section>

            <section class="inner-section">
                <span class="section-kicker">Education & recognition</span>
                <h2>Certificates that support the craft.</h2>
                <div class="certificate-grid">
                    <article v-for="(certificate, index) in certificates" :key="certificate.id">
                        <span>0{{ index + 1 }}</span><small>{{ certificate.issuer }}</small><h3>{{ certificate.title }}</h3><p>{{ certificate.description }}</p><a v-if="certificate.credential_url" :href="certificate.credential_url" target="_blank" rel="noreferrer">View credential ↗</a>
                    </article>
                </div>
            </section>

            <section class="page-cta">
                <span>Next</span><h2>See the experience behind the work.</h2><Link href="/experience" class="pill">Explore experience ↗</Link>
            </section>
        </div>
    </PortfolioLayout>
</template>
