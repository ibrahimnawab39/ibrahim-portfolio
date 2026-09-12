import { computed, mergeProps, useSSRContext, ref, watch, unref, withCtx, openBlock, createBlock, Fragment, createTextVNode, createVNode, toDisplayString, createCommentVNode } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderComponent, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { Link, usePage, useForm, Head, router } from "@inertiajs/vue3";
const _sfc_main$5 = {
  __name: "AdminCharts",
  __ssrInlineRender: true,
  props: {
    stats: { type: Object, required: true },
    messages: { type: Array, default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const contentBars = computed(() => {
      const items = [
        { label: "Projects", value: Number(props.stats.projects) || 0 },
        { label: "Experience", value: Number(props.stats.experiences) || 0 },
        { label: "Skills", value: Number(props.stats.skills) || 0 },
        { label: "Certificates", value: Number(props.stats.certificates) || 0 },
        { label: "Unread", value: Number(props.stats.unreadMessages) || 0 }
      ];
      const max = Math.max(1, ...items.map((item) => item.value));
      return items.map((item) => ({ ...item, pct: Math.round(item.value / max * 100) }));
    });
    const trend = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const months = Array.from({ length: 6 }, (_, index) => {
        const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
        return {
          key: `${date.getFullYear()}-${date.getMonth()}`,
          label: date.toLocaleString("en", { month: "short" }),
          value: 0
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
        height: Math.max(8, Math.round(month.value / max * 100))
      }));
    });
    const readSplit = computed(() => {
      const total = props.messages.length;
      const unread = props.messages.filter((message) => !message.read_at).length;
      const read = Math.max(0, total - unread);
      const unreadPct = total ? Math.round(unread / total * 100) : 0;
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
        unreadDash: unreadPct / 100 * circumference,
        readDash: readPct / 100 * circumference
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-charts" }, _attrs))}><article class="admin-chart-card"><header><h3>Content mix</h3><p>Portfolio inventory at a glance</p></header><div class="admin-bar-chart"><!--[-->`);
      ssrRenderList(contentBars.value, (bar) => {
        _push(`<div class="admin-bar-row"><span>${ssrInterpolate(bar.label)}</span><div class="admin-bar-track"><i style="${ssrRenderStyle({ width: `${bar.pct}%` })}"></i></div><strong>${ssrInterpolate(bar.value)}</strong></div>`);
      });
      _push(`<!--]--></div></article><article class="admin-chart-card"><header><h3>Enquiries trend</h3><p>Last 6 months</p></header><div class="admin-trend-chart" role="img" aria-label="Monthly enquiries"><!--[-->`);
      ssrRenderList(trend.value, (month) => {
        _push(`<div class="admin-trend-col"><div class="admin-trend-bar" style="${ssrRenderStyle({ height: `${month.height}%` })}"${ssrRenderAttr("title", `${month.label}: ${month.value}`)}></div><span>${ssrInterpolate(month.label)}</span><small>${ssrInterpolate(month.value)}</small></div>`);
      });
      _push(`<!--]--></div></article><article class="admin-chart-card"><header><h3>Inbox health</h3><p>Read vs unread</p></header><div class="admin-donut-wrap"><svg viewBox="0 0 120 120" class="admin-donut" aria-hidden="true"><circle class="donut-track" cx="60" cy="60" r="42"></circle><circle class="donut-read" cx="60" cy="60" r="42"${ssrRenderAttr("stroke-dasharray", `${readSplit.value.readDash} ${readSplit.value.circumference}`)} stroke-dashoffset="0"></circle><circle class="donut-unread" cx="60" cy="60" r="42"${ssrRenderAttr("stroke-dasharray", `${readSplit.value.unreadDash} ${readSplit.value.circumference}`)}${ssrRenderAttr("stroke-dashoffset", `${-readSplit.value.readDash}`)}></circle><text x="60" y="58" text-anchor="middle" class="donut-total">${ssrInterpolate(readSplit.value.total)}</text><text x="60" y="74" text-anchor="middle" class="donut-caption">messages</text></svg><ul><li><i class="swatch read"></i> Read <strong>${ssrInterpolate(readSplit.value.read)}</strong></li><li><i class="swatch unread"></i> Unread <strong>${ssrInterpolate(readSplit.value.unread)}</strong></li></ul></div></article></div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminCharts.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = {
  __name: "AdminDataTable",
  __ssrInlineRender: true,
  props: {
    columns: { type: Array, required: true },
    rows: { type: Array, default: () => [] },
    sortKey: { type: String, default: "" },
    sortDir: { type: String, default: "asc" },
    emptyText: { type: String, default: "No records found." }
  },
  emits: ["sort"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-table-wrap" }, _attrs))}><table class="admin-table"><thead><tr><!--[-->`);
      ssrRenderList(__props.columns, (column) => {
        _push(`<th class="${ssrRenderClass({ sortable: column.sortable, sorted: __props.sortKey === column.key })}"><span>${ssrInterpolate(column.label)}</span>`);
        if (column.sortable && __props.sortKey === column.key) {
          _push(`<em>${ssrInterpolate(__props.sortDir === "asc" ? "↑" : "↓")}</em>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</th>`);
      });
      _push(`<!--]-->`);
      if (_ctx.$slots.actions) {
        _push(`<th class="col-actions">Actions</th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody>`);
      if (!__props.rows.length) {
        _push(`<tr><td${ssrRenderAttr("colspan", __props.columns.length + (_ctx.$slots.actions ? 1 : 0))} class="admin-table-empty">${ssrInterpolate(__props.emptyText)}</td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(__props.rows, (row, index) => {
        _push(`<tr><!--[-->`);
        ssrRenderList(__props.columns, (column) => {
          _push(`<td>`);
          ssrRenderSlot(_ctx.$slots, `cell-${column.key}`, { row }, () => {
            _push(`${ssrInterpolate(row[column.key])}`);
          }, _push, _parent);
          _push(`</td>`);
        });
        _push(`<!--]-->`);
        if (_ctx.$slots.actions) {
          _push(`<td class="col-actions"><div class="record-actions">`);
          ssrRenderSlot(_ctx.$slots, "actions", { row }, null, _push, _parent);
          _push(`</div></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminDataTable.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
function usePageSize(storageKey = "admin-page-size", fallback = 12) {
  const pageSize = ref(fallback);
  try {
    const stored = Number(localStorage.getItem(storageKey));
    if ([6, 12, 24].includes(stored)) pageSize.value = stored;
  } catch {
  }
  const setPageSize = (size) => {
    pageSize.value = size;
    try {
      localStorage.setItem(storageKey, String(size));
    } catch {
    }
  };
  return { pageSize, setPageSize };
}
function useAdminPager(rows, query, fields, pageSize) {
  const page = ref(1);
  watch(query, () => {
    page.value = 1;
  });
  watch(pageSize, () => {
    page.value = 1;
  });
  const pager = computed(() => {
    const source = unref(rows) ?? [];
    const q = String(unref(query) ?? "").trim().toLowerCase();
    const filtered = source.filter((item) => {
      if (!q) return true;
      return fields.some((field) => String(item[field] ?? "").toLowerCase().includes(q));
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
      isFiltered: Boolean(q)
    };
  });
  return { page, pager };
}
function pageNumbers(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }
  const set = /* @__PURE__ */ new Set([1, total, current, current - 1, current + 1]);
  if (current <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => set.add(n));
  return [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b).reduce((acc, n) => {
    if (acc.length && n - acc[acc.length - 1] > 1) acc.push("…");
    acc.push(n);
    return acc;
  }, []);
}
function sortBy(rows, { key, dir }) {
  if (!key) return [...rows];
  const factor = dir === "desc" ? -1 : 1;
  return [...rows].sort((a, b) => {
    const left = a?.[key];
    const right = b?.[key];
    if (typeof left === "boolean" || typeof right === "boolean") {
      return (Number(Boolean(left)) - Number(Boolean(right))) * factor;
    }
    if (typeof left === "number" || typeof right === "number") {
      return ((Number(left) || 0) - (Number(right) || 0)) * factor;
    }
    return String(left ?? "").localeCompare(String(right ?? ""), void 0, { sensitivity: "base" }) * factor;
  });
}
const _sfc_main$3 = {
  __name: "AdminPager",
  __ssrInlineRender: true,
  props: {
    page: { type: Number, required: true },
    pages: { type: Number, required: true },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 12 }
  },
  emits: ["update:page", "update:pageSize"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const numbers = computed(() => pageNumbers(props.page, props.pages));
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.total > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "admin-pager" }, _attrs))}><div class="admin-pager-size"><span>Show</span><select${ssrRenderAttr("value", __props.pageSize)}><option${ssrRenderAttr("value", 6)}>6</option><option${ssrRenderAttr("value", 12)}>12</option><option${ssrRenderAttr("value", 24)}>24</option></select><span>of ${ssrInterpolate(__props.total)}</span></div>`);
        if (__props.pages > 1) {
          _push(`<div class="admin-pager-nav"><button type="button"${ssrIncludeBooleanAttr(__props.page <= 1) ? " disabled" : ""}>←</button><!--[-->`);
          ssrRenderList(numbers.value, (item, index) => {
            _push(`<!--[-->`);
            if (item === "…") {
              _push(`<span class="admin-pager-ellipsis">…</span>`);
            } else {
              _push(`<button type="button" class="${ssrRenderClass({ active: item === __props.page })}">${ssrInterpolate(item)}</button>`);
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--><button type="button"${ssrIncludeBooleanAttr(__props.page >= __props.pages) ? " disabled" : ""}>→</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminPager.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
  __name: "AdminSidebar",
  __ssrInlineRender: true,
  props: {
    active: { type: String, required: true },
    collapsed: { type: Boolean, default: false },
    items: { type: Array, required: true },
    unreadMessages: { type: Number, default: 0 },
    linkedInConnected: { type: Boolean, default: false }
  },
  emits: ["update:collapsed", "navigate"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({
        class: ["admin-sidebar", { "is-collapsed": __props.collapsed }]
      }, _attrs))}><div class="admin-side-top">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "admin-brand",
        title: __props.collapsed ? "Ibrahim Portfolio CMS" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.collapsed) {
              _push2(`<!--[-->IB<span${_scopeId}>.</span><!--]-->`);
            } else {
              _push2(`<!--[-->IBRAHIM<span${_scopeId}>.</span><small${_scopeId}>Portfolio CMS</small><!--]-->`);
            }
          } else {
            return [
              __props.collapsed ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                createTextVNode("IB"),
                createVNode("span", null, ".")
              ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                createTextVNode("IBRAHIM"),
                createVNode("span", null, "."),
                createVNode("small", null, "Portfolio CMS")
              ], 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="admin-collapse-btn"${ssrRenderAttr("aria-label", __props.collapsed ? "Expand sidebar" : "Collapse sidebar")}${ssrRenderAttr("title", __props.collapsed ? "Expand" : "Collapse")}>${ssrInterpolate(__props.collapsed ? "»" : "«")}</button></div><nav><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<button type="button" class="${ssrRenderClass({ active: __props.active === item.id })}"${ssrRenderAttr("title", __props.collapsed ? item.label : void 0)}><i class="nav-glyph">${ssrInterpolate(item.glyph)}</i><span class="nav-label">${ssrInterpolate(item.label)}</span>`);
        if (item.id === "messages" && __props.unreadMessages) {
          _push(`<b class="nav-badge">${ssrInterpolate(__props.unreadMessages)}</b>`);
        } else if (item.id === "linkedin") {
          _push(`<em class="${ssrRenderClass([{ on: __props.linkedInConnected }, "nav-dot"])}"></em>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><div class="admin-side-foot">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        target: "_blank",
        title: __props.collapsed ? "View website" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="nav-glyph"${_scopeId}>↗</i><span class="nav-label"${_scopeId}>View website</span>`);
          } else {
            return [
              createVNode("i", { class: "nav-glyph" }, "↗"),
              createVNode("span", { class: "nav-label" }, "View website")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/profile",
        title: __props.collapsed ? "Account" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="nav-glyph"${_scopeId}>⚙</i><span class="nav-label"${_scopeId}>Account settings</span>`);
          } else {
            return [
              createVNode("i", { class: "nav-glyph" }, "⚙"),
              createVNode("span", { class: "nav-label" }, "Account settings")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/logout",
        method: "post",
        as: "button",
        title: __props.collapsed ? "Sign out" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="nav-glyph"${_scopeId}>⎋</i><span class="nav-label"${_scopeId}>Sign out</span>`);
          } else {
            return [
              createVNode("i", { class: "nav-glyph" }, "⎋"),
              createVNode("span", { class: "nav-label" }, "Sign out")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></aside>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "AdminViewToggle",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: String, default: "list" }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "view-toggle",
        role: "group",
        "aria-label": "View mode"
      }, _attrs))}><button type="button" class="${ssrRenderClass({ active: __props.modelValue === "list" })}">List</button><button type="button" class="${ssrRenderClass({ active: __props.modelValue === "grid" })}">Grid</button><button type="button" class="${ssrRenderClass({ active: __props.modelValue === "table" })}">Table</button></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Admin/AdminViewToggle.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
    const siteUrl = computed(() => typeof window !== "undefined" ? window.location.origin : "");
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
    const skillRows = ref([...props.skills]);
    const messageRows = ref([...props.messages]);
    const dragging = ref({ type: null, id: null });
    const sidebarCollapsed = ref(false);
    try {
      sidebarCollapsed.value = localStorage.getItem("admin-sidebar-collapsed") === "1";
    } catch {
    }
    watch(sidebarCollapsed, (value) => {
      try {
        localStorage.setItem("admin-sidebar-collapsed", value ? "1" : "0");
      } catch {
      }
    });
    const viewMode = ref("list");
    try {
      const stored = localStorage.getItem("admin-view-mode");
      if (["list", "grid", "table"].includes(stored)) viewMode.value = stored;
    } catch {
    }
    const setViewMode = (mode) => {
      viewMode.value = mode;
      try {
        localStorage.setItem("admin-view-mode", mode);
      } catch {
      }
    };
    const { pageSize, setPageSize } = usePageSize();
    const projectQuery = ref("");
    const experienceQuery = ref("");
    const certificateQuery = ref("");
    const skillQuery = ref("");
    const messageQuery = ref("");
    const projectSort = ref({ key: "order", dir: "asc" });
    const experienceSort = ref({ key: "order", dir: "asc" });
    const certificateSort = ref({ key: "order", dir: "asc" });
    const skillSort = ref({ key: "order", dir: "asc" });
    const messageSort = ref({ key: "created_at", dir: "desc" });
    const toggleSort = (state, key) => {
      if (state.value.key === key) {
        state.value = { key, dir: state.value.dir === "asc" ? "desc" : "asc" };
        return;
      }
      state.value = { key, dir: "asc" };
    };
    const sortedProjects = computed(() => sortBy(projectRows.value, projectSort.value));
    const sortedExperiences = computed(() => sortBy(experienceRows.value, experienceSort.value));
    const sortedCertificates = computed(() => sortBy(certificateRows.value, certificateSort.value));
    const sortedSkills = computed(() => sortBy(skillRows.value, skillSort.value));
    const sortedMessages = computed(() => sortBy(messageRows.value, messageSort.value));
    const { page: projectPage, pager: projectPager } = useAdminPager(sortedProjects, projectQuery, ["title", "company", "category", "summary"], pageSize);
    const { page: experiencePage, pager: experiencePager } = useAdminPager(sortedExperiences, experienceQuery, ["role", "company", "location", "description"], pageSize);
    const { page: certificatePage, pager: certificatePager } = useAdminPager(sortedCertificates, certificateQuery, ["title", "issuer", "description"], pageSize);
    const { page: skillPage, pager: skillPager } = useAdminPager(sortedSkills, skillQuery, ["name", "category"], pageSize);
    const { page: messagePage, pager: messagePager } = useAdminPager(sortedMessages, messageQuery, ["name", "email", "company", "message"], pageSize);
    const canReorderProjects = computed(() => !projectPager.value.isFiltered && viewMode.value !== "table");
    const canReorderExperiences = computed(() => !experiencePager.value.isFiltered && viewMode.value !== "table");
    const projectColumns = [
      { key: "order", label: "#", sortable: true },
      { key: "title", label: "Title", sortable: true },
      { key: "company", label: "Company", sortable: true },
      { key: "category", label: "Category", sortable: true },
      { key: "featured", label: "Featured", sortable: true }
    ];
    const experienceColumns = [
      { key: "order", label: "#", sortable: true },
      { key: "role", label: "Role", sortable: true },
      { key: "company", label: "Company", sortable: true },
      { key: "location", label: "Location", sortable: true },
      { key: "employment_type", label: "Type", sortable: true }
    ];
    const certificateColumns = [
      { key: "order", label: "#", sortable: true },
      { key: "title", label: "Title", sortable: true },
      { key: "issuer", label: "Issuer", sortable: true },
      { key: "issue_date", label: "Issued", sortable: true }
    ];
    const skillColumns = [
      { key: "order", label: "#", sortable: true },
      { key: "name", label: "Skill", sortable: true },
      { key: "category", label: "Category", sortable: true },
      { key: "proficiency", label: "Level", sortable: true }
    ];
    const messageColumns = [
      { key: "name", label: "From", sortable: true },
      { key: "email", label: "Email", sortable: true },
      { key: "company", label: "Company", sortable: true },
      { key: "created_at", label: "Date", sortable: true },
      { key: "read_at", label: "Status", sortable: true }
    ];
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
    watch(() => props.projects, (value) => {
      projectRows.value = [...value];
    });
    watch(() => props.experiences, (value) => {
      experienceRows.value = [...value];
    });
    watch(() => props.certificates, (value) => {
      certificateRows.value = [...value];
    });
    watch(() => props.skills, (value) => {
      skillRows.value = [...value];
    });
    watch(() => props.messages, (value) => {
      messageRows.value = [...value];
    });
    const navItems = [
      { id: "overview", label: "Overview", glyph: "◉" },
      { id: "profile", label: "Profile", glyph: "☺" },
      { id: "projects", label: "Projects", glyph: "▣" },
      { id: "experience", label: "Experience", glyph: "▤" },
      { id: "certificates", label: "Certificates", glyph: "★" },
      { id: "skills", label: "Skills", glyph: "◈" },
      { id: "linkedin", label: "LinkedIn", glyph: "in" },
      { id: "sections", label: "Sections", glyph: "≡" },
      { id: "resume", label: "Resume PDF", glyph: "↓" },
      { id: "messages", label: "Messages", glyph: "✉" }
    ];
    const setTab = (tab) => {
      active.value = tab;
      editingProject.value = null;
      editingExperience.value = null;
      editingSkill.value = null;
      editingCertificate.value = null;
    };
    const editProject = (project = null) => {
      projectForm.value = project ? {
        id: project.id,
        title: project.title ?? "",
        slug: project.slug ?? "",
        category: project.category ?? "",
        company: project.company ?? "",
        start_date: project.start_date?.slice(0, 10) ?? "",
        end_date: project.end_date?.slice(0, 10) ?? "",
        summary: project.summary ?? "",
        description: project.description ?? "",
        tech_stack: (project.tech_stack ?? []).join(", "),
        live_url: project.live_url ?? "",
        repo_url: project.repo_url ?? "",
        featured: !!project.featured,
        include_in_resume: !!project.include_in_resume,
        order: project.order ?? 0,
        image_path: project.image_path ?? null
      } : blankProject();
      editingProject.value = project?.id ?? "new";
      projectImage.value = null;
    };
    const editExperience = (item = null) => {
      experienceForm.value = item ? { ...item, start_date: item.start_date?.slice(0, 10) ?? "", end_date: item.end_date?.slice(0, 10) ?? "" } : blankExperience();
      experienceLogo.value = null;
      experienceLogoPreview.value = null;
      editingExperience.value = item?.id ?? "new";
    };
    const editSkill = (item = null) => {
      skillForm.value = item ? { ...item } : blankSkill();
      editingSkill.value = item?.id ?? "new";
    };
    const editCertificate = (item = null) => {
      certificateForm.value = item ? { ...item, issue_date: item.issue_date?.slice(0, 10) ?? "" } : blankCertificate();
      editingCertificate.value = item?.id ?? "new";
    };
    const remove = (url, label) => {
      if (window.confirm(`Delete ${label}? This cannot be undone.`)) {
        router.delete(url, { preserveScroll: true });
      }
    };
    const linkedInConnected = computed(() => !!profileForm.linkedin_url);
    const linkedInShareUrl = computed(() => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl.value || "https://ibrahimnawab.com")}`);
    const linkedInFeatureText = computed(() => {
      const name = profileForm.name || "Ibrahim Nawab";
      const headline = profileForm.headline || "Full Stack Developer";
      return `${name} — ${headline}

Explore my portfolio: selected Laravel products, platforms and mobile work.
${siteUrl.value || "https://your-portfolio-url"}

Open to collaborations and product builds.`;
    });
    const copyNotice = ref("");
    const tabTitle = computed(() => ({
      overview: "Overview",
      profile: "Profile",
      projects: "Projects",
      experience: "Experience",
      certificates: "Certificates",
      skills: "Skills",
      linkedin: "LinkedIn connect",
      sections: "Custom sections",
      resume: "Resume PDF",
      messages: "Messages"
    })[active.value] || active.value);
    const formatDate = (value) => {
      if (!value) return "—";
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Portfolio Admin" }, null, _parent));
      _push(`<div class="${ssrRenderClass([{ "sidebar-collapsed": sidebarCollapsed.value }, "admin-shell"])}">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        active: active.value,
        collapsed: sidebarCollapsed.value,
        items: navItems,
        "unread-messages": __props.stats.unreadMessages,
        "linked-in-connected": linkedInConnected.value,
        "onUpdate:collapsed": ($event) => sidebarCollapsed.value = $event,
        onNavigate: setTab
      }, null, _parent));
      _push(`<main class="admin-main"><header class="admin-topbar"><div><small>Content management</small><h1>${ssrInterpolate(tabTitle.value)}</h1></div><div class="admin-topbar-actions"><span class="admin-status"><i></i>Website live</span>`);
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
      if (copyNotice.value) {
        _push(`<div class="admin-flash">${ssrInterpolate(copyNotice.value)}</div>`);
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
        _push(`<section class="admin-view"><div class="admin-welcome"><div><span>Welcome back</span><h2>Your portfolio CMS, ready to ship updates.</h2><p>Projects, experience, skills and LinkedIn sharing — all in one place.</p><div class="welcome-actions"><button type="button" class="admin-primary">Add project</button><button type="button" class="admin-ghost">LinkedIn connect</button></div></div>`);
        if (__props.profile?.photo_path) {
          _push(`<img${ssrRenderAttr("src", __props.profile.photo_path)} alt="">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="admin-stats"><button><strong>${ssrInterpolate(__props.stats.projects)}</strong><span>Projects</span></button><button><strong>${ssrInterpolate(__props.stats.experiences)}</strong><span>Experiences</span></button><button><strong>${ssrInterpolate(__props.stats.certificates)}</strong><span>Certificates</span></button><button><strong>${ssrInterpolate(__props.stats.skills)}</strong><span>Skills</span></button><button><strong>${ssrInterpolate(__props.stats.unreadMessages)}</strong><span>Unread messages</span></button></div>`);
        _push(ssrRenderComponent(_sfc_main$5, {
          stats: __props.stats,
          messages: messageRows.value
        }, null, _parent));
        _push(`<div class="admin-quick-grid"><button><strong>Profile</strong><span>Photo, bio, social links</span></button><button><strong>LinkedIn</strong><span>Connect &amp; share portfolio</span></button><button><strong>Resume</strong><span>PDF settings &amp; download</span></button><button><strong>Inbox</strong><span>Client enquiries</span></button></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "linkedin") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Distribution</span><h2>LinkedIn connect</h2></div><span class="${ssrRenderClass([{ on: linkedInConnected.value }, "li-badge"])}">${ssrInterpolate(linkedInConnected.value ? "Profile linked" : "Not connected")}</span></div><div class="li-hero"><div><h3>Connect your portfolio to LinkedIn</h3><p>Save your LinkedIn profile, share this website as a featured link, and push selected work to your network — without leaving the CMS.</p></div><ol><li>Paste your LinkedIn profile URL below and save.</li><li>Use Share / Featured helpers to promote the live site.</li><li>On LinkedIn → Profile → Featured → Add a link → paste your portfolio URL.</li></ol></div><form class="admin-form"><div class="admin-grid"><label><span>LinkedIn profile URL</span><input${ssrRenderAttr("value", unref(profileForm).linkedin_url)} type="url" placeholder="https://www.linkedin.com/in/your-handle"></label><label><span>Public portfolio URL</span><input${ssrRenderAttr("value", siteUrl.value)} type="url" readonly></label></div><div class="li-actions"><button class="admin-primary" type="submit"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""}>Save LinkedIn link</button>`);
        if (unref(profileForm).linkedin_url) {
          _push(`<a class="admin-ghost"${ssrRenderAttr("href", unref(profileForm).linkedin_url)} target="_blank" rel="noreferrer">Open LinkedIn profile ↗</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<a class="admin-ghost"${ssrRenderAttr("href", linkedInShareUrl.value)} target="_blank" rel="noreferrer">Share portfolio on LinkedIn ↗</a><button type="button" class="admin-ghost">Copy portfolio URL</button><button type="button" class="admin-ghost">Copy Featured post text</button></div></form><div class="li-share-grid"><article><h4>Featured section text</h4><pre>${ssrInterpolate(linkedInFeatureText.value)}</pre></article><article><h4>Suggested work to feature</h4><ul><!--[-->`);
        ssrRenderList(projectRows.value.slice(0, 5), (project) => {
          _push(`<li><strong>${ssrInterpolate(project.title)}</strong><button type="button">Copy case URL</button></li>`);
        });
        _push(`<!--]-->`);
        if (!projectRows.value.length) {
          _push(`<li>Add projects first, then share case study links.</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</ul></article></div></section>`);
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
        _push(`<section class="admin-view"><div class="admin-heading"><h2>Resume PDF</h2><a class="admin-primary" href="/resume">Download current PDF ↓</a></div><p class="admin-lead">The PDF is generated from your current profile, skills and selected experience and projects.</p><form class="admin-form"><label><span>Resume headline</span><input${ssrRenderAttr("value", unref(profileForm).resume_headline)}></label><label><span>Resume summary (leave blank to use profile summary)</span><textarea rows="4">${ssrInterpolate(unref(profileForm).resume_summary)}</textarea></label><label><span>Education title</span><input${ssrRenderAttr("value", unref(profileForm).education_title)}></label><div class="admin-grid"><label><span>Institution</span><input${ssrRenderAttr("value", unref(profileForm).education_institution)}></label><label><span>Period</span><input${ssrRenderAttr("value", unref(profileForm).education_period)}></label></div><button class="admin-primary"${ssrIncludeBooleanAttr(unref(profileForm).processing) ? " disabled" : ""}>Save resume settings</button></form></section>`);
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
          _push(`<input type="file" accept="image/*"></label><label class="admin-check"><input${ssrIncludeBooleanAttr(Array.isArray(projectForm.value.featured) ? ssrLooseContain(projectForm.value.featured, null) : projectForm.value.featured) ? " checked" : ""} type="checkbox"><span>Feature on homepage</span></label><button class="admin-primary" type="submit">Save project</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="admin-toolbar"><input${ssrRenderAttr("value", projectQuery.value)} type="search" placeholder="Search projects…">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": viewMode.value,
          "onUpdate:modelValue": setViewMode
        }, null, _parent));
        _push(`<span class="toolbar-meta">${ssrInterpolate(unref(projectPager).total)} items</span></div>`);
        if (!canReorderProjects.value) {
          _push(`<p class="sort-help">Clear search and use List/Grid to drag-reorder. Table mode supports column sorting for browsing.</p>`);
        } else if (viewMode.value === "list") {
          _push(`<p class="sort-help">Drag ⋮⋮ or use ↑ ↓ to set the public Works order.</p>`);
        } else {
          _push(`<!---->`);
        }
        if (viewMode.value === "table") {
          _push(ssrRenderComponent(_sfc_main$4, {
            columns: projectColumns,
            rows: unref(projectPager).items,
            "sort-key": projectSort.value.key,
            "sort-dir": projectSort.value.dir,
            onSort: ($event) => toggleSort(projectSort.value, $event)
          }, {
            "cell-order": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(String((row.order ?? 0) + 1).padStart(2, "0"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(String((row.order ?? 0) + 1).padStart(2, "0")), 1)
                ];
              }
            }),
            "cell-featured": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(row.featured ? "Yes" : "No")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(row.featured ? "Yes" : "No"), 1)
                ];
              }
            }),
            actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${_scopeId}>Edit</button>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/work/${row.slug}`,
                  target: "_blank"
                }, {
                  default: withCtx((_, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`View ↗`);
                    } else {
                      return [
                        createTextVNode("View ↗")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button class="danger"${_scopeId}>Delete</button>`);
              } else {
                return [
                  createVNode("button", {
                    onClick: ($event) => editProject(row)
                  }, "Edit", 8, ["onClick"]),
                  createVNode(unref(Link), {
                    href: `/work/${row.slug}`,
                    target: "_blank"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("View ↗")
                    ]),
                    _: 1
                  }, 8, ["href"]),
                  createVNode("button", {
                    class: "danger",
                    onClick: ($event) => remove(`/admin/projects/${row.id}`, row.title)
                  }, "Delete", 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="${ssrRenderClass(viewMode.value === "grid" ? "admin-card-grid" : "admin-records sortable-records sortable-records--projects")}"><!--[-->`);
          ssrRenderList(unref(projectPager).items, (project) => {
            _push(`<article${ssrRenderAttr("draggable", canReorderProjects.value)} class="${ssrRenderClass([{ dragging: dragging.value.type === "projects" && dragging.value.id === project.id }, viewMode.value === "grid" ? "admin-card" : ""])}">`);
            if (viewMode.value === "grid") {
              _push(`<!--[--><div class="admin-card-cover">`);
              if (project.image_path) {
                _push(`<img${ssrRenderAttr("src", project.image_path)}${ssrRenderAttr("alt", project.title)}>`);
              } else {
                _push(`<span>${ssrInterpolate(project.title.slice(0, 1))}</span>`);
              }
              _push(`</div><div class="admin-card-body"><small>${ssrInterpolate(project.category)}`);
              if (project.company) {
                _push(`<!--[--> · ${ssrInterpolate(project.company)}<!--]-->`);
              } else {
                _push(`<!---->`);
              }
              _push(`</small><h3>${ssrInterpolate(project.title)}</h3><p>${ssrInterpolate(project.summary)}</p><div class="record-actions"><button>Edit</button>`);
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
              _push(`<button class="danger">Delete</button></div></div><!--]-->`);
            } else {
              _push(`<!--[--><div class="drag-handle" title="Drag to reorder">⋮⋮</div><div class="record-order">${ssrInterpolate(String(project.order + 1).padStart(2, "0"))}</div><div><small>${ssrInterpolate(project.category)}`);
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
              _push(`<button class="danger">Delete</button></div><!--]-->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]-->`);
          if (!unref(projectPager).total) {
            _push(`<div class="admin-empty">No projects found.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          page: unref(projectPage),
          pages: unref(projectPager).pages,
          total: unref(projectPager).total,
          "page-size": unref(pageSize),
          "onUpdate:page": ($event) => projectPage.value = $event,
          "onUpdate:pageSize": unref(setPageSize)
        }, null, _parent));
        _push(`</section>`);
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
          _push(`<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"></label><div class="admin-grid"><label><span>Employment type</span><select><option value=""${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, "") : ssrLooseEqual(experienceForm.value.employment_type, "")) ? " selected" : ""}>Select type</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Full-time</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Part-time</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Freelance</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Contract</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.employment_type) ? ssrLooseContain(experienceForm.value.employment_type, null) : ssrLooseEqual(experienceForm.value.employment_type, null)) ? " selected" : ""}>Internship</option></select></label><label><span>Work mode</span><select><option value=""${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, "") : ssrLooseEqual(experienceForm.value.work_mode, "")) ? " selected" : ""}>Select mode</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>Remote</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>On-site</option><option${ssrIncludeBooleanAttr(Array.isArray(experienceForm.value.work_mode) ? ssrLooseContain(experienceForm.value.work_mode, null) : ssrLooseEqual(experienceForm.value.work_mode, null)) ? " selected" : ""}>Hybrid</option></select></label></div><label><span>Location</span><input${ssrRenderAttr("value", experienceForm.value.location)}></label><label><span>Display order</span><input${ssrRenderAttr("value", experienceForm.value.order)} type="number" min="0"></label><div class="admin-grid"><label><span>Start date</span><input${ssrRenderAttr("value", experienceForm.value.start_date)} type="date"></label><label><span>End date</span><input${ssrRenderAttr("value", experienceForm.value.end_date)} type="date"></label></div><label><span>Description</span><textarea rows="5">${ssrInterpolate(experienceForm.value.description)}</textarea></label><button class="admin-primary" type="submit">Save experience</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="admin-toolbar"><input${ssrRenderAttr("value", experienceQuery.value)} type="search" placeholder="Search experience…">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": viewMode.value,
          "onUpdate:modelValue": setViewMode
        }, null, _parent));
        _push(`<span class="toolbar-meta">${ssrInterpolate(unref(experiencePager).total)} items</span></div>`);
        if (!canReorderExperiences.value) {
          _push(`<p class="sort-help">Clear search and use List/Grid to drag-reorder. Table mode supports column sorting.</p>`);
        } else {
          _push(`<!---->`);
        }
        if (viewMode.value === "table") {
          _push(ssrRenderComponent(_sfc_main$4, {
            columns: experienceColumns,
            rows: unref(experiencePager).items,
            "sort-key": experienceSort.value.key,
            "sort-dir": experienceSort.value.dir,
            onSort: ($event) => toggleSort(experienceSort.value, $event)
          }, {
            "cell-order": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(String((row.order ?? 0) + 1).padStart(2, "0"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(String((row.order ?? 0) + 1).padStart(2, "0")), 1)
                ];
              }
            }),
            actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${_scopeId}>Edit</button><button class="danger"${_scopeId}>Delete</button>`);
              } else {
                return [
                  createVNode("button", {
                    onClick: ($event) => editExperience(row)
                  }, "Edit", 8, ["onClick"]),
                  createVNode("button", {
                    class: "danger",
                    onClick: ($event) => remove(`/admin/experiences/${row.id}`, row.role)
                  }, "Delete", 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="${ssrRenderClass(viewMode.value === "grid" ? "admin-card-grid" : "admin-records sortable-records sortable-records--experiences")}"><!--[-->`);
          ssrRenderList(unref(experiencePager).items, (item) => {
            _push(`<article${ssrRenderAttr("draggable", canReorderExperiences.value)} class="${ssrRenderClass([{ dragging: dragging.value.type === "experiences" && dragging.value.id === item.id }, viewMode.value === "grid" ? "admin-card" : ""])}">`);
            if (viewMode.value === "grid") {
              _push(`<div class="admin-card-body experience-card-body">`);
              if (item.logo_path) {
                _push(`<img class="admin-exp-logo"${ssrRenderAttr("src", item.logo_path)}${ssrRenderAttr("alt", item.company)}>`);
              } else {
                _push(`<span class="admin-exp-logo admin-exp-logo--empty"></span>`);
              }
              _push(`<small>${ssrInterpolate(item.company)}</small><h3>${ssrInterpolate(item.role)}</h3><p>${ssrInterpolate(item.description)}</p><div class="record-actions"><button>Edit</button><button class="danger">Delete</button></div></div>`);
            } else {
              _push(`<!--[--><div class="drag-handle">⋮⋮</div><div class="record-order">${ssrInterpolate(String(item.order + 1).padStart(2, "0"))}</div>`);
              if (item.logo_path) {
                _push(`<img class="admin-exp-logo"${ssrRenderAttr("src", item.logo_path)}${ssrRenderAttr("alt", item.company)}>`);
              } else {
                _push(`<span class="admin-exp-logo admin-exp-logo--empty"></span>`);
              }
              _push(`<div><small>${ssrInterpolate(item.company)} · ${ssrInterpolate(item.location)}</small><h3>${ssrInterpolate(item.role)}</h3><p>${ssrInterpolate(item.description)}</p></div><div class="record-actions"><button>↑</button><button>↓</button><button>Edit</button><button class="danger">Delete</button></div><!--]-->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]-->`);
          if (!unref(experiencePager).total) {
            _push(`<div class="admin-empty">No experience found.</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          page: unref(experiencePage),
          pages: unref(experiencePager).pages,
          total: unref(experiencePager).total,
          "page-size": unref(pageSize),
          "onUpdate:page": ($event) => experiencePage.value = $event,
          "onUpdate:pageSize": unref(setPageSize)
        }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "certificates") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Education &amp; recognition</span><h2>Certificates</h2></div><button class="admin-primary">+ Add certificate</button></div>`);
        if (editingCertificate.value !== null) {
          _push(`<form class="admin-form admin-editor"><div class="editor-head"><h3>${ssrInterpolate(certificateForm.value.id ? "Edit certificate" : "New certificate")}</h3><button type="button">Close ×</button></div><div class="admin-grid"><label><span>Certificate title</span><input${ssrRenderAttr("value", certificateForm.value.title)} required></label><label><span>Issuer</span><input${ssrRenderAttr("value", certificateForm.value.issuer)} required></label></div><div class="admin-grid"><label><span>Issue date</span><input${ssrRenderAttr("value", certificateForm.value.issue_date)} type="date"></label><label><span>Credential URL</span><input${ssrRenderAttr("value", certificateForm.value.credential_url)} type="url"></label></div><label><span>Description</span><textarea rows="4">${ssrInterpolate(certificateForm.value.description)}</textarea></label><label><span>Display order</span><input${ssrRenderAttr("value", certificateForm.value.order)} type="number" min="0"></label><button class="admin-primary" type="submit">Save certificate</button></form>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="admin-toolbar"><input${ssrRenderAttr("value", certificateQuery.value)} type="search" placeholder="Search certificates…">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": viewMode.value,
          "onUpdate:modelValue": setViewMode
        }, null, _parent));
        _push(`<span class="toolbar-meta">${ssrInterpolate(unref(certificatePager).total)} items</span></div>`);
        if (viewMode.value === "table") {
          _push(ssrRenderComponent(_sfc_main$4, {
            columns: certificateColumns,
            rows: unref(certificatePager).items,
            "sort-key": certificateSort.value.key,
            "sort-dir": certificateSort.value.dir,
            onSort: ($event) => toggleSort(certificateSort.value, $event)
          }, {
            "cell-order": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(String((row.order ?? 0) + 1).padStart(2, "0"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(String((row.order ?? 0) + 1).padStart(2, "0")), 1)
                ];
              }
            }),
            "cell-issue_date": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(formatDate(row.issue_date))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(formatDate(row.issue_date)), 1)
                ];
              }
            }),
            actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${_scopeId}>Edit</button><button class="danger"${_scopeId}>Delete</button>`);
              } else {
                return [
                  createVNode("button", {
                    onClick: ($event) => editCertificate(row)
                  }, "Edit", 8, ["onClick"]),
                  createVNode("button", {
                    class: "danger",
                    onClick: ($event) => remove(`/admin/certificates/${row.id}`, row.title)
                  }, "Delete", 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="${ssrRenderClass(viewMode.value === "grid" ? "admin-card-grid" : "certificate-admin-list")}"><!--[-->`);
          ssrRenderList(unref(certificatePager).items, (certificate) => {
            _push(`<article class="${ssrRenderClass({ "admin-card": viewMode.value === "grid" })}">`);
            if (viewMode.value === "grid") {
              _push(`<div class="admin-card-body"><small>${ssrInterpolate(certificate.issuer)}</small><h3>${ssrInterpolate(certificate.title)}</h3><p>${ssrInterpolate(certificate.description)}</p><div class="record-actions"><button>Edit</button><button class="danger">Delete</button></div></div>`);
            } else {
              _push(`<!--[--><span class="certificate-mark">✓</span><div><small>${ssrInterpolate(certificate.issuer)}</small><h3>${ssrInterpolate(certificate.title)}</h3><p>${ssrInterpolate(certificate.description)}</p></div><div class="record-actions"><button>Edit</button><button class="danger">Delete</button></div><!--]-->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          page: unref(certificatePage),
          pages: unref(certificatePager).pages,
          total: unref(certificatePager).total,
          "page-size": unref(pageSize),
          "onUpdate:page": ($event) => certificatePage.value = $event,
          "onUpdate:pageSize": unref(setPageSize)
        }, null, _parent));
        _push(`</section>`);
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
        _push(`<div class="admin-toolbar"><input${ssrRenderAttr("value", skillQuery.value)} type="search" placeholder="Search skills…">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": viewMode.value,
          "onUpdate:modelValue": setViewMode
        }, null, _parent));
        _push(`<span class="toolbar-meta">${ssrInterpolate(unref(skillPager).total)} items</span></div>`);
        if (viewMode.value === "table") {
          _push(ssrRenderComponent(_sfc_main$4, {
            columns: skillColumns,
            rows: unref(skillPager).items,
            "sort-key": skillSort.value.key,
            "sort-dir": skillSort.value.dir,
            onSort: ($event) => toggleSort(skillSort.value, $event)
          }, {
            "cell-order": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(String((row.order ?? 0) + 1).padStart(2, "0"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(String((row.order ?? 0) + 1).padStart(2, "0")), 1)
                ];
              }
            }),
            "cell-proficiency": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(row.proficiency)}%`);
              } else {
                return [
                  createTextVNode(toDisplayString(row.proficiency) + "%", 1)
                ];
              }
            }),
            actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button${_scopeId}>Edit</button><button class="danger"${_scopeId}>Delete</button>`);
              } else {
                return [
                  createVNode("button", {
                    onClick: ($event) => editSkill(row)
                  }, "Edit", 8, ["onClick"]),
                  createVNode("button", {
                    class: "danger",
                    onClick: ($event) => remove(`/admin/skills/${row.id}`, row.name)
                  }, "Delete", 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="${ssrRenderClass(viewMode.value === "grid" ? "admin-card-grid skills-grid-cards" : "skill-admin-list")}"><!--[-->`);
          ssrRenderList(unref(skillPager).items, (skill) => {
            _push(`<article class="${ssrRenderClass({ "admin-card": viewMode.value === "grid" })}">`);
            if (viewMode.value === "grid") {
              _push(`<div class="admin-card-body"><small>${ssrInterpolate(skill.category)}</small><h3>${ssrInterpolate(skill.name)}</h3><div class="skill-bar"><i style="${ssrRenderStyle({ width: `${skill.proficiency}%` })}"></i></div><span>${ssrInterpolate(skill.proficiency)}%</span><div class="record-actions"><button>Edit</button><button class="danger">Delete</button></div></div>`);
            } else {
              _push(`<!--[--><div><small>${ssrInterpolate(skill.category)}</small><strong>${ssrInterpolate(skill.name)}</strong></div><span>${ssrInterpolate(skill.proficiency)}%</span><div class="skill-bar"><i style="${ssrRenderStyle({ width: `${skill.proficiency}%` })}"></i></div><button>Edit</button><button class="danger">Delete</button><!--]-->`);
            }
            _push(`</article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          page: unref(skillPage),
          pages: unref(skillPager).pages,
          total: unref(skillPager).total,
          "page-size": unref(pageSize),
          "onUpdate:page": ($event) => skillPage.value = $event,
          "onUpdate:pageSize": unref(setPageSize)
        }, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<!---->`);
      }
      if (active.value === "messages") {
        _push(`<section class="admin-view"><div class="admin-heading"><div><span>Project enquiries</span><h2>Messages</h2></div></div><div class="admin-toolbar"><input${ssrRenderAttr("value", messageQuery.value)} type="search" placeholder="Search messages…">`);
        _push(ssrRenderComponent(_sfc_main$1, {
          "model-value": viewMode.value === "grid" ? "list" : viewMode.value,
          "onUpdate:modelValue": ($event) => setViewMode($event === "grid" ? "list" : $event)
        }, null, _parent));
        _push(`<span class="toolbar-meta">${ssrInterpolate(unref(messagePager).total)} messages</span></div>`);
        if (!unref(messagePager).total) {
          _push(`<div class="admin-empty">No messages yet.</div>`);
        } else if (viewMode.value === "table") {
          _push(ssrRenderComponent(_sfc_main$4, {
            columns: messageColumns,
            rows: unref(messagePager).items,
            "sort-key": messageSort.value.key,
            "sort-dir": messageSort.value.dir,
            onSort: ($event) => toggleSort(messageSort.value, $event)
          }, {
            "cell-created_at": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(formatDate(row.created_at))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(formatDate(row.created_at)), 1)
                ];
              }
            }),
            "cell-read_at": withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(row.read_at ? "Read" : "Unread")}`);
              } else {
                return [
                  createTextVNode(toDisplayString(row.read_at ? "Read" : "Unread"), 1)
                ];
              }
            }),
            actions: withCtx(({ row }, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (!row.read_at) {
                  _push2(`<button${_scopeId}>Mark read</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<a${ssrRenderAttr("href", `mailto:${row.email}`)}${_scopeId}>Reply ↗</a><button class="danger"${_scopeId}>Delete</button>`);
              } else {
                return [
                  !row.read_at ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: ($event) => unref(router).patch(`/admin/messages/${row.id}/read`, {}, { preserveScroll: true })
                  }, "Mark read", 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode("a", {
                    href: `mailto:${row.email}`
                  }, "Reply ↗", 8, ["href"]),
                  createVNode("button", {
                    class: "danger",
                    onClick: ($event) => remove(`/admin/messages/${row.id}`, "message")
                  }, "Delete", 8, ["onClick"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="message-list"><!--[-->`);
          ssrRenderList(unref(messagePager).items, (message) => {
            _push(`<article class="${ssrRenderClass({ unread: !message.read_at })}"><header><div>`);
            if (!message.read_at) {
              _push(`<span></span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<strong>${ssrInterpolate(message.name)}</strong><small>${ssrInterpolate(message.email)} · ${ssrInterpolate(message.company || "Independent")}</small></div><time>${ssrInterpolate(formatDate(message.created_at))}</time></header><p>${ssrInterpolate(message.message)}</p><footer><span>${ssrInterpolate(message.budget || "Budget not specified")}</span>`);
            if (!message.read_at) {
              _push(`<button>Mark read</button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<a${ssrRenderAttr("href", `mailto:${message.email}`)}>Reply ↗</a><button class="danger">Delete</button></footer></article>`);
          });
          _push(`<!--]--></div>`);
        }
        _push(ssrRenderComponent(_sfc_main$3, {
          page: unref(messagePage),
          pages: unref(messagePager).pages,
          total: unref(messagePager).total,
          "page-size": unref(pageSize),
          "onUpdate:page": ($event) => messagePage.value = $event,
          "onUpdate:pageSize": unref(setPageSize)
        }, null, _parent));
        _push(`</section>`);
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
