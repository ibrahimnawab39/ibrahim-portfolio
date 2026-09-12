<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import PageAtmosphere from '@/Components/Portfolio/PageAtmosphere.vue';
import AmbientScene from '@/Components/Portfolio/AmbientScene.vue';
import CompanyLogo from '@/Components/Portfolio/CompanyLogo.vue';
import TiltCard from '@/Components/Portfolio/TiltCard.vue';
import { Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, experiences: Array });

const date = (value, empty = 'Present') =>
    value ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value)) : empty;
</script>

<template>
    <PortfolioLayout :profile="profile">
        <div class="inner-page has-atmosphere">
            <PageAtmosphere tone="experience" mode="mist" />

            <header class="page-hero page-hero-split">
                <div>
                    <motion.span class="section-kicker" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }">02 / Experience</motion.span>
                    <motion.h1 :initial="{ opacity: 0, y: 40 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .7 }">Experience earned by solving <em>real operational problems.</em></motion.h1>
                    <motion.p :initial="{ opacity: 0, y: 18 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .1 }">
                        A career spanning software products, operational systems and the teams who ship them — from Karachi studios to remote product companies and freelance platforms.
                    </motion.p>
                </div>
                <motion.div class="page-hero-scene" :initial="{ opacity: 0, scale: .92 }" :animate="{ opacity: 1, scale: 1 }" :transition="{ duration: .8, delay: .1 }">
                    <AmbientScene tone="experience" variant="orbit" />
                </motion.div>
            </header>

            <section class="experience-ledger experience-timeline">
                <div class="timeline-rail" aria-hidden="true"></div>
                <TiltCard
                    v-for="(item, index) in experiences"
                    :key="item.id"
                    :max="5"
                    :lift="2"
                    class="experience-tilt"
                >
                    <motion.article
                        class="experience-card"
                        :initial="{ opacity: 0, y: 28 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :viewport="{ once: true, amount: .2 }"
                        :transition="{ duration: .45, delay: Math.min(index * .04, .24) }"
                    >
                        <div class="ledger-brand">
                            <CompanyLogo :src="item.logo_path" :name="item.company" size="lg" />
                            <span class="ledger-number">{{ String(index + 1).padStart(2, '0') }}</span>
                        </div>
                        <div class="ledger-date">
                            <b>{{ item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : 'Dates on request' }}</b>
                            <em v-if="!item.end_date">Present</em>
                        </div>
                        <div class="ledger-copy">
                            <small>
                                <template v-if="item.company_url">
                                    <a :href="item.company_url" target="_blank" rel="noreferrer">{{ item.company }}</a>
                                </template>
                                <template v-else>{{ item.company }}</template>
                                <template v-if="item.employment_type"> · {{ item.employment_type }}</template>
                                <template v-if="item.work_mode"> · {{ item.work_mode }}</template>
                                · {{ item.location }}
                            </small>
                            <h2>{{ item.role }}</h2>
                            <p>{{ item.description }}</p>
                        </div>
                    </motion.article>
                </TiltCard>
            </section>

            <motion.section
                class="page-cta page-cta-split"
                :initial="{ opacity: 0, y: 24 }"
                :while-in-view="{ opacity: 1, y: 0 }"
                :viewport="{ once: true, amount: .35 }"
                :transition="{ duration: .55 }"
            >
                <div class="page-cta-copy">
                    <span>Selected output</span>
                    <h2>Now see how the experience becomes product.</h2>
                    <Link href="/work" class="pill">Explore selected work ↗</Link>
                </div>
                <motion.div
                    class="cta-scene"
                    aria-hidden="true"
                    :initial="{ opacity: 0, scale: .92 }"
                    :while-in-view="{ opacity: 1, scale: 1 }"
                    :viewport="{ once: true }"
                    :transition="{ duration: .7, delay: .1 }"
                >
                    <AmbientScene tone="experience" variant="orbit" />
                </motion.div>
            </motion.section>
        </div>
    </PortfolioLayout>
</template>
