<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

defineProps({ canResetPassword: Boolean, status: String });
const form = useForm({ email: '', password: '', remember: false });
const submit = () => form.post(route('login'), { onFinish: () => form.reset('password') });
</script>

<template>
    <GuestLayout>
        <Head title="Admin Login" />
        <span class="auth-kicker">Portfolio administration</span>
        <h2>Welcome back.</h2>
        <p class="auth-intro">Sign in to manage projects, experience, certificates, skills and enquiries.</p>
        <div v-if="status" class="auth-status">{{ status }}</div>
        <form class="auth-form" @submit.prevent="submit">
            <label><span>Email address</span><input v-model="form.email" type="email" required autofocus autocomplete="username" placeholder="admin@example.com"><small v-if="form.errors.email">{{ form.errors.email }}</small></label>
            <label><span>Password</span><input v-model="form.password" type="password" required autocomplete="current-password" placeholder="Your password"><small v-if="form.errors.password">{{ form.errors.password }}</small></label>
            <div class="auth-options"><label><input v-model="form.remember" type="checkbox"> Remember me</label><Link v-if="canResetPassword" :href="route('password.request')">Forgot password?</Link></div>
            <button type="submit" :disabled="form.processing"><span>{{ form.processing ? 'Signing in…' : 'Sign in to CMS' }}</span><b>↗</b></button>
        </form>
    </GuestLayout>
</template>
