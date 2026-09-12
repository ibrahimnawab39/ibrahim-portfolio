<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import AmbientScene from '@/Components/Portfolio/AmbientScene.vue';
import PageAtmosphere from '@/Components/Portfolio/PageAtmosphere.vue';
import ProjectCover from '@/Components/Portfolio/ProjectCover.vue';
import Reveal from '@/Components/Portfolio/Reveal.vue';
import TiltCard from '@/Components/Portfolio/TiltCard.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps({ profile: Object, project: Object, nextProject: Object });

const gallery = computed(() => props.project.gallery?.length ? props.project.gallery : (props.project.image_path ? [props.project.image_path] : []));
const isMobile = computed(() => props.project.is_mobile || /flutter|mobile/i.test(props.project.category || ''));
const liveLabel = computed(() => isMobile.value ? 'View on Google Play ↗' : 'Visit live project ↗');
</script>

<template>
    <Head>
        <title>{{ project.title }} — Ibrahim Nawab</title>
        <meta head-key="description" name="description" :content="project.summary">
    </Head>
    <PortfolioLayout :profile="profile">
        <article class="case-study has-atmosphere">
            <PageAtmosphere tone="work" mode="dots" />
            <header class="case-hero">
                <Link href="/work" class="back-link">← All selected work</Link>
                <motion.div :initial="{ opacity: 0, y: 35 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .65 }">
                    <span class="section-kicker">{{ project.category }}<template v-if="project.company"> · Associated with {{ project.company }}</template></span>
                    <h1>{{ project.title }}</h1>
                    <p>{{ project.summary }}</p>
                </motion.div>
                <div class="case-meta">
                    <motion.div
                        v-for="(item, index) in [
                            { label: 'Association', value: project.company || 'Independent project' },
                            { label: 'System', value: project.category },
                            { label: 'Stack', value: (project.tech_stack ?? []).slice(0, 3).join(' · ') },
                        ]"
                        :key="item.label"
                        :initial="{ opacity: 0, y: 12 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: .18 + index * .06 }"
                        :while-hover="{ y: -3 }"
                    >
                        <small>{{ item.label }}</small><span>{{ item.value }}</span>
                    </motion.div>
                </div>
                <motion.div
                    class="case-actions case-actions-top"
                    :initial="{ opacity: 0, y: 10 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: .36 }"
                >
                    <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noreferrer" class="pill">{{ liveLabel }}</a>
                    <a v-if="project.repo_url" :href="project.repo_url" target="_blank" rel="noreferrer" class="pill alt">View repository ↗</a>
                </motion.div>
            </header>

            <div class="case-ambient-band" aria-hidden="true">
                <AmbientScene tone="work" variant="dots" />
            </div>

            <motion.div
                v-if="gallery.length"
                :initial="{ opacity: 0, scale: .97 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: .8 }"
            >
                <TiltCard :max="5">
                    <div class="case-visual" :class="isMobile ? 'case-visual-mobile' : 'case-visual-web has-shot'">
                        <template v-if="isMobile">
                            <div class="phone-showcase">
                                <figure v-for="(shot, index) in gallery.slice(0, 4)" :key="shot" class="phone-frame case-phone">
                                    <span class="phone-notch"></span>
                                    <img :src="shot" :alt="`${project.title} screen ${index + 1}`" loading="lazy">
                                </figure>
                            </div>
                        </template>
                        <template v-else>
                            <img :src="gallery[0]" :alt="`${project.title} screenshot`">
                        </template>
                        <i>{{ project.live_url ? 'LIVE PRODUCT' : 'CASE STUDY' }} / {{ String(project.order ?? 0).padStart(2, '0') }}</i>
                    </div>
                </TiltCard>
            </motion.div>

            <motion.div
                v-else
                :initial="{ opacity: 0, scale: .97 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ duration: .8 }"
            >
                <TiltCard :max="5">
                    <div class="case-visual">
                        <ProjectCover :project="project" :index="project.order || 0" />
                        <span>{{ project.title }}</span>
                        <i>CASE STUDY / {{ String(project.order ?? 0).padStart(2, '0') }}</i>
                    </div>
                </TiltCard>
            </motion.div>

            <section v-if="gallery.length > 1 && !isMobile" class="case-gallery">
                <motion.img
                    v-for="(shot, index) in gallery.slice(1)"
                    :key="shot"
                    :src="shot"
                    :alt="`${project.title} detail ${index + 2}`"
                    loading="lazy"
                    :initial="{ opacity: 0, y: 18 }"
                    :while-in-view="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, amount: .25 }"
                    :transition="{ delay: Math.min(index * 0.06, 0.24), duration: .5 }"
                    :while-hover="{ y: -4 }"
                />
            </section>

            <Reveal>
                <section class="case-content">
                    <div>
                        <span class="section-kicker">The brief</span>
                        <h2>Turning operational complexity into one dependable system.</h2>
                    </div>
                    <div>
                        <p>{{ project.description }}</p>
                        <h3>Technology</h3>
                        <div class="tags large"><span v-for="tech in project.tech_stack" :key="tech">{{ tech }}</span></div>
                        <div class="case-actions">
                            <a v-if="project.live_url" :href="project.live_url" target="_blank" rel="noreferrer" class="pill">{{ liveLabel }}</a>
                            <a v-if="project.repo_url" :href="project.repo_url" target="_blank" rel="noreferrer" class="pill alt">View repository ↗</a>
                        </div>
                    </div>
                </section>
            </Reveal>

            <Reveal :delay="0.05">
                <Link v-if="nextProject && nextProject.id !== project.id" :href="`/work/${nextProject.slug}`" class="next-project">
                    <span>Next case study</span><h2>{{ nextProject.title }}</h2><b>↗</b>
                </Link>
                <Link v-else href="/contact" class="next-project"><span>Start something new</span><h2>Let’s build the next system.</h2><b>↗</b></Link>
            </Reveal>
        </article>
    </PortfolioLayout>
</template>
