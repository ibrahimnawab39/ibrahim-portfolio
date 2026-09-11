<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, experiences: Array });
const date = (value, empty = 'Present') => value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : empty;
</script>

<template>
    <Head>
        <title>Experience — Ibrahim Nawab</title>
        <meta head-key="description" name="description" content="Professional experience, roles and engineering background of Ibrahim Nawab.">
    </Head>
    <PortfolioLayout :profile="profile">
        <div class="inner-page">
            <header class="page-hero">
                <motion.span class="section-kicker" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">02 / Experience</motion.span>
                <motion.h1 :initial="{ opacity: 0, y: 35 }" :animate="{ opacity: 1, y: 0 }">Experience earned by solving <em>real operational problems.</em></motion.h1>
                <p>A career spanning software products, operational systems, infrastructure and the people who rely on them every day.</p>
            </header>

            <section class="experience-ledger">
                <motion.article
                    v-for="(item, index) in experiences"
                    :key="item.id"
                    :initial="{ opacity: 1, x: 35 }"
                    :while-in-view="{ opacity: 1, x: 0 }"
                    :viewport="{ once: true, amount: .25 }"
                >
                    <span class="ledger-number">0{{ index + 1 }}</span>
                    <div class="ledger-date">{{ item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : 'Dates available on request' }}</div>
                    <div class="ledger-copy"><small>{{ item.company }}<template v-if="item.employment_type"> · {{ item.employment_type }}</template><template v-if="item.work_mode"> · {{ item.work_mode }}</template> · {{ item.location }}</small><h2>{{ item.role }}</h2><p>{{ item.description }}</p></div>
                </motion.article>
            </section>

            <section class="page-cta">
                <span>Selected output</span><h2>Now see how the experience becomes product.</h2><Link href="/work" class="pill">Explore selected work ↗</Link>
            </section>
        </div>
    </PortfolioLayout>
</template>
