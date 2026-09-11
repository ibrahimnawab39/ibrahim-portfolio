<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="account-shell">
        <aside class="account-sidebar">
            <Link href="/admin" class="admin-brand">IBRAHIM<span>.</span><small>Portfolio CMS</small></Link>
            <nav>
                <Link href="/admin">← CMS overview</Link>
                <Link href="/admin">Website content</Link>
                <Link href="/profile" class="active">Account & security</Link>
                <Link href="/" target="_blank">View website ↗</Link>
            </nav>
            <Link href="/logout" method="post" as="button" class="account-logout">Sign out</Link>
        </aside>
        <main class="account-main">
            <header class="account-topbar">
                <div><small>Administration</small><strong>{{ $page.props.auth.user.name }}</strong></div>
                <span class="admin-status"><i></i>Secure session</span>
            </header>
            <slot />
        </main>
    </div>
</template>
