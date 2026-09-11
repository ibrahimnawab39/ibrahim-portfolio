<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="auth-shell">
        <section class="auth-visual">
            <Link href="/" class="auth-brand">IBRAHIM<span>.</span><small>Portfolio CMS</small></Link>
            <div>
                <span>Secure content management</span>
                <h1>Your work.<br><em>Your story.</em><br>One dashboard.</h1>
                <p>Manage the portfolio without touching code. Every saved change updates the Laravel + Inertia website.</p>
            </div>
            <footer>Laravel · Vue 3 · Inertia</footer>
        </section>
        <main class="auth-panel">
            <div class="auth-card"><slot /></div>
            <Link href="/" class="auth-back">← Back to portfolio</Link>
        </main>
    </div>
</template>
