import { computed, ref, unref, watch } from 'vue';

export function usePageSize(storageKey = 'admin-page-size', fallback = 12) {
    const pageSize = ref(fallback);
    try {
        const stored = Number(localStorage.getItem(storageKey));
        if ([6, 12, 24].includes(stored)) pageSize.value = stored;
    } catch {}

    const setPageSize = (size) => {
        pageSize.value = size;
        try { localStorage.setItem(storageKey, String(size)); } catch {}
    };

    return { pageSize, setPageSize };
}

export function useAdminPager(rows, query, fields, pageSize) {
    const page = ref(1);

    watch(query, () => { page.value = 1; });
    watch(pageSize, () => { page.value = 1; });

    const pager = computed(() => {
        const source = unref(rows) ?? [];
        const q = String(unref(query) ?? '').trim().toLowerCase();
        const filtered = source.filter((item) => {
            if (!q) return true;
            return fields.some((field) => String(item[field] ?? '').toLowerCase().includes(q));
        });
        const size = Number(unref(pageSize)) || 12;
        const pages = Math.max(1, Math.ceil(filtered.length / size));
        if (page.value > pages) page.value = pages;
        const start = (page.value - 1) * size;
        return {
            filtered,
            pages,
            items: filtered.slice(start, start + size),
            total: filtered.length,
            isFiltered: Boolean(q),
        };
    });

    return { page, pager };
}

export function pageNumbers(current, total) {
    if (total <= 7) {
        return Array.from({ length: total }, (_, index) => index + 1);
    }

    const set = new Set([1, total, current, current - 1, current + 1]);
    if (current <= 3) [2, 3, 4].forEach((n) => set.add(n));
    if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => set.add(n));

    return [...set]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b)
        .reduce((acc, n) => {
            if (acc.length && n - acc[acc.length - 1] > 1) acc.push('…');
            acc.push(n);
            return acc;
        }, []);
}

export function sortBy(rows, { key, dir }) {
    if (!key) return [...rows];
    const factor = dir === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
        const left = a?.[key];
        const right = b?.[key];
        if (typeof left === 'boolean' || typeof right === 'boolean') {
            return (Number(Boolean(left)) - Number(Boolean(right))) * factor;
        }
        if (typeof left === 'number' || typeof right === 'number') {
            return ((Number(left) || 0) - (Number(right) || 0)) * factor;
        }
        return String(left ?? '').localeCompare(String(right ?? ''), undefined, { sensitivity: 'base' }) * factor;
    });
}
