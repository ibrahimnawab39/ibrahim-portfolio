import { ref, onMounted, onBeforeUnmount, mergeProps, useSSRContext, computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, createCommentVNode, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./PortfolioLayout-C4yABIDF.js";
import { Head, Link } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "ArchitectureScene",
  __ssrInlineRender: true,
  setup(__props) {
    const mount = ref(null);
    const paused = ref(false);
    const ready = ref(false);
    let renderer, scene, camera, group, resize, intersection, media, environment, destroyed = false;
    let visible = true, reduced = false, angle = 0, previous = 0;
    const pointer = { x: 0, y: 0 };
    function render(time = 0) {
      if (!renderer || !visible || document.hidden) {
        previous = time;
        return;
      }
      const delta = previous ? Math.min((time - previous) / 1e3, 0.05) : 0;
      previous = time;
      if (!paused.value && !reduced) angle += delta * 0.18;
      group.rotation.set(0.32 + pointer.y * 0.15, angle + pointer.x * 0.35, -0.28);
      renderer.render(scene, camera);
    }
    function motionChange(event) {
      reduced = event.matches;
      render();
    }
    onMounted(async () => {
      try {
        const T = await import("three");
        const { RoomEnvironment } = await import("three/addons/environments/RoomEnvironment.js");
        if (destroyed) return;
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        mount.value.appendChild(renderer.domElement);
        scene = new T.Scene();
        camera = new T.PerspectiveCamera(35, 1, 0.1, 100);
        camera.position.set(0, 0.2, 8.8);
        const pmrem = new T.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        environment = pmrem.fromScene(room, 0.04);
        scene.environment = environment.texture;
        room.dispose();
        pmrem.dispose();
        group = new T.Group();
        scene.add(group);
        const chrome = new T.MeshStandardMaterial({ color: 15198703, metalness: 1, roughness: 0.14 });
        const blue = new T.MeshPhysicalMaterial({ color: 2182138, metalness: 0.45, roughness: 0.19, clearcoat: 1 });
        const ringGeometry = new T.TorusGeometry(1.52, 0.25, 28, 100);
        [0, 1, 2].forEach((n) => {
          const ring = new T.Mesh(ringGeometry, n === 1 ? blue : chrome);
          ring.rotation.set(n === 2 ? Math.PI / 2 : 0, n === 1 ? Math.PI / 2 : 0, 0);
          group.add(ring);
        });
        const core = new T.Mesh(new T.IcosahedronGeometry(0.63, 0), blue);
        group.add(core);
        const light = new T.DirectionalLight(16777215, 4);
        light.position.set(-3, 5, 4);
        scene.add(light);
        scene.add(new T.AmbientLight(16777215, 0.8));
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
      resize?.disconnect();
      intersection?.disconnect();
      media?.removeEventListener("change", motionChange);
      renderer?.setAnimationLoop(null);
      const geometries = /* @__PURE__ */ new Set(), materials = /* @__PURE__ */ new Set();
      scene?.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) materials.add(object.material);
      });
      geometries.forEach((item) => item.dispose());
      materials.forEach((item) => item.dispose());
      environment?.dispose();
      renderer?.dispose();
      renderer?.domElement.remove();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "orbital-scene" }, _attrs))}><div class="webgl-mount" aria-hidden="true"></div>`);
      if (!ready.value) {
        _push(`<div class="orbital-fallback" aria-hidden="true"><i></i><i></i><b>IN</b></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="orbit-note orbit-note-top">Ideas into interfaces.</span><span class="orbit-note orbit-note-bottom">Complexity into clarity.</span>`);
      if (ready.value) {
        _push(`<button type="button" class="motion-control"${ssrRenderAttr("aria-pressed", paused.value)}>${ssrInterpolate(paused.value ? "Play motion ↻" : "Pause motion Ⅱ")}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
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
  props: { profile: Object, skills: Object, projects: Array, experiences: Array, certificates: Array, sections: Array, projectCount: Number, experienceDuration: String },
  setup(__props) {
    const props = __props;
    const currentRoles = computed(() => (props.experiences ?? []).filter((item) => !item.end_date && item.employment_type !== "Freelance"));
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
            _push2(`<div class="folio-home"${_scopeId}><section class="editorial-hero"${_scopeId}><div class="hero-byline"${_scopeId}><span${_scopeId}><i${_scopeId}></i> ${ssrInterpolate(__props.profile?.availability || "Full stack developer")}</span><span${_scopeId}>${ssrInterpolate(__props.profile?.location || "Karachi, Pakistan")} · Working globally</span></div><div class="hero-title-row"${_scopeId}><h1${_scopeId}>Engineering<br${_scopeId}><span${_scopeId}>the <em${_scopeId}>next.</em></span></h1><div class="hero-side-note"${_scopeId}><span${_scopeId}>PORTFOLIO / 2026</span><p${_scopeId}>Thoughtful digital experiences.<br${_scopeId}>Dependable foundations.</p></div></div><div class="hero-stage"${_scopeId}><div class="hero-statement"${_scopeId}><span class="folio-label"${_scopeId}>HELLO, I’M IBRAHIM NAWAB</span><p${_scopeId}>A full stack developer turning ambitious ideas into <strong${_scopeId}>products that work.</strong></p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/work",
              class: "folio-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Discover my work <span${_scopeId2}>↗</span>`);
                } else {
                  return [
                    createTextVNode("Discover my work "),
                    createVNode("span", null, "↗")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_sfc_main$1, null, null, _parent2, _scopeId));
            _push2(`<div class="hero-profile"${_scopeId}>`);
            if (__props.profile?.photo_path) {
              _push2(`<img${ssrRenderAttr("src", __props.profile.photo_path)}${ssrRenderAttr("alt", __props.profile.name)} width="88" height="104"${_scopeId}>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span${_scopeId}>Laravel. Vue. APIs.<br${_scopeId}>Built with purpose.</span>`);
            if (__props.profile?.resume_available) {
              _push2(`<a href="/resume" class="folio-link"${_scopeId}>Download resume ↓</a>`);
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                href: "/experience",
                class: "folio-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`My experience ↗`);
                  } else {
                    return [
                      createTextVNode("My experience ↗")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div><div class="hero-bottom"${_scopeId}><span${_scopeId}>GOOD SOFTWARE STARTS WITH A GOOD QUESTION.</span><a href="#selected-work"${_scopeId}>SCROLL TO EXPLORE ↓</a></div></section><section class="current-roles" aria-label="Current companies"${_scopeId}><span class="folio-label"${_scopeId}>CURRENTLY BUILDING WITH</span><!--[-->`);
            ssrRenderList(currentRoles.value, (item) => {
              _push2(`<span${_scopeId}><strong${_scopeId}>${ssrInterpolate(item.company)}</strong><small${_scopeId}>${ssrInterpolate(item.role)}</small></span>`);
            });
            _push2(`<!--]--></section><section id="selected-work" class="folio-section"${_scopeId}><header class="folio-section-heading"${_scopeId}><span class="folio-label"${_scopeId}>01 / SELECTED WORK</span><h2${_scopeId}>Less noise.<br${_scopeId}><em${_scopeId}>More impact.</em></h2><div${_scopeId}><p${_scopeId}>Web platforms, mobile experiences and the systems behind them.</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/work",
              class: "folio-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Explore all ${ssrInterpolate(__props.projectCount)} projects ↗`);
                } else {
                  return [
                    createTextVNode("Explore all " + toDisplayString(__props.projectCount) + " projects ↗", 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></header><div class="editorial-projects"${_scopeId}><!--[-->`);
            ssrRenderList(__props.projects, (project, index) => {
              _push2(ssrRenderComponent(unref(Link), {
                key: project.id,
                href: `/work/${project.slug}`,
                class: ["editorial-project", `work-tone-${index % 3}`]
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="work-cover"${_scopeId2}>`);
                    if (project.image_path) {
                      _push3(`<img${ssrRenderAttr("src", project.image_path)}${ssrRenderAttr("alt", project.title)} loading="lazy"${_scopeId2}>`);
                    } else {
                      _push3(`<!--[--><span class="cover-caption"${_scopeId2}>${ssrInterpolate(project.category)} / ${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><div class="cover-art" aria-hidden="true"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(project.title)}</span><i${_scopeId2}></i><i${_scopeId2}></i><i${_scopeId2}></i></div><span class="cover-tech"${_scopeId2}>${ssrInterpolate((project.tech_stack ?? []).slice(0, 3).join(" + "))}</span><!--]-->`);
                    }
                    _push3(`<b class="work-arrow-round"${_scopeId2}>↗</b></div><div class="work-caption"${_scopeId2}><h3${_scopeId2}>${ssrInterpolate(project.title)}</h3><span${_scopeId2}>${ssrInterpolate(project.company || project.category)}</span></div><p${_scopeId2}>${ssrInterpolate(project.summary)}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "work-cover" }, [
                        project.image_path ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: project.image_path,
                          alt: project.title,
                          loading: "lazy"
                        }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("span", { class: "cover-caption" }, toDisplayString(project.category) + " / " + toDisplayString(String(index + 1).padStart(2, "0")), 1),
                          createVNode("div", {
                            class: "cover-art",
                            "aria-hidden": "true"
                          }, [
                            createVNode("span", null, toDisplayString(project.title), 1),
                            createVNode("i"),
                            createVNode("i"),
                            createVNode("i")
                          ]),
                          createVNode("span", { class: "cover-tech" }, toDisplayString((project.tech_stack ?? []).slice(0, 3).join(" + ")), 1)
                        ], 64)),
                        createVNode("b", { class: "work-arrow-round" }, "↗")
                      ]),
                      createVNode("div", { class: "work-caption" }, [
                        createVNode("h3", null, toDisplayString(project.title), 1),
                        createVNode("span", null, toDisplayString(project.company || project.category), 1)
                      ]),
                      createVNode("p", null, toDisplayString(project.summary), 1)
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
            _push2(`</section><section id="about" class="folio-about folio-section"${_scopeId}><span class="folio-label"${_scopeId}>02 / BEYOND THE CODE</span><div${_scopeId}><h2${_scopeId}>Technical depth.<br${_scopeId}><em${_scopeId}>Human perspective.</em></h2><p${_scopeId}>${ssrInterpolate(__props.profile?.bio)}</p>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/about",
              class: "folio-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`The story so far ↗`);
                } else {
                  return [
                    createTextVNode("The story so far ↗")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><aside${_scopeId}><strong${_scopeId}>${ssrInterpolate(__props.experienceDuration)}</strong><span${_scopeId}>Since my first professional role</span><strong${_scopeId}>${ssrInterpolate(__props.projectCount)}</strong><span${_scopeId}>Projects in this portfolio</span></aside></section><section id="skills" class="folio-section"${_scopeId}><header class="folio-section-heading"${_scopeId}><span class="folio-label"${_scopeId}>03 / MY TOOLKIT</span><h2${_scopeId}>From first click<br${_scopeId}><em${_scopeId}>to final query.</em></h2><p${_scopeId}>One connected approach to the whole product.</p></header><div class="folio-skills"${_scopeId}><!--[-->`);
            ssrRenderList(__props.skills, (items, category, index) => {
              _push2(`<article${_scopeId}><span${_scopeId}>0${ssrInterpolate(index + 1)}</span><h3${_scopeId}>${ssrInterpolate(category)}</h3><p${_scopeId}><!--[-->`);
              ssrRenderList(items, (skill) => {
                _push2(`<span${_scopeId}>${ssrInterpolate(skill.name)}</span>`);
              });
              _push2(`<!--]--></p></article>`);
            });
            _push2(`<!--]--></div></section><!--[-->`);
            ssrRenderList(__props.sections, (section) => {
              _push2(`<section class="folio-section custom-section"${_scopeId}><span class="folio-label"${_scopeId}>${ssrInterpolate(section.eyebrow)}</span><h2${_scopeId}>${ssrInterpolate(section.title)}</h2><p${_scopeId}>${ssrInterpolate(section.body)}</p>`);
              if (section.link_url) {
                _push2(`<a${ssrRenderAttr("href", section.link_url)} class="folio-link"${_scopeId}>${ssrInterpolate(section.link_label || "Read more")} ↗</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section>`);
            });
            _push2(`<!--]-->`);
            if (__props.certificates?.length) {
              _push2(`<section id="certificates" class="folio-section"${_scopeId}><header class="folio-section-heading"${_scopeId}><span class="folio-label"${_scopeId}>04 / ALWAYS LEARNING</span><h2${_scopeId}>A foundation.<br${_scopeId}><em${_scopeId}>Never a finish line.</em></h2></header><div class="folio-certificates"${_scopeId}><!--[-->`);
              ssrRenderList(__props.certificates, (certificate) => {
                _push2(`<article${_scopeId}><h3${_scopeId}>${ssrInterpolate(certificate.title)}</h3><span${_scopeId}>${ssrInterpolate(certificate.issuer)}</span>`);
                if (certificate.credential_url) {
                  _push2(`<a${ssrRenderAttr("href", certificate.credential_url)} target="_blank" rel="noreferrer" class="folio-link"${_scopeId}>View credential ↗</a>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</article>`);
              });
              _push2(`<!--]--></div></section>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<section class="folio-contact"${_scopeId}><span class="folio-label"${_scopeId}>YOUR NEXT CHAPTER STARTS HERE</span><h2${_scopeId}>Have a good<br${_scopeId}><em${_scopeId}>challenge?</em><span${_scopeId}>↗</span></h2><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/contact",
              class: "folio-button"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Let’s build something <span${_scopeId2}>↗</span>`);
                } else {
                  return [
                    createTextVNode("Let’s build something "),
                    createVNode("span", null, "↗")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.profile?.email) {
              _push2(`<a${ssrRenderAttr("href", `mailto:${__props.profile.email}`)}${_scopeId}>${ssrInterpolate(__props.profile.email)}</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section></div>`);
          } else {
            return [
              createVNode("div", { class: "folio-home" }, [
                createVNode("section", { class: "editorial-hero" }, [
                  createVNode("div", { class: "hero-byline" }, [
                    createVNode("span", null, [
                      createVNode("i"),
                      createTextVNode(" " + toDisplayString(__props.profile?.availability || "Full stack developer"), 1)
                    ]),
                    createVNode("span", null, toDisplayString(__props.profile?.location || "Karachi, Pakistan") + " · Working globally", 1)
                  ]),
                  createVNode("div", { class: "hero-title-row" }, [
                    createVNode("h1", null, [
                      createTextVNode("Engineering"),
                      createVNode("br"),
                      createVNode("span", null, [
                        createTextVNode("the "),
                        createVNode("em", null, "next.")
                      ])
                    ]),
                    createVNode("div", { class: "hero-side-note" }, [
                      createVNode("span", null, "PORTFOLIO / 2026"),
                      createVNode("p", null, [
                        createTextVNode("Thoughtful digital experiences."),
                        createVNode("br"),
                        createTextVNode("Dependable foundations.")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "hero-stage" }, [
                    createVNode("div", { class: "hero-statement" }, [
                      createVNode("span", { class: "folio-label" }, "HELLO, I’M IBRAHIM NAWAB"),
                      createVNode("p", null, [
                        createTextVNode("A full stack developer turning ambitious ideas into "),
                        createVNode("strong", null, "products that work.")
                      ]),
                      createVNode(unref(Link), {
                        href: "/work",
                        class: "folio-button"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Discover my work "),
                          createVNode("span", null, "↗")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_sfc_main$1),
                    createVNode("div", { class: "hero-profile" }, [
                      __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: __props.profile.photo_path,
                        alt: __props.profile.name,
                        width: "88",
                        height: "104"
                      }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                      createVNode("span", null, [
                        createTextVNode("Laravel. Vue. APIs."),
                        createVNode("br"),
                        createTextVNode("Built with purpose.")
                      ]),
                      __props.profile?.resume_available ? (openBlock(), createBlock("a", {
                        key: 1,
                        href: "/resume",
                        class: "folio-link"
                      }, "Download resume ↓")) : (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: "/experience",
                        class: "folio-link"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("My experience ↗")
                        ]),
                        _: 1
                      }))
                    ])
                  ]),
                  createVNode("div", { class: "hero-bottom" }, [
                    createVNode("span", null, "GOOD SOFTWARE STARTS WITH A GOOD QUESTION."),
                    createVNode("a", { href: "#selected-work" }, "SCROLL TO EXPLORE ↓")
                  ])
                ]),
                createVNode("section", {
                  class: "current-roles",
                  "aria-label": "Current companies"
                }, [
                  createVNode("span", { class: "folio-label" }, "CURRENTLY BUILDING WITH"),
                  (openBlock(true), createBlock(Fragment, null, renderList(currentRoles.value, (item) => {
                    return openBlock(), createBlock("span", {
                      key: item.id
                    }, [
                      createVNode("strong", null, toDisplayString(item.company), 1),
                      createVNode("small", null, toDisplayString(item.role), 1)
                    ]);
                  }), 128))
                ]),
                createVNode("section", {
                  id: "selected-work",
                  class: "folio-section"
                }, [
                  createVNode("header", { class: "folio-section-heading" }, [
                    createVNode("span", { class: "folio-label" }, "01 / SELECTED WORK"),
                    createVNode("h2", null, [
                      createTextVNode("Less noise."),
                      createVNode("br"),
                      createVNode("em", null, "More impact.")
                    ]),
                    createVNode("div", null, [
                      createVNode("p", null, "Web platforms, mobile experiences and the systems behind them."),
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
                  ]),
                  createVNode("div", { class: "editorial-projects" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project, index) => {
                      return openBlock(), createBlock(unref(Link), {
                        key: project.id,
                        href: `/work/${project.slug}`,
                        class: ["editorial-project", `work-tone-${index % 3}`]
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "work-cover" }, [
                            project.image_path ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: project.image_path,
                              alt: project.title,
                              loading: "lazy"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createVNode("span", { class: "cover-caption" }, toDisplayString(project.category) + " / " + toDisplayString(String(index + 1).padStart(2, "0")), 1),
                              createVNode("div", {
                                class: "cover-art",
                                "aria-hidden": "true"
                              }, [
                                createVNode("span", null, toDisplayString(project.title), 1),
                                createVNode("i"),
                                createVNode("i"),
                                createVNode("i")
                              ]),
                              createVNode("span", { class: "cover-tech" }, toDisplayString((project.tech_stack ?? []).slice(0, 3).join(" + ")), 1)
                            ], 64)),
                            createVNode("b", { class: "work-arrow-round" }, "↗")
                          ]),
                          createVNode("div", { class: "work-caption" }, [
                            createVNode("h3", null, toDisplayString(project.title), 1),
                            createVNode("span", null, toDisplayString(project.company || project.category), 1)
                          ]),
                          createVNode("p", null, toDisplayString(project.summary), 1)
                        ]),
                        _: 2
                      }, 1032, ["href", "class"]);
                    }), 128))
                  ]),
                  !__props.projects?.length ? (openBlock(), createBlock("p", { key: 0 }, "Selected projects are being prepared.")) : createCommentVNode("", true)
                ]),
                createVNode("section", {
                  id: "about",
                  class: "folio-about folio-section"
                }, [
                  createVNode("span", { class: "folio-label" }, "02 / BEYOND THE CODE"),
                  createVNode("div", null, [
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
                  createVNode("aside", null, [
                    createVNode("strong", null, toDisplayString(__props.experienceDuration), 1),
                    createVNode("span", null, "Since my first professional role"),
                    createVNode("strong", null, toDisplayString(__props.projectCount), 1),
                    createVNode("span", null, "Projects in this portfolio")
                  ])
                ]),
                createVNode("section", {
                  id: "skills",
                  class: "folio-section"
                }, [
                  createVNode("header", { class: "folio-section-heading" }, [
                    createVNode("span", { class: "folio-label" }, "03 / MY TOOLKIT"),
                    createVNode("h2", null, [
                      createTextVNode("From first click"),
                      createVNode("br"),
                      createVNode("em", null, "to final query.")
                    ]),
                    createVNode("p", null, "One connected approach to the whole product.")
                  ]),
                  createVNode("div", { class: "folio-skills" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.skills, (items, category, index) => {
                      return openBlock(), createBlock("article", { key: category }, [
                        createVNode("span", null, "0" + toDisplayString(index + 1), 1),
                        createVNode("h3", null, toDisplayString(category), 1),
                        createVNode("p", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(items, (skill) => {
                            return openBlock(), createBlock("span", {
                              key: skill.id
                            }, toDisplayString(skill.name), 1);
                          }), 128))
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                (openBlock(true), createBlock(Fragment, null, renderList(__props.sections, (section) => {
                  return openBlock(), createBlock("section", {
                    key: section.id,
                    class: "folio-section custom-section"
                  }, [
                    createVNode("span", { class: "folio-label" }, toDisplayString(section.eyebrow), 1),
                    createVNode("h2", null, toDisplayString(section.title), 1),
                    createVNode("p", null, toDisplayString(section.body), 1),
                    section.link_url ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: section.link_url,
                      class: "folio-link"
                    }, toDisplayString(section.link_label || "Read more") + " ↗", 9, ["href"])) : createCommentVNode("", true)
                  ]);
                }), 128)),
                __props.certificates?.length ? (openBlock(), createBlock("section", {
                  key: 0,
                  id: "certificates",
                  class: "folio-section"
                }, [
                  createVNode("header", { class: "folio-section-heading" }, [
                    createVNode("span", { class: "folio-label" }, "04 / ALWAYS LEARNING"),
                    createVNode("h2", null, [
                      createTextVNode("A foundation."),
                      createVNode("br"),
                      createVNode("em", null, "Never a finish line.")
                    ])
                  ]),
                  createVNode("div", { class: "folio-certificates" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate) => {
                      return openBlock(), createBlock("article", {
                        key: certificate.id
                      }, [
                        createVNode("h3", null, toDisplayString(certificate.title), 1),
                        createVNode("span", null, toDisplayString(certificate.issuer), 1),
                        certificate.credential_url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: certificate.credential_url,
                          target: "_blank",
                          rel: "noreferrer",
                          class: "folio-link"
                        }, "View credential ↗", 8, ["href"])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode("section", { class: "folio-contact" }, [
                  createVNode("span", { class: "folio-label" }, "YOUR NEXT CHAPTER STARTS HERE"),
                  createVNode("h2", null, [
                    createTextVNode("Have a good"),
                    createVNode("br"),
                    createVNode("em", null, "challenge?"),
                    createVNode("span", null, "↗")
                  ]),
                  createVNode("div", null, [
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
