<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
const page = usePage();
const seo = computed(() => page.props.seo ?? {});
const schema = computed(() => JSON.stringify(seo.value.schema ?? {}).replace(/</g, '\\u003c'));
</script>
<template><Head><title>{{ seo.title }}</title><meta head-key="description" name="description" :content="seo.description"><link head-key="canonical" rel="canonical" :href="seo.canonical"><meta head-key="robots" name="robots" :content="seo.robots"><meta head-key="og:title" property="og:title" :content="seo.title"><meta head-key="og:description" property="og:description" :content="seo.description"><meta head-key="og:url" property="og:url" :content="seo.canonical"><meta head-key="og:type" property="og:type" content="website"><meta head-key="og:image" property="og:image" :content="seo.image"><meta head-key="twitter:card" name="twitter:card" content="summary_large_image"><component :is="'script'" v-if="seo.schema" type="application/ld+json" v-text="schema" /></Head></template>
