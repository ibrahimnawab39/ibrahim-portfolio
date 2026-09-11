import { computed, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, ref, onMounted, onBeforeUnmount, createTextVNode } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { usePage, Head, router, Link } from "@inertiajs/vue3";
const _sfc_main$1 = {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/SeoHead.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "PortfolioLayout",
  __ssrInlineRender: true,
  props: { profile: Object },
  setup(__props) {
    const page = usePage();
    const menuOpen = ref(false);
    const scrollProgress = ref(0);
    const showBackToTop = ref(false);
    const pointerX = ref("72%");
    const pointerY = ref("18%");
    const path = computed(() => page.url.split("#")[0]);
    const isAdmin = computed(() => page.props.auth?.user?.is_admin);
    const isActive = (href) => href === "/" ? path.value === "/" : path.value.startsWith(href);
    const updateScroll = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.value = available > 0 ? window.scrollY / available * 100 : 0;
      showBackToTop.value = window.scrollY > 700;
    };
    const updatePointer = (event) => {
      pointerX.value = `${event.clientX}px`;
      pointerY.value = `${event.clientY}px`;
    };
    const closeMenu = () => {
      menuOpen.value = false;
    };
    let removeInertiaListener;
    onMounted(() => {
      updateScroll();
      window.addEventListener("scroll", updateScroll, { passive: true });
      window.addEventListener("pointermove", updatePointer, { passive: true });
      removeInertiaListener = router.on("navigate", closeMenu);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
      removeInertiaListener?.();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`<div class="${ssrRenderClass([{ "menu-is-open": menuOpen.value }, "pf-site"])}" style="${ssrRenderStyle({ "--pointer-x": pointerX.value, "--pointer-y": pointerY.value })}"><a class="skip-link" href="#main-content">Skip to content</a><div class="scroll-progress" style="${ssrRenderStyle({ transform: `scaleX(${scrollProgress.value / 100})` })}"></div><div class="pointer-aura" aria-hidden="true"></div><header class="pf-head"><div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "pf-brand",
        "aria-label": "Ibrahim Nawab — Home",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` IBRAHIM<span${_scopeId}>.</span>`);
          } else {
            return [
              createTextVNode(" IBRAHIM"),
              createVNode("span", null, ".")
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
      _push(`</nav><button class="menu-toggle" type="button"${ssrRenderAttr("aria-expanded", menuOpen.value)} aria-controls="mobile-navigation"${ssrRenderAttr("aria-label", menuOpen.value ? "Close navigation" : "Open navigation")}><span></span><span></span></button></div><nav id="mobile-navigation" class="mobile-nav" aria-label="Mobile navigation">`);
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
      _push(`</nav></header><main id="main-content" class="pf-main">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="pf-foot"><span>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} ${ssrInterpolate(__props.profile?.name ?? "Ibrahim Nawab")}</span><div>`);
      if (isAdmin.value) {
        _push(ssrRenderComponent(unref(Link), { href: "/admin" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Admin CMS ↗`);
            } else {
              return [
                createTextVNode("Admin CMS ↗")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
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
      _push(`<span>Karachi · Available globally</span></div></footer><button class="back-top" type="button" aria-label="Back to top" style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}">↑</button></div><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PortfolioLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
