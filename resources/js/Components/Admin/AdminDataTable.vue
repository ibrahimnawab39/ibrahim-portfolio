<script setup>
defineProps({
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    sortKey: { type: String, default: '' },
    sortDir: { type: String, default: 'asc' },
    emptyText: { type: String, default: 'No records found.' },
});

defineEmits(['sort']);
</script>

<template>
    <div class="admin-table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th
                        v-for="column in columns"
                        :key="column.key"
                        :class="{ sortable: column.sortable, sorted: sortKey === column.key }"
                        @click="column.sortable && $emit('sort', column.key)"
                    >
                        <span>{{ column.label }}</span>
                        <em v-if="column.sortable && sortKey === column.key">{{ sortDir === 'asc' ? '↑' : '↓' }}</em>
                    </th>
                    <th v-if="$slots.actions" class="col-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="!rows.length">
                    <td :colspan="columns.length + ($slots.actions ? 1 : 0)" class="admin-table-empty">{{ emptyText }}</td>
                </tr>
                <tr v-for="(row, index) in rows" :key="row.id ?? index">
                    <td v-for="column in columns" :key="column.key">
                        <slot :name="`cell-${column.key}`" :row="row">{{ row[column.key] }}</slot>
                    </td>
                    <td v-if="$slots.actions" class="col-actions">
                        <div class="record-actions">
                            <slot name="actions" :row="row" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
