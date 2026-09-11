import { ref, watch, computed, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from "vue/server-renderer";
import { usePage, useForm, Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    projects: Array,
    experiences: Array,
    certificates: Array,
    skills: Array,
    messages: Array,
    stats: Object,
    sections: Array
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const active = ref("overview");
    const editingProject = ref(null);
    const editingExperience = ref(null);
    const editingSkill = ref(null);
    const editingCertificate = ref(null);
    const photo = ref(null);
    const sectionForm = useForm({ id: null, eyebrow: "", title: "", body: "", link_label: "", link_url: "", published: false, order: 0 });
    const projectImage = ref(null);
    const projectImagePreview = ref(null);
    const photoPreview = ref(null);
    watch(projectImage, (file) => {
      if (projectImagePreview.value?.startsWith?.("blob:")) URL.revokeObjectURL(projectImagePreview.value);
      projectImagePreview.value = file ? URL.createObjectURL(file) : null;
    });
    watch(photo, (file) => {
      if (photoPreview.value?.startsWith?.("blob:")) URL.revokeObjectURL(photoPreview.value);
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
      name: props.profile?.name ?? "",
      headline: props.profile?.headline ?? "",
      location: props.profile?.location ?? "",
      summary: props.profile?.summary ?? "",
      bio: props.profile?.bio ?? "",
      email: props.profile?.email ?? "",
      whatsapp_number: props.profile?.whatsapp_number ?? "",
      linkedin_url: props.profile?.linkedin_url ?? "",
      github_url: props.profile?.github_url ?? "",
      availability: props.profile?.availability ?? "",
      years_experience: props.profile?.years_experience ?? 4,
      photo: null,
      resume_headline: props.profile?.resume_headline ?? "",
      resume_summary: props.profile?.resume_summary ?? "",
      education_title: props.profile?.education_title ?? "",
      education_institution: props.profile?.education_institution ?? "",
      education_period: props.profile?.education_period ?? ""
    });
    const blankProject = () => ({
      id: null,
      title: "",
      slug: "",
      category: "",
      company: "",
      start_date: "",
      end_date: "",
      summary: "",
      description: "",
      tech_stack: "",
      live_url: "",
      repo_url: "",
      featured: false,
      include_in_resume: false,
      order: props.projects.length,
      image_path: null
    });
    const blankExperience = () => ({
      id: null,
      include_in_resume: true,
      role: "",
      company: "",
      company_url: "",
      logo_path: null,
      employment_type: "",
      work_mode: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
      order: props.experiences.length
    });
    const experienceLogo = ref(null);
    const experienceLogoPreview = ref(null);
    watch(experienceLogo, (file) => {
      if (experienceLogoPreview.value?.startsWith?.("blob:")) URL.revokeObjectURL(experienceLogoPreview.value);
      experienceLogoPreview.value = file ? URL.createObjectURL(file) : null;
    });
    const blankSkill = () => ({ id: null, name: "", category: "", proficiency: 80, order: props.skills.length });
    const blankCertificate = () => ({ id: null, title: "", issuer: "", issue_date: "", credential_url: "", description: "", order: props.certificates.length });
    const projectForm = ref(blankProject());
    const experienceForm = ref(blankExperience());
    const skillForm = ref(blankSkill());
    const certificateForm = ref(blankCertificate());
    watch(() => props.projects, (value) => projectRows.value = [...value]);
    watch(() => props.experiences, (value) => experienceRows.value = [...value]);
    watch(() => props.certificates, (value) => certificateRows.value = [...value]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Portfolio Admin" }, null, _parent));
      _push(`<div class="admin-shell"><aside class="admin-sidebar">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "admin-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`IBRAHIM<span${_scopeId}>.</span><small${_scopeId}>Portfolio CMS</small>`);
          } else {
            return [
              createTextVNode("IBRAHIM"),
              createVNode("span", null, "."),
              createVNode("small", null, "Portfolio CMS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav><!--[-->`);
      ssrRenderList([
        ["overview", "Overview"],
        ["profile", "Profile"],
        ["projects", "Projects"],
        ["experience", "Experience"],
        ["certificates", "Certificates"],
        ["skills", "Skills"],
        ["sections", "Custom sections"],
        ["resume", "Resume PDF"],
        ["messages", "Messages"]
      ], (item) => {
        _push(`<button class="${ssrRenderClass({ active: active.value === item[0] })}"><span>${ssrInterpolate(item[1])}</span>`);
        if (item[0] === "messages" && __props.stats.unreadMessages) {
          _push(`<b>${ssrInterpolate(__props.stats.unreadMessages)}</b>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><div class="admin-side-foot">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View website ↗`);
          } else {
            return [
              createTextVNode("View website ↗")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: "/profile" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Account settings`);
          } else {
            return [
              createTextVNode("Account settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/logout",
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign out`);
          } else {
            return [
              createTextVNode("Sign out")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside><main class="admin-main"><header class="admin-topbar"><div><small>Content management</small><h1>${ssrInterpolate(active.value)}</h1></div><div class="admin-topbar-actions"><span class="admin-status"><i></i>Website live</span>`);
      _push(ssrRenderComponent(unref(Link), {
        class: "admin-top-link",
        href: "/",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View site ↗`);
          } else {
            return [
              createTextVNode("View site ↗")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        class: "admin-top-link admin-top-logout",
        href: "/logout",
        method: "post",
        as: "button"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign out`);
          } else {
            return [
              createTextVNode("Sign out")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header>`);
      if (flash.value) {
        _push(`<div class="admin-flash">${ssrInterpolate(flash.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (errorList.value.length) {
        _push(`<div class="admin-errors"><strong>Please fix these fields.</strong><!--[-->`);
        ssrRenderList(errorList.value, (error) => {
          _push(`<span><b>${ssrInterpolate(error.field)}</b> — ${ssrInterpolate(error.message)}</span>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "overview") {
        _push(`<section class="admin-view"><div class="admin-welcome"><div><span>Welcome back</span><h2>Manage your complete portfolio from one place.</h2><p>Every change here updates the public Laravel + Inertia website immediately.</p></div>`);
        if (__props.profile?.photo_path) {
          _push(`<img${ssrRenderAttr("src", __props.profile.photo_path)} alt="">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="admin-stats"><button><strong>${ssrInterpolate(__props.stats.projects)}</strong><span>Projects</span></button><button><strong>${ssrInterpolate(__props.stats.experiences)}</strong><span>Experiences</span></button><button><strong>${ssrInterpolate(__props.stats.certificates)}</strong><span>Certificates</span></button><button><strong>${ssrInterpolate(__props.stats.skills)}</strong><span>Skills</span></button><button><strong>${ssrInterpolate(__props.stats.unreadMessages)}</strong><span>Unread messages</span></button></div><div class="admin-quick"><h3>Quick actions</h3><button>Update profile &amp; photo <span>→</span></button><button>Add a new project <span>→</span></button><button>Add experience <span>→</span></button></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "sections") {
        _push(`<section class="admin-view"><div class="admin-heading"><h2>Custom sections</h2><button class="admin-primary">New section</button></div><div class="admin-records"><!--[-->`);
        ssrRenderList(__props.sections, (section) => {
          _push(`<article><span>${ssrInterpolate(section.order)}</span><div><h3>${ssrInterpolate(section.title)}</h3><p>${ssrInterpolate(section.published ? "Published" : "Draft")}</p></div><div class="record-actions"><button>Edit</button><button>Delete</button></div></article>`);
        });
        _push(`<!--]--></div><form class="admin-form"><label><span>Eyebrow</span><input${ssrRenderAttr("value", unref(sectionForm).eyebrow)}></label><label><span>Title</span><input${ssrRenderAttr("value", unref(sectionForm).title)} required></label><label><span>Body</span><textarea rows="5" required>${ssrInterpolate(unref(sectionForm).body)}</textarea></label><div class="admin-grid"><label><span>Link label</span><input${ssrRenderAttr("value", unref(sectionForm).link_label)}></label><label><span>Link URL</span><input${ssrRenderAttr("value", unref(sectionForm).link_url)} type="url"></label></div><label><span>Display order</span><input${ssrRenderAttr("value", unref(sectionForm).order)} type="number" min="0"></label><label><input${ssrIncludeBooleanAttr(Array.isArray(unref(sectionForm).published) ? ssrLooseContain(unref(sectionForm).published, null) : unref(sectionForm).published) ? " checked" : ""} type="checkbox"> Published on homepage</label><!--[-->`);
        ssrRenderList(unref(sectionForm).errors, (error, field) => {
          _push(`<p role="alert">${ssrInterpolate(error)}</p>`);
        });
        _push(`<!--]--><button class="admin-primary"${ssrIncludeBooleanAttr(unref(sectionForm).processing) ? " disabled" : ""}>Save section</button></form></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "resume") {
        _push(`<section class="admin-view"><div class="admin-heading"><h2>Resume PDF</h2><a class="admin-primary" href="/resume">Download current PDF ↓</a></div><p>The PDF is generated from your current profile, skills and selected experience and projects. Changes appear on the next download.</p><form class="admin-form"><label><span>Resume headline</span><input${ssrRenderAttr("value", unref(profileForm).resume_headline)}></label><label><span>Resume summary (leave blank to use profile summary)</span><textarea rows="4">${ssrInterpolate(unref(profileForm).resume_summary)}</textarea></label><label><span>Education title</span><input${ssrRenderAttr("value", unref(profileForm).education_title)}></label><div class="admin-grid"><label><span>Institution</span><input${ssrRenderAttr("value", unref(profileForm).education_institution)}></label><label><span>Period</span><input${ssrRenderAttr("value", unref(profileForm).education_period)}></label></div><button class="admin-primary"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""}>Save resume settings</button></form></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "profile") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Public identity</span><h2>Profile &amp; biography</h2></div><button class="admin-primary"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""}>${ssrInterpolate(unref(profileForm).processing ? "Saving…" : "Save profile")}</button></div><form class="admin-form profile-admin-form"><div class="admin-photo">`);
        if (photoPreview.value || __props.profile?.photo_path) {
          _push(`<img${ssrRenderAttr("src", photoPreview.value || __props.profile.photo_path)} alt="Current profile">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div><strong>Profile photo</strong><p>Portrait JPEG, PNG or WebP. Maximum 5 MB.</p><input type="file" accept="image/*"></div></div><div class="admin-grid"><label><span>Display name</span><input${ssrRenderAttr("value", unref(profileForm).name)}></label><label><span>Professional headline</span><input${ssrRenderAttr("value", unref(profileForm).headline)}></label></div><div class="admin-grid"><label><span>Location</span><input${ssrRenderAttr("value", unref(profileForm).location)}></label><label><span>Public email</span><input${ssrRenderAttr("value", unref(profileForm).email)} type="email"></label></div><label><span>WhatsApp number (international format, e.g. +92…)</span><input${ssrRenderAttr("value", unref(profileForm).whatsapp_number)} type="tel"></label><label><span>Short summary</span><textarea rows="3">${ssrInterpolate(unref(profileForm).summary)}</textarea></label><label><span>Full biography</span><textarea rows="7">${ssrInterpolate(unref(profileForm).bio)}</textarea></label><div class="admin-grid"><label><span>LinkedIn URL</span><input${ssrRenderAttr("value", unref(profileForm).linkedin_url)} type="url"></label><label><span>GitHub URL</span><input${ssrRenderAttr("value", unref(profileForm).github_url)} type="url"></label></div><div class="admin-grid"><label><span>Availability</span><input${ssrRenderAttr("value", unref(profileForm).availability)}></label><label><span>Years experience</span><input${ssrRenderAttr("value", unref(profileForm).years_experience)} type="number" min="0"></label></div><button class="admin-primary mobile-save" type="submit">Save profile</button></form></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "projects") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Portfolio records</span><h2>Projects</h2></div><button class="admin-primary">+ Add project</button></div>`);
        if (editingProject.value !== null) {
          _push(`<form class="admin-form admin-editor"><label><input${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.include_in_resume) ? ssrLooseContain(projectForm.value.include_in_resume, null) : projectForm.value.include_in_resume) ? " checked" : ""} type="checkbox"> Include in resume PDF</label><div class="editor-head"><h3>${ssrInterpolate(projectForm.value.id ? "Edit project" : "New project")}</h3><button type="button">Close ×</button></div><div class="admin-grid"><label><span>Title</span><input${ssrRenderAttr("value", projectForm.value.title)} required></label><label><span>Slug</span><input${ssrRenderAttr("value", projectForm.value.slug)} placeholder="project-url-slug" required></label></div><div class="admin-grid"><label><span>Category</span><input${ssrRenderAttr("value", projectForm.value.category)}></label><label><span>Associated company</span><input${ssrRenderAttr("value", projectForm.value.company)}></label></div><div class="admin-grid"><label><span>Start date</span><input${ssrRenderAttr("value", projectForm.value.start_date)} type="date"></label><label><span>End date</span><input${ssrRenderAttr("value", projectForm.value.end_date)} type="date"></label></div><label><span>Display order</span><input${ssrRenderAttr("value", projectForm.value.order)} type="number" min="0"></label><label><span>Summary</span><textarea rows="3" required>${ssrInterpolate(projectForm.value.summary)}</textarea></label><label><span>Full description</span><textarea rows="6">${ssrInterpolate(projectForm.value.description)}</textarea></label><label><span>Technology stack (comma separated)</span><input${ssrRenderAttr("value", projectForm.value.tech_stack)} placeholder="Laravel, Vue 3, MySQL"></label><div class="admin-grid"><label><span>Live URL</span><input${ssrRenderAttr("value", projectForm.value.live_url)} type="url"></label><label><span>Repository URL</span><input${ssrRenderAttr("value", projectForm.value.repo_url)} type="url"></label></div><label><span>Project cover image</span>`);
          if (projectImagePreview.value || projectForm.value.image_path) {
            _push(`<div class="admin-cover-preview"><img${ssrRenderAttr("src", projectImagePreview.value || projectForm.value.image_path)} alt=""></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<input type="file" accept="image/*"><small class="field-hint">Shown on Work and homepage cards. JPEG/PNG/WebP, max 5 MB.</small></label><label class="admin-check"><input${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.featured) ? ssrLooseContain(projectForm.value.featured, null) : projectForm.value.featured) ? " checked" : ""} type="checkbox"><span>Feature on homepage</span></label><button class="admin-primary" type="submit">Save project</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="sort-help">Drag records using the handle to control their public display order. Arrow buttons work on touch devices.</p><div class="admin-records sortable-records sortable-records--projects"><!--[-->`);
        ssrRenderList(projectRows.value, (project) => {
          _push(`<article draggable="true" class="${ssrRenderClass({ dragging: dragging.value.type === "projects" && dragging.value.id === project.id })}"><div class="drag-handle" title="Drag to reorder">⋮⋮</div><div class="record-order">${ssrInterpolate(String(project.order + 1).padStart(2, "0"))}</div><div><small>${ssrInterpolate(project.category)}`);
          if (project.company) {
            _push(`<!--[--> · ${ssrInterpolate(project.company)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</small><h3>${ssrInterpolate(project.title)}</h3><p>${ssrInterpolate(project.summary)}</p></div><div class="record-actions"><button title="Move up">↑</button><button title="Move down">↓</button><button>Edit</button>`);
          _push(ssrRenderComponent(unref(Link), {
            href: `/work/${project.slug}`,
            target: "_blank"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`View ↗`);
              } else {
                return [
                  createTextVNode("View ↗")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="danger">Delete</button></div></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "experience") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Career history</span><h2>Experience</h2></div><button class="admin-primary">+ Add experience</button></div>`);
        if (editingExperience.value !== null) {
          _push(`<form class="admin-form admin-editor"><label><input${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.include_in_resume) ? ssrLooseContain(experienceForm.value.include_in_resume, null) : experienceForm.value.include_in_resume) ? " checked" : ""} type="checkbox"> Include in resume PDF</label><div class="editor-head"><h3>${ssrInterpolate(experienceForm.value.id ? "Edit experience" : "New experience")}</h3><button type="button">Close ×</button></div><div class="admin-grid"><label><span>Role</span><input${ssrRenderAttr("value", experienceForm.value.role)} required></label><label><span>Company</span><input${ssrRenderAttr("value", experienceForm.value.company)} required></label></div><label><span>Company URL</span><input${ssrRenderAttr("value", experienceForm.value.company_url)} type="url" placeholder="https://"></label><label><span>Company logo</span>`);
          if (experienceForm.value.logo_path || experienceLogoPreview.value) {
            _push(`<div class="admin-logo-preview"><img${ssrRenderAttr("src", experienceLogoPreview.value || experienceForm.value.logo_path)} alt=""></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"><small class="field-hint">Square PNG/JPG/WebP preferred. Shown on the Experience page.</small></label><div class="admin-grid"><label><span>Employment type</span><select><option value=""${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, "") : ssrLooseEqual(experienceForm.value.employment_type, "")) ? " selected" : ""}>Select type</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Full-time</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Part-time</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Freelance</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Contract</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Internship</option></select></label><label><span>Work mode</span><select><option value=""${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, "") : ssrLooseEqual(experienceForm.value.work_mode, "")) ? " selected" : ""}>Select mode</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>Remote</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>On-site</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>Hybrid</option></select></label></div><label><span>Location</span><input${ssrRenderAttr("value", experienceForm.value.location)} placeholder="Karachi, Sindh, Pakistan"></label><label><span>Display order</span><input${ssrRenderAttr("value", experienceForm.value.order)} type="number" min="0"></label><div class="admin-grid"><label><span>Start date (optional)</span><input${ssrRenderAttr("value", experienceForm.value.start_date)} type="date"></label><label><span>End date (empty = present)</span><input${ssrRenderAttr("value", experienceForm.value.end_date)} type="date"></label></div><label><span>Description</span><textarea rows="5">${ssrInterpolate(experienceForm.value.description)}</textarea></label><button class="admin-primary" type="submit">Save experience</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<p class="sort-help">Drag roles into the exact order you want visitors to see them.</p><div class="admin-records sortable-records sortable-records--experiences"><!--[-->`);
        ssrRenderList(experienceRows.value, (item) => {
          _push(`<article draggable="true" class="${ssrRenderClass({ dragging: dragging.value.type === "experiences" && dragging.value.id === item.id })}"><div class="drag-handle" title="Drag to reorder">⋮⋮</div><div class="record-order">${ssrInterpolate(String(item.order + 1).padStart(2, "0"))}</div>`);
          if (item.logo_path) {
            _push(`<img class="admin-exp-logo"${ssrRenderAttr("src", item.logo_path)}${ssrRenderAttr("alt", item.company)}>`);
          } else {
            _push(`<span class="admin-exp-logo admin-exp-logo--empty" aria-hidden="true"></span>`);
          }
          _push(`<div><small>${ssrInterpolate(item.company)}`);
          if (item.employment_type) {
            _push(`<!--[--> · ${ssrInterpolate(item.employment_type)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          if (item.work_mode) {
            _push(`<!--[--> · ${ssrInterpolate(item.work_mode)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` · ${ssrInterpolate(item.location)}</small><h3>${ssrInterpolate(item.role)}</h3><p>${ssrInterpolate(item.description)}</p></div><div class="record-actions"><button title="Move up">↑</button><button title="Move down">↓</button><button>Edit</button><button class="danger">Delete</button></div></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "certificates") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Education &amp; recognition</span><h2>Certificates</h2></div><button class="admin-primary">+ Add certificate</button></div>`);
        if (editingCertificate.value !== null) {
          _push(`<form class="admin-form admin-editor"><div class="editor-head"><h3>${ssrInterpolate(certificateForm.value.id ? "Edit certificate" : "New certificate")}</h3><button type="button">Close ×</button></div><div class="admin-grid"><label><span>Certificate title</span><input${ssrRenderAttr("value", certificateForm.value.title)} required></label><label><span>Issuer</span><input${ssrRenderAttr("value", certificateForm.value.issuer)} required></label></div><div class="admin-grid"><label><span>Issue date</span><input${ssrRenderAttr("value", certificateForm.value.issue_date)} type="date"></label><label><span>Credential URL</span><input${ssrRenderAttr("value", certificateForm.value.credential_url)} type="url" placeholder="https://"></label></div><label><span>Description</span><textarea rows="4">${ssrInterpolate(certificateForm.value.description)}</textarea></label><label><span>Display order</span><input${ssrRenderAttr("value", certificateForm.value.order)} type="number" min="0"></label><button class="admin-primary" type="submit">Save certificate</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="certificate-admin-list"><!--[-->`);
        ssrRenderList(certificateRows.value, (certificate) => {
          _push(`<article><span class="certificate-mark">✓</span><div><small>${ssrInterpolate(certificate.issuer)}</small><h3>${ssrInterpolate(certificate.title)}</h3><p>${ssrInterpolate(certificate.description)}</p></div><div class="record-actions"><button>Edit</button>`);
          if (certificate.credential_url) {
            _push(`<a${ssrRenderAttr("href", certificate.credential_url)} target="_blank">Credential ↗</a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<button class="danger">Delete</button></div></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "skills") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Technical capability</span><h2>Skills</h2></div><button class="admin-primary">+ Add skill</button></div>`);
        if (editingSkill.value !== null) {
          _push(`<form class="admin-form admin-editor skill-editor"><div class="editor-head"><h3>${ssrInterpolate(skillForm.value.id ? "Edit skill" : "New skill")}</h3><button type="button">Close ×</button></div><div class="admin-grid four"><label><span>Skill</span><input${ssrRenderAttr("value", skillForm.value.name)} required></label><label><span>Category</span><input${ssrRenderAttr("value", skillForm.value.category)} required></label><label><span>Level %</span><input${ssrRenderAttr("value", skillForm.value.proficiency)} type="number" min="1" max="100"></label><label><span>Order</span><input${ssrRenderAttr("value", skillForm.value.order)} type="number" min="0"></label></div><button class="admin-primary" type="submit">Save skill</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="skill-admin-list"><!--[-->`);
        ssrRenderList(__props.skills, (skill) => {
          _push(`<article><div><small>${ssrInterpolate(skill.category)}</small><strong>${ssrInterpolate(skill.name)}</strong></div><span>${ssrInterpolate(skill.proficiency)}%</span><div class="skill-bar"><i style="${ssrRenderStyle({ width: `${skill.proficiency}%` })}"></i></div><button>Edit</button><button class="danger">Delete</button></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "messages") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Project enquiries</span><h2>Messages</h2></div></div>`);
        if (!__props.messages.length) {
          _push(`<div class="admin-empty">No messages yet.</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="message-list"><!--[-->`);
        ssrRenderList(__props.messages, (message) => {
          _push(`<article class="${ssrRenderClass({ unread: !message.read_at })}"><header><div>`);
          if (!message.read_at) {
            _push(`<span></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<strong>${ssrInterpolate(message.name)}</strong><small>${ssrInterpolate(message.email)} · ${ssrInterpolate(message.company || "Independent")}</small></div><time>${ssrInterpolate(new Date(message.created_at).toLocaleDateString())}</time></header><p>${ssrInterpolate(message.message)}</p><footer><span>${ssrInterpolate(message.budget || "Budget not specified")}</span>`);
          if (!message.read_at) {
            _push(`<button>Mark read</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<a${ssrRenderAttr("href", `mailto:${message.email}`)}>Reply ↗</a><button class="danger">Delete</button></footer></article>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
