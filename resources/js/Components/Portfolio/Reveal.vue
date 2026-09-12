<script setup>
import { motion } from 'motion-v';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
    as: { type: String, default: 'div' },
    delay: { type: Number, default: 0 },
    y: { type: Number, default: 28 },
    amount: { type: Number, default: 0.2 },
    once: { type: Boolean, default: true },
});

const inview = ref(false);
const root = ref(null);
let observer;

onMounted(() => {
    const el = root.value?.$el ?? root.value;
    if (!el || typeof IntersectionObserver === 'undefined') {
        inview.value = true;
        return;
    }
    observer = new IntersectionObserver(
        ([entry]) => {
            if (!entry?.isIntersecting) return;
            inview.value = true;
            if (props.once) observer?.disconnect();
        },
        { threshold: Math.min(Math.max(props.amount, 0.05), 1) },
    );
    observer.observe(el);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <motion.div
        ref="root"
        :as="as"
        class="folio-reveal"
        :class="{ 'is-inview': inview }"
        :initial="{ opacity: 0, y }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once, amount }"
        :transition="{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }"
    >
        <slot />
    </motion.div>
</template>
