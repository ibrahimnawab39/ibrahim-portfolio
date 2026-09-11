<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
    max: { type: Number, default: 8 },
    glare: { type: Boolean, default: true },
});

const root = ref(null);
const transform = ref('perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)');
const glareStyle = ref({ opacity: 0 });
const enabled = ref(false);
const tilting = ref(false);

const onMove = (event) => {
    if (!enabled.value || !root.value) return;
    tilting.value = true;
    const rect = root.value.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    const rotateY = (x - 0.5) * props.max * 1.6;
    const rotateX = (0.5 - y) * props.max * 1.4;
    transform.value = `perspective(1100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0,-6px,18px)`;
    glareStyle.value = {
        opacity: 0.28,
        background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.4), transparent 55%)`,
    };
};

const onLeave = () => {
    tilting.value = false;
    transform.value = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)';
    glareStyle.value = { opacity: 0 };
};

onMounted(() => {
    enabled.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
});
</script>

<template>
    <div
        ref="root"
        class="tilt-card"
        :class="{ 'is-enabled': enabled, 'is-tilting': tilting }"
        @pointermove="onMove"
        @pointerleave="onLeave"
    >
        <div class="tilt-card-inner" :style="{ transform }">
            <slot />
            <span v-if="glare" class="tilt-card-glare" aria-hidden="true" :style="glareStyle" />
        </div>
    </div>
</template>
