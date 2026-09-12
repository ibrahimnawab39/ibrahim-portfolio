<script setup>
import AdminCharts from '@/Components/Admin/AdminCharts.vue';
import AdminDataTable from '@/Components/Admin/AdminDataTable.vue';
import AdminPager from '@/Components/Admin/AdminPager.vue';
import AdminSidebar from '@/Components/Admin/AdminSidebar.vue';
import AdminViewToggle from '@/Components/Admin/AdminViewToggle.vue';
import { sortBy, useAdminPager, usePageSize } from '@/Composables/useAdminPager';
import { Head, Link, router, useForm, usePage } from '@inertiajs/vue3';
import { computed, ref, watch } from 'vue';

const props = defineProps({
    profile: Object,
    projects: Array,
    experiences: Array,
    certificates: Array,
    skills: Array,
    messages: Array,
    stats: Object,
    sections: Array,
});

const page = usePage();
const siteUrl = computed(() => (typeof window !== 'undefined' ? window.location.origin : ''));
const active = ref('overview');
const editingProject = ref(null);
const editingExperience = ref(null);
const editingSkill = ref(null);
const editingCertificate = ref(null);
const photo = ref(null);
const sectionForm = useForm({ id: null, eyebrow: '', title: '', body: '', link_label: '', link_url: '', published: false, order: 0 });
const editSection = (section = null) => { sectionForm.reset(); if (section) Object.assign(sectionForm, section); };
const saveSection = () => sectionForm[sectionForm.id ? 'patch' : 'post'](sectionForm.id ? `/admin/sections/${sectionForm.id}` : '/admin/sections', { preserveScroll: true, onSuccess: () => sectionForm.reset() });
const projectImage = ref(null);
const projectImagePreview = ref(null);
const photoPreview = ref(null);

watch(projectImage, (file) => {
    if (projectImagePreview.value?.startsWith?.('blob:')) URL.revokeObjectURL(projectImagePreview.value);
    projectImagePreview.value = file ? URL.createObjectURL(file) : null;
});
watch(photo, (file) => {
    if (photoPreview.value?.startsWith?.('blob:')) URL.revokeObjectURL(photoPreview.value);
    photoPreview.value = file ? URL.createObjectURL(file) : null;
});

const flash = computed(() => page.props.flash?.success);
const errors = computed(() => page.props.errors ?? {});
const errorList = computed(() => Object.entries(errors.value).map(([field, message]) => ({ field, message: Array.isArray(message) ? message[0] : message })));
const projectRows = ref([...props.projects]);
const experienceRows = ref([...props.experiences]);
const certificateRows = ref([...props.certificates]);
const skillRows = ref([...props.skills]);
const messageRows = ref([...props.messages]);
const dragging = ref({ type: null, id: null });

const sidebarCollapsed = ref(false);
try { sidebarCollapsed.value = localStorage.getItem('admin-sidebar-collapsed') === '1'; } catch {}
watch(sidebarCollapsed, (value) => {
    try { localStorage.setItem('admin-sidebar-collapsed', value ? '1' : '0'); } catch {}
});

const viewMode = ref('list');
try {
    const stored = localStorage.getItem('admin-view-mode');
    if (['list', 'grid', 'table'].includes(stored)) viewMode.value = stored;
} catch {}
const setViewMode = (mode) => {
    viewMode.value = mode;
    try { localStorage.setItem('admin-view-mode', mode); } catch {}
};

const { pageSize, setPageSize } = usePageSize();

const projectQuery = ref('');
const experienceQuery = ref('');
const certificateQuery = ref('');
const skillQuery = ref('');
const messageQuery = ref('');

const projectSort = ref({ key: 'order', dir: 'asc' });
const experienceSort = ref({ key: 'order', dir: 'asc' });
const certificateSort = ref({ key: 'order', dir: 'asc' });
const skillSort = ref({ key: 'order', dir: 'asc' });
const messageSort = ref({ key: 'created_at', dir: 'desc' });

const toggleSort = (state, key) => {
    if (state.value.key === key) {
        state.value = { key, dir: state.value.dir === 'asc' ? 'desc' : 'asc' };
        return;
    }
    state.value = { key, dir: 'asc' };
};

const sortedProjects = computed(() => sortBy(projectRows.value, projectSort.value));
const sortedExperiences = computed(() => sortBy(experienceRows.value, experienceSort.value));
const sortedCertificates = computed(() => sortBy(certificateRows.value, certificateSort.value));
const sortedSkills = computed(() => sortBy(skillRows.value, skillSort.value));
const sortedMessages = computed(() => sortBy(messageRows.value, messageSort.value));

const { page: projectPage, pager: projectPager } = useAdminPager(sortedProjects, projectQuery, ['title', 'company', 'category', 'summary'], pageSize);
const { page: experiencePage, pager: experiencePager } = useAdminPager(sortedExperiences, experienceQuery, ['role', 'company', 'location', 'description'], pageSize);
const { page: certificatePage, pager: certificatePager } = useAdminPager(sortedCertificates, certificateQuery, ['title', 'issuer', 'description'], pageSize);
const { page: skillPage, pager: skillPager } = useAdminPager(sortedSkills, skillQuery, ['name', 'category'], pageSize);
const { page: messagePage, pager: messagePager } = useAdminPager(sortedMessages, messageQuery, ['name', 'email', 'company', 'message'], pageSize);

const canReorderProjects = computed(() => !projectPager.value.isFiltered && viewMode.value !== 'table');
const canReorderExperiences = computed(() => !experiencePager.value.isFiltered && viewMode.value !== 'table');

const projectColumns = [
    { key: 'order', label: '#', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'featured', label: 'Featured', sortable: true },
];
const experienceColumns = [
    { key: 'order', label: '#', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'employment_type', label: 'Type', sortable: true },
];
const certificateColumns = [
    { key: 'order', label: '#', sortable: true },
    { key: 'title', label: 'Title', sortable: true },
    { key: 'issuer', label: 'Issuer', sortable: true },
    { key: 'issue_date', label: 'Issued', sortable: true },
];
const skillColumns = [
    { key: 'order', label: '#', sortable: true },
    { key: 'name', label: 'Skill', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'proficiency', label: 'Level', sortable: true },
];
const messageColumns = [
    { key: 'name', label: 'From', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'company', label: 'Company', sortable: true },
    { key: 'created_at', label: 'Date', sortable: true },
    { key: 'read_at', label: 'Status', sortable: true },
];

const profileForm = useForm({
    name: props.profile?.name ?? '',
    headline: props.profile?.headline ?? '',
    location: props.profile?.location ?? '',
    summary: props.profile?.summary ?? '',
    bio: props.profile?.bio ?? '',
    email: props.profile?.email ?? '',
    whatsapp_number: props.profile?.whatsapp_number ?? '',
    linkedin_url: props.profile?.linkedin_url ?? '',
    github_url: props.profile?.github_url ?? '',
    availability: props.profile?.availability ?? '',
    years_experience: props.profile?.years_experience ?? 4,
    photo: null,
    resume_headline: props.profile?.resume_headline ?? '',
    resume_summary: props.profile?.resume_summary ?? '',
    education_title: props.profile?.education_title ?? '',
    education_institution: props.profile?.education_institution ?? '',
    education_period: props.profile?.education_period ?? '',
});

const blankProject = () => ({
    id: null, title: '', slug: '', category: '', company: '', start_date: '', end_date: '', summary: '', description: '',
    tech_stack: '', live_url: '', repo_url: '', featured: false, include_in_resume: false, order: props.projects.length, image_path: null,
});
const blankExperience = () => ({
    id: null, include_in_resume: true, role: '', company: '', company_url: '', logo_path: null, employment_type: '', work_mode: '', location: '', start_date: '', end_date: '', description: '', order: props.experiences.length,
});
const experienceLogo = ref(null);
const experienceLogoPreview = ref(null);
watch(experienceLogo, (file) => {
    if (experienceLogoPreview.value?.startsWith?.('blob:')) URL.revokeObjectURL(experienceLogoPreview.value);
    experienceLogoPreview.value = file ? URL.createObjectURL(file) : null;
});

const blankSkill = () => ({ id: null, name: '', category: '', proficiency: 80, order: props.skills.length });
const blankCertificate = () => ({ id: null, title: '', issuer: '', issue_date: '', credential_url: '', description: '', order: props.certificates.length });

const projectForm = ref(blankProject());
const experienceForm = ref(blankExperience());
const skillForm = ref(blankSkill());
const certificateForm = ref(blankCertificate());

watch(() => props.projects, (value) => { projectRows.value = [...value]; });
watch(() => props.experiences, (value) => { experienceRows.value = [...value]; });
watch(() => props.certificates, (value) => { certificateRows.value = [...value]; });
watch(() => props.skills, (value) => { skillRows.value = [...value]; });
watch(() => props.messages, (value) => { messageRows.value = [...value]; });

const navItems = [
    { id: 'overview', label: 'Overview', glyph: '◉' },
    { id: 'profile', label: 'Profile', glyph: '☺' },
    { id: 'projects', label: 'Projects', glyph: '▣' },
    { id: 'experience', label: 'Experience', glyph: '▤' },
    { id: 'certificates', label: 'Certificates', glyph: '★' },
    { id: 'skills', label: 'Skills', glyph: '◈' },
    { id: 'linkedin', label: 'LinkedIn', glyph: 'in' },
    { id: 'sections', label: 'Sections', glyph: '≡' },
    { id: 'resume', label: 'Resume PDF', glyph: '↓' },
    { id: 'messages', label: 'Messages', glyph: '✉' },
];

const setTab = (tab) => {
    active.value = tab;
    editingProject.value = null;
    editingExperience.value = null;
    editingSkill.value = null;
    editingCertificate.value = null;
};

const editProject = (project = null) => {
    projectForm.value = project
        ? {
            id: project.id,
            title: project.title ?? '',
            slug: project.slug ?? '',
            category: project.category ?? '',
            company: project.company ?? '',
            start_date: project.start_date?.slice(0, 10) ?? '',
            end_date: project.end_date?.slice(0, 10) ?? '',
            summary: project.summary ?? '',
            description: project.description ?? '',
            tech_stack: (project.tech_stack ?? []).join(', '),
            live_url: project.live_url ?? '',
            repo_url: project.repo_url ?? '',
            featured: !!project.featured,
            include_in_resume: !!project.include_in_resume,
            order: project.order ?? 0,
            image_path: project.image_path ?? null,
        }
        : blankProject();
    editingProject.value = project?.id ?? 'new';
    projectImage.value = null;
};

const editExperience = (item = null) => {
    experienceForm.value = item
        ? { ...item, start_date: item.start_date?.slice(0, 10) ?? '', end_date: item.end_date?.slice(0, 10) ?? '' }
        : blankExperience();
    experienceLogo.value = null;
    experienceLogoPreview.value = null;
    editingExperience.value = item?.id ?? 'new';
};

const editSkill = (item = null) => {
    skillForm.value = item ? { ...item } : blankSkill();
    editingSkill.value = item?.id ?? 'new';
};

const editCertificate = (item = null) => {
    certificateForm.value = item
        ? { ...item, issue_date: item.issue_date?.slice(0, 10) ?? '' }
        : blankCertificate();
    editingCertificate.value = item?.id ?? 'new';
};

const persistOrder = (type) => {
    const rows = type === 'projects' ? projectRows.value : experienceRows.value;
    router.patch(`/admin/${type}/reorder`, { ids: rows.map((item) => item.id) }, { preserveScroll: true, preserveState: true });
};

const startDrag = (event, type, id) => {
    dragging.value = { type, id };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(id));
};

const dropRecord = (type, targetId) => {
    if (dragging.value.type !== type || dragging.value.id === targetId) return;
    const rows = type === 'projects' ? projectRows.value : experienceRows.value;
    const sourceIndex = rows.findIndex((item) => item.id === dragging.value.id);
    const targetIndex = rows.findIndex((item) => item.id === targetId);
    const [moved] = rows.splice(sourceIndex, 1);
    rows.splice(targetIndex, 0, moved);
    rows.forEach((item, index) => { item.order = index; });
    dragging.value = { type: null, id: null };
    persistOrder(type);
};

const moveRecord = (type, id, direction) => {
    const rows = type === 'projects' ? projectRows.value : experienceRows.value;
    const index = rows.findIndex((item) => item.id === id);
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target], rows[index]];
    rows.forEach((item, order) => { item.order = order; });
    persistOrder(type);
};

const saveProfile = () => {
    profileForm.photo = photo.value;
    profileForm.post('/admin/profile', { forceFormData: true, preserveScroll: true });
};

const saveProject = () => {
    const item = projectForm.value;
    const payload = {
        title: item.title,
        slug: item.slug,
        category: item.category || null,
        company: item.company || null,
        start_date: item.start_date || null,
        end_date: item.end_date || null,
        summary: item.summary,
        description: item.description || null,
        tech_stack: item.tech_stack || '',
        live_url: item.live_url || null,
        repo_url: item.repo_url || null,
        featured: !!item.featured,
        include_in_resume: !!item.include_in_resume,
        order: item.order ?? 0,
        image: projectImage.value,
    };
    const url = item.id ? `/admin/projects/${item.id}` : '/admin/projects';
    router.post(url, payload, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => { editingProject.value = null; projectImage.value = null; },
    });
};

const saveExperience = () => {
    const item = experienceForm.value;
    const payload = {
        include_in_resume: !!item.include_in_resume,
        role: item.role,
        company: item.company,
        company_url: item.company_url || null,
        employment_type: item.employment_type || null,
        work_mode: item.work_mode || null,
        location: item.location || null,
        start_date: item.start_date || null,
        end_date: item.end_date || null,
        description: item.description || null,
        order: item.order ?? 0,
        logo: experienceLogo.value,
    };
    if (item.id) {
        router.post(`/admin/experiences/${item.id}`, { ...payload, _method: 'patch' }, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => { editingExperience.value = null; experienceLogo.value = null; },
        });
        return;
    }
    router.post('/admin/experiences', payload, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => { editingExperience.value = null; experienceLogo.value = null; },
    });
};

const saveSkill = () => {
    const item = skillForm.value;
    const url = item.id ? `/admin/skills/${item.id}` : '/admin/skills';
    const method = item.id ? 'patch' : 'post';
    router[method](url, item, { preserveScroll: true, onSuccess: () => { editingSkill.value = null; } });
};

const saveCertificate = () => {
    const item = certificateForm.value;
    const url = item.id ? `/admin/certificates/${item.id}` : '/admin/certificates';
    const method = item.id ? 'patch' : 'post';
    router[method](url, item, { preserveScroll: true, onSuccess: () => { editingCertificate.value = null; } });
};

const remove = (url, label) => {
    if (window.confirm(`Delete ${label}? This cannot be undone.`)) {
        router.delete(url, { preserveScroll: true });
    }
};

const linkedInConnected = computed(() => !!profileForm.linkedin_url);
const linkedInShareUrl = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl.value || 'https://ibrahimnawab.com')}`);
const linkedInFeatureText = computed(() => {
    const name = profileForm.name || 'Ibrahim Nawab';
    const headline = profileForm.headline || 'Full Stack Developer';
    return `${name} — ${headline}\n\nExplore my portfolio: selected Laravel products, platforms and mobile work.\n${siteUrl.value || 'https://your-portfolio-url'}\n\nOpen to collaborations and product builds.`;
});
const copyNotice = ref('');
const copyText = async (value, label = 'Copied') => {
    try {
        await navigator.clipboard.writeText(value);
        copyNotice.value = label;
        setTimeout(() => { copyNotice.value = ''; }, 2200);
    } catch {
        copyNotice.value = 'Copy failed — select and copy manually';
    }
};

const tabTitle = computed(() => ({
    overview: 'Overview',
    profile: 'Profile',
    projects: 'Projects',
    experience: 'Experience',
    certificates: 'Certificates',
    skills: 'Skills',
    linkedin: 'LinkedIn connect',
    sections: 'Custom sections',
    resume: 'Resume PDF',
    messages: 'Messages',
}[active.value] || active.value));

const formatDate = (value) => {
    if (!value) return '—';
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleDateString();
};
</script>

<template>
    <Head title="Portfolio Admin" />
    <div class="admin-shell" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
        <AdminSidebar
            :active="active"
            :collapsed="sidebarCollapsed"
            :items="navItems"
            :unread-messages="stats.unreadMessages"
            :linked-in-connected="linkedInConnected"
            @update:collapsed="sidebarCollapsed = $event"
            @navigate="setTab"
        />

        <main class="admin-main">
            <header class="admin-topbar">
                <div>
                    <small>Content management</small>
                    <h1>{{ tabTitle }}</h1>
                </div>
                <div class="admin-topbar-actions">
                    <span class="admin-status"><i></i>Website live</span>
                    <Link class="admin-top-link" href="/" target="_blank">View site ↗</Link>
                    <Link class="admin-top-link admin-top-logout" href="/logout" method="post" as="button">Sign out</Link>
                </div>
            </header>

            <div v-if="flash" class="admin-flash">{{ flash }}</div>
            <div v-if="copyNotice" class="admin-flash">{{ copyNotice }}</div>
            <div v-if="errorList.length" class="admin-errors">
                <strong>Please fix these fields.</strong>
                <span v-for="error in errorList" :key="error.field"><b>{{ error.field }}</b> — {{ error.message }}</span>
            </div>

            <section v-if="active === 'overview'" class="admin-view">
                <div class="admin-welcome">
                    <div>
                        <span>Welcome back</span>
                        <h2>Your portfolio CMS, ready to ship updates.</h2>
                        <p>Projects, experience, skills and LinkedIn sharing — all in one place.</p>
                        <div class="welcome-actions">
                            <button type="button" class="admin-primary" @click="setTab('projects'); editProject()">Add project</button>
                            <button type="button" class="admin-ghost" @click="setTab('linkedin')">LinkedIn connect</button>
                        </div>
                    </div>
                    <img v-if="profile?.photo_path" :src="profile.photo_path" alt="">
                </div>
                <div class="admin-stats">
                    <button @click="setTab('projects')"><strong>{{ stats.projects }}</strong><span>Projects</span></button>
                    <button @click="setTab('experience')"><strong>{{ stats.experiences }}</strong><span>Experiences</span></button>
                    <button @click="setTab('certificates')"><strong>{{ stats.certificates }}</strong><span>Certificates</span></button>
                    <button @click="setTab('skills')"><strong>{{ stats.skills }}</strong><span>Skills</span></button>
                    <button @click="setTab('messages')"><strong>{{ stats.unreadMessages }}</strong><span>Unread messages</span></button>
                </div>
                <AdminCharts :stats="stats" :messages="messageRows" />
                <div class="admin-quick-grid">
                    <button @click="setTab('profile')"><strong>Profile</strong><span>Photo, bio, social links</span></button>
                    <button @click="setTab('linkedin')"><strong>LinkedIn</strong><span>Connect & share portfolio</span></button>
                    <button @click="setTab('resume')"><strong>Resume</strong><span>PDF settings & download</span></button>
                    <button @click="setTab('messages')"><strong>Inbox</strong><span>Client enquiries</span></button>
                </div>
            </section>

            <section v-if="active === 'linkedin'" class="admin-view">
                <div class="admin-heading">
                    <div>
                        <span>Distribution</span>
                        <h2>LinkedIn connect</h2>
                    </div>
                    <span class="li-badge" :class="{ on: linkedInConnected }">{{ linkedInConnected ? 'Profile linked' : 'Not connected' }}</span>
                </div>
                <div class="li-hero">
                    <div>
                        <h3>Connect your portfolio to LinkedIn</h3>
                        <p>Save your LinkedIn profile, share this website as a featured link, and push selected work to your network — without leaving the CMS.</p>
                    </div>
                    <ol>
                        <li>Paste your LinkedIn profile URL below and save.</li>
                        <li>Use Share / Featured helpers to promote the live site.</li>
                        <li>On LinkedIn → Profile → Featured → Add a link → paste your portfolio URL.</li>
                    </ol>
                </div>
                <form class="admin-form" @submit.prevent="saveProfile">
                    <div class="admin-grid">
                        <label>
                            <span>LinkedIn profile URL</span>
                            <input v-model="profileForm.linkedin_url" type="url" placeholder="https://www.linkedin.com/in/your-handle">
                        </label>
                        <label>
                            <span>Public portfolio URL</span>
                            <input :value="siteUrl" type="url" readonly>
                        </label>
                    </div>
                    <div class="li-actions">
                        <button class="admin-primary" type="submit" :disabled="profileForm.processing">Save LinkedIn link</button>
                        <a v-if="profileForm.linkedin_url" class="admin-ghost" :href="profileForm.linkedin_url" target="_blank" rel="noreferrer">Open LinkedIn profile ↗</a>
                        <a class="admin-ghost" :href="linkedInShareUrl" target="_blank" rel="noreferrer">Share portfolio on LinkedIn ↗</a>
                        <button type="button" class="admin-ghost" @click="copyText(siteUrl, 'Portfolio URL copied')">Copy portfolio URL</button>
                        <button type="button" class="admin-ghost" @click="copyText(linkedInFeatureText, 'Featured post text copied')">Copy Featured post text</button>
                    </div>
                </form>
                <div class="li-share-grid">
                    <article>
                        <h4>Featured section text</h4>
                        <pre>{{ linkedInFeatureText }}</pre>
                    </article>
                    <article>
                        <h4>Suggested work to feature</h4>
                        <ul>
                            <li v-for="project in projectRows.slice(0, 5)" :key="project.id">
                                <strong>{{ project.title }}</strong>
                                <button type="button" @click="copyText(`${siteUrl}/work/${project.slug}`, 'Project URL copied')">Copy case URL</button>
                            </li>
                            <li v-if="!projectRows.length">Add projects first, then share case study links.</li>
                        </ul>
                    </article>
                </div>
            </section>

            <section v-if="active === 'sections'" class="admin-view">
                <div class="admin-heading"><h2>Custom sections</h2><button class="admin-primary" @click="editSection()">New section</button></div>
                <div class="admin-records">
                    <article v-for="section in sections" :key="section.id">
                        <span>{{ section.order }}</span>
                        <div><h3>{{ section.title }}</h3><p>{{ section.published ? 'Published' : 'Draft' }}</p></div>
                        <div class="record-actions">
                            <button @click="editSection(section)">Edit</button>
                            <button @click="sectionForm.delete(`/admin/sections/${section.id}`, { preserveScroll: true })">Delete</button>
                        </div>
                    </article>
                </div>
                <form class="admin-form" @submit.prevent="saveSection">
                    <label><span>Eyebrow</span><input v-model="sectionForm.eyebrow"></label>
                    <label><span>Title</span><input v-model="sectionForm.title" required></label>
                    <label><span>Body</span><textarea v-model="sectionForm.body" rows="5" required></textarea></label>
                    <div class="admin-grid">
                        <label><span>Link label</span><input v-model="sectionForm.link_label"></label>
                        <label><span>Link URL</span><input v-model="sectionForm.link_url" type="url"></label>
                    </div>
                    <label><span>Display order</span><input v-model="sectionForm.order" type="number" min="0"></label>
                    <label><input v-model="sectionForm.published" type="checkbox"> Published on homepage</label>
                    <p v-for="(error, field) in sectionForm.errors" :key="field" role="alert">{{ error }}</p>
                    <button class="admin-primary" :disabled="sectionForm.processing">Save section</button>
                </form>
            </section>

            <section v-if="active === 'resume'" class="admin-view">
                <div class="admin-heading"><h2>Resume PDF</h2><a class="admin-primary" href="/resume">Download current PDF ↓</a></div>
                <p class="admin-lead">The PDF is generated from your current profile, skills and selected experience and projects.</p>
                <form class="admin-form" @submit.prevent="saveProfile">
                    <label><span>Resume headline</span><input v-model="profileForm.resume_headline"></label>
                    <label><span>Resume summary (leave blank to use profile summary)</span><textarea v-model="profileForm.resume_summary" rows="4"></textarea></label>
                    <label><span>Education title</span><input v-model="profileForm.education_title"></label>
                    <div class="admin-grid">
                        <label><span>Institution</span><input v-model="profileForm.education_institution"></label>
                        <label><span>Period</span><input v-model="profileForm.education_period"></label>
                    </div>
                    <button class="admin-primary" :disabled="profileForm.processing">Save resume settings</button>
                </form>
            </section>

            <section v-if="active === 'profile'" class="admin-view">
                <div class="admin-heading">
                    <div><span>Public identity</span><h2>Profile & biography</h2></div>
                    <button class="admin-primary" @click="saveProfile" :disabled="profileForm.processing">{{ profileForm.processing ? 'Saving…' : 'Save profile' }}</button>
                </div>
                <form class="admin-form profile-admin-form" @submit.prevent="saveProfile">
                    <div class="admin-photo">
                        <img v-if="photoPreview || profile?.photo_path" :src="photoPreview || profile.photo_path" alt="Current profile">
                        <div>
                            <strong>Profile photo</strong>
                            <p>Portrait JPEG, PNG or WebP. Maximum 5 MB.</p>
                            <input type="file" accept="image/*" @change="photo = $event.target.files[0]">
                        </div>
                    </div>
                    <div class="admin-grid">
                        <label><span>Display name</span><input v-model="profileForm.name"></label>
                        <label><span>Professional headline</span><input v-model="profileForm.headline"></label>
                    </div>
                    <div class="admin-grid">
                        <label><span>Location</span><input v-model="profileForm.location"></label>
                        <label><span>Public email</span><input v-model="profileForm.email" type="email"></label>
                    </div>
                    <label><span>WhatsApp number (international format, e.g. +92…)</span><input v-model="profileForm.whatsapp_number" type="tel"></label>
                    <label><span>Short summary</span><textarea v-model="profileForm.summary" rows="3"></textarea></label>
                    <label><span>Full biography</span><textarea v-model="profileForm.bio" rows="7"></textarea></label>
                    <div class="admin-grid">
                        <label><span>LinkedIn URL</span><input v-model="profileForm.linkedin_url" type="url"></label>
                        <label><span>GitHub URL</span><input v-model="profileForm.github_url" type="url"></label>
                    </div>
                    <div class="admin-grid">
                        <label><span>Availability</span><input v-model="profileForm.availability"></label>
                        <label><span>Years experience</span><input v-model="profileForm.years_experience" type="number" min="0"></label>
                    </div>
                    <button class="admin-primary mobile-save" type="submit">Save profile</button>
                </form>
            </section>

            <section v-if="active === 'projects'" class="admin-view">
                <div class="admin-heading">
                    <div><span>Portfolio records</span><h2>Projects</h2></div>
                    <button class="admin-primary" @click="editProject()">+ Add project</button>
                </div>

                <form v-if="editingProject !== null" class="admin-form admin-editor" @submit.prevent="saveProject">
                    <label><input v-model="projectForm.include_in_resume" type="checkbox"> Include in resume PDF</label>
                    <div class="editor-head"><h3>{{ projectForm.id ? 'Edit project' : 'New project' }}</h3><button type="button" @click="editingProject = null">Close ×</button></div>
                    <div class="admin-grid"><label><span>Title</span><input v-model="projectForm.title" required></label><label><span>Slug</span><input v-model="projectForm.slug" placeholder="project-url-slug" required></label></div>
                    <div class="admin-grid"><label><span>Category</span><input v-model="projectForm.category"></label><label><span>Associated company</span><input v-model="projectForm.company"></label></div>
                    <div class="admin-grid"><label><span>Start date</span><input v-model="projectForm.start_date" type="date"></label><label><span>End date</span><input v-model="projectForm.end_date" type="date"></label></div>
                    <label><span>Display order</span><input v-model="projectForm.order" type="number" min="0"></label>
                    <label><span>Summary</span><textarea v-model="projectForm.summary" rows="3" required></textarea></label>
                    <label><span>Full description</span><textarea v-model="projectForm.description" rows="6"></textarea></label>
                    <label><span>Technology stack (comma separated)</span><input v-model="projectForm.tech_stack" placeholder="Laravel, Vue 3, MySQL"></label>
                    <div class="admin-grid"><label><span>Live URL</span><input v-model="projectForm.live_url" type="url"></label><label><span>Repository URL</span><input v-model="projectForm.repo_url" type="url"></label></div>
                    <label>
                        <span>Project cover image</span>
                        <div v-if="projectImagePreview || projectForm.image_path" class="admin-cover-preview">
                            <img :src="projectImagePreview || projectForm.image_path" alt="">
                        </div>
                        <input type="file" accept="image/*" @change="projectImage = $event.target.files?.[0] ?? null">
                    </label>
                    <label class="admin-check"><input v-model="projectForm.featured" type="checkbox"><span>Feature on homepage</span></label>
                    <button class="admin-primary" type="submit">Save project</button>
                </form>

                <div class="admin-toolbar">
                    <input v-model="projectQuery" type="search" placeholder="Search projects…">
                    <AdminViewToggle :model-value="viewMode" @update:model-value="setViewMode" />
                    <span class="toolbar-meta">{{ projectPager.total }} items</span>
                </div>
                <p v-if="!canReorderProjects" class="sort-help">Clear search and use List/Grid to drag-reorder. Table mode supports column sorting for browsing.</p>
                <p v-else-if="viewMode === 'list'" class="sort-help">Drag ⋮⋮ or use ↑ ↓ to set the public Works order.</p>

                <AdminDataTable
                    v-if="viewMode === 'table'"
                    :columns="projectColumns"
                    :rows="projectPager.items"
                    :sort-key="projectSort.key"
                    :sort-dir="projectSort.dir"
                    @sort="toggleSort(projectSort, $event)"
                >
                    <template #cell-order="{ row }">{{ String((row.order ?? 0) + 1).padStart(2, '0') }}</template>
                    <template #cell-featured="{ row }">{{ row.featured ? 'Yes' : 'No' }}</template>
                    <template #actions="{ row }">
                        <button @click="editProject(row)">Edit</button>
                        <Link :href="`/work/${row.slug}`" target="_blank">View ↗</Link>
                        <button class="danger" @click="remove(`/admin/projects/${row.id}`, row.title)">Delete</button>
                    </template>
                </AdminDataTable>

                <div v-else :class="viewMode === 'grid' ? 'admin-card-grid' : 'admin-records sortable-records sortable-records--projects'">
                    <article
                        v-for="project in projectPager.items"
                        :key="project.id"
                        :draggable="canReorderProjects"
                        :class="[{ dragging: dragging.type === 'projects' && dragging.id === project.id }, viewMode === 'grid' ? 'admin-card' : '']"
                        @dragstart="canReorderProjects && startDrag($event, 'projects', project.id)"
                        @dragover.prevent
                        @drop="canReorderProjects && dropRecord('projects', project.id)"
                        @dragend="dragging = { type: null, id: null }"
                    >
                        <template v-if="viewMode === 'grid'">
                            <div class="admin-card-cover">
                                <img v-if="project.image_path" :src="project.image_path" :alt="project.title">
                                <span v-else>{{ project.title.slice(0, 1) }}</span>
                            </div>
                            <div class="admin-card-body">
                                <small>{{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small>
                                <h3>{{ project.title }}</h3>
                                <p>{{ project.summary }}</p>
                                <div class="record-actions">
                                    <button @click="editProject(project)">Edit</button>
                                    <Link :href="`/work/${project.slug}`" target="_blank">View ↗</Link>
                                    <button class="danger" @click="remove(`/admin/projects/${project.id}`, project.title)">Delete</button>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
                            <div class="record-order">{{ String(project.order + 1).padStart(2, '0') }}</div>
                            <div><small>{{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small><h3>{{ project.title }}</h3><p>{{ project.summary }}</p></div>
                            <div class="record-actions">
                                <button title="Move up" @click="moveRecord('projects', project.id, -1)">↑</button>
                                <button title="Move down" @click="moveRecord('projects', project.id, 1)">↓</button>
                                <button @click="editProject(project)">Edit</button>
                                <Link :href="`/work/${project.slug}`" target="_blank">View ↗</Link>
                                <button class="danger" @click="remove(`/admin/projects/${project.id}`, project.title)">Delete</button>
                            </div>
                        </template>
                    </article>
                    <div v-if="!projectPager.total" class="admin-empty">No projects found.</div>
                </div>
                <AdminPager
                    :page="projectPage"
                    :pages="projectPager.pages"
                    :total="projectPager.total"
                    :page-size="pageSize"
                    @update:page="projectPage = $event"
                    @update:page-size="setPageSize"
                />
            </section>

            <section v-if="active === 'experience'" class="admin-view">
                <div class="admin-heading">
                    <div><span>Career history</span><h2>Experience</h2></div>
                    <button class="admin-primary" @click="editExperience()">+ Add experience</button>
                </div>
                <form v-if="editingExperience !== null" class="admin-form admin-editor" @submit.prevent="saveExperience">
                    <label><input v-model="experienceForm.include_in_resume" type="checkbox"> Include in resume PDF</label>
                    <div class="editor-head"><h3>{{ experienceForm.id ? 'Edit experience' : 'New experience' }}</h3><button type="button" @click="editingExperience = null">Close ×</button></div>
                    <div class="admin-grid"><label><span>Role</span><input v-model="experienceForm.role" required></label><label><span>Company</span><input v-model="experienceForm.company" required></label></div>
                    <label><span>Company URL</span><input v-model="experienceForm.company_url" type="url" placeholder="https://"></label>
                    <label>
                        <span>Company logo</span>
                        <div v-if="experienceForm.logo_path || experienceLogoPreview" class="admin-logo-preview">
                            <img :src="experienceLogoPreview || experienceForm.logo_path" alt="">
                        </div>
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" @change="experienceLogo = $event.target.files?.[0] ?? null">
                    </label>
                    <div class="admin-grid">
                        <label><span>Employment type</span><select v-model="experienceForm.employment_type"><option value="">Select type</option><option>Full-time</option><option>Part-time</option><option>Freelance</option><option>Contract</option><option>Internship</option></select></label>
                        <label><span>Work mode</span><select v-model="experienceForm.work_mode"><option value="">Select mode</option><option>Remote</option><option>On-site</option><option>Hybrid</option></select></label>
                    </div>
                    <label><span>Location</span><input v-model="experienceForm.location"></label>
                    <label><span>Display order</span><input v-model="experienceForm.order" type="number" min="0"></label>
                    <div class="admin-grid"><label><span>Start date</span><input v-model="experienceForm.start_date" type="date"></label><label><span>End date</span><input v-model="experienceForm.end_date" type="date"></label></div>
                    <label><span>Description</span><textarea v-model="experienceForm.description" rows="5"></textarea></label>
                    <button class="admin-primary" type="submit">Save experience</button>
                </form>

                <div class="admin-toolbar">
                    <input v-model="experienceQuery" type="search" placeholder="Search experience…">
                    <AdminViewToggle :model-value="viewMode" @update:model-value="setViewMode" />
                    <span class="toolbar-meta">{{ experiencePager.total }} items</span>
                </div>
                <p v-if="!canReorderExperiences" class="sort-help">Clear search and use List/Grid to drag-reorder. Table mode supports column sorting.</p>

                <AdminDataTable
                    v-if="viewMode === 'table'"
                    :columns="experienceColumns"
                    :rows="experiencePager.items"
                    :sort-key="experienceSort.key"
                    :sort-dir="experienceSort.dir"
                    @sort="toggleSort(experienceSort, $event)"
                >
                    <template #cell-order="{ row }">{{ String((row.order ?? 0) + 1).padStart(2, '0') }}</template>
                    <template #actions="{ row }">
                        <button @click="editExperience(row)">Edit</button>
                        <button class="danger" @click="remove(`/admin/experiences/${row.id}`, row.role)">Delete</button>
                    </template>
                </AdminDataTable>

                <div v-else :class="viewMode === 'grid' ? 'admin-card-grid' : 'admin-records sortable-records sortable-records--experiences'">
                    <article
                        v-for="item in experiencePager.items"
                        :key="item.id"
                        :draggable="canReorderExperiences"
                        :class="[{ dragging: dragging.type === 'experiences' && dragging.id === item.id }, viewMode === 'grid' ? 'admin-card' : '']"
                        @dragstart="canReorderExperiences && startDrag($event, 'experiences', item.id)"
                        @dragover.prevent
                        @drop="canReorderExperiences && dropRecord('experiences', item.id)"
                        @dragend="dragging = { type: null, id: null }"
                    >
                        <template v-if="viewMode === 'grid'">
                            <div class="admin-card-body experience-card-body">
                                <img v-if="item.logo_path" class="admin-exp-logo" :src="item.logo_path" :alt="item.company">
                                <span v-else class="admin-exp-logo admin-exp-logo--empty" />
                                <small>{{ item.company }}</small>
                                <h3>{{ item.role }}</h3>
                                <p>{{ item.description }}</p>
                                <div class="record-actions">
                                    <button @click="editExperience(item)">Edit</button>
                                    <button class="danger" @click="remove(`/admin/experiences/${item.id}`, item.role)">Delete</button>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="drag-handle">⋮⋮</div>
                            <div class="record-order">{{ String(item.order + 1).padStart(2, '0') }}</div>
                            <img v-if="item.logo_path" class="admin-exp-logo" :src="item.logo_path" :alt="item.company">
                            <span v-else class="admin-exp-logo admin-exp-logo--empty" />
                            <div><small>{{ item.company }} · {{ item.location }}</small><h3>{{ item.role }}</h3><p>{{ item.description }}</p></div>
                            <div class="record-actions">
                                <button @click="moveRecord('experiences', item.id, -1)">↑</button>
                                <button @click="moveRecord('experiences', item.id, 1)">↓</button>
                                <button @click="editExperience(item)">Edit</button>
                                <button class="danger" @click="remove(`/admin/experiences/${item.id}`, item.role)">Delete</button>
                            </div>
                        </template>
                    </article>
                    <div v-if="!experiencePager.total" class="admin-empty">No experience found.</div>
                </div>
                <AdminPager
                    :page="experiencePage"
                    :pages="experiencePager.pages"
                    :total="experiencePager.total"
                    :page-size="pageSize"
                    @update:page="experiencePage = $event"
                    @update:page-size="setPageSize"
                />
            </section>

            <section v-if="active === 'certificates'" class="admin-view">
                <div class="admin-heading">
                    <div><span>Education & recognition</span><h2>Certificates</h2></div>
                    <button class="admin-primary" @click="editCertificate()">+ Add certificate</button>
                </div>
                <form v-if="editingCertificate !== null" class="admin-form admin-editor" @submit.prevent="saveCertificate">
                    <div class="editor-head"><h3>{{ certificateForm.id ? 'Edit certificate' : 'New certificate' }}</h3><button type="button" @click="editingCertificate = null">Close ×</button></div>
                    <div class="admin-grid"><label><span>Certificate title</span><input v-model="certificateForm.title" required></label><label><span>Issuer</span><input v-model="certificateForm.issuer" required></label></div>
                    <div class="admin-grid"><label><span>Issue date</span><input v-model="certificateForm.issue_date" type="date"></label><label><span>Credential URL</span><input v-model="certificateForm.credential_url" type="url"></label></div>
                    <label><span>Description</span><textarea v-model="certificateForm.description" rows="4"></textarea></label>
                    <label><span>Display order</span><input v-model="certificateForm.order" type="number" min="0"></label>
                    <button class="admin-primary" type="submit">Save certificate</button>
                </form>
                <div class="admin-toolbar">
                    <input v-model="certificateQuery" type="search" placeholder="Search certificates…">
                    <AdminViewToggle :model-value="viewMode" @update:model-value="setViewMode" />
                    <span class="toolbar-meta">{{ certificatePager.total }} items</span>
                </div>
                <AdminDataTable
                    v-if="viewMode === 'table'"
                    :columns="certificateColumns"
                    :rows="certificatePager.items"
                    :sort-key="certificateSort.key"
                    :sort-dir="certificateSort.dir"
                    @sort="toggleSort(certificateSort, $event)"
                >
                    <template #cell-order="{ row }">{{ String((row.order ?? 0) + 1).padStart(2, '0') }}</template>
                    <template #cell-issue_date="{ row }">{{ formatDate(row.issue_date) }}</template>
                    <template #actions="{ row }">
                        <button @click="editCertificate(row)">Edit</button>
                        <button class="danger" @click="remove(`/admin/certificates/${row.id}`, row.title)">Delete</button>
                    </template>
                </AdminDataTable>
                <div v-else :class="viewMode === 'grid' ? 'admin-card-grid' : 'certificate-admin-list'">
                    <article v-for="certificate in certificatePager.items" :key="certificate.id" :class="{ 'admin-card': viewMode === 'grid' }">
                        <div class="admin-card-body" v-if="viewMode === 'grid'">
                            <small>{{ certificate.issuer }}</small>
                            <h3>{{ certificate.title }}</h3>
                            <p>{{ certificate.description }}</p>
                            <div class="record-actions">
                                <button @click="editCertificate(certificate)">Edit</button>
                                <button class="danger" @click="remove(`/admin/certificates/${certificate.id}`, certificate.title)">Delete</button>
                            </div>
                        </div>
                        <template v-else>
                            <span class="certificate-mark">✓</span>
                            <div><small>{{ certificate.issuer }}</small><h3>{{ certificate.title }}</h3><p>{{ certificate.description }}</p></div>
                            <div class="record-actions">
                                <button @click="editCertificate(certificate)">Edit</button>
                                <button class="danger" @click="remove(`/admin/certificates/${certificate.id}`, certificate.title)">Delete</button>
                            </div>
                        </template>
                    </article>
                </div>
                <AdminPager
                    :page="certificatePage"
                    :pages="certificatePager.pages"
                    :total="certificatePager.total"
                    :page-size="pageSize"
                    @update:page="certificatePage = $event"
                    @update:page-size="setPageSize"
                />
            </section>

            <section v-if="active === 'skills'" class="admin-view">
                <div class="admin-heading">
                    <div><span>Technical capability</span><h2>Skills</h2></div>
                    <button class="admin-primary" @click="editSkill()">+ Add skill</button>
                </div>
                <form v-if="editingSkill !== null" class="admin-form admin-editor skill-editor" @submit.prevent="saveSkill">
                    <div class="editor-head"><h3>{{ skillForm.id ? 'Edit skill' : 'New skill' }}</h3><button type="button" @click="editingSkill = null">Close ×</button></div>
                    <div class="admin-grid four">
                        <label><span>Skill</span><input v-model="skillForm.name" required></label>
                        <label><span>Category</span><input v-model="skillForm.category" required></label>
                        <label><span>Level %</span><input v-model="skillForm.proficiency" type="number" min="1" max="100"></label>
                        <label><span>Order</span><input v-model="skillForm.order" type="number" min="0"></label>
                    </div>
                    <button class="admin-primary" type="submit">Save skill</button>
                </form>
                <div class="admin-toolbar">
                    <input v-model="skillQuery" type="search" placeholder="Search skills…">
                    <AdminViewToggle :model-value="viewMode" @update:model-value="setViewMode" />
                    <span class="toolbar-meta">{{ skillPager.total }} items</span>
                </div>
                <AdminDataTable
                    v-if="viewMode === 'table'"
                    :columns="skillColumns"
                    :rows="skillPager.items"
                    :sort-key="skillSort.key"
                    :sort-dir="skillSort.dir"
                    @sort="toggleSort(skillSort, $event)"
                >
                    <template #cell-order="{ row }">{{ String((row.order ?? 0) + 1).padStart(2, '0') }}</template>
                    <template #cell-proficiency="{ row }">{{ row.proficiency }}%</template>
                    <template #actions="{ row }">
                        <button @click="editSkill(row)">Edit</button>
                        <button class="danger" @click="remove(`/admin/skills/${row.id}`, row.name)">Delete</button>
                    </template>
                </AdminDataTable>
                <div v-else :class="viewMode === 'grid' ? 'admin-card-grid skills-grid-cards' : 'skill-admin-list'">
                    <article v-for="skill in skillPager.items" :key="skill.id" :class="{ 'admin-card': viewMode === 'grid' }">
                        <div v-if="viewMode === 'grid'" class="admin-card-body">
                            <small>{{ skill.category }}</small>
                            <h3>{{ skill.name }}</h3>
                            <div class="skill-bar"><i :style="{ width: `${skill.proficiency}%` }"></i></div>
                            <span>{{ skill.proficiency }}%</span>
                            <div class="record-actions">
                                <button @click="editSkill(skill)">Edit</button>
                                <button class="danger" @click="remove(`/admin/skills/${skill.id}`, skill.name)">Delete</button>
                            </div>
                        </div>
                        <template v-else>
                            <div><small>{{ skill.category }}</small><strong>{{ skill.name }}</strong></div>
                            <span>{{ skill.proficiency }}%</span>
                            <div class="skill-bar"><i :style="{ width: `${skill.proficiency}%` }"></i></div>
                            <button @click="editSkill(skill)">Edit</button>
                            <button class="danger" @click="remove(`/admin/skills/${skill.id}`, skill.name)">Delete</button>
                        </template>
                    </article>
                </div>
                <AdminPager
                    :page="skillPage"
                    :pages="skillPager.pages"
                    :total="skillPager.total"
                    :page-size="pageSize"
                    @update:page="skillPage = $event"
                    @update:page-size="setPageSize"
                />
            </section>

            <section v-if="active === 'messages'" class="admin-view">
                <div class="admin-heading"><div><span>Project enquiries</span><h2>Messages</h2></div></div>
                <div class="admin-toolbar">
                    <input v-model="messageQuery" type="search" placeholder="Search messages…">
                    <AdminViewToggle :model-value="viewMode === 'grid' ? 'list' : viewMode" @update:model-value="setViewMode($event === 'grid' ? 'list' : $event)" />
                    <span class="toolbar-meta">{{ messagePager.total }} messages</span>
                </div>
                <div v-if="!messagePager.total" class="admin-empty">No messages yet.</div>
                <AdminDataTable
                    v-else-if="viewMode === 'table'"
                    :columns="messageColumns"
                    :rows="messagePager.items"
                    :sort-key="messageSort.key"
                    :sort-dir="messageSort.dir"
                    @sort="toggleSort(messageSort, $event)"
                >
                    <template #cell-created_at="{ row }">{{ formatDate(row.created_at) }}</template>
                    <template #cell-read_at="{ row }">{{ row.read_at ? 'Read' : 'Unread' }}</template>
                    <template #actions="{ row }">
                        <button v-if="!row.read_at" @click="router.patch(`/admin/messages/${row.id}/read`, {}, { preserveScroll: true })">Mark read</button>
                        <a :href="`mailto:${row.email}`">Reply ↗</a>
                        <button class="danger" @click="remove(`/admin/messages/${row.id}`, 'message')">Delete</button>
                    </template>
                </AdminDataTable>
                <div v-else class="message-list">
                    <article v-for="message in messagePager.items" :key="message.id" :class="{ unread: !message.read_at }">
                        <header>
                            <div>
                                <span v-if="!message.read_at"></span>
                                <strong>{{ message.name }}</strong>
                                <small>{{ message.email }} · {{ message.company || 'Independent' }}</small>
                            </div>
                            <time>{{ formatDate(message.created_at) }}</time>
                        </header>
                        <p>{{ message.message }}</p>
                        <footer>
                            <span>{{ message.budget || 'Budget not specified' }}</span>
                            <button v-if="!message.read_at" @click="router.patch(`/admin/messages/${message.id}/read`, {}, { preserveScroll: true })">Mark read</button>
                            <a :href="`mailto:${message.email}`">Reply ↗</a>
                            <button class="danger" @click="remove(`/admin/messages/${message.id}`, 'message')">Delete</button>
                        </footer>
                    </article>
                </div>
                <AdminPager
                    :page="messagePage"
                    :pages="messagePager.pages"
                    :total="messagePager.total"
                    :page-size="pageSize"
                    @update:page="messagePage = $event"
                    @update:page-size="setPageSize"
                />
            </section>
        </main>
    </div>
</template>
