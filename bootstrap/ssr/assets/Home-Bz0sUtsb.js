import { ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$7 } from "./PageAtmosphere-B4p25rd1.js";
import { _ as _sfc_main$6 } from "./ProjectCover-D_pFmt3q.js";
import { _ as _sfc_main$4 } from "./Reveal-B7AZWZR6.js";
import { _ as _sfc_main$5 } from "./TiltCard-BCpF3Iif.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "ArchitectureScene",
  __ssrInlineRender: true,
  setup(__props) {
    const mount = ref(null);
    const paused = ref(false);
    const ready = ref(false);
    let renderer, scene, camera, group, core, rings = [], floats = [], stars, resize, intersection, media, destroyed = false;
    let visible = true, reduced = false, angle = 0, previous = 0, themeObserver;
    const pointer = { x: 0, y: 0 };
    const palette = () => {
      const dark = document.documentElement.dataset.theme !== "light";
      return dark ? { core: 11644671, glow: 13892251, ring: 8026313, panel: 2764613, edge: 13223935, star: 14211824 } : { core: 4868052, glow: 7315005, ring: 8026344, panel: 15264756, edge: 4868052, star: 8028822 };
    };
    function applyTheme(T) {
      const colors = palette();
      if (core) {
        core.material.color.setHex(colors.core);
        core.material.emissive.setHex(colors.core);
        core.children[0]?.material?.color?.setHex(colors.edge);
      }
      rings.forEach((ring, i) => {
        ring.material.color.setHex(i % 2 ? colors.glow : colors.ring);
      });
      floats.forEach((card, i) => {
        card.material.color.setHex(colors.panel);
        card.children[0]?.material?.color?.setHex(i === 0 ? colors.glow : colors.edge);
      });
      if (stars) stars.material.color.setHex(colors.star);
    }
    function render(time = 0) {
      if (!renderer || !visible || document.hidden) {
        previous = time;
        return;
      }
      const delta = previous ? Math.min((time - previous) / 1e3, 0.05) : 0;
      previous = time;
      if (!paused.value && !reduced) angle += delta * 0.35;
      group.rotation.y = -0.25 + pointer.x * 0.55 + Math.sin(angle * 0.35) * 0.08;
      group.rotation.x = 0.18 + pointer.y * 0.28 + Math.cos(angle * 0.28) * 0.04;
      if (core) {
        core.rotation.y += delta * 0.45;
        core.rotation.x += delta * 0.18;
        const pulse = 1 + Math.sin(angle * 1.4) * 0.04;
        core.scale.setScalar(pulse);
      }
      rings.forEach((ring, i) => {
        ring.rotation.z = angle * (i % 2 ? -0.55 : 0.4) + i;
        ring.rotation.x = Math.sin(angle * 0.5 + i) * 0.15 + 0.6;
        ring.rotation.y = Math.cos(angle * 0.35 + i) * 0.2;
      });
      floats.forEach((card, i) => {
        const orbit = angle * 0.55 + i * 2.1;
        card.position.x = Math.cos(orbit) * (2.1 + i * 0.15);
        card.position.z = Math.sin(orbit) * (1.55 + i * 0.12);
        card.position.y = Math.sin(angle * 1.2 + i * 1.4) * 0.45 + (i - 1) * 0.35;
        card.rotation.y = -orbit + Math.PI / 2;
        card.rotation.x = Math.sin(angle + i) * 0.12;
      });
      if (stars) stars.rotation.y = angle * 0.08;
      renderer.render(scene, camera);
    }
    function preferenceChange(event) {
      paused.value = event.detail;
    }
    function motionChange(event) {
      reduced = event.matches;
      render();
    }
    onMounted(async () => {
      window.addEventListener("portfolio-motion", preferenceChange);
      try {
        const T = await import("three");
        if (destroyed) return;
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        mount.value.appendChild(renderer.domElement);
        scene = new T.Scene();
        camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 1.2, 7.4);
        camera.lookAt(0, 0, 0);
        group = new T.Group();
        scene.add(group);
        const colors = palette();
        const coreGeo = new T.IcosahedronGeometry(1.05, 1);
        const coreMat = new T.MeshStandardMaterial({
          color: colors.core,
          metalness: 0.55,
          roughness: 0.22,
          emissive: colors.core,
          emissiveIntensity: 0.22
        });
        core = new T.Mesh(coreGeo, coreMat);
        const wire = new T.LineSegments(
          new T.WireframeGeometry(coreGeo),
          new T.LineBasicMaterial({ color: colors.edge, transparent: true, opacity: 0.55 })
        );
        core.add(wire);
        group.add(core);
        const glow = new T.Mesh(
          new T.SphereGeometry(0.72, 32, 32),
          new T.MeshBasicMaterial({ color: colors.glow, transparent: true, opacity: 0.14 })
        );
        core.add(glow);
        for (let i = 0; i < 3; i++) {
          const ring = new T.Mesh(
            new T.TorusGeometry(1.55 + i * 0.38, 0.018, 12, 100),
            new T.MeshStandardMaterial({
              color: i % 2 ? colors.glow : colors.ring,
              metalness: 0.8,
              roughness: 0.25,
              emissive: i % 2 ? colors.glow : colors.ring,
              emissiveIntensity: 0.15
            })
          );
          rings.push(ring);
          group.add(ring);
        }
        for (let i = 0; i < 3; i++) {
          const card = new T.Mesh(
            new T.BoxGeometry(1.15, 0.72, 0.04),
            new T.MeshPhysicalMaterial({
              color: colors.panel,
              metalness: 0.15,
              roughness: 0.28,
              transmission: 0.35,
              transparent: true,
              opacity: 0.92,
              clearcoat: 1
            })
          );
          const accent = new T.Mesh(
            new T.BoxGeometry(0.85, 0.05, 0.02),
            new T.MeshStandardMaterial({
              color: i === 0 ? colors.glow : colors.edge,
              emissive: i === 0 ? colors.glow : colors.edge,
              emissiveIntensity: 0.45
            })
          );
          accent.position.set(0, 0.18, 0.03);
          card.add(accent);
          for (let r = 0; r < 3; r++) {
            const bar = new T.Mesh(
              new T.BoxGeometry(0.55 - r * 0.1, 0.03, 0.015),
              new T.MeshStandardMaterial({ color: colors.edge, transparent: true, opacity: 0.45 })
            );
            bar.position.set(-0.12, -0.05 - r * 0.12, 0.03);
            card.add(bar);
          }
          floats.push(card);
          group.add(card);
        }
        const count = 180;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const radius = 2.2 + Math.random() * 2.8;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
          positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        const starGeo = new T.BufferGeometry();
        starGeo.setAttribute("position", new T.BufferAttribute(positions, 3));
        stars = new T.Points(
          starGeo,
          new T.PointsMaterial({ color: colors.star, size: 0.035, transparent: true, opacity: 0.75, sizeAttenuation: true })
        );
        group.add(stars);
        const key = new T.DirectionalLight(16777215, 3.2);
        key.position.set(-3, 4, 5);
        scene.add(key);
        const fill = new T.DirectionalLight(11644671, 1.4);
        fill.position.set(4, -1, 2);
        scene.add(fill);
        scene.add(new T.AmbientLight(16777215, 0.65));
        resize = new ResizeObserver(() => {
          if (!mount.value) return;
          const { width, height } = mount.value.getBoundingClientRect();
          renderer.setSize(width, height);
          camera.aspect = width / Math.max(height, 1);
          camera.updateProjectionMatrix();
          render();
        });
        resize.observe(mount.value);
        intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
        });
        intersection.observe(mount.value);
        media = window.matchMedia("(prefers-reduced-motion: reduce)");
        reduced = media.matches;
        media.addEventListener("change", motionChange);
        themeObserver = new MutationObserver(() => applyTheme(T));
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        renderer.domElement.addEventListener("webglcontextlost", () => {
          ready.value = false;
          renderer.setAnimationLoop(null);
        });
        ready.value = true;
        renderer.setAnimationLoop(render);
      } catch {
        ready.value = false;
      }
    });
    onBeforeUnmount(() => {
      destroyed = true;
      window.removeEventListener("portfolio-motion", preferenceChange);
      themeObserver?.disconnect();
      resize?.disconnect();
      intersection?.disconnect();
      media?.removeEventListener("change", motionChange);
      renderer?.setAnimationLoop(null);
      const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set();
      scene?.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((m) => materials.add(m));
          else materials.add(object.material);
        }
      });
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orbital-scene constellation-scene" }, _attrs))}><div class="webgl-mount" aria-hidden="true"></div>`);
      if (!ready.value) {
        _push(`<div class="orbital-fallback" aria-hidden="true"><i></i><i></i><b>IN</b></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="orbit-note orbit-note-top">SYSTEM CORE</span><span class="orbit-note orbit-note-bottom">Drag your pointer — explore the constellation.</span></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/ArchitectureScene.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Home",
  __ssrInlineRender: true,
  props: {
    profile: Object,
    skills: Object,
    projects: Array,
    experiences: Array,
    certificates: Array,
    sections: Array,
    projectCount: Number,
    experienceDuration: String
  },
  setup(__props) {
    const props = __props;
    const currentRoles = computed(
      () => (props.experiences ?? []).filter((item) => !item.end_date && item.employment_type !== "Freelance")
    );
    const skillCategoryOrder = [
      "Backend Engineering",
      "Frontend Engineering",
      "CMS & Commerce",
      "Mobile Development"
    ];
    const toolkit = computed(
      () => Object.entries(props.skills ?? {}).sort(([a], [b]) => {
        const ia = skillCategoryOrder.indexOf(a);
        const ib = skillCategoryOrder.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      })
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.profile?.name ?? "Ibrahim Nawab")} — Laravel &amp; Full Stack Developer</title><meta head-key="description" name="description"${ssrRenderAttr("content", __props.profile?.summary)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.profile?.name ?? "Ibrahim Nawab") + " — Laravel & Full Stack Developer", 1),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: __props.profile?.summary
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { profile: __props.profile }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="folio-home"${_scopeId}><section class="editorial-hero immersive-hero"${_scopeId}><div class="hero-byline"${_scopeId}><span${_scopeId}><i${_scopeId}></i> ${ssrInterpolate(__props.profile?.availability || "Full stack developer")}</span><span${_scopeId}>${ssrInterpolate(__props.profile?.location || "Karachi, Pakistan")} · Working globally</span></div><div class="immersive-grid"${_scopeId}><div class="immersive-copy"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "folio-label",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`IBRAHIM NAWAB / FULL STACK DEVELOPER`);
                } else {
                  return [
                    createTextVNode("IBRAHIM NAWAB / FULL STACK DEVELOPER")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).h1, {
              initial: { opacity: 0, y: 36 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.06 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Good ideas.<br${_scopeId2}>Great <em${_scopeId2}>engineering.</em>`);
                } else {
                  return [
                    createTextVNode("Good ideas."),
                    createVNode("br"),
                    createTextVNode("Great "),
                    createVNode("em", null, "engineering.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).p, {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.55, delay: 0.14 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`I build the platforms behind the experience — Laravel APIs, admin systems, commerce sites and mobile products people rely on every day.`);
                } else {
                  return [
                    createTextVNode("I build the platforms behind the experience — Laravel APIs, admin systems, commerce sites and mobile products people rely on every day.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "hero-cta-row",
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.22 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/work",
                    class: "folio-button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Explore selected work <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("Explore selected work "),
                          createVNode("span", null, "↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/contact",
                    class: "hero-secondary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Let’s talk <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("Let’s talk "),
                          createVNode("span", null, "↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: "/work",
                      class: "folio-button"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Explore selected work "),
                        createVNode("span", null, "↗")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(Link), {
                      href: "/contact",
                      class: "hero-secondary"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Let’s talk "),
                        createVNode("span", null, "↗")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "hero-signature",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.3 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.profile?.photo_path) {
                    _push3(`<img${ssrRenderAttr("src", __props.profile.photo_path)}${ssrRenderAttr("alt", __props.profile.name)} width="48" height="48"${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(__props.profile?.name)}</strong><span${_scopeId2}>Currently at Siin &amp; K-Labs</span></div>`);
                  if (__props.profile?.resume_available) {
                    _push3(`<a href="/resume"${_scopeId2}>Resume ↓</a>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.profile.photo_path,
                      alt: __props.profile.name,
                      width: "48",
                      height: "48"
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("strong", null, toDisplayString(__props.profile?.name), 1),
                      createVNode("span", null, "Currently at Siin & K-Labs")
                    ]),
                    __props.profile?.resume_available ? (openBlock(), createBlock("a", {
                      key: 1,
                      href: "/resume"
                    }, "Resume ↓")) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="immersive-object"${_scopeId}><span class="object-index"${_scopeId}>01 — LIVING SYSTEM</span>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "orbit-tag",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35, duration: 0.55 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>✦</span><div${_scopeId2}>Complex systems.<br${_scopeId2}><strong${_scopeId2}>Clear experiences.</strong></div>`);
                } else {
                  return [
                    createVNode("span", null, "✦"),
                    createVNode("div", null, [
                      createTextVNode("Complex systems."),
                      createVNode("br"),
                      createVNode("strong", null, "Clear experiences.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<span class="object-coordinates"${_scopeId}>IDEA → SYSTEM → EXPERIENCE</span></div></div>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "hero-bottom",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.45, duration: 0.6 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>BACKEND ENGINEERING <b${_scopeId2}>✳</b> WEB EXPERIENCES <b${_scopeId2}>✳</b> MOBILE PRODUCTS</span><a href="#selected-work"${_scopeId2}>THE WORK BELOW ↓</a>`);
                } else {
                  return [
                    createVNode("span", null, [
                      createTextVNode("BACKEND ENGINEERING "),
                      createVNode("b", null, "✳"),
                      createTextVNode(" WEB EXPERIENCES "),
                      createVNode("b", null, "✳"),
                      createTextVNode(" MOBILE PRODUCTS")
                    ]),
                    createVNode("a", { href: "#selected-work" }, "THE WORK BELOW ↓")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section><section class="current-roles" aria-label="Current companies"${_scopeId}><span class="folio-label"${_scopeId}>CURRENTLY BUILDING WITH</span><!--[-->`);
            ssrRenderList(currentRoles.value, (item, index) => {
              _push2(ssrRenderComponent(unref(motion).span, {
                key: item.id,
                class: "role-chip",
                initial: { opacity: 0, y: 12 },
                "while-in-view": { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: index * 0.06 },
                "while-hover": { y: -3 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<strong${_scopeId2}>${ssrInterpolate(item.company.replace(/\s*\|.*/, ""))}</strong><small${_scopeId2}>${ssrInterpolate(item.role)}</small>`);
                  } else {
                    return [
                      createVNode("strong", null, toDisplayString(item.company.replace(/\s*\|.*/, "")), 1),
                      createVNode("small", null, toDisplayString(item.role), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section><section id="selected-work" class="folio-section has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              tone: "work",
              mode: "dots"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="folio-section-heading"${_scopeId2}><span class="folio-label"${_scopeId2}>01 / SELECTED WORK</span><h2${_scopeId2}>Built for people.<br${_scopeId2}><em${_scopeId2}>Made to work.</em></h2><div${_scopeId2}><p${_scopeId2}>Web platforms, mobile experiences and the systems behind them — with live links where the product is public.</p>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/work",
                    class: "folio-link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Explore all ${ssrInterpolate(__props.projectCount)} projects ↗`);
                      } else {
                        return [
                          createTextVNode("Explore all " + toDisplayString(__props.projectCount) + " projects ↗", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></header>`);
                } else {
                  return [
                    createVNode("header", { class: "folio-section-heading" }, [
                      createVNode("span", { class: "folio-label" }, "01 / SELECTED WORK"),
                      createVNode("h2", null, [
                        createTextVNode("Built for people."),
                        createVNode("br"),
                        createVNode("em", null, "Made to work.")
                      ]),
                      createVNode("div", null, [
                        createVNode("p", null, "Web platforms, mobile experiences and the systems behind them — with live links where the product is public."),
                        createVNode(unref(Link), {
                          href: "/work",
                          class: "folio-link"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Explore all " + toDisplayString(__props.projectCount) + " projects ↗", 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="editorial-projects"${_scopeId}><!--[-->`);
            ssrRenderList(__props.projects, (project, index) => {
              _push2(ssrRenderComponent(unref(motion).div, {
                key: project.id,
                initial: { opacity: 0, y: 30 },
                "while-in-view": { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.2 },
                transition: { delay: Math.min(index * 0.05, 0.2) }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$5, { max: 9 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Link), {
                            href: `/work/${project.slug}`,
                            class: ["editorial-project", `work-tone-${index % 3}`]
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$6, {
                                  project,
                                  index
                                }, null, _parent5, _scopeId4));
                                _push5(`<div class="work-caption"${_scopeId4}><h3${_scopeId4}>${ssrInterpolate(project.title)}</h3><span${_scopeId4}>${ssrInterpolate(project.company || project.category)}</span></div><p${_scopeId4}>${ssrInterpolate(project.summary)}</p><div class="work-meta-row"${_scopeId4}><!--[-->`);
                                ssrRenderList((project.tech_stack ?? []).slice(0, 3), (tech) => {
                                  _push5(`<span${_scopeId4}>${ssrInterpolate(tech)}</span>`);
                                });
                                _push5(`<!--]-->`);
                                if (project.live_url) {
                                  _push5(`<em${_scopeId4}>Live ↗</em>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div>`);
                              } else {
                                return [
                                  createVNode(_sfc_main$6, {
                                    project,
                                    index
                                  }, null, 8, ["project", "index"]),
                                  createVNode("div", { class: "work-caption" }, [
                                    createVNode("h3", null, toDisplayString(project.title), 1),
                                    createVNode("span", null, toDisplayString(project.company || project.category), 1)
                                  ]),
                                  createVNode("p", null, toDisplayString(project.summary), 1),
                                  createVNode("div", { class: "work-meta-row" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList((project.tech_stack ?? []).slice(0, 3), (tech) => {
                                      return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                    }), 128)),
                                    project.live_url ? (openBlock(), createBlock("em", { key: 0 }, "Live ↗")) : createCommentVNode("", true)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(Link), {
                              href: `/work/${project.slug}`,
                              class: ["editorial-project", `work-tone-${index % 3}`]
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$6, {
                                  project,
                                  index
                                }, null, 8, ["project", "index"]),
                                createVNode("div", { class: "work-caption" }, [
                                  createVNode("h3", null, toDisplayString(project.title), 1),
                                  createVNode("span", null, toDisplayString(project.company || project.category), 1)
                                ]),
                                createVNode("p", null, toDisplayString(project.summary), 1),
                                createVNode("div", { class: "work-meta-row" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList((project.tech_stack ?? []).slice(0, 3), (tech) => {
                                    return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                  }), 128)),
                                  project.live_url ? (openBlock(), createBlock("em", { key: 0 }, "Live ↗")) : createCommentVNode("", true)
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href", "class"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$5, { max: 9 }, {
                        default: withCtx(() => [
                          createVNode(unref(Link), {
                            href: `/work/${project.slug}`,
                            class: ["editorial-project", `work-tone-${index % 3}`]
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$6, {
                                project,
                                index
                              }, null, 8, ["project", "index"]),
                              createVNode("div", { class: "work-caption" }, [
                                createVNode("h3", null, toDisplayString(project.title), 1),
                                createVNode("span", null, toDisplayString(project.company || project.category), 1)
                              ]),
                              createVNode("p", null, toDisplayString(project.summary), 1),
                              createVNode("div", { class: "work-meta-row" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList((project.tech_stack ?? []).slice(0, 3), (tech) => {
                                  return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                }), 128)),
                                project.live_url ? (openBlock(), createBlock("em", { key: 0 }, "Live ↗")) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href", "class"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
            if (!__props.projects?.length) {
              _push2(`<p${_scopeId}>Selected projects are being prepared.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section><section id="about" class="folio-about folio-section has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              tone: "about",
              mode: "beams"
            }, null, _parent2, _scopeId));
            _push2(`<span class="folio-label"${_scopeId}>02 / BEYOND THE CODE</span><div${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2${_scopeId2}>Technical depth.<br${_scopeId2}><em${_scopeId2}>Human perspective.</em></h2><p${_scopeId2}>${ssrInterpolate(__props.profile?.bio)}</p>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/about",
                    class: "folio-link"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`The story so far ↗`);
                      } else {
                        return [
                          createTextVNode("The story so far ↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("h2", null, [
                      createTextVNode("Technical depth."),
                      createVNode("br"),
                      createVNode("em", null, "Human perspective.")
                    ]),
                    createVNode("p", null, toDisplayString(__props.profile?.bio), 1),
                    createVNode(unref(Link), {
                      href: "/about",
                      class: "folio-link"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("The story so far ↗")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><aside${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, { delay: 0.08 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<strong${_scopeId2}>${ssrInterpolate(__props.experienceDuration)}</strong><span${_scopeId2}>Since my first professional role</span><strong${_scopeId2}>${ssrInterpolate(__props.projectCount)}</strong><span${_scopeId2}>Projects in this portfolio</span>`);
                } else {
                  return [
                    createVNode("strong", null, toDisplayString(__props.experienceDuration), 1),
                    createVNode("span", null, "Since my first professional role"),
                    createVNode("strong", null, toDisplayString(__props.projectCount), 1),
                    createVNode("span", null, "Projects in this portfolio")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</aside></section><section id="skills" class="folio-section toolkit-section has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              tone: "experience",
              mode: "mist"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="folio-section-heading toolkit-heading"${_scopeId2}><span class="folio-label"${_scopeId2}>03 / MY TOOLKIT</span><h2${_scopeId2}>From first click<br${_scopeId2}><em${_scopeId2}>to final query.</em></h2><p${_scopeId2}>One connected approach across backend, interface, commerce and mobile — measured by what ships.</p></header>`);
                } else {
                  return [
                    createVNode("header", { class: "folio-section-heading toolkit-heading" }, [
                      createVNode("span", { class: "folio-label" }, "03 / MY TOOLKIT"),
                      createVNode("h2", null, [
                        createTextVNode("From first click"),
                        createVNode("br"),
                        createVNode("em", null, "to final query.")
                      ]),
                      createVNode("p", null, "One connected approach across backend, interface, commerce and mobile — measured by what ships.")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="toolkit-grid"${_scopeId}><!--[-->`);
            ssrRenderList(toolkit.value, ([category, items], index) => {
              _push2(ssrRenderComponent(_sfc_main$4, {
                key: category,
                delay: Math.min(index * 0.06, 0.24)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$5, { max: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<article class="toolkit-card"${_scopeId3}><header${_scopeId3}><span${_scopeId3}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><div${_scopeId3}><h3${_scopeId3}>${ssrInterpolate(category)}</h3><small${_scopeId3}>${ssrInterpolate(items.length)} tools in active use</small></div></header><ul${_scopeId3}><!--[-->`);
                          ssrRenderList(items, (skill) => {
                            _push4(`<li${_scopeId3}><div class="toolkit-skill-meta"${_scopeId3}><strong${_scopeId3}>${ssrInterpolate(skill.name)}</strong><em${_scopeId3}>${ssrInterpolate(skill.proficiency)}%</em></div><div class="toolkit-bar" aria-hidden="true"${_scopeId3}><i style="${ssrRenderStyle({ width: `${skill.proficiency}%` })}"${_scopeId3}></i></div></li>`);
                          });
                          _push4(`<!--]--></ul></article>`);
                        } else {
                          return [
                            createVNode("article", { class: "toolkit-card" }, [
                              createVNode("header", null, [
                                createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                                createVNode("div", null, [
                                  createVNode("h3", null, toDisplayString(category), 1),
                                  createVNode("small", null, toDisplayString(items.length) + " tools in active use", 1)
                                ])
                              ]),
                              createVNode("ul", null, [
                                (openBlock(true), createBlock(Fragment, null, renderList(items, (skill) => {
                                  return openBlock(), createBlock("li", {
                                    key: skill.id
                                  }, [
                                    createVNode("div", { class: "toolkit-skill-meta" }, [
                                      createVNode("strong", null, toDisplayString(skill.name), 1),
                                      createVNode("em", null, toDisplayString(skill.proficiency) + "%", 1)
                                    ]),
                                    createVNode("div", {
                                      class: "toolkit-bar",
                                      "aria-hidden": "true"
                                    }, [
                                      createVNode("i", {
                                        style: { width: `${skill.proficiency}%` }
                                      }, null, 4)
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$5, { max: 8 }, {
                        default: withCtx(() => [
                          createVNode("article", { class: "toolkit-card" }, [
                            createVNode("header", null, [
                              createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                              createVNode("div", null, [
                                createVNode("h3", null, toDisplayString(category), 1),
                                createVNode("small", null, toDisplayString(items.length) + " tools in active use", 1)
                              ])
                            ]),
                            createVNode("ul", null, [
                              (openBlock(true), createBlock(Fragment, null, renderList(items, (skill) => {
                                return openBlock(), createBlock("li", {
                                  key: skill.id
                                }, [
                                  createVNode("div", { class: "toolkit-skill-meta" }, [
                                    createVNode("strong", null, toDisplayString(skill.name), 1),
                                    createVNode("em", null, toDisplayString(skill.proficiency) + "%", 1)
                                  ]),
                                  createVNode("div", {
                                    class: "toolkit-bar",
                                    "aria-hidden": "true"
                                  }, [
                                    createVNode("i", {
                                      style: { width: `${skill.proficiency}%` }
                                    }, null, 4)
                                  ])
                                ]);
                              }), 128))
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><!--[-->`);
            ssrRenderList(__props.sections, (section) => {
              _push2(`<section class="folio-section custom-section has-atmosphere"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                tone: "default",
                mode: "mist"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="folio-label"${_scopeId2}>${ssrInterpolate(section.eyebrow)}</span><h2${_scopeId2}>${ssrInterpolate(section.title)}</h2><p${_scopeId2}>${ssrInterpolate(section.body)}</p>`);
                    if (section.link_url) {
                      _push3(`<a${ssrRenderAttr("href", section.link_url)} class="folio-link"${_scopeId2}>${ssrInterpolate(section.link_label || "Read more")} ↗</a>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("span", { class: "folio-label" }, toDisplayString(section.eyebrow), 1),
                      createVNode("h2", null, toDisplayString(section.title), 1),
                      createVNode("p", null, toDisplayString(section.body), 1),
                      section.link_url ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: section.link_url,
                        class: "folio-link"
                      }, toDisplayString(section.link_label || "Read more") + " ↗", 9, ["href"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</section>`);
            });
            _push2(`<!--]-->`);
            if (__props.certificates?.length) {
              _push2(`<section id="certificates" class="folio-section has-atmosphere"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$3, {
                tone: "about",
                mode: "dots"
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_sfc_main$4, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header class="folio-section-heading"${_scopeId2}><span class="folio-label"${_scopeId2}>04 / ALWAYS LEARNING</span><h2${_scopeId2}>A foundation.<br${_scopeId2}><em${_scopeId2}>Never a finish line.</em></h2></header>`);
                  } else {
                    return [
                      createVNode("header", { class: "folio-section-heading" }, [
                        createVNode("span", { class: "folio-label" }, "04 / ALWAYS LEARNING"),
                        createVNode("h2", null, [
                          createTextVNode("A foundation."),
                          createVNode("br"),
                          createVNode("em", null, "Never a finish line.")
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="folio-certificates"${_scopeId}><!--[-->`);
              ssrRenderList(__props.certificates, (certificate, index) => {
                _push2(ssrRenderComponent(_sfc_main$4, {
                  key: certificate.id,
                  delay: Math.min(index * 0.05, 0.18)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_sfc_main$5, { max: 7 }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<article class="certificate-card"${_scopeId3}><h3${_scopeId3}>${ssrInterpolate(certificate.title)}</h3><span${_scopeId3}>${ssrInterpolate(certificate.issuer)}</span>`);
                            if (certificate.credential_url) {
                              _push4(`<a${ssrRenderAttr("href", certificate.credential_url)} target="_blank" rel="noreferrer" class="folio-link"${_scopeId3}>View credential ↗</a>`);
                            } else {
                              _push4(`<!---->`);
                            }
                            _push4(`</article>`);
                          } else {
                            return [
                              createVNode("article", { class: "certificate-card" }, [
                                createVNode("h3", null, toDisplayString(certificate.title), 1),
                                createVNode("span", null, toDisplayString(certificate.issuer), 1),
                                certificate.credential_url ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: certificate.credential_url,
                                  target: "_blank",
                                  rel: "noreferrer",
                                  class: "folio-link"
                                }, "View credential ↗", 8, ["href"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_sfc_main$5, { max: 7 }, {
                          default: withCtx(() => [
                            createVNode("article", { class: "certificate-card" }, [
                              createVNode("h3", null, toDisplayString(certificate.title), 1),
                              createVNode("span", null, toDisplayString(certificate.issuer), 1),
                              certificate.credential_url ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: certificate.credential_url,
                                target: "_blank",
                                rel: "noreferrer",
                                class: "folio-link"
                              }, "View credential ↗", 8, ["href"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="folio-contact has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              tone: "contact",
              mode: "orbs"
            }, null, _parent2, _scopeId));
            _push2(`<div class="folio-contact-split"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="folio-label"${_scopeId2}>YOUR NEXT CHAPTER STARTS HERE</span><h2${_scopeId2}>Have a good<br${_scopeId2}><em${_scopeId2}>challenge?</em></h2><div class="folio-contact-actions"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/contact",
                    class: "folio-button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Let’s build something <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("Let’s build something "),
                          createVNode("span", null, "↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.profile?.email) {
                    _push3(`<a${ssrRenderAttr("href", `mailto:${__props.profile.email}`)}${_scopeId2}>${ssrInterpolate(__props.profile.email)}</a>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("span", { class: "folio-label" }, "YOUR NEXT CHAPTER STARTS HERE"),
                    createVNode("h2", null, [
                      createTextVNode("Have a good"),
                      createVNode("br"),
                      createVNode("em", null, "challenge?")
                    ]),
                    createVNode("div", { class: "folio-contact-actions" }, [
                      createVNode(unref(Link), {
                        href: "/contact",
                        class: "folio-button"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Let’s build something "),
                          createVNode("span", null, "↗")
                        ]),
                        _: 1
                      }),
                      __props.profile?.email ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: `mailto:${__props.profile.email}`
                      }, toDisplayString(__props.profile.email), 9, ["href"])) : createCommentVNode("", true)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).aside, {
              class: "folio-contact-panel",
              initial: { opacity: 0, x: 24 },
              "while-in-view": { opacity: 1, x: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.65 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="folio-contact-visual" aria-hidden="true"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$7, {
                    tone: "contact",
                    variant: "orbit"
                  }, null, _parent3, _scopeId2));
                  _push3(`<div class="folio-contact-orbit-label"${_scopeId2}><span${_scopeId2}>✦</span><strong${_scopeId2}>Open for builds</strong></div></div><ul class="folio-contact-meta"${_scopeId2}><li${_scopeId2}><small${_scopeId2}>Availability</small><strong${_scopeId2}>${ssrInterpolate(__props.profile?.availability || "Selected projects")}</strong></li><li${_scopeId2}><small${_scopeId2}>Based in</small><strong${_scopeId2}>${ssrInterpolate(__props.profile?.location || "Karachi")}</strong></li><li${_scopeId2}><small${_scopeId2}>Response</small><strong${_scopeId2}>1–2 business days</strong></li></ul>`);
                } else {
                  return [
                    createVNode("div", {
                      class: "folio-contact-visual",
                      "aria-hidden": "true"
                    }, [
                      createVNode(_sfc_main$7, {
                        tone: "contact",
                        variant: "orbit"
                      }),
                      createVNode("div", { class: "folio-contact-orbit-label" }, [
                        createVNode("span", null, "✦"),
                        createVNode("strong", null, "Open for builds")
                      ])
                    ]),
                    createVNode("ul", { class: "folio-contact-meta" }, [
                      createVNode("li", null, [
                        createVNode("small", null, "Availability"),
                        createVNode("strong", null, toDisplayString(__props.profile?.availability || "Selected projects"), 1)
                      ]),
                      createVNode("li", null, [
                        createVNode("small", null, "Based in"),
                        createVNode("strong", null, toDisplayString(__props.profile?.location || "Karachi"), 1)
                      ]),
                      createVNode("li", null, [
                        createVNode("small", null, "Response"),
                        createVNode("strong", null, "1–2 business days")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "folio-home" }, [
                createVNode("section", { class: "editorial-hero immersive-hero" }, [
                  createVNode("div", { class: "hero-byline" }, [
                    createVNode("span", null, [
                      createVNode("i"),
                      createTextVNode(" " + toDisplayString(__props.profile?.availability || "Full stack developer"), 1)
                    ]),
                    createVNode("span", null, toDisplayString(__props.profile?.location || "Karachi, Pakistan") + " · Working globally", 1)
                  ]),
                  createVNode("div", { class: "immersive-grid" }, [
                    createVNode("div", { class: "immersive-copy" }, [
                      createVNode(unref(motion).span, {
                        class: "folio-label",
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5 }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("IBRAHIM NAWAB / FULL STACK DEVELOPER")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).h1, {
                        initial: { opacity: 0, y: 36 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.7, delay: 0.06 }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Good ideas."),
                          createVNode("br"),
                          createTextVNode("Great "),
                          createVNode("em", null, "engineering.")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).p, {
                        initial: { opacity: 0, y: 18 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.55, delay: 0.14 }
                      }, {
                        default: withCtx(() => [
                          createTextVNode("I build the platforms behind the experience — Laravel APIs, admin systems, commerce sites and mobile products people rely on every day.")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).div, {
                        class: "hero-cta-row",
                        initial: { opacity: 0, y: 14 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.22 }
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Link), {
                            href: "/work",
                            class: "folio-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Explore selected work "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Link), {
                            href: "/contact",
                            class: "hero-secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Let’s talk "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).div, {
                        class: "hero-signature",
                        initial: { opacity: 0, y: 12 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.5, delay: 0.3 }
                      }, {
                        default: withCtx(() => [
                          __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: __props.profile.photo_path,
                            alt: __props.profile.name,
                            width: "48",
                            height: "48"
                          }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("strong", null, toDisplayString(__props.profile?.name), 1),
                            createVNode("span", null, "Currently at Siin & K-Labs")
                          ]),
                          __props.profile?.resume_available ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: "/resume"
                          }, "Resume ↓")) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "immersive-object" }, [
                      createVNode("span", { class: "object-index" }, "01 — LIVING SYSTEM"),
                      createVNode(_sfc_main$1),
                      createVNode(unref(motion).div, {
                        class: "orbit-tag",
                        initial: { opacity: 0, y: 10 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.35, duration: 0.55 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "✦"),
                          createVNode("div", null, [
                            createTextVNode("Complex systems."),
                            createVNode("br"),
                            createVNode("strong", null, "Clear experiences.")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("span", { class: "object-coordinates" }, "IDEA → SYSTEM → EXPERIENCE")
                    ])
                  ]),
                  createVNode(unref(motion).div, {
                    class: "hero-bottom",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.45, duration: 0.6 }
                  }, {
                    default: withCtx(() => [
                      createVNode("span", null, [
                        createTextVNode("BACKEND ENGINEERING "),
                        createVNode("b", null, "✳"),
                        createTextVNode(" WEB EXPERIENCES "),
                        createVNode("b", null, "✳"),
                        createTextVNode(" MOBILE PRODUCTS")
                      ]),
                      createVNode("a", { href: "#selected-work" }, "THE WORK BELOW ↓")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", {
                  class: "current-roles",
                  "aria-label": "Current companies"
                }, [
                  createVNode("span", { class: "folio-label" }, "CURRENTLY BUILDING WITH"),
                  (openBlock(true), createBlock(Fragment, null, renderList(currentRoles.value, (item, index) => {
                    return openBlock(), createBlock(unref(motion).span, {
                      key: item.id,
                      class: "role-chip",
                      initial: { opacity: 0, y: 12 },
                      "while-in-view": { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: index * 0.06 },
                      "while-hover": { y: -3 }
                    }, {
                      default: withCtx(() => [
                        createVNode("strong", null, toDisplayString(item.company.replace(/\s*\|.*/, "")), 1),
                        createVNode("small", null, toDisplayString(item.role), 1)
                      ]),
                      _: 2
                    }, 1032, ["transition"]);
                  }), 128))
                ]),
                createVNode("section", {
                  id: "selected-work",
                  class: "folio-section has-atmosphere"
                }, [
                  createVNode(_sfc_main$3, {
                    tone: "work",
                    mode: "dots"
                  }),
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "folio-section-heading" }, [
                        createVNode("span", { class: "folio-label" }, "01 / SELECTED WORK"),
                        createVNode("h2", null, [
                          createTextVNode("Built for people."),
                          createVNode("br"),
                          createVNode("em", null, "Made to work.")
                        ]),
                        createVNode("div", null, [
                          createVNode("p", null, "Web platforms, mobile experiences and the systems behind them — with live links where the product is public."),
                          createVNode(unref(Link), {
                            href: "/work",
                            class: "folio-link"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Explore all " + toDisplayString(__props.projectCount) + " projects ↗", 1)
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "editorial-projects" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project, index) => {
                      return openBlock(), createBlock(unref(motion).div, {
                        key: project.id,
                        initial: { opacity: 0, y: 30 },
                        "while-in-view": { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.2 },
                        transition: { delay: Math.min(index * 0.05, 0.2) }
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$5, { max: 9 }, {
                            default: withCtx(() => [
                              createVNode(unref(Link), {
                                href: `/work/${project.slug}`,
                                class: ["editorial-project", `work-tone-${index % 3}`]
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$6, {
                                    project,
                                    index
                                  }, null, 8, ["project", "index"]),
                                  createVNode("div", { class: "work-caption" }, [
                                    createVNode("h3", null, toDisplayString(project.title), 1),
                                    createVNode("span", null, toDisplayString(project.company || project.category), 1)
                                  ]),
                                  createVNode("p", null, toDisplayString(project.summary), 1),
                                  createVNode("div", { class: "work-meta-row" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList((project.tech_stack ?? []).slice(0, 3), (tech) => {
                                      return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                    }), 128)),
                                    project.live_url ? (openBlock(), createBlock("em", { key: 0 }, "Live ↗")) : createCommentVNode("", true)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["href", "class"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["transition"]);
                    }), 128))
                  ]),
                  !__props.projects?.length ? (openBlock(), createBlock("p", { key: 0 }, "Selected projects are being prepared.")) : createCommentVNode("", true)
                ]),
                createVNode("section", {
                  id: "about",
                  class: "folio-about folio-section has-atmosphere"
                }, [
                  createVNode(_sfc_main$3, {
                    tone: "about",
                    mode: "beams"
                  }),
                  createVNode("span", { class: "folio-label" }, "02 / BEYOND THE CODE"),
                  createVNode("div", null, [
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createVNode("h2", null, [
                          createTextVNode("Technical depth."),
                          createVNode("br"),
                          createVNode("em", null, "Human perspective.")
                        ]),
                        createVNode("p", null, toDisplayString(__props.profile?.bio), 1),
                        createVNode(unref(Link), {
                          href: "/about",
                          class: "folio-link"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("The story so far ↗")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("aside", null, [
                    createVNode(_sfc_main$4, { delay: 0.08 }, {
                      default: withCtx(() => [
                        createVNode("strong", null, toDisplayString(__props.experienceDuration), 1),
                        createVNode("span", null, "Since my first professional role"),
                        createVNode("strong", null, toDisplayString(__props.projectCount), 1),
                        createVNode("span", null, "Projects in this portfolio")
                      ]),
                      _: 1
                    })
                  ])
                ]),
                createVNode("section", {
                  id: "skills",
                  class: "folio-section toolkit-section has-atmosphere"
                }, [
                  createVNode(_sfc_main$3, {
                    tone: "experience",
                    mode: "mist"
                  }),
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "folio-section-heading toolkit-heading" }, [
                        createVNode("span", { class: "folio-label" }, "03 / MY TOOLKIT"),
                        createVNode("h2", null, [
                          createTextVNode("From first click"),
                          createVNode("br"),
                          createVNode("em", null, "to final query.")
                        ]),
                        createVNode("p", null, "One connected approach across backend, interface, commerce and mobile — measured by what ships.")
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "toolkit-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(toolkit.value, ([category, items], index) => {
                      return openBlock(), createBlock(_sfc_main$4, {
                        key: category,
                        delay: Math.min(index * 0.06, 0.24)
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$5, { max: 8 }, {
                            default: withCtx(() => [
                              createVNode("article", { class: "toolkit-card" }, [
                                createVNode("header", null, [
                                  createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                                  createVNode("div", null, [
                                    createVNode("h3", null, toDisplayString(category), 1),
                                    createVNode("small", null, toDisplayString(items.length) + " tools in active use", 1)
                                  ])
                                ]),
                                createVNode("ul", null, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(items, (skill) => {
                                    return openBlock(), createBlock("li", {
                                      key: skill.id
                                    }, [
                                      createVNode("div", { class: "toolkit-skill-meta" }, [
                                        createVNode("strong", null, toDisplayString(skill.name), 1),
                                        createVNode("em", null, toDisplayString(skill.proficiency) + "%", 1)
                                      ]),
                                      createVNode("div", {
                                        class: "toolkit-bar",
                                        "aria-hidden": "true"
                                      }, [
                                        createVNode("i", {
                                          style: { width: `${skill.proficiency}%` }
                                        }, null, 4)
                                      ])
                                    ]);
                                  }), 128))
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["delay"]);
                    }), 128))
                  ])
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.sections, (section) => {
                  return openBlock(), createBlock("section", {
                    key: section.id,
                    class: "folio-section custom-section has-atmosphere"
                  }, [
                    createVNode(_sfc_main$3, {
                      tone: "default",
                      mode: "mist"
                    }),
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createVNode("span", { class: "folio-label" }, toDisplayString(section.eyebrow), 1),
                        createVNode("h2", null, toDisplayString(section.title), 1),
                        createVNode("p", null, toDisplayString(section.body), 1),
                        section.link_url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: section.link_url,
                          class: "folio-link"
                        }, toDisplayString(section.link_label || "Read more") + " ↗", 9, ["href"])) : createCommentVNode("", true)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128)),
                __props.certificates?.length ? (openBlock(), createBlock("section", {
                  key: 0,
                  id: "certificates",
                  class: "folio-section has-atmosphere"
                }, [
                  createVNode(_sfc_main$3, {
                    tone: "about",
                    mode: "dots"
                  }),
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "folio-section-heading" }, [
                        createVNode("span", { class: "folio-label" }, "04 / ALWAYS LEARNING"),
                        createVNode("h2", null, [
                          createTextVNode("A foundation."),
                          createVNode("br"),
                          createVNode("em", null, "Never a finish line.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "folio-certificates" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate, index) => {
                      return openBlock(), createBlock(_sfc_main$4, {
                        key: certificate.id,
                        delay: Math.min(index * 0.05, 0.18)
                      }, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$5, { max: 7 }, {
                            default: withCtx(() => [
                              createVNode("article", { class: "certificate-card" }, [
                                createVNode("h3", null, toDisplayString(certificate.title), 1),
                                createVNode("span", null, toDisplayString(certificate.issuer), 1),
                                certificate.credential_url ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: certificate.credential_url,
                                  target: "_blank",
                                  rel: "noreferrer",
                                  class: "folio-link"
                                }, "View credential ↗", 8, ["href"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["delay"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("section", { class: "folio-contact has-atmosphere" }, [
                  createVNode(_sfc_main$3, {
                    tone: "contact",
                    mode: "orbs"
                  }),
                  createVNode("div", { class: "folio-contact-split" }, [
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createVNode("span", { class: "folio-label" }, "YOUR NEXT CHAPTER STARTS HERE"),
                        createVNode("h2", null, [
                          createTextVNode("Have a good"),
                          createVNode("br"),
                          createVNode("em", null, "challenge?")
                        ]),
                        createVNode("div", { class: "folio-contact-actions" }, [
                          createVNode(unref(Link), {
                            href: "/contact",
                            class: "folio-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Let’s build something "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          }),
                          __props.profile?.email ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: `mailto:${__props.profile.email}`
                          }, toDisplayString(__props.profile.email), 9, ["href"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).aside, {
                      class: "folio-contact-panel",
                      initial: { opacity: 0, x: 24 },
                      "while-in-view": { opacity: 1, x: 0 },
                      viewport: { once: true, amount: 0.3 },
                      transition: { duration: 0.65 }
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "folio-contact-visual",
                          "aria-hidden": "true"
                        }, [
                          createVNode(_sfc_main$7, {
                            tone: "contact",
                            variant: "orbit"
                          }),
                          createVNode("div", { class: "folio-contact-orbit-label" }, [
                            createVNode("span", null, "✦"),
                            createVNode("strong", null, "Open for builds")
                          ])
                        ]),
                        createVNode("ul", { class: "folio-contact-meta" }, [
                          createVNode("li", null, [
                            createVNode("small", null, "Availability"),
                            createVNode("strong", null, toDisplayString(__props.profile?.availability || "Selected projects"), 1)
                          ]),
                          createVNode("li", null, [
                            createVNode("small", null, "Based in"),
                            createVNode("strong", null, toDisplayString(__props.profile?.location || "Karachi"), 1)
                          ]),
                          createVNode("li", null, [
                            createVNode("small", null, "Response"),
                            createVNode("strong", null, "1–2 business days")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
