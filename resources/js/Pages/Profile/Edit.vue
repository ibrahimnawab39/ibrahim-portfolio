<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import UpdatePasswordForm from './Partials/UpdatePasswordForm.vue';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm.vue';
import { Head } from '@inertiajs/vue3';

defineProps({ mustVerifyEmail: Boolean, status: String });
</script>

<template>
    <Head title="Account & Security" />
    <AuthenticatedLayout>
        <div class="account-page">
            <header><span>Personal access</span><h1>Account & security</h1><p>Manage the login details used to access your private portfolio CMS.</p></header>
            <div class="account-card"><UpdateProfileInformationForm :must-verify-email="mustVerifyEmail" :status="status" /></div>
            <div class="account-card"><UpdatePasswordForm /></div>
        </div>
    </AuthenticatedLayout>
</template>
