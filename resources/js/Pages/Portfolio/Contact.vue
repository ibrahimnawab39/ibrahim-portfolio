<script setup>
import PortfolioLayout from '@/Layouts/PortfolioLayout.vue';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { motion } from 'motion-v';

defineProps({ profile: Object });
const page = usePage();
const success = computed(() => page.props.flash?.success);
const form = useForm({ name: '', email: '', company: '', budget: '', message: '' });
const submit = () => form.post('/contact', { preserveScroll: true, onSuccess: () => form.reset() });
</script>

<template>
    <Head>
        <title>Start a Project — Ibrahim Nawab</title>
        <meta head-key="description" name="description" content="Discuss a Laravel product, operational platform or infrastructure project with Ibrahim Nawab.">
    </Head>
    <PortfolioLayout :profile="profile">
        <div class="contact-page">
            <motion.aside :initial="{ opacity: 0, x: -25 }" :animate="{ opacity: 1, x: 0 }">
                <span class="section-kicker">04 / Start a conversation</span>
                <h1>Let’s build something <em>worth relying on.</em></h1>
                <p>Tell me what you are solving, where the friction lives and what a successful outcome looks like.</p>
                <div class="contact-details">
                    <div><small>Email</small><a :href="`mailto:${profile?.email}`">{{ profile?.email }}</a></div>
                    <div><small>Location</small><span>{{ profile?.location ?? 'Karachi, Pakistan' }} · Working globally</span></div>
                    <div><small>Availability</small><span class="available"><i></i>{{ profile?.availability }}</span></div>
                </div>
            </motion.aside>

            <motion.form class="project-form" @submit.prevent="submit" :initial="{ opacity: 0, y: 30 }" :animate="{ opacity: 1, y: 0 }" :transition="{ delay: .15 }" novalidate>
                <div v-if="success" class="form-success" role="status">{{ success }}</div>

                <div class="form-grid">
                    <label><span>Name *</span><input v-model="form.name" type="text" autocomplete="name" placeholder="Your name" :aria-invalid="!!form.errors.name"><small v-if="form.errors.name">{{ form.errors.name }}</small></label>
                    <label><span>Email *</span><input v-model="form.email" type="email" autocomplete="email" placeholder="you@company.com" :aria-invalid="!!form.errors.email"><small v-if="form.errors.email">{{ form.errors.email }}</small></label>
                </div>
                <div class="form-grid">
                    <label><span>Company</span><input v-model="form.company" type="text" autocomplete="organization" placeholder="Company or project"><small v-if="form.errors.company">{{ form.errors.company }}</small></label>
                    <label><span>Estimated budget</span><select v-model="form.budget"><option value="">Select a range</option><option>$2k — $5k</option><option>$5k — $10k</option><option>$10k — $25k</option><option>$25k+</option></select><small v-if="form.errors.budget">{{ form.errors.budget }}</small></label>
                </div>
                <label><span>What are we building? *</span><textarea v-model="form.message" rows="7" placeholder="The problem, current setup, goals and ideal timeline…" :aria-invalid="!!form.errors.message"></textarea><small v-if="form.errors.message">{{ form.errors.message }}</small></label>
                <button class="submit-button" type="submit" :disabled="form.processing"><span>{{ form.processing ? 'Sending…' : 'Send project brief' }}</span><b>↗</b></button>
                <p class="form-note">Your details stay private. Typical response time: 1–2 business days.</p>
            </motion.form>
        </div>
    </PortfolioLayout>
</template>
