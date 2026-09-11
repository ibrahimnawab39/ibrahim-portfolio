<script setup>
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
const dragging = ref({ type: null, id: null });

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

watch(() => props.projects, value => projectRows.value = [...value]);
watch(() => props.experiences, value => experienceRows.value = [...value]);
watch(() => props.certificates, value => certificateRows.value = [...value]);

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
    router.patch(`/admin/${type}/reorder`, { ids: rows.map(item => item.id) }, { preserveScroll: true, preserveState: true });
};

const startDrag = (event, type, id) => {
    dragging.value = { type, id };
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', String(id));
};

const dropRecord = (type, targetId) => {
    if (dragging.value.type !== type || dragging.value.id === targetId) return;
    const rows = type === 'projects' ? projectRows.value : experienceRows.value;
    const sourceIndex = rows.findIndex(item => item.id === dragging.value.id);
    const targetIndex = rows.findIndex(item => item.id === targetId);
    const [moved] = rows.splice(sourceIndex, 1);
    rows.splice(targetIndex, 0, moved);
    rows.forEach((item, index) => item.order = index);
    dragging.value = { type: null, id: null };
    persistOrder(type);
};

const moveRecord = (type, id, direction) => {
    const rows = type === 'projects' ? projectRows.value : experienceRows.value;
    const index = rows.findIndex(item => item.id === id);
    const target = index + direction;
    if (target < 0 || target >= rows.length) return;
    [rows[index], rows[target]] = [rows[target], rows[index]];
    rows.forEach((item, order) => item.order = order);
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
        onSuccess: () => {
            editingProject.value = null;
            projectImage.value = null;
        },
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
    router[method](url, item, { preserveScroll: true, onSuccess: () => editingSkill.value = null });
};

const saveCertificate = () => {
    const item = certificateForm.value;
    const url = item.id ? `/admin/certificates/${item.id}` : '/admin/certificates';
    const method = item.id ? 'patch' : 'post';
    router[method](url, item, { preserveScroll: true, onSuccess: () => editingCertificate.value = null });
};

const remove = (url, label) => {
    if (window.confirm(`Delete ${label}? This cannot be undone.`)) {
        router.delete(url, { preserveScroll: true });
    }
};
</script>

<template>
    <Head title="Portfolio Admin" />
    <div class="admin-shell">
        <aside class="admin-sidebar">
            <Link href="/" class="admin-brand">IBRAHIM<span>.</span><small>Portfolio CMS</small></Link>
            <nav>
                <button v-for="item in [
                    ['overview','Overview'],['profile','Profile'],['projects','Projects'],['experience','Experience'],['certificates','Certificates'],['skills','Skills'],['sections','Custom sections'],['resume','Resume PDF'],['messages','Messages']
                ]" :key="item[0]" :class="{ active: active === item[0] }" @click="setTab(item[0])">
                    <span>{{ item[1] }}</span><b v-if="item[0] === 'messages' && stats.unreadMessages">{{ stats.unreadMessages }}</b>
                </button>
            </nav>
            <div class="admin-side-foot">
                <Link href="/" target="_blank">View website ↗</Link>
                <Link href="/profile">Account settings</Link>
                <Link href="/logout" method="post" as="button">Sign out</Link>
            </div>
        </aside>

        <main class="admin-main">
            <header class="admin-topbar">
                <div><small>Content management</small><h1>{{ active }}</h1></div>
                <div class="admin-topbar-actions">
                    <span class="admin-status"><i></i>Website live</span>
                    <Link class="admin-top-link" href="/" target="_blank">View site ↗</Link>
                    <Link class="admin-top-link admin-top-logout" href="/logout" method="post" as="button">Sign out</Link>
                </div>
            </header>

            <div v-if="flash" class="admin-flash">{{ flash }}</div>
            <div v-if="errorList.length" class="admin-errors">
                <strong>Please fix these fields.</strong>
                <span v-for="error in errorList" :key="error.field"><b>{{ error.field }}</b> — {{ error.message }}</span>
            </div>

            <section v-if="active === 'overview'" class="admin-view">
                <div class="admin-welcome"><div><span>Welcome back</span><h2>Manage your complete portfolio from one place.</h2><p>Every change here updates the public Laravel + Inertia website immediately.</p></div><img v-if="profile?.photo_path" :src="profile.photo_path" alt=""></div>
                <div class="admin-stats">
                    <button @click="setTab('projects')"><strong>{{ stats.projects }}</strong><span>Projects</span></button>
                    <button @click="setTab('experience')"><strong>{{ stats.experiences }}</strong><span>Experiences</span></button>
                    <button @click="setTab('certificates')"><strong>{{ stats.certificates }}</strong><span>Certificates</span></button>
                    <button @click="setTab('skills')"><strong>{{ stats.skills }}</strong><span>Skills</span></button>
                    <button @click="setTab('messages')"><strong>{{ stats.unreadMessages }}</strong><span>Unread messages</span></button>
                </div>
                <div class="admin-quick">
                    <h3>Quick actions</h3>
                    <button @click="setTab('profile')">Update profile & photo <span>→</span></button>
                    <button @click="setTab('projects'); editProject()">Add a new project <span>→</span></button>
                    <button @click="setTab('experience'); editExperience()">Add experience <span>→</span></button>
                </div>
            </section>

            <section v-if="active === 'sections'" class="admin-view"><div class="admin-heading"><h2>Custom sections</h2><button class="admin-primary" @click="editSection()">New section</button></div><div class="admin-records"><article v-for="section in sections" :key="section.id"><span>{{ section.order }}</span><div><h3>{{ section.title }}</h3><p>{{ section.published ? 'Published' : 'Draft' }}</p></div><div class="record-actions"><button @click="editSection(section)">Edit</button><button @click="sectionForm.delete(`/admin/sections/${section.id}`, { preserveScroll: true })">Delete</button></div></article></div><form class="admin-form" @submit.prevent="saveSection"><label><span>Eyebrow</span><input v-model="sectionForm.eyebrow"></label><label><span>Title</span><input v-model="sectionForm.title" required></label><label><span>Body</span><textarea v-model="sectionForm.body" rows="5" required></textarea></label><div class="admin-grid"><label><span>Link label</span><input v-model="sectionForm.link_label"></label><label><span>Link URL</span><input v-model="sectionForm.link_url" type="url"></label></div><label><span>Display order</span><input v-model="sectionForm.order" type="number" min="0"></label><label><input v-model="sectionForm.published" type="checkbox"> Published on homepage</label><p v-for="(error,field) in sectionForm.errors" :key="field" role="alert">{{ error }}</p><button class="admin-primary" :disabled="sectionForm.processing">Save section</button></form></section>
            <section v-if="active === 'resume'" class="admin-view"><div class="admin-heading"><h2>Resume PDF</h2><a class="admin-primary" href="/resume">Download current PDF ↓</a></div><p>The PDF is generated from your current profile, skills and selected experience and projects. Changes appear on the next download.</p><form class="admin-form" @submit.prevent="saveProfile"><label><span>Resume headline</span><input v-model="profileForm.resume_headline"></label><label><span>Resume summary (leave blank to use profile summary)</span><textarea v-model="profileForm.resume_summary" rows="4"></textarea></label><label><span>Education title</span><input v-model="profileForm.education_title"></label><div class="admin-grid"><label><span>Institution</span><input v-model="profileForm.education_institution"></label><label><span>Period</span><input v-model="profileForm.education_period"></label></div><button class="admin-primary" :disabled="profileForm.processing">Save resume settings</button></form></section>
            <section v-if="active === 'profile'" class="admin-view">
                <div class="admin-heading"><div><span>Public identity</span><h2>Profile & biography</h2></div><button class="admin-primary" @click="saveProfile" :disabled="profileForm.processing">{{ profileForm.processing ? 'Saving…' : 'Save profile' }}</button></div>
                <form class="admin-form profile-admin-form" @submit.prevent="saveProfile">
                    <div class="admin-photo">
                        <img v-if="photoPreview || profile?.photo_path" :src="photoPreview || profile.photo_path" alt="Current profile">
                        <div><strong>Profile photo</strong><p>Portrait JPEG, PNG or WebP. Maximum 5 MB.</p><input type="file" accept="image/*" @change="photo = $event.target.files[0]"></div>
                    </div>
                    <div class="admin-grid"><label><span>Display name</span><input v-model="profileForm.name"></label><label><span>Professional headline</span><input v-model="profileForm.headline"></label></div>
                    <div class="admin-grid"><label><span>Location</span><input v-model="profileForm.location"></label><label><span>Public email</span><input v-model="profileForm.email" type="email"></label></div>
                    <label><span>WhatsApp number (international format, e.g. +92…)</span><input v-model="profileForm.whatsapp_number" type="tel"></label><label><span>Short summary</span><textarea v-model="profileForm.summary" rows="3"></textarea></label>
                    <label><span>Full biography</span><textarea v-model="profileForm.bio" rows="7"></textarea></label>
                    <div class="admin-grid"><label><span>LinkedIn URL</span><input v-model="profileForm.linkedin_url" type="url"></label><label><span>GitHub URL</span><input v-model="profileForm.github_url" type="url"></label></div>
                    <div class="admin-grid"><label><span>Availability</span><input v-model="profileForm.availability"></label><label><span>Years experience</span><input v-model="profileForm.years_experience" type="number" min="0"></label></div>
                    <button class="admin-primary mobile-save" type="submit">Save profile</button>
                </form>
            </section>

            <section v-if="active === 'projects'" class="admin-view">
                <div class="admin-heading"><div><span>Portfolio records</span><h2>Projects</h2></div><button class="admin-primary" @click="editProject()">+ Add project</button></div>
                <form v-if="editingProject !== null" class="admin-form admin-editor" @submit.prevent="saveProject"><label><input v-model="projectForm.include_in_resume" type="checkbox"> Include in resume PDF</label>
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
                        <small class="field-hint">Shown on Work and homepage cards. JPEG/PNG/WebP, max 5 MB.</small>
                    </label>
                    <label class="admin-check"><input v-model="projectForm.featured" type="checkbox"><span>Feature on homepage</span></label>
                    <button class="admin-primary" type="submit">Save project</button>
                </form>
                <p class="sort-help">Drag records using the handle to control their public display order. Arrow buttons work on touch devices.</p>
                <div class="admin-records sortable-records sortable-records--projects">
                    <article
                        v-for="project in projectRows"
                        :key="project.id"
                        draggable="true"
                        :class="{ dragging: dragging.type === 'projects' && dragging.id === project.id }"
                        @dragstart="startDrag($event, 'projects', project.id)"
                        @dragover.prevent
                        @drop="dropRecord('projects', project.id)"
                        @dragend="dragging = { type: null, id: null }"
                    >
                        <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
                        <div class="record-order">{{ String(project.order + 1).padStart(2,'0') }}</div>
                        <div><small>{{ project.category }}<template v-if="project.company"> · {{ project.company }}</template></small><h3>{{ project.title }}</h3><p>{{ project.summary }}</p></div>
                        <div class="record-actions"><button title="Move up" @click="moveRecord('projects', project.id, -1)">↑</button><button title="Move down" @click="moveRecord('projects', project.id, 1)">↓</button><button @click="editProject(project)">Edit</button><Link :href="`/work/${project.slug}`" target="_blank">View ↗</Link><button class="danger" @click="remove(`/admin/projects/${project.id}`, project.title)">Delete</button></div>
                    </article>
                </div>
            </section>

            <section v-if="active === 'experience'" class="admin-view">
                <div class="admin-heading"><div><span>Career history</span><h2>Experience</h2></div><button class="admin-primary" @click="editExperience()">+ Add experience</button></div>
                <form v-if="editingExperience !== null" class="admin-form admin-editor" @submit.prevent="saveExperience"><label><input v-model="experienceForm.include_in_resume" type="checkbox"> Include in resume PDF</label>
                    <div class="editor-head"><h3>{{ experienceForm.id ? 'Edit experience' : 'New experience' }}</h3><button type="button" @click="editingExperience = null">Close ×</button></div>
                    <div class="admin-grid"><label><span>Role</span><input v-model="experienceForm.role" required></label><label><span>Company</span><input v-model="experienceForm.company" required></label></div>
                    <label><span>Company URL</span><input v-model="experienceForm.company_url" type="url" placeholder="https://"></label>
                    <label>
                        <span>Company logo</span>
                        <div v-if="experienceForm.logo_path || experienceLogoPreview" class="admin-logo-preview">
                            <img :src="experienceLogoPreview || experienceForm.logo_path" alt="">
                        </div>
                        <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" @change="experienceLogo = $event.target.files?.[0] ?? null">
                        <small class="field-hint">Square PNG/JPG/WebP preferred. Shown on the Experience page.</small>
                    </label>
                    <div class="admin-grid">
                        <label><span>Employment type</span><select v-model="experienceForm.employment_type"><option value="">Select type</option><option>Full-time</option><option>Part-time</option><option>Freelance</option><option>Contract</option><option>Internship</option></select></label>
                        <label><span>Work mode</span><select v-model="experienceForm.work_mode"><option value="">Select mode</option><option>Remote</option><option>On-site</option><option>Hybrid</option></select></label>
                    </div>
                    <label><span>Location</span><input v-model="experienceForm.location" placeholder="Karachi, Sindh, Pakistan"></label>
                    <label><span>Display order</span><input v-model="experienceForm.order" type="number" min="0"></label>
                    <div class="admin-grid"><label><span>Start date (optional)</span><input v-model="experienceForm.start_date" type="date"></label><label><span>End date (empty = present)</span><input v-model="experienceForm.end_date" type="date"></label></div>
                    <label><span>Description</span><textarea v-model="experienceForm.description" rows="5"></textarea></label>
                    <button class="admin-primary" type="submit">Save experience</button>
                </form>
                <p class="sort-help">Drag roles into the exact order you want visitors to see them.</p>
                <div class="admin-records sortable-records sortable-records--experiences">
                    <article
                        v-for="item in experienceRows"
                        :key="item.id"
                        draggable="true"
                        :class="{ dragging: dragging.type === 'experiences' && dragging.id === item.id }"
                        @dragstart="startDrag($event, 'experiences', item.id)"
                        @dragover.prevent
                        @drop="dropRecord('experiences', item.id)"
                        @dragend="dragging = { type: null, id: null }"
                    >
                        <div class="drag-handle" title="Drag to reorder">⋮⋮</div>
                        <div class="record-order">{{ String(item.order + 1).padStart(2,'0') }}</div>
                        <img v-if="item.logo_path" class="admin-exp-logo" :src="item.logo_path" :alt="item.company">
                        <span v-else class="admin-exp-logo admin-exp-logo--empty" aria-hidden="true"></span>
                        <div><small>{{ item.company }}<template v-if="item.employment_type"> · {{ item.employment_type }}</template><template v-if="item.work_mode"> · {{ item.work_mode }}</template> · {{ item.location }}</small><h3>{{ item.role }}</h3><p>{{ item.description }}</p></div>
                        <div class="record-actions"><button title="Move up" @click="moveRecord('experiences', item.id, -1)">↑</button><button title="Move down" @click="moveRecord('experiences', item.id, 1)">↓</button><button @click="editExperience(item)">Edit</button><button class="danger" @click="remove(`/admin/experiences/${item.id}`, item.role)">Delete</button></div>
                    </article>
                </div>
            </section>

            <section v-if="active === 'certificates'" class="admin-view">
                <div class="admin-heading"><div><span>Education & recognition</span><h2>Certificates</h2></div><button class="admin-primary" @click="editCertificate()">+ Add certificate</button></div>
                <form v-if="editingCertificate !== null" class="admin-form admin-editor" @submit.prevent="saveCertificate">
                    <div class="editor-head"><h3>{{ certificateForm.id ? 'Edit certificate' : 'New certificate' }}</h3><button type="button" @click="editingCertificate = null">Close ×</button></div>
                    <div class="admin-grid"><label><span>Certificate title</span><input v-model="certificateForm.title" required></label><label><span>Issuer</span><input v-model="certificateForm.issuer" required></label></div>
                    <div class="admin-grid"><label><span>Issue date</span><input v-model="certificateForm.issue_date" type="date"></label><label><span>Credential URL</span><input v-model="certificateForm.credential_url" type="url" placeholder="https://"></label></div>
                    <label><span>Description</span><textarea v-model="certificateForm.description" rows="4"></textarea></label>
                    <label><span>Display order</span><input v-model="certificateForm.order" type="number" min="0"></label>
                    <button class="admin-primary" type="submit">Save certificate</button>
                </form>
                <div class="certificate-admin-list">
                    <article v-for="certificate in certificateRows" :key="certificate.id">
                        <span class="certificate-mark">✓</span>
                        <div><small>{{ certificate.issuer }}</small><h3>{{ certificate.title }}</h3><p>{{ certificate.description }}</p></div>
                        <div class="record-actions"><button @click="editCertificate(certificate)">Edit</button><a v-if="certificate.credential_url" :href="certificate.credential_url" target="_blank">Credential ↗</a><button class="danger" @click="remove(`/admin/certificates/${certificate.id}`, certificate.title)">Delete</button></div>
                    </article>
                </div>
            </section>

            <section v-if="active === 'skills'" class="admin-view">
                <div class="admin-heading"><div><span>Technical capability</span><h2>Skills</h2></div><button class="admin-primary" @click="editSkill()">+ Add skill</button></div>
                <form v-if="editingSkill !== null" class="admin-form admin-editor skill-editor" @submit.prevent="saveSkill">
                    <div class="editor-head"><h3>{{ skillForm.id ? 'Edit skill' : 'New skill' }}</h3><button type="button" @click="editingSkill = null">Close ×</button></div>
                    <div class="admin-grid four"><label><span>Skill</span><input v-model="skillForm.name" required></label><label><span>Category</span><input v-model="skillForm.category" required></label><label><span>Level %</span><input v-model="skillForm.proficiency" type="number" min="1" max="100"></label><label><span>Order</span><input v-model="skillForm.order" type="number" min="0"></label></div>
                    <button class="admin-primary" type="submit">Save skill</button>
                </form>
                <div class="skill-admin-list">
                    <article v-for="skill in skills" :key="skill.id"><div><small>{{ skill.category }}</small><strong>{{ skill.name }}</strong></div><span>{{ skill.proficiency }}%</span><div class="skill-bar"><i :style="{ width: `${skill.proficiency}%` }"></i></div><button @click="editSkill(skill)">Edit</button><button class="danger" @click="remove(`/admin/skills/${skill.id}`, skill.name)">Delete</button></article>
                </div>
            </section>

            <section v-if="active === 'messages'" class="admin-view">
                <div class="admin-heading"><div><span>Project enquiries</span><h2>Messages</h2></div></div>
                <div v-if="!messages.length" class="admin-empty">No messages yet.</div>
                <div class="message-list">
                    <article v-for="message in messages" :key="message.id" :class="{ unread: !message.read_at }"><header><div><span v-if="!message.read_at"></span><strong>{{ message.name }}</strong><small>{{ message.email }} · {{ message.company || 'Independent' }}</small></div><time>{{ new Date(message.created_at).toLocaleDateString() }}</time></header><p>{{ message.message }}</p><footer><span>{{ message.budget || 'Budget not specified' }}</span><button v-if="!message.read_at" @click="router.patch(`/admin/messages/${message.id}/read`, {}, { preserveScroll: true })">Mark read</button><a :href="`mailto:${message.email}`">Reply ↗</a><button class="danger" @click="remove(`/admin/messages/${message.id}`, 'message')">Delete</button></footer></article>
                </div>
            </section>
        </main>
    </div>
</template>
