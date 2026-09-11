<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import PageAtmosphere from '@/Components/Portfolio/PageAtmosphere.vue';
import AmbientScene from '@/Components/Portfolio/AmbientScene.vue';
import ProjectCover from '@/Components/Portfolio/ProjectCover.vue';
import TiltCard from '@/Components/Portfolio/TiltCard.vue';
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
        <div class="inner-page has-atmosphere">
            <PageAtmosphere tone="work" mode="dots" />

            <header class="page-hero page-hero-split">
                <div>
                    <motion.span class="section-kicker" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }">03 / Selected work</motion.span>
                    <motion.h1 :initial="{ opacity: 0, y: 40 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .7 }">Products built to perform <em>under pressure.</em></motion.h1>
                    <motion.p :initial="{ opacity: 0, y: 18 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .1 }">
                        From commerce operations to mobile platforms — every system starts with a real constraint and ends with something people can use.
                    </motion.p>
                </div>
                <motion.div class="page-hero-scene" :initial="{ opacity: 0, scale: .92 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ duration: .8, delay: .1 }">
                    <AmbientScene tone="work" variant="dots" />
                </motion.div>
            </header>

            <section class="work-gallery">
                <motion.article
                    v-for="(project, index) in projects"
                    :key="project.id"
                    class="work-gallery-item"
                    :initial="{ opacity: 0, y: 34 }"
                    :while-in-view="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, amount: .12 }"
                    :transition="{ duration: .5, delay: Math.min(index * .03, .18) }"
                >
                    <TiltCard :max="8">
                        <Link :href="`/work/${project.slug}`" class="work-gallery-link">
                            <ProjectCover :project="project" :index="index" />
                            <div class="work-gallery-copy">
                                <small>{{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small>
                                <h2>{{ project.title }}</h2>
                                <p>{{ project.summary }}</p>
                                <div class="tags">
                                    <span v-for="tech in project.tech_stack" :key="tech">{{ tech }}</span>
                                </div>
                                <div class="work-gallery-actions">
                                    <span>Case study ↗</span>
                                    <em v-if="project.live_url">{{ /flutter|mobile/i.test(project.category || '') ? 'App store' : 'Live project' }}</em>
                                </div>
                            </div>
                        </Link>
                    </TiltCard>
                </motion.article>
            </section>
        </div>
    </PortfolioLayout>
</template>
