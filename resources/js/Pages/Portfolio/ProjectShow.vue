<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, project: Object, nextProject: Object });
</script>

<template>
    <Head>
        <title>{{ project.title }} — Ibrahim Nawab</title>
        <meta head-key="description" name="description" :content="project.summary">
    </Head>
    <PortfolioLayout :profile="profile">
        <article class="case-study">
            <header class="case-hero">
                <Link href="/work" class="back-link">← All selected work</Link>
                <motion.div :initial="{ opacity: 0, y: 35 }" :animate="{ opacity: 1, y: 0 }">
                    <span class="section-kicker">{{ project.category }}<template v-if="project.company"> · Associated with {{ project.company }}</template></span>
                    <h1>{{ project.title }}</h1>
                    <p>{{ project.summary }}</p>
                </motion.div>
                <div class="case-meta">
                    <div><small>Association</small><span>{{ project.company || 'Independent project' }}</span></div>
                    <div><small>System</small><span>{{ project.category }}</span></div>
                    <div><small>Stack</small><span>{{ project.tech_stack.slice(0, 3).join(' · ') }}</span></div>
                </div>
            </header>

            <motion.div class="case-visual" :initial="{ opacity: 0, scale: .97 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ duration: .8 }">
                <img v-if="project.image_path" :src="project.image_path" :alt="project.title">
                <span>{{ project.title }}</span><i>LIVE SYSTEM / 0{{ project.order }}</i>
            </motion.div>

            <section class="case-content">
                <div><span class="section-kicker">The brief</span><h2>Turning operational complexity into one dependable system.</h2></div>
                <div>
                    <p>{{ project.description }}</p>
                    <h3>Technology</h3>
                    <div class="tags large"><span v-for="tech in project.tech_stack" :key="tech">{{ tech }}</span></div>
                    <div class="case-actions">
                        <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noreferrer" class="pill">Visit live project ↗</a>
                        <a v-if="project.repo_url" :href="project.repo_url" target="_blank" rel="noreferrer" class="pill alt">View repository ↗</a>
                    </div>
                </div>
            </section>

            <Link v-if="nextProject && nextProject.id !== project.id" :href="`/work/${nextProject.slug}`" class="next-project">
                <span>Next case study</span><h2>{{ nextProject.title }}</h2><b>↗</b>
            </Link>
            <Link v-else href="/contact" class="next-project"><span>Start something new</span><h2>Let’s build the next system.</h2><b>↗</b></Link>
        </article>
    </PortfolioLayout>
</template>
