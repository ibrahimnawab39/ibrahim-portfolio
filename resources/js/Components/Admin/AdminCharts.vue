<script setup>
import { computed } from 'vue';

const props = defineProps({
    stats: { type: Object, required: true },
    messages: { type: Array, default: () => [] },
});

const contentBars = computed(() => {
    const items = [
        { label: 'Projects', value: Number(props.stats.projects) || 0 },
        { label: 'Experience', value: Number(props.stats.experiences) || 0 },
        { label: 'Skills', value: Number(props.stats.skills) || 0 },
        { label: 'Certificates', value: Number(props.stats.certificates) || 0 },
        { label: 'Unread', value: Number(props.stats.unreadMessages) || 0 },
    ];
    const max = Math.max(1, ...items.map((item) => item.value));
    return items.map((item) => ({ ...item, pct: Math.round((item.value / max) * 100) }));
});

const trend = computed(() => {
    const now = new Date();
    const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
        return {
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: date.toLocaleString('en', { month: 'short' }),
            value: 0,
        };
    });
    const map = Object.fromEntries(months.map((month) => [month.key, month]));
    props.messages.forEach((message) => {
        const date = new Date(message.created_at);
        if (Number.isNaN(date.getTime())) return;
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (map[key]) map[key].value += 1;
    });
    const max = Math.max(1, ...months.map((month) => month.value));
    return months.map((month) => ({
        ...month,
        height: Math.max(8, Math.round((month.value / max) * 100)),
    }));
});

const readSplit = computed(() => {
    const total = props.messages.length;
    const unread = props.messages.filter((message) => !message.read_at).length;
    const read = Math.max(0, total - unread);
    const unreadPct = total ? Math.round((unread / total) * 100) : 0;
    const readPct = total ? 100 - unreadPct : 0;
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    return {
        total,
        unread,
        read,
        unreadPct,
        readPct,
        circumference,
        unreadDash: (unreadPct / 100) * circumference,
        readDash: (readPct / 100) * circumference,
    };
});
</script>

<template>
    <div class="admin-charts">
        <article class="admin-chart-card">
            <header>
                <h3>Content mix</h3>
                <p>Portfolio inventory at a glance</p>
            </header>
            <div class="admin-bar-chart">
                <div v-for="bar in contentBars" :key="bar.label" class="admin-bar-row">
                    <span>{{ bar.label }}</span>
                    <div class="admin-bar-track"><i :style="{ width: `${bar.pct}%` }" /></div>
                    <strong>{{ bar.value }}</strong>
                </div>
            </div>
        </article>

        <article class="admin-chart-card">
            <header>
                <h3>Enquiries trend</h3>
                <p>Last 6 months</p>
            </header>
            <div class="admin-trend-chart" role="img" aria-label="Monthly enquiries">
                <div v-for="month in trend" :key="month.key" class="admin-trend-col">
                    <div class="admin-trend-bar" :style="{ height: `${month.height}%` }" :title="`${month.label}: ${month.value}`" />
                    <span>{{ month.label }}</span>
                    <small>{{ month.value }}</small>
                </div>
            </div>
        </article>

        <article class="admin-chart-card">
            <header>
                <h3>Inbox health</h3>
                <p>Read vs unread</p>
            </header>
            <div class="admin-donut-wrap">
                <svg viewBox="0 0 120 120" class="admin-donut" aria-hidden="true">
                    <circle class="donut-track" cx="60" cy="60" r="42" />
                    <circle
                        class="donut-read"
                        cx="60"
                        cy="60"
                        r="42"
                        :stroke-dasharray="`${readSplit.readDash} ${readSplit.circumference}`"
                        stroke-dashoffset="0"
                    />
                    <circle
                        class="donut-unread"
                        cx="60"
                        cy="60"
                        r="42"
                        :stroke-dasharray="`${readSplit.unreadDash} ${readSplit.circumference}`"
                        :stroke-dashoffset="`${-readSplit.readDash}`"
                    />
                    <text x="60" y="58" text-anchor="middle" class="donut-total">{{ readSplit.total }}</text>
                    <text x="60" y="74" text-anchor="middle" class="donut-caption">messages</text>
                </svg>
                <ul>
                    <li><i class="swatch read" /> Read <strong>{{ readSplit.read }}</strong></li>
                    <li><i class="swatch unread" /> Unread <strong>{{ readSplit.unread }}</strong></li>
                </ul>
            </div>
        </article>
    </div>
</template>
