<script setup>
defineProps({
    modelValue: { type: String, default: 'list' },
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="view-toggle" role="group" aria-label="View mode">
        <button type="button" :class="{ active: modelValue === 'list' }" @click="$emit('update:modelValue', 'list')">List</button>
        <button type="button" :class="{ active: modelValue === 'grid' }" @click="$emit('update:modelValue', 'grid')">Grid</button>
        <button type="button" :class="{ active: modelValue === 'table' }" @click="$emit('update:modelValue', 'table')">Table</button>
    </div>
</template>
