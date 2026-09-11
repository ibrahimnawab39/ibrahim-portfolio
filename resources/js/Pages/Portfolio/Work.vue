<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, projects: Array });
</script>

<template>
    <Head>
        <title>Selected Work — Ibrahim Nawab</title>
        <meta head-key="description" name="description" content="Selected Laravel products, operational platforms and infrastructure projects by Ibrahim Nawab.">
    </Head>
    <PortfolioLayout :profile="profile">
        <div class="inner-page">
            <header class="page-hero">
                <motion.span class="section-kicker" :initial="{ opacity: 0 }" :animate="{ opacity: 1 }">03 / Selected work</motion.span>
                <motion.h1 :initial="{ opacity: 0, y: 35 }" :animate="{ opacity: 1, y: 0 }">Products built to perform <em>under pressure.</em></motion.h1>
                <p>From commerce operations to infrastructure dashboards—every system starts with a real constraint and ends with measurable clarity.</p>
            </header>

            <section class="work-index">
                <motion.article
                    v-for="(project, index) in projects"
                    :key="project.id"
                    class="work-row"
                    :initial="{ opacity: 1, y: 35 }"
                    :while-in-view="{ opacity: 1, y: 0 }"
                    :while-hover="{ x: 8 }"
                    :viewport="{ once: true, amount: .2 }"
                >
                    <Link :href="`/work/${project.slug}`">
                        <span class="work-number">0{{ index + 1 }}</span>
                        <div>
                            <small>{{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small>
                            <h2>{{ project.title }}</h2>
                            <p>{{ project.summary }}</p>
                            <div class="tags"><span v-for="tech in project.tech_stack" :key="tech">{{ tech }}</span></div>
                        </div>
                        <span class="work-arrow">↗</span>
                    </Link>
                </motion.article>
            </section>
        </div>
    </PortfolioLayout>
</template>
