import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, openBlock, createBlock, createCommentVNode, ref, onMounted, onBeforeUnmount, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { usePage, Head, router, Link } from "@inertiajs/vue3";
const _sfc_main$3 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({ class: "brand-lockup" }, _attrs))}><svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M7 8h7v28H7zM20 36V8h6l11 17V8h-6v28h-5L14 18" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></path></svg><span>ibrahim<span class="brand-last">nawab<span class="brand-dot">·</span></span></span></span>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/BrandMark.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BrandMark = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$2 = {
  __name: "SeoHead",
  __ssrInlineRender: true,
  setup(__props) {
    const page = usePage();
    const seo = computed(() => page.props.seo ?? {});
    const schema = computed(() => JSON.stringify(seo.value.schema ?? {}).replace(/</g, "\\u003c"));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Head), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(seo.value.title)}</title><meta head-key="description" name="description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}><link head-key="canonical" rel="canonical"${ssrRenderAttr("href", seo.value.canonical)}${_scopeId}><meta head-key="robots" name="robots"${ssrRenderAttr("content", seo.value.robots)}${_scopeId}><meta head-key="og:title" property="og:title"${ssrRenderAttr("content", seo.value.title)}${_scopeId}><meta head-key="og:description" property="og:description"${ssrRenderAttr("content", seo.value.description)}${_scopeId}><meta head-key="og:url" property="og:url"${ssrRenderAttr("content", seo.value.canonical)}${_scopeId}><meta head-key="og:type" property="og:type" content="website"${_scopeId}><meta head-key="og:image" property="og:image"${ssrRenderAttr("content", seo.value.image)}${_scopeId}><meta head-key="twitter:card" name="twitter:card" content="summary_large_image"${_scopeId}>`);
            if (seo.value.schema) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent("script"), { type: "application/ld+json" }, null), _parent2, _scopeId);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("title", null, toDisplayString(seo.value.title), 1),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: seo.value.description
              }, null, 8, ["content"]),
              createVNode("link", {
                "head-key": "canonical",
                rel: "canonical",
                href: seo.value.canonical
              }, null, 8, ["href"]),
              createVNode("meta", {
                "head-key": "robots",
                name: "robots",
                content: seo.value.robots
              }, null, 8, ["content"]),
              createVNode("meta", {
                "head-key": "og:title",
                property: "og:title",
                content: seo.value.title
              }, null, 8, ["content"]),
              createVNode("meta", {
                "head-key": "og:description",
                property: "og:description",
                content: seo.value.description
              }, null, 8, ["content"]),
              createVNode("meta", {
                "head-key": "og:url",
                property: "og:url",
                content: seo.value.canonical
              }, null, 8, ["content"]),
              createVNode("meta", {
                "head-key": "og:type",
                property: "og:type",
                content: "website"
              }),
              createVNode("meta", {
                "head-key": "og:image",
                property: "og:image",
                content: seo.value.image
              }, null, 8, ["content"]),
              createVNode("meta", {
                "head-key": "twitter:card",
                name: "twitter:card",
                content: "summary_large_image"
              }),
              seo.value.schema ? (openBlock(), createBlock(resolveDynamicComponent("script"), {
                key: 0,
                type: "application/ld+json",
                textContent: toDisplayString(schema.value)
              }, null, 8, ["textContent"])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/SeoHead.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "PortfolioLayout",
  __ssrInlineRender: true,
  props: { profile: Object },
  setup(__props) {
    const page = usePage();
    const menuOpen = ref(false);
    const theme = ref("dark");
    const customCursor = ref(false);
    const hoveringInteractive = ref(false);
    const syncThemeMeta = (value) => {
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", value === "dark" ? "#11131b" : "#eef0f5");
    };
    const scrollProgress = ref(0);
    const showBackToTop = ref(false);
    const pointerX = ref("72%");
    const pointerY = ref("18%");
    const cursorX = ref(0);
    const cursorY = ref(0);
    const ringX = ref(0);
    const ringY = ref(0);
    const path = computed(() => page.url.split("#")[0]);
    const isActive = (href) => href === "/" ? path.value === "/" : path.value.startsWith(href);
    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = available > 0 ? window.scrollY / available * 100 : 0;
      showBackToTop.value = window.scrollY > 700;
    };
    let targetX = 0;
    let targetY = 0;
    let ringFrame = 0;
    const updatePointer = (event) => {
      pointerX.value = `${event.clientX}px`;
      pointerY.value = `${event.clientY}px`;
      targetX = event.clientX;
      targetY = event.clientY;
      cursorX.value = event.clientX;
      cursorY.value = event.clientY;
      const interactive = event.target?.closest?.("a, button, .folio-button, .pill, .toolkit-card, .studio-chip, .work-gallery-link");
      hoveringInteractive.value = !!interactive;
    };
    const animateRing = () => {
      ringX.value += (targetX - ringX.value) * 0.18;
      ringY.value += (targetY - ringY.value) * 0.18;
      ringFrame = requestAnimationFrame(animateRing);
    };
    const closeMenu = () => {
      menuOpen.value = false;
    };
    let removeInertiaListener;
    onMounted(() => {
      theme.value = document.documentElement.dataset.theme || "dark";
      syncThemeMeta(theme.value);
      updateScroll();
      customCursor.value = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (customCursor.value) {
        ringFrame = requestAnimationFrame(animateRing);
      }
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("pointermove", updatePointer, { passive: true });
      removeInertiaListener = router.on("navigate", closeMenu);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      cancelAnimationFrame(ringFrame);
      removeInertiaListener?.();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="${ssrRenderClass([{
        "menu-is-open": menuOpen.value,
        "has-custom-cursor": customCursor.value,
        "is-hovering-interactive": hoveringInteractive.value
      }, "pf-site"])}" style="${ssrRenderStyle({ "--pointer-x": pointerX.value, "--pointer-y": pointerY.value })}"><a class="skip-link" href="#main-content">Skip to content</a><div class="scroll-progress" style="${ssrRenderStyle({ transform: `scaleX(${scrollProgress.value / 100})` })}"></div><div class="pointer-aura" aria-hidden="true"></div>`);
      if (customCursor.value) {
        _push(`<!--[--><div class="cursor-dot" aria-hidden="true" style="${ssrRenderStyle({ transform: `translate(${cursorX.value}px, ${cursorY.value}px) translate(-50%, -50%)` })}"></div><div class="cursor-ring" aria-hidden="true" style="${ssrRenderStyle({ transform: `translate(${ringX.value}px, ${ringY.value}px) translate(-50%, -50%)` })}"></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<header class="pf-head"><div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "pf-brand",
        "aria-label": "Ibrahim Nawab — Home",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(BrandMark, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(BrandMark)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="pf-nav" aria-label="Primary navigation">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/about",
        class: { active: isActive("/about") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`About`);
          } else {
            return [
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/experience",
        class: { active: isActive("/experience") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Experience`);
          } else {
            return [
              createTextVNode("Experience")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/work",
        class: { active: isActive("/work") }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Work`);
          } else {
            return [
              createTextVNode("Work")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="/#skills">Expertise</a>`);
      if (__props.profile?.resume_available) {
        _push(`<a href="/resume">Resume ↓</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        class: ["nav-contact", { active: isActive("/contact") }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Let’s talk ↗`);
          } else {
            return [
              createTextVNode("Let’s talk ↗")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="pf-head-tools"><button class="theme-toggle" type="button"${ssrRenderAttr("aria-label", `Switch to ${theme.value === "dark" ? "light" : "dark"} theme`)}>`);
      if (theme.value === "dark") {
        _push(`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2" fill="currentColor"></circle><path d="M12 2v2.2M12 19.8V22M4.2 12H2M22 12h-2.2M5.6 5.6l1.5 1.5M16.9 16.9l1.5 1.5M5.6 18.4l1.5-1.5M16.9 7.1l1.5-1.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"></path></svg>`);
      } else {
        _push(`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.2A7.4 7.4 0 0 1 9.8 4.5 7.8 7.8 0 1 0 19.5 14.2Z" fill="currentColor"></path></svg>`);
      }
      _push(`</button><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", menuOpen.value)} aria-controls="mobile-navigation"${ssrRenderAttr("aria-label", menuOpen.value ? "Close navigation" : "Open navigation")}><span></span><span></span></button></div></div></header><nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>00</span>Home`);
          } else {
            return [
              createVNode("span", null, "00"),
              createTextVNode("Home")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/about",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>01</span>About`);
          } else {
            return [
              createVNode("span", null, "01"),
              createTextVNode("About")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/experience",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>02</span>Experience`);
          } else {
            return [
              createVNode("span", null, "02"),
              createTextVNode("Experience")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/work",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>03</span>Work`);
          } else {
            return [
              createVNode("span", null, "03"),
              createTextVNode("Work")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a href="/#certificates"><span>04</span>Certificates</a>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/contact",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>05</span>Contact`);
          } else {
            return [
              createVNode("span", null, "05"),
              createTextVNode("Contact")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><main id="main-content" class="pf-main">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="pf-foot"><span>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(__props.profile?.name ?? "Ibrahim Nawab")}</span><div>`);
      if (__props.profile?.linkedin_url) {
        _push(`<a${ssrRenderAttr("href", __props.profile.linkedin_url)} target="_blank" rel="noreferrer">LinkedIn ↗</a>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.profile?.github_url && !__props.profile.github_url.endsWith("github.com/")) {
        _push(`<a${ssrRenderAttr("href", __props.profile.github_url)} target="_blank" rel="noreferrer">GitHub ↗</a>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.profile?.whatsapp_number) {
        _push(`<a${ssrRenderAttr("href", `https://wa.me/${__props.profile.whatsapp_number.replace(/\D/g, "")}`)} target="_blank" rel="noreferrer">WhatsApp ↗</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span>Karachi · Available globally</span></div></footer><button class="back-top" type="button" aria-label="Back to top" style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}">↑</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PortfolioLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PageAtmosphere",
  __ssrInlineRender: true,
  props: {
    tone: { type: String, default: "default" },
    /** orbs | dots | beams | mist */
    mode: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const resolved = computed(() => {
      if (props.mode) return props.mode;
      return {
        about: "beams",
        work: "dots",
        experience: "mist",
        contact: "orbs",
        default: "mist"
      }[props.tone] || "mist";
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["page-atmosphere", [`tone-${__props.tone}`, `mode-${resolved.value}`]],
        "aria-hidden": "true"
      }, _attrs))}>`);
      if (resolved.value === "dots") {
        _push(`<!--[--><span class="dot-field"></span><span class="dot-glow"></span><!--]-->`);
      } else if (resolved.value === "beams") {
        _push(`<!--[--><span class="beam beam-a"></span><span class="beam beam-b"></span><span class="beam beam-c"></span><span class="grid-fade"></span><!--]-->`);
      } else if (resolved.value === "mist") {
        _push(`<!--[--><span class="mist mist-a"></span><span class="mist mist-b"></span><span class="grid-fade soft"></span><!--]-->`);
      } else {
        _push(`<!--[--><span class="orb orb-a"></span><span class="orb orb-b"></span><span class="atmos-ring ring-a"></span><span class="grid-fade"></span><!--]-->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/PageAtmosphere.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main$1 as _,
  _sfc_main as a
};
