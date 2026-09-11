<script setup>
import { computed } from 'vue';

const props = defineProps({
    tone: { type: String, default: 'default' },
    /** orbs | dots | beams | mist */
    mode: { type: String, default: '' },
});

const resolved = computed(() => {
    if (props.mode) return props.mode;
    return ({
        about: 'beams',
        work: 'dots',
        experience: 'mist',
        contact: 'orbs',
        default: 'mist',
    })[props.tone] || 'mist';
});
</script>

<template>
    <div class="page-atmosphere" :class="[`tone-${tone}`, `mode-${resolved}`]" aria-hidden="true">
        <template v-if="resolved === 'dots'">
            <span class="dot-field"></span>
            <span class="dot-glow"></span>
        </template>
        <template v-else-if="resolved === 'beams'">
            <span class="beam beam-a"></span>
            <span class="beam beam-b"></span>
            <span class="beam beam-c"></span>
            <span class="grid-fade"></span>
        </template>
        <template v-else-if="resolved === 'mist'">
            <span class="mist mist-a"></span>
            <span class="mist mist-b"></span>
            <span class="grid-fade soft"></span>
        </template>
        <template v-else>
            <span class="orb orb-a"></span>
            <span class="orb orb-b"></span>
            <span class="atmos-ring ring-a"></span>
            <span class="grid-fade"></span>
        </template>
    </div>
</template>
