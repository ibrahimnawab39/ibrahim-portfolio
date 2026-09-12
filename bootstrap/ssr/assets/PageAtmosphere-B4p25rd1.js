import { mergeProps, useSSRContext, computed, unref, withCtx, createVNode, resolveDynamicComponent, toDisplayString, openBlock, createBlock, createCommentVNode, ref, onMounted, onBeforeUnmount, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { usePage, Head, router, Link } from "@inertiajs/vue3";
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<span${ssrRenderAttrs(mergeProps({ class: "brand-lockup" }, _attrs))}><svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M7 8h7v28H7zM20 36V8h6l11 17V8h-6v28h-5L14 18" stroke="currentColor" stroke-width="3" stroke-linejoin="round"></path></svg><span>ibrahim<span class="brand-last">nawab<span class="brand-dot">·</span></span></span></span>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/BrandMark.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const BrandMark = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$3 = {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/SeoHead.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {
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
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/PortfolioLayout.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "AmbientScene",
  __ssrInlineRender: true,
  props: {
    tone: { type: String, default: "default" },
    /** knot | dots | shards | orbit — auto from tone if omitted */
    variant: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const mount = ref(null);
    const resolved = computed(() => {
      if (props.variant) return props.variant;
      return {
        about: "shards",
        work: "dots",
        experience: "orbit",
        contact: "knot",
        default: "dots"
      }[props.tone] || "dots";
    });
    let renderer, scene, camera, group, meshes = [], dust, frame, resize, intersection, destroyed = false;
    let visible = true, reduced = false, paused = false, angle = 0, previous = 0, themeObserver;
    const pointer = { x: 0, y: 0 };
    const palette = () => {
      const dark = document.documentElement.dataset.theme !== "light";
      return dark ? { a: 11644671, b: 13892251, c: 7179519, dust: 13159136 } : { a: 4868052, b: 7315005, c: 8026344, dust: 8028822 };
    };
    function move(event) {
      if (reduced || paused || event.pointerType === "touch") return;
      const rect = mount.value.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    }
    function reset() {
      pointer.x = 0;
      pointer.y = 0;
    }
    function applyTheme() {
      const colors = palette();
      meshes.forEach((mesh, i) => {
        const hex = i % 3 === 0 ? colors.a : i % 3 === 1 ? colors.b : colors.c;
        if (mesh.material?.color) mesh.material.color.setHex(hex);
        if (mesh.material?.emissive) mesh.material.emissive.setHex(hex);
      });
      if (dust?.material?.color) dust.material.color.setHex(colors.dust);
    }
    function preferenceChange(event) {
      paused = Boolean(event.detail);
      if (!paused && renderer && visible && !reduced) {
        previous = 0;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    }
    function buildScene(THREE, variant, colors) {
      const mat = (hex, opacity = 0.9) => new THREE.MeshStandardMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.48,
        transparent: true,
        opacity
      });
      if (variant === "dots") {
        const count = 220;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const r = 0.4 + Math.random() * 2.4;
          const t = Math.random() * Math.PI * 2;
          const p = (Math.random() - 0.5) * Math.PI;
          positions[i * 3] = Math.cos(t) * Math.cos(p) * r;
          positions[i * 3 + 1] = Math.sin(p) * r * 0.7;
          positions[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        dust = new THREE.Points(geo, new THREE.PointsMaterial({
          color: colors.dust,
          size: 0.045,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true
        }));
        group.add(dust);
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), mat(colors.a, 0.85));
        meshes = [core];
        group.add(core);
        return;
      }
      if (variant === "shards") {
        const shapes = [
          new THREE.TetrahedronGeometry(0.55),
          new THREE.OctahedronGeometry(0.42),
          new THREE.TetrahedronGeometry(0.32),
          new THREE.BoxGeometry(0.28, 0.28, 0.28)
        ];
        meshes = shapes.map((geo, i) => {
          const mesh = new THREE.Mesh(geo, mat(i % 2 ? colors.b : colors.a, 0.82));
          const a = i / shapes.length * Math.PI * 2;
          mesh.position.set(Math.cos(a) * 1.2, Math.sin(a * 1.3) * 0.45, Math.sin(a) * 1.1);
          return mesh;
        });
        group.add(...meshes);
        return;
      }
      if (variant === "orbit") {
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.038, 12, 90), mat(colors.a, 0.92));
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.03, 12, 80), mat(colors.b, 0.88));
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.024, 12, 70), mat(colors.c, 0.84));
        ring1.rotation.x = Math.PI / 2.6;
        ring2.rotation.x = Math.PI / 2.2;
        ring2.rotation.y = 0.4;
        ring3.rotation.x = Math.PI / 1.8;
        ring3.rotation.z = 0.5;
        const gem2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), mat(colors.b, 0.95));
        meshes = [ring1, ring2, ring3, gem2];
        group.add(...meshes);
        return;
      }
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.14, 110, 14), mat(colors.a));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.03, 14, 70), mat(colors.b, 0.72));
      ring.rotation.x = Math.PI / 2.4;
      const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 0), mat(colors.c));
      gem.position.set(1.25, 0.55, 0.15);
      meshes = [knot, ring, gem];
      group.add(...meshes);
    }
    function render(time = 0) {
      if (!renderer || !visible || document.hidden || paused || reduced) {
        previous = time;
        return;
      }
      const delta = previous ? Math.min((time - previous) / 1e3, 0.05) : 0;
      previous = time;
      angle += delta * 0.42;
      const variant = resolved.value;
      group.rotation.y = pointer.x * 0.35 + Math.sin(angle * 0.4) * 0.1;
      group.rotation.x = 0.15 + pointer.y * 0.18 + Math.cos(angle * 0.3) * 0.05;
      if (variant === "dots" && dust) {
        dust.rotation.y = angle * 0.18;
        dust.rotation.x = Math.sin(angle * 0.2) * 0.12;
        meshes[0] && (meshes[0].rotation.y += delta * 0.6);
      } else if (variant === "orbit") {
        meshes.forEach((mesh, i) => {
          if (i < 3) mesh.rotation.z += delta * (0.35 + i * 0.12) * (i % 2 ? -1 : 1);
          else mesh.position.y = Math.sin(angle * 1.4) * 0.12;
        });
      } else if (variant === "shards") {
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += delta * (0.4 + i * 0.1);
          mesh.rotation.y -= delta * (0.35 + i * 0.08);
          mesh.position.y += Math.sin(angle + i) * 2e-3;
        });
      } else {
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += delta * (0.25 + i * 0.08);
          mesh.rotation.y -= delta * (0.3 + i * 0.05);
        });
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }
    onMounted(async () => {
      if (!mount.value) return;
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.addEventListener("portfolio-motion", preferenceChange);
      mount.value.dataset.variant = resolved.value;
      if (reduced) {
        mount.value.classList.add("is-fallback");
        return;
      }
      const THREE = await import("three");
      if (destroyed || !mount.value) return;
      const width = mount.value.clientWidth || 320;
      const height = mount.value.clientHeight || 320;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      mount.value.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 40);
      camera.position.set(0, 0.15, 5.1);
      group = new THREE.Group();
      scene.add(group);
      buildScene(THREE, resolved.value, palette());
      scene.add(new THREE.AmbientLight(16777215, 0.75));
      const key = new THREE.DirectionalLight(16777215, 1.05);
      key.position.set(2, 3, 4);
      scene.add(key);
      resize = () => {
        if (!mount.value || !renderer) return;
        const w = mount.value.clientWidth;
        const h = mount.value.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !paused && !reduced) {
          previous = 0;
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(render);
        }
      }, { threshold: 0.05 });
      intersection.observe(mount.value);
      themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      mount.value.addEventListener("pointermove", move);
      mount.value.addEventListener("pointerleave", reset);
      window.addEventListener("resize", resize);
      frame = requestAnimationFrame(render);
    });
    onBeforeUnmount(() => {
      destroyed = true;
      cancelAnimationFrame(frame);
      intersection?.disconnect();
      themeObserver?.disconnect();
      window.removeEventListener("portfolio-motion", preferenceChange);
      mount.value?.removeEventListener("pointermove", move);
      mount.value?.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", resize);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      meshes.forEach((mesh) => {
        mesh.geometry?.dispose();
        mesh.material?.dispose();
      });
      dust?.geometry?.dispose();
      dust?.material?.dispose();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "mount",
        ref: mount,
        class: ["ambient-scene", [`tone-${__props.tone}`, `variant-${resolved.value}`]],
        "aria-hidden": "true"
      }, _attrs))}><div class="ambient-fallback"${ssrRenderAttr("data-variant", resolved.value)}></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/AmbientScene.vue");
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
  _sfc_main$2 as _,
  _sfc_main as a,
  _sfc_main$1 as b
};
