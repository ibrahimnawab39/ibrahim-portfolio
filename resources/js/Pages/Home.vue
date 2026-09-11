<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { motion } from 'motion-v';

defineProps({ profile: Object, skills: Object, projects: Array, experiences: Array, certificates: Array, projectCount: Number, experienceDuration: String });

const year = (item) => item.start_date
    ? `${new Date(item.start_date).getFullYear()} — ${item.end_date ? new Date(item.end_date).getFullYear() : 'Now'}`
    : 'Professional experience';
const reveal = { initial: { opacity: 1, y: 36 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: .18 }, transition: { duration: .7 } };
</script>

<template>
    <Head>
        <title>{{ profile?.name }} — Laravel Product Engineer</title>
        <meta name="description" :content="profile?.summary">
    </Head>

    <PortfolioLayout :profile="profile">
        <div class="portfolio-grid">
            <motion.aside
                class="identity-card"
                :initial="{ opacity: 0, x: -30 }"
                :animate="{ opacity: 1, x: 0 }"
                :transition="{ duration: .8 }"
            >
                <div class="identity-art">
                    <img v-if="profile?.photo_path" :src="profile.photo_path" :alt="profile.name">
                </div>
                <div class="identity-top">
                    <span class="seal">IN</span>
                    <div class="social-mini">
                        <a v-if="profile?.linkedin_url" :href="profile.linkedin_url" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
                        <a v-if="profile?.github_url && !profile.github_url.endsWith('github.com/')" :href="profile.github_url" target="_blank" rel="noreferrer" aria-label="GitHub">gh</a>
                    </div>
                </div>
                <div class="identity-copy">
                    <span class="available"><i></i>{{ profile?.availability ?? 'Available for selected work' }}</span>
                    <h2>Hey, I’m Ibrahim.</h2>
                    <p>{{ profile?.headline ?? 'Laravel product engineer and technology consultant based in Karachi, working globally.' }}</p>
                    <div class="identity-actions">
                        <Link href="/contact" class="pill">Let’s talk ↗</Link>
                        <Link href="/experience" class="pill alt">Experience</Link>
                    </div>
                </div>
            </motion.aside>

            <div class="portfolio-content">
                <section class="hero-panel">
                    <motion.span class="eyebrow" :initial="{ opacity: 0, y: 15 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .15 }">
                        Product engineering · infrastructure
                    </motion.span>
                    <motion.h1 :initial="{ opacity: 0, y: 45 }" :animate="{ opacity: 1, y: 0 }" :transition="{ duration: .8, delay: .1 }">
                        I build <em>Laravel systems</em> businesses remember.
                    </motion.h1>
                    <motion.p :initial="{ opacity: 0 }" :animate="{ opacity: 1 }" :transition="{ duration: .8, delay: .45 }">{{ profile?.summary }}</motion.p>
                    <motion.div class="hero-stats" :initial="{ opacity: 0, y: 25 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .55 }">
                        <div><strong>{{ experienceDuration }}</strong><span>Professional experience</span></div>
                        <div><strong>{{ projectCount }}</strong><span>Portfolio projects</span></div>
                        <div><strong>360°</strong><span>Product to infrastructure</span></div>
                    </motion.div>
                    <a href="#about" class="scroll-cue"><span></span>Scroll to explore</a>
                </section>

                <motion.section id="about" class="pf-section" v-bind="reveal">
                    <span class="section-kicker">01 / About</span>
                    <h2>Engineering clarity into complex operations.</h2>
                    <p class="about-copy">{{ profile?.bio }}</p>
                    <Link href="/about" class="text-link">More about my approach <span>↗</span></Link>
                </motion.section>

                <section id="experience" class="pf-section">
                    <span class="section-kicker">02 / Education & experience</span>
                    <h2>Built inside real businesses.</h2>
                    <div class="timeline">
                        <motion.article
                            v-for="(item, index) in experiences"
                            :key="item.id"
                            :initial="{ opacity: 1, x: 30 }"
                            :while-in-view="{ opacity: 1, x: 0 }"
                            :viewport="{ once: true, amount: .3 }"
                            :transition="{ delay: index * .08 }"
                        >
                            <time>{{ year(item) }}</time>
                            <div><small>{{ item.company }}<template v-if="item.employment_type"> · {{ item.employment_type }}</template><template v-if="item.work_mode"> · {{ item.work_mode }}</template> · {{ item.location }}</small><h3>{{ item.role }}</h3><p>{{ item.description }}</p></div>
                        </motion.article>
                    </div>
                    <Link href="/experience" class="text-link">View complete experience <span>↗</span></Link>
                </section>

                <section id="work" class="pf-section">
                    <span class="section-kicker">03 / Work highlights</span>
                    <h2>Systems designed for the real world.</h2>
                    <div class="projects">
                        <motion.article
                            v-for="(project, index) in projects"
                            :key="project.id"
                            class="project"
                            :initial="{ opacity: 1, y: 50 }"
                            :while-in-view="{ opacity: 1, y: 0 }"
                            :while-hover="{ y: -6 }"
                            :viewport="{ once: true, amount: .15 }"
                            :transition="{ duration: .55 }"
                        >
                            <div class="project-copy">
                                <small>0{{ index + 1 }} · {{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small>
                                <h3>{{ project.title }}</h3>
                                <p>{{ project.summary }}</p>
                                <div class="tags"><span v-for="tech in project.tech_stack" :key="tech">{{ tech }}</span></div>
                                <Link :href="`/work/${project.slug}`" class="project-link" :aria-label="`Explore ${project.title} case study`">Explore case study <b>↗</b></Link>
                            </div>
                            <Link :href="`/work/${project.slug}`" class="project-visual" tabindex="-1" aria-hidden="true">
                                <img v-if="project.image_path" :src="project.image_path" alt="">
                                <span class="project-number">0{{ index + 1 }}</span>
                                <span class="visual-title">{{ project.title }}</span>
                            </Link>
                        </motion.article>
                    </div>
                    <Link href="/work" class="all-work">View all selected work <span>{{ projectCount }} projects</span> ↗</Link>
                </section>

                <section id="skills" class="pf-section">
                    <span class="section-kicker">04 / Technology stack</span>
                    <h2>Depth across every critical layer.</h2>
                    <div class="skills-grid">
                        <motion.div
                            v-for="(items, category, index) in skills"
                            :key="category"
                            class="skill-group"
                            :initial="{ opacity: 1, y: 25 }"
                            :while-in-view="{ opacity: 1, y: 0 }"
                            :viewport="{ once: true }"
                            :transition="{ delay: index * .08 }"
                        >
                            <h3>{{ category }}</h3>
                            <ul><li v-for="skill in items" :key="skill.id"><span>{{ skill.name }}</span><b>{{ skill.proficiency }}%</b></li></ul>
                        </motion.div>
                    </div>
                </section>

                <section id="certificates" class="pf-section">
                    <span class="section-kicker">05 / Education & recognition</span>
                    <h2>Learning backed by practical delivery.</h2>
                    <div class="certificate-grid">
                        <motion.article v-for="(certificate, index) in certificates" :key="certificate.id" :initial="{ opacity: 1, y: 25 }" :while-in-view="{ opacity: 1, y: 0 }" :viewport="{ once: true }">
                            <span>0{{ index + 1 }}</span><small>{{ certificate.issuer }}</small><h3>{{ certificate.title }}</h3><p>{{ certificate.description }}</p><a v-if="certificate.credential_url" :href="certificate.credential_url" target="_blank" rel="noreferrer">View credential ↗</a>
                        </motion.article>
                    </div>
                </section>

                <motion.section id="contact" class="pf-section" v-bind="reveal">
                    <div class="contact-box">
                        <span class="section-kicker">06 / Available now</span>
                        <h2>Have a product or operation that needs stronger engineering?</h2>
                        <p>Let’s turn complexity into a dependable product your team can grow with.</p>
                        <Link href="/contact" class="pill">Start a conversation ↗</Link>
                    </div>
                </motion.section>
            </div>
        </div>
    </PortfolioLayout>
</template>
