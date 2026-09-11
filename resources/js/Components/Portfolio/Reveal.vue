<script setup>
import { motion } from 'motion-v';

defineProps({
    as: { type: String, default: 'div' },
    delay: { type: Number, default: 0 },
    y: { type: Number, default: 28 },
    amount: { type: Number, default: 0.2 },
    once: { type: Boolean, default: true },
});
</script>

<template>
    <motion.div
        :as="as"
        :initial="{ opacity: 0, y }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once, amount }"
        :transition="{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }"
    >
        <slot />
    </motion.div>
</template>
