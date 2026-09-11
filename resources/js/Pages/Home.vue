<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import ProjectCover from '@/Components/Portfolio/ProjectCover.vue';
import ArchitectureScene from '@/Components/Portfolio/ArchitectureScene.vue';
import PageAtmosphere from '@/Components/Portfolio/PageAtmosphere.vue';
import Reveal from '@/Components/Portfolio/Reveal.vue';
import TiltCard from '@/Components/Portfolio/TiltCard.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps({
    profile: Object,
    skills: Object,
    projects: Array,
    experiences: Array,
    certificates: Array,
    sections: Array,
    projectCount: Number,
    experienceDuration: String,
});

const currentRoles = computed(() =>
    (props.experiences ?? []).filter((item) => !item.end_date && item.employment_type !== 'Freelance')
);

const skillCategoryOrder = [
    'Backend Engineering',
    'Frontend Engineering',
    'CMS & Commerce',
    'Mobile Development',
];

const toolkit = computed(() =>
    Object.entries(props.skills ?? {}).sort(([a], [b]) => {
        const ia = skillCategoryOrder.indexOf(a);
        const ib = skillCategoryOrder.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    })
);
</script>

<template>
    <Head>
        <title>{{ profile?.name ?? 'Ibrahim Nawab' }} — Laravel & Full Stack Developer</title>
        <meta head-key="description" name="description" :content="profile?.summary">
    </Head>
    <PortfolioLayout :profile="profile">
        <div class="folio-home">
            <section class="editorial-hero immersive-hero">
                <div class="hero-byline">
                    <span><i></i> {{ profile?.availability || 'Full stack developer' }}</span>
                    <span>{{ profile?.location || 'Karachi, Pakistan' }} · Working globally</span>
                </div>
                <div class="immersive-grid">
                    <div class="immersive-copy">
                        <span class="folio-label">IBRAHIM NAWAB / FULL STACK DEVELOPER</span>
                        <h1>Good ideas.<br>Great <em>engineering.</em></h1>
                        <p>I build the platforms behind the experience — Laravel APIs, admin systems, commerce sites and mobile products people rely on every day.</p>
                        <div class="hero-cta-row">
                            <Link href="/work" class="folio-button">Explore selected work <span>↗</span></Link>
                            <Link href="/contact" class="hero-secondary">Let’s talk <span>↗</span></Link>
                        </div>
                        <div class="hero-signature">
                            <img v-if="profile?.photo_path" :src="profile.photo_path" :alt="profile.name" width="48" height="48">
                            <div>
                                <strong>{{ profile?.name }}</strong>
                                <span>Currently at Siin &amp; K-Labs</span>
                            </div>
                            <a v-if="profile?.resume_available" href="/resume">Resume ↓</a>
                        </div>
                    </div>
                    <div class="immersive-object">
                        <span class="object-index">01 — LIVING SYSTEM</span>
                        <ArchitectureScene />
                        <div class="orbit-tag">
                            <span>✦</span>
                            <div>Complex systems.<br><strong>Clear experiences.</strong></div>
                        </div>
                        <span class="object-coordinates">IDEA → SYSTEM → EXPERIENCE</span>
                    </div>
                </div>
                <div class="hero-bottom">
                    <span>BACKEND ENGINEERING <b>✳</b> WEB EXPERIENCES <b>✳</b> MOBILE PRODUCTS</span>
                    <a href="#selected-work">THE WORK BELOW ↓</a>
                </div>
            </section>

            <section class="current-roles" aria-label="Current companies">
                <span class="folio-label">CURRENTLY BUILDING WITH</span>
                <motion.span
                    v-for="(item, index) in currentRoles"
                    :key="item.id"
                    class="role-chip"
                    :initial="{ opacity: 0, y: 12 }"
                    :while-in-view="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true }"
                    :transition="{ delay: index * .06 }"
                    :while-hover="{ y: -3 }"
                >
                    <strong>{{ item.company.replace(/\s*\|.*/, '') }}</strong>
                    <small>{{ item.role }}</small>
                </motion.span>
            </section>

            <section id="selected-work" class="folio-section has-atmosphere">
                <PageAtmosphere tone="work" mode="dots" />
                <Reveal>
                    <header class="folio-section-heading">
                        <span class="folio-label">01 / SELECTED WORK</span>
                        <h2>Built for people.<br><em>Made to work.</em></h2>
                        <div>
                            <p>Web platforms, mobile experiences and the systems behind them — with live links where the product is public.</p>
                            <Link href="/work" class="folio-link">Explore all {{ projectCount }} projects ↗</Link>
                        </div>
                    </header>
                </Reveal>
                <div class="editorial-projects">
                    <motion.div
                        v-for="(project, index) in projects"
                        :key="project.id"
                        :initial="{ opacity: 0, y: 30 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :viewport="{ once: true, amount: .2 }"
                        :transition="{ delay: Math.min(index * .05, .2) }"
                    >
                        <TiltCard :max="9">
                            <Link
                                :href="`/work/${project.slug}`"
                                class="editorial-project"
                                :class="`work-tone-${index % 3}`"
                            >
                                <ProjectCover :project="project" :index="index" />
                                <div class="work-caption">
                                    <h3>{{ project.title }}</h3>
                                    <span>{{ project.company || project.category }}</span>
                                </div>
                                <p>{{ project.summary }}</p>
                                <div class="work-meta-row">
                                    <span v-for="tech in (project.tech_stack ?? []).slice(0, 3)" :key="tech">{{ tech }}</span>
                                    <em v-if="project.live_url">Live ↗</em>
                                </div>
                            </Link>
                        </TiltCard>
                    </motion.div>
                </div>
                <p v-if="!projects?.length">Selected projects are being prepared.</p>
            </section>

            <section id="about" class="folio-about folio-section has-atmosphere">
                <PageAtmosphere tone="about" mode="beams" />
                <span class="folio-label">02 / BEYOND THE CODE</span>
                <div>
                    <Reveal>
                        <h2>Technical depth.<br><em>Human perspective.</em></h2>
                        <p>{{ profile?.bio }}</p>
                        <Link href="/about" class="folio-link">The story so far ↗</Link>
                    </Reveal>
                </div>
                <aside>
                    <Reveal :delay="0.08">
                        <strong>{{ experienceDuration }}</strong>
                        <span>Since my first professional role</span>
                        <strong>{{ projectCount }}</strong>
                        <span>Projects in this portfolio</span>
                    </Reveal>
                </aside>
            </section>

            <section id="skills" class="folio-section toolkit-section has-atmosphere">
                <PageAtmosphere tone="experience" mode="mist" />
                <Reveal>
                    <header class="folio-section-heading toolkit-heading">
                        <span class="folio-label">03 / MY TOOLKIT</span>
                        <h2>From first click<br><em>to final query.</em></h2>
                        <p>One connected approach across backend, interface, commerce and mobile — measured by what ships.</p>
                    </header>
                </Reveal>
                <div class="toolkit-grid">
                    <Reveal
                        v-for="([category, items], index) in toolkit"
                        :key="category"
                        :delay="Math.min(index * 0.06, 0.24)"
                    >
                        <TiltCard :max="8">
                            <article class="toolkit-card">
                                <header>
                                    <span>{{ String(index + 1).padStart(2, '0') }}</span>
                                    <div>
                                        <h3>{{ category }}</h3>
                                        <small>{{ items.length }} tools in active use</small>
                                    </div>
                                </header>
                                <ul>
                                    <li v-for="skill in items" :key="skill.id">
                                        <div class="toolkit-skill-meta">
                                            <strong>{{ skill.name }}</strong>
                                            <em>{{ skill.proficiency }}%</em>
                                        </div>
                                        <div class="toolkit-bar" aria-hidden="true">
                                            <i :style="{ width: `${skill.proficiency}%` }"></i>
                                        </div>
                                    </li>
                                </ul>
                            </article>
                        </TiltCard>
                    </Reveal>
                </div>
            </section>

            <section v-for="section in sections" :key="section.id" class="folio-section custom-section has-atmosphere">
                <PageAtmosphere tone="default" mode="mist" />
                <Reveal>
                    <span class="folio-label">{{ section.eyebrow }}</span>
                    <h2>{{ section.title }}</h2>
                    <p>{{ section.body }}</p>
                    <a v-if="section.link_url" :href="section.link_url" class="folio-link">{{ section.link_label || 'Read more' }} ↗</a>
                </Reveal>
            </section>

            <section v-if="certificates?.length" id="certificates" class="folio-section has-atmosphere">
                <PageAtmosphere tone="about" mode="dots" />
                <Reveal>
                    <header class="folio-section-heading">
                        <span class="folio-label">04 / ALWAYS LEARNING</span>
                        <h2>A foundation.<br><em>Never a finish line.</em></h2>
                    </header>
                </Reveal>
                <div class="folio-certificates">
                    <Reveal
                        v-for="(certificate, index) in certificates"
                        :key="certificate.id"
                        :delay="Math.min(index * 0.05, 0.18)"
                    >
                        <TiltCard :max="7">
                            <article class="certificate-card">
                                <h3>{{ certificate.title }}</h3>
                                <span>{{ certificate.issuer }}</span>
                                <a v-if="certificate.credential_url" :href="certificate.credential_url" target="_blank" rel="noreferrer" class="folio-link">View credential ↗</a>
                            </article>
                        </TiltCard>
                    </Reveal>
                </div>
            </section>

            <section class="folio-contact has-atmosphere">
                <PageAtmosphere tone="contact" mode="orbs" />
                <Reveal>
                    <span class="folio-label">YOUR NEXT CHAPTER STARTS HERE</span>
                    <h2>Have a good<br><em>challenge?</em><span>↗</span></h2>
                    <div>
                        <Link href="/contact" class="folio-button">Let’s build something <span>↗</span></Link>
                        <a v-if="profile?.email" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
                    </div>
                </Reveal>
            </section>
        </div>
    </PortfolioLayout>
</template>
