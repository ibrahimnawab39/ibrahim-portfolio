<script setup>
import { computed } from 'vue';
import { pageNumbers } from '@/Composables/useAdminPager';

const props = defineProps({
    page: { type: Number, required: true },
    pages: { type: Number, required: true },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 12 },
});

const emit = defineEmits(['update:page', 'update:pageSize']);

const numbers = computed(() => pageNumbers(props.page, props.pages));
</script>

<template>
    <div class="admin-pager" v-if="total > 0">
        <div class="admin-pager-size">
            <span>Show</span>
            <select :value="pageSize" @change="emit('update:pageSize', Number($event.target.value))">
                <option :value="6">6</option>
                <option :value="12">12</option>
                <option :value="24">24</option>
            </select>
            <span>of {{ total }}</span>
        </div>
        <div v-if="pages > 1" class="admin-pager-nav">
            <button type="button" :disabled="page <= 1" @click="emit('update:page', page - 1)">←</button>
            <template v-for="(item, index) in numbers" :key="`${item}-${index}`">
                <span v-if="item === '…'" class="admin-pager-ellipsis">…</span>
                <button
                    v-else
                    type="button"
                    :class="{ active: item === page }"
                    @click="emit('update:page', item)"
                >{{ item }}</button>
            </template>
            <button type="button" :disabled="page >= pages" @click="emit('update:page', page + 1)">→</button>
        </div>
    </div>
</template>
