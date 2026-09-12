<script setup>
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const seo = computed(() => page.props.seo ?? {});
const schema = computed(() =>
    seo.value.schema
        ? JSON.stringify(seo.value.schema).replace(/</g, '\\u003c')
        : '',
);
</script>

<template>
    <Head>
        <title>{{ seo.title }}</title>
        <meta head-key="description" name="description" :content="seo.description">
        <meta head-key="author" name="author" :content="seo.author">
        <link head-key="canonical" rel="canonical" :href="seo.canonical">
        <meta head-key="robots" name="robots" :content="seo.robots">

        <meta head-key="og:title" property="og:title" :content="seo.title">
        <meta head-key="og:description" property="og:description" :content="seo.description">
        <meta head-key="og:url" property="og:url" :content="seo.canonical">
        <meta head-key="og:type" property="og:type" :content="seo.type || 'website'">
        <meta head-key="og:site_name" property="og:site_name" :content="seo.site_name">
        <meta head-key="og:locale" property="og:locale" :content="seo.locale || 'en'">
        <meta head-key="og:image" property="og:image" :content="seo.image">
        <meta head-key="og:image:alt" property="og:image:alt" :content="seo.image_alt">

        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image">
        <meta head-key="twitter:title" name="twitter:title" :content="seo.title">
        <meta head-key="twitter:description" name="twitter:description" :content="seo.description">
        <meta head-key="twitter:image" name="twitter:image" :content="seo.image">
        <meta head-key="twitter:image:alt" name="twitter:image:alt" :content="seo.image_alt">

        <component :is="'script'" v-if="schema" type="application/ld+json" v-text="schema" />
    </Head>
</template>
