<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import AmbientScene from '@/Components/Portfolio/AmbientScene.vue';
import PageAtmosphere from '@/Components/Portfolio/PageAtmosphere.vue';
import CompanyLogo from '@/Components/Portfolio/CompanyLogo.vue';
import Reveal from '@/Components/Portfolio/Reveal.vue';
import TiltCard from '@/Components/Portfolio/TiltCard.vue';
import { Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import { motion } from 'motion-v';

const props = defineProps({ profile: Object, skills: Object, experiences: Array, certificates: Array });

const skillCategoryOrder = ['Backend Engineering', 'Frontend Engineering', 'CMS & Commerce', 'Mobile Development'];

const layers = computed(() =>
    Object.entries(props.skills ?? {})
        .sort(([a], [b]) => {
            const ia = skillCategoryOrder.indexOf(a);
            const ib = skillCategoryOrder.indexOf(b);
            return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
        })
        .map(([category, items]) => ({
            category,
            names: items.map((item) => item.name).join(' · '),
        }))
);

const studios = computed(() => {
    const seen = new Set();
    return (props.experiences ?? [])
        .filter((item) => item.employment_type !== 'Freelance')
        .map((item) => ({
            name: item.company.replace(/\s*\|.*/, '').trim(),
            logo: item.logo_path,
            href: item.company_url || '/experience',
            external: !!item.company_url,
            role: item.role,
        }))
        .filter((item) => {
            if (seen.has(item.name)) return false;
            seen.add(item.name);
            return true;
        });
});
</script>

<template>
    <PortfolioLayout :profile="profile">
        <div class="inner-page about-page has-atmosphere">
            <PageAtmosphere tone="about" mode="beams" />

            <header class="page-hero page-hero-split about-hero-split">
                <div>
                    <motion.span class="section-kicker" :initial="{ opacity: 0, y: 10 }" :animate="{ opacity: 1, y: 0 }">01 / About</motion.span>
                    <motion.p class="about-name" :initial="{ opacity: 0, y: 18 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .05 }">
                        {{ profile?.name || 'Ibrahim Nawab' }}
                    </motion.p>
                    <motion.h1 :initial="{ opacity: 0, y: 28 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .65 }">
                        Platforms people <em>actually rely on.</em>
                    </motion.h1>
                    <motion.p :initial="{ opacity: 0, y: 16 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .12 }">
                        {{ profile?.summary }}
                    </motion.p>
                    <motion.div class="about-hero-meta" :initial="{ opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .18 }">
                        <span>{{ profile?.location || 'Karachi, Pakistan' }}</span>
                        <span>{{ profile?.years_experience ?? 6 }}+ years</span>
                        <span>{{ profile?.availability || 'Available for selected projects' }}</span>
                    </motion.div>
                    <motion.div class="about-hero-actions" :initial="{ opacity: 0, y: 12 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .22 }">
                        <Link href="/work" class="folio-button">See selected work <span>↗</span></Link>
                        <Link href="/contact" class="hero-secondary">Let’s talk <span>↗</span></Link>
                    </motion.div>
                </div>

                <motion.div
                    :initial="{ opacity: 0, scale: .94 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ duration: .75, delay: .08 }"
                >
                    <TiltCard :max="6" class="about-portrait-tilt">
                        <figure class="about-portrait-frame">
                            <img
                                v-if="profile?.photo_path"
                                :src="profile.photo_path"
                                :alt="profile.name"
                            >
                            <div v-else class="about-portrait-fallback">IN</div>
                        </figure>
                    </TiltCard>
                </motion.div>
            </header>

            <section class="about-bio">
                <div class="about-bio-split">
                    <Reveal>
                        <span class="folio-label">02 / STORY</span>
                        <h2>I build the systems<br><em>behind the experience.</em></h2>
                        <p class="lead-copy">{{ profile?.bio }}</p>
                    </Reveal>
                    <motion.div
                        class="section-scene"
                        :initial="{ opacity: 0, scale: .92 }"
                        :while-in-view="{ opacity: 1, scale: 1 }"
                        :viewport="{ once: true, amount: .35 }"
                        :transition="{ duration: .7 }"
                    >
                        <AmbientScene tone="about" variant="shards" />
                    </motion.div>
                </div>
                <div class="about-focus">
                    <motion.article
                        v-for="(point, index) in [
                            { title: 'Systems thinking', copy: 'APIs, admin tools, commerce and mobile treated as one product — not separate deliveries.' },
                            { title: 'Operational focus', copy: 'Work starts from real constraints: reliability, clarity and the people who use the system daily.' },
                            { title: 'End-to-end ownership', copy: 'From first interaction to deployment — architecture, interface and infrastructure stay coherent.' },
                        ]"
                        :key="point.title"
                        :initial="{ opacity: 0, y: 18 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :viewport="{ once: true, amount: .4 }"
                        :transition="{ delay: index * 0.06 }"
                    >
                        <span>{{ String(index + 1).padStart(2, '0') }}</span>
                        <h3>{{ point.title }}</h3>
                        <p>{{ point.copy }}</p>
                    </motion.article>
                </div>
            </section>

            <section class="about-studios">
                <Reveal>
                    <header class="about-section-head">
                        <span class="folio-label">03 / STUDIOS</span>
                        <h2>Where the craft<br><em>has been practiced.</em></h2>
                    </header>
                </Reveal>
                <div class="about-studio-rail">
                    <TiltCard
                        v-for="(studio, index) in studios"
                        :key="studio.name"
                        :max="8"
                    >
                        <a
                            :href="studio.href"
                            class="about-studio-item"
                            :target="studio.external ? '_blank' : undefined"
                            :rel="studio.external ? 'noreferrer' : undefined"
                        >
                            <motion.span
                                :initial="{ opacity: 0, y: 12 }"
                                :while-in-view="{ opacity: 1, y: 0 }"
                                :viewport="{ once: true }"
                                :transition="{ delay: Math.min(index * 0.04, 0.28) }"
                            >
                                <CompanyLogo :src="studio.logo" :name="studio.name" size="md" />
                                <strong>{{ studio.name }}</strong>
                                <small>{{ studio.role }}</small>
                            </motion.span>
                        </a>
                    </TiltCard>
                </div>
                <p class="about-platform-note">
                    Also delivering through
                    <a href="https://www.freelancer.com/" target="_blank" rel="noreferrer">Freelancer.com</a>
                    ·
                    <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer">Fiverr</a>
                </p>
            </section>

            <section class="about-layers">
                <Reveal>
                    <header class="about-section-head">
                        <span class="folio-label">04 / STACK</span>
                        <h2>One partner across<br><em>the critical layers.</em></h2>
                    </header>
                </Reveal>
                <div class="about-layer-list">
                    <motion.article
                        v-for="(layer, index) in layers"
                        :key="layer.category"
                        :initial="{ opacity: 0, x: -14 }"
                        :while-in-view="{ opacity: 1, x: 0 }"
                        :viewport="{ once: true, amount: .4 }"
                        :transition="{ delay: index * 0.05 }"
                        :while-hover="{ x: 6 }"
                    >
                        <span>{{ String(index + 1).padStart(2, '0') }}</span>
                        <h3>{{ layer.category }}</h3>
                        <p>{{ layer.names }}</p>
                    </motion.article>
                </div>
            </section>

            <section v-if="certificates?.length" class="about-certs">
                <Reveal>
                    <header class="about-section-head">
                        <span class="folio-label">05 / FOUNDATION</span>
                        <h2>Education that<br><em>supports the craft.</em></h2>
                    </header>
                </Reveal>
                <div class="about-cert-list">
                    <motion.article
                        v-for="(certificate, index) in certificates"
                        :key="certificate.id"
                        :initial="{ opacity: 0, y: 16 }"
                        :while-in-view="{ opacity: 1, y: 0 }"
                        :viewport="{ once: true, amount: .35 }"
                        :transition="{ delay: index * 0.05 }"
                        :while-hover="{ x: 6 }"
                    >
                        <span>{{ String(index + 1).padStart(2, '0') }}</span>
                        <div>
                            <small>{{ certificate.issuer }}</small>
                            <h3>{{ certificate.title }}</h3>
                            <p>{{ certificate.description }}</p>
                        </div>
                        <a
                            v-if="certificate.credential_url"
                            :href="certificate.credential_url"
                            target="_blank"
                            rel="noreferrer"
                        >Credential ↗</a>
                    </motion.article>
                </div>
            </section>

            <Reveal>
                <section class="page-cta page-cta-split">
                    <div class="page-cta-copy">
                        <span>Next</span>
                        <h2>Now see how the thinking becomes product.</h2>
                        <div class="about-hero-actions">
                            <Link href="/experience" class="folio-button">Explore experience <span>↗</span></Link>
                            <Link href="/work" class="hero-secondary">Selected work <span>↗</span></Link>
                        </div>
                    </div>
                    <div class="cta-scene" aria-hidden="true">
                        <AmbientScene tone="about" variant="shards" />
                    </div>
                </section>
            </Reveal>
        </div>
    </PortfolioLayout>
</template>
