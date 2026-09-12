<script setup>
import { Link } from '@inertiajs/vue3';

defineProps({
    active: { type: String, required: true },
    collapsed: { type: Boolean, default: false },
    items: { type: Array, required: true },
    unreadMessages: { type: Number, default: 0 },
    linkedInConnected: { type: Boolean, default: false },
});

const emit = defineEmits(['update:collapsed', 'navigate']);
</script>

<template>
    <aside class="admin-sidebar" :class="{ 'is-collapsed': collapsed }">
        <div class="admin-side-top">
            <Link href="/" class="admin-brand" :title="collapsed ? 'Ibrahim Portfolio CMS' : undefined">
                <template v-if="collapsed">IB<span>.</span></template>
                <template v-else>IBRAHIM<span>.</span><small>Portfolio CMS</small></template>
            </Link>
            <button
                type="button"
                class="admin-collapse-btn"
                :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
                :title="collapsed ? 'Expand' : 'Collapse'"
                @click="emit('update:collapsed', !collapsed)"
            >{{ collapsed ? '»' : '«' }}</button>
        </div>

        <nav>
            <button
                v-for="item in items"
                :key="item.id"
                type="button"
                :class="{ active: active === item.id }"
                :title="collapsed ? item.label : undefined"
                @click="emit('navigate', item.id)"
            >
                <i class="nav-glyph">{{ item.glyph }}</i>
                <span class="nav-label">{{ item.label }}</span>
                <b v-if="item.id === 'messages' && unreadMessages" class="nav-badge">{{ unreadMessages }}</b>
                <em v-else-if="item.id === 'linkedin'" class="nav-dot" :class="{ on: linkedInConnected }" />
            </button>
        </nav>

        <div class="admin-side-foot">
            <Link href="/" target="_blank" :title="collapsed ? 'View website' : undefined">
                <i class="nav-glyph">↗</i><span class="nav-label">View website</span>
            </Link>
            <Link href="/profile" :title="collapsed ? 'Account' : undefined">
                <i class="nav-glyph">⚙</i><span class="nav-label">Account settings</span>
            </Link>
            <Link href="/logout" method="post" as="button" :title="collapsed ? 'Sign out' : undefined">
                <i class="nav-glyph">⎋</i><span class="nav-label">Sign out</span>
            </Link>
        </div>
    </aside>
</template>
