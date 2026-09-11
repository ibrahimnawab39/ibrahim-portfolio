<script setup>
import { computed } from 'vue';

const props = defineProps({
    src: { type: String, default: null },
    name: { type: String, default: '' },
    size: { type: String, default: 'md' },
});

const initials = computed(() => {
    const clean = (props.name || '').replace(/\s*\|.*/, '').trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (!parts.length) return '•';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
});
</script>

<template>
    <div class="company-logo" :class="`size-${size}`" :title="name">
        <img v-if="src" :src="src" :alt="name" loading="lazy">
        <span v-else>{{ initials }}</span>
    </div>
</template>
