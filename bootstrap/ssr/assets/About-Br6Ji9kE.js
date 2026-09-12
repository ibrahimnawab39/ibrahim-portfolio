import { computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$5 } from "./PageAtmosphere-B4p25rd1.js";
import { _ as _sfc_main$6 } from "./CompanyLogo-DBsmU8oY.js";
import { _ as _sfc_main$4 } from "./Reveal-B7AZWZR6.js";
import { _ as _sfc_main$3 } from "./TiltCard-BCpF3Iif.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  props: { profile: Object, skills: Object, experiences: Array, certificates: Array },
  setup(__props) {
    const props = __props;
    const skillCategoryOrder = ["Backend Engineering", "Frontend Engineering", "CMS & Commerce", "Mobile Development"];
    const layers = computed(
      () => Object.entries(props.skills ?? {}).sort(([a], [b]) => {
        const ia = skillCategoryOrder.indexOf(a);
        const ib = skillCategoryOrder.indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      }).map(([category, items]) => ({
        category,
        names: items.map((item) => item.name).join(" · ")
      }))
    );
    const studios = computed(() => {
      const seen = /* @__PURE__ */ new Set();
      return (props.experiences ?? []).filter((item) => item.employment_type !== "Freelance").map((item) => ({
        name: item.company.replace(/\s*\|.*/, "").trim(),
        logo: item.logo_path,
        href: item.company_url || "/experience",
        external: !!item.company_url,
        role: item.role
      })).filter((item) => {
        if (seen.has(item.name)) return false;
        seen.add(item.name);
        return true;
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>About — Ibrahim Nawab</title><meta head-key="description" name="description"${ssrRenderAttr("content", __props.profile?.summary)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "About — Ibrahim Nawab"),
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
      _push(ssrRenderComponent(_sfc_main$1, { profile: __props.profile }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inner-page about-page has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              tone: "about",
              mode: "beams"
            }, null, _parent2, _scopeId));
            _push2(`<header class="page-hero page-hero-split about-hero-split"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`01 / About`);
                } else {
                  return [
                    createTextVNode("01 / About")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).p, {
              class: "about-name",
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.05 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile?.name || "Ibrahim Nawab")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile?.name || "Ibrahim Nawab"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).h1, {
              initial: { opacity: 0, y: 28 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Platforms people <em${_scopeId2}>actually rely on.</em>`);
                } else {
                  return [
                    createTextVNode(" Platforms people "),
                    createVNode("em", null, "actually rely on.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).p, {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.profile?.summary)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(__props.profile?.summary), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "about-hero-meta",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.18 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(__props.profile?.location || "Karachi, Pakistan")}</span><span${_scopeId2}>${ssrInterpolate(__props.profile?.years_experience ?? 6)}+ years</span><span${_scopeId2}>${ssrInterpolate(__props.profile?.availability || "Available for selected projects")}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(__props.profile?.location || "Karachi, Pakistan"), 1),
                    createVNode("span", null, toDisplayString(__props.profile?.years_experience ?? 6) + "+ years", 1),
                    createVNode("span", null, toDisplayString(__props.profile?.availability || "Available for selected projects"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "about-hero-actions",
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.22 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/work",
                    class: "folio-button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`See selected work <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("See selected work "),
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
                        createTextVNode("See selected work "),
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
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 0, scale: 0.94 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.75, delay: 0.08 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    max: 6,
                    class: "about-portrait-tilt"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<figure class="about-portrait-frame"${_scopeId3}>`);
                        if (__props.profile?.photo_path) {
                          _push4(`<img${ssrRenderAttr("src", __props.profile.photo_path)}${ssrRenderAttr("alt", __props.profile.name)}${_scopeId3}>`);
                        } else {
                          _push4(`<div class="about-portrait-fallback"${_scopeId3}>IN</div>`);
                        }
                        _push4(`</figure>`);
                      } else {
                        return [
                          createVNode("figure", { class: "about-portrait-frame" }, [
                            __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: __props.profile.photo_path,
                              alt: __props.profile.name
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "about-portrait-fallback"
                            }, "IN"))
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      max: 6,
                      class: "about-portrait-tilt"
                    }, {
                      default: withCtx(() => [
                        createVNode("figure", { class: "about-portrait-frame" }, [
                          __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: __props.profile.photo_path,
                            alt: __props.profile.name
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "about-portrait-fallback"
                          }, "IN"))
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</header><section class="about-bio"${_scopeId}><div class="about-bio-split"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="folio-label"${_scopeId2}>02 / STORY</span><h2${_scopeId2}>I build the systems<br${_scopeId2}><em${_scopeId2}>behind the experience.</em></h2><p class="lead-copy"${_scopeId2}>${ssrInterpolate(__props.profile?.bio)}</p>`);
                } else {
                  return [
                    createVNode("span", { class: "folio-label" }, "02 / STORY"),
                    createVNode("h2", null, [
                      createTextVNode("I build the systems"),
                      createVNode("br"),
                      createVNode("em", null, "behind the experience.")
                    ]),
                    createVNode("p", { class: "lead-copy" }, toDisplayString(__props.profile?.bio), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "section-scene",
              initial: { opacity: 0, scale: 0.92 },
              "while-in-view": { opacity: 1, scale: 1 },
              viewport: { once: true, amount: 0.35 },
              transition: { duration: 0.7 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    tone: "about",
                    variant: "shards"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$5, {
                      tone: "about",
                      variant: "shards"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="about-focus"${_scopeId}><!--[-->`);
            ssrRenderList([
              { title: "Systems thinking", copy: "APIs, admin tools, commerce and mobile treated as one product — not separate deliveries." },
              { title: "Operational focus", copy: "Work starts from real constraints: reliability, clarity and the people who use the system daily." },
              { title: "End-to-end ownership", copy: "From first interaction to deployment — architecture, interface and infrastructure stay coherent." }
            ], (point, index) => {
              _push2(ssrRenderComponent(unref(motion).article, {
                key: point.title,
                initial: { opacity: 0, y: 18 },
                "while-in-view": { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { delay: index * 0.06 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><h3${_scopeId2}>${ssrInterpolate(point.title)}</h3><p${_scopeId2}>${ssrInterpolate(point.copy)}</p>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                      createVNode("h3", null, toDisplayString(point.title), 1),
                      createVNode("p", null, toDisplayString(point.copy), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><section class="about-studios"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="about-section-head"${_scopeId2}><span class="folio-label"${_scopeId2}>03 / STUDIOS</span><h2${_scopeId2}>Where the craft<br${_scopeId2}><em${_scopeId2}>has been practiced.</em></h2></header>`);
                } else {
                  return [
                    createVNode("header", { class: "about-section-head" }, [
                      createVNode("span", { class: "folio-label" }, "03 / STUDIOS"),
                      createVNode("h2", null, [
                        createTextVNode("Where the craft"),
                        createVNode("br"),
                        createVNode("em", null, "has been practiced.")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="about-studio-rail"${_scopeId}><!--[-->`);
            ssrRenderList(studios.value, (studio, index) => {
              _push2(ssrRenderComponent(_sfc_main$3, {
                key: studio.name,
                max: 8
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<a${ssrRenderAttr("href", studio.href)} class="about-studio-item"${ssrRenderAttr("target", studio.external ? "_blank" : void 0)}${ssrRenderAttr("rel", studio.external ? "noreferrer" : void 0)}${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(motion).span, {
                      initial: { opacity: 0, y: 12 },
                      "while-in-view": { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { delay: Math.min(index * 0.04, 0.28) }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_sfc_main$6, {
                            src: studio.logo,
                            name: studio.name,
                            size: "md"
                          }, null, _parent4, _scopeId3));
                          _push4(`<strong${_scopeId3}>${ssrInterpolate(studio.name)}</strong><small${_scopeId3}>${ssrInterpolate(studio.role)}</small>`);
                        } else {
                          return [
                            createVNode(_sfc_main$6, {
                              src: studio.logo,
                              name: studio.name,
                              size: "md"
                            }, null, 8, ["src", "name"]),
                            createVNode("strong", null, toDisplayString(studio.name), 1),
                            createVNode("small", null, toDisplayString(studio.role), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</a>`);
                  } else {
                    return [
                      createVNode("a", {
                        href: studio.href,
                        class: "about-studio-item",
                        target: studio.external ? "_blank" : void 0,
                        rel: studio.external ? "noreferrer" : void 0
                      }, [
                        createVNode(unref(motion).span, {
                          initial: { opacity: 0, y: 12 },
                          "while-in-view": { opacity: 1, y: 0 },
                          viewport: { once: true },
                          transition: { delay: Math.min(index * 0.04, 0.28) }
                        }, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$6, {
                              src: studio.logo,
                              name: studio.name,
                              size: "md"
                            }, null, 8, ["src", "name"]),
                            createVNode("strong", null, toDisplayString(studio.name), 1),
                            createVNode("small", null, toDisplayString(studio.role), 1)
                          ]),
                          _: 2
                        }, 1032, ["transition"])
                      ], 8, ["href", "target", "rel"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><p class="about-platform-note"${_scopeId}> Also delivering through <a href="https://www.freelancer.com/" target="_blank" rel="noreferrer"${_scopeId}>Freelancer.com</a> · <a href="https://www.fiverr.com/" target="_blank" rel="noreferrer"${_scopeId}>Fiverr</a></p></section><section class="about-layers"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<header class="about-section-head"${_scopeId2}><span class="folio-label"${_scopeId2}>04 / STACK</span><h2${_scopeId2}>One partner across<br${_scopeId2}><em${_scopeId2}>the critical layers.</em></h2></header>`);
                } else {
                  return [
                    createVNode("header", { class: "about-section-head" }, [
                      createVNode("span", { class: "folio-label" }, "04 / STACK"),
                      createVNode("h2", null, [
                        createTextVNode("One partner across"),
                        createVNode("br"),
                        createVNode("em", null, "the critical layers.")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="about-layer-list"${_scopeId}><!--[-->`);
            ssrRenderList(layers.value, (layer, index) => {
              _push2(ssrRenderComponent(unref(motion).article, {
                key: layer.category,
                initial: { opacity: 0, x: -14 },
                "while-in-view": { opacity: 1, x: 0 },
                viewport: { once: true, amount: 0.4 },
                transition: { delay: index * 0.05 },
                "while-hover": { x: 6 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><h3${_scopeId2}>${ssrInterpolate(layer.category)}</h3><p${_scopeId2}>${ssrInterpolate(layer.names)}</p>`);
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                      createVNode("h3", null, toDisplayString(layer.category), 1),
                      createVNode("p", null, toDisplayString(layer.names), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section>`);
            if (__props.certificates?.length) {
              _push2(`<section class="about-certs"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$4, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<header class="about-section-head"${_scopeId2}><span class="folio-label"${_scopeId2}>05 / FOUNDATION</span><h2${_scopeId2}>Education that<br${_scopeId2}><em${_scopeId2}>supports the craft.</em></h2></header>`);
                  } else {
                    return [
                      createVNode("header", { class: "about-section-head" }, [
                        createVNode("span", { class: "folio-label" }, "05 / FOUNDATION"),
                        createVNode("h2", null, [
                          createTextVNode("Education that"),
                          createVNode("br"),
                          createVNode("em", null, "supports the craft.")
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<div class="about-cert-list"${_scopeId}><!--[-->`);
              ssrRenderList(__props.certificates, (certificate, index) => {
                _push2(ssrRenderComponent(unref(motion).article, {
                  key: certificate.id,
                  initial: { opacity: 0, y: 16 },
                  "while-in-view": { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.35 },
                  transition: { delay: index * 0.05 },
                  "while-hover": { x: 6 }
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span><div${_scopeId2}><small${_scopeId2}>${ssrInterpolate(certificate.issuer)}</small><h3${_scopeId2}>${ssrInterpolate(certificate.title)}</h3><p${_scopeId2}>${ssrInterpolate(certificate.description)}</p></div>`);
                      if (certificate.credential_url) {
                        _push3(`<a${ssrRenderAttr("href", certificate.credential_url)} target="_blank" rel="noreferrer"${_scopeId2}>Credential ↗</a>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                        createVNode("div", null, [
                          createVNode("small", null, toDisplayString(certificate.issuer), 1),
                          createVNode("h3", null, toDisplayString(certificate.title), 1),
                          createVNode("p", null, toDisplayString(certificate.description), 1)
                        ]),
                        certificate.credential_url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: certificate.credential_url,
                          target: "_blank",
                          rel: "noreferrer"
                        }, "Credential ↗", 8, ["href"])) : createCommentVNode("", true)
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
            _push2(ssrRenderComponent(_sfc_main$4, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<section class="page-cta page-cta-split"${_scopeId2}><div class="page-cta-copy"${_scopeId2}><span${_scopeId2}>Next</span><h2${_scopeId2}>Now see how the thinking becomes product.</h2><div class="about-hero-actions"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/experience",
                    class: "folio-button"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Explore experience <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("Explore experience "),
                          createVNode("span", null, "↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/work",
                    class: "hero-secondary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Selected work <span${_scopeId3}>↗</span>`);
                      } else {
                        return [
                          createTextVNode("Selected work "),
                          createVNode("span", null, "↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div><div class="cta-scene" aria-hidden="true"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    tone: "about",
                    variant: "shards"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></section>`);
                } else {
                  return [
                    createVNode("section", { class: "page-cta page-cta-split" }, [
                      createVNode("div", { class: "page-cta-copy" }, [
                        createVNode("span", null, "Next"),
                        createVNode("h2", null, "Now see how the thinking becomes product."),
                        createVNode("div", { class: "about-hero-actions" }, [
                          createVNode(unref(Link), {
                            href: "/experience",
                            class: "folio-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Explore experience "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Link), {
                            href: "/work",
                            class: "hero-secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Selected work "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", {
                        class: "cta-scene",
                        "aria-hidden": "true"
                      }, [
                        createVNode(_sfc_main$5, {
                          tone: "about",
                          variant: "shards"
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "inner-page about-page has-atmosphere" }, [
                createVNode(_sfc_main$2, {
                  tone: "about",
                  mode: "beams"
                }),
                createVNode("header", { class: "page-hero page-hero-split about-hero-split" }, [
                  createVNode("div", null, [
                    createVNode(unref(motion).span, {
                      class: "section-kicker",
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("01 / About")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).p, {
                      class: "about-name",
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.05 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.profile?.name || "Ibrahim Nawab"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).h1, {
                      initial: { opacity: 0, y: 28 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.65 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Platforms people "),
                        createVNode("em", null, "actually rely on.")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).p, {
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.12 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(__props.profile?.summary), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).div, {
                      class: "about-hero-meta",
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.18 }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, toDisplayString(__props.profile?.location || "Karachi, Pakistan"), 1),
                        createVNode("span", null, toDisplayString(__props.profile?.years_experience ?? 6) + "+ years", 1),
                        createVNode("span", null, toDisplayString(__props.profile?.availability || "Available for selected projects"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).div, {
                      class: "about-hero-actions",
                      initial: { opacity: 0, y: 12 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.22 }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: "/work",
                          class: "folio-button"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("See selected work "),
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
                    })
                  ]),
                  createVNode(unref(motion).div, {
                    initial: { opacity: 0, scale: 0.94 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.75, delay: 0.08 }
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, {
                        max: 6,
                        class: "about-portrait-tilt"
                      }, {
                        default: withCtx(() => [
                          createVNode("figure", { class: "about-portrait-frame" }, [
                            __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: __props.profile.photo_path,
                              alt: __props.profile.name
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "about-portrait-fallback"
                            }, "IN"))
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", { class: "about-bio" }, [
                  createVNode("div", { class: "about-bio-split" }, [
                    createVNode(_sfc_main$4, null, {
                      default: withCtx(() => [
                        createVNode("span", { class: "folio-label" }, "02 / STORY"),
                        createVNode("h2", null, [
                          createTextVNode("I build the systems"),
                          createVNode("br"),
                          createVNode("em", null, "behind the experience.")
                        ]),
                        createVNode("p", { class: "lead-copy" }, toDisplayString(__props.profile?.bio), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).div, {
                      class: "section-scene",
                      initial: { opacity: 0, scale: 0.92 },
                      "while-in-view": { opacity: 1, scale: 1 },
                      viewport: { once: true, amount: 0.35 },
                      transition: { duration: 0.7 }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$5, {
                          tone: "about",
                          variant: "shards"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode("div", { class: "about-focus" }, [
                    (openBlock(), createBlock(Fragment, null, renderList([
                      { title: "Systems thinking", copy: "APIs, admin tools, commerce and mobile treated as one product — not separate deliveries." },
                      { title: "Operational focus", copy: "Work starts from real constraints: reliability, clarity and the people who use the system daily." },
                      { title: "End-to-end ownership", copy: "From first interaction to deployment — architecture, interface and infrastructure stay coherent." }
                    ], (point, index) => {
                      return createVNode(unref(motion).article, {
                        key: point.title,
                        initial: { opacity: 0, y: 18 },
                        "while-in-view": { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.4 },
                        transition: { delay: index * 0.06 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                          createVNode("h3", null, toDisplayString(point.title), 1),
                          createVNode("p", null, toDisplayString(point.copy), 1)
                        ]),
                        _: 2
                      }, 1032, ["transition"]);
                    }), 64))
                  ])
                ]),
                createVNode("section", { class: "about-studios" }, [
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "about-section-head" }, [
                        createVNode("span", { class: "folio-label" }, "03 / STUDIOS"),
                        createVNode("h2", null, [
                          createTextVNode("Where the craft"),
                          createVNode("br"),
                          createVNode("em", null, "has been practiced.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "about-studio-rail" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(studios.value, (studio, index) => {
                      return openBlock(), createBlock(_sfc_main$3, {
                        key: studio.name,
                        max: 8
                      }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: studio.href,
                            class: "about-studio-item",
                            target: studio.external ? "_blank" : void 0,
                            rel: studio.external ? "noreferrer" : void 0
                          }, [
                            createVNode(unref(motion).span, {
                              initial: { opacity: 0, y: 12 },
                              "while-in-view": { opacity: 1, y: 0 },
                              viewport: { once: true },
                              transition: { delay: Math.min(index * 0.04, 0.28) }
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$6, {
                                  src: studio.logo,
                                  name: studio.name,
                                  size: "md"
                                }, null, 8, ["src", "name"]),
                                createVNode("strong", null, toDisplayString(studio.name), 1),
                                createVNode("small", null, toDisplayString(studio.role), 1)
                              ]),
                              _: 2
                            }, 1032, ["transition"])
                          ], 8, ["href", "target", "rel"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  createVNode("p", { class: "about-platform-note" }, [
                    createTextVNode(" Also delivering through "),
                    createVNode("a", {
                      href: "https://www.freelancer.com/",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "Freelancer.com"),
                    createTextVNode(" · "),
                    createVNode("a", {
                      href: "https://www.fiverr.com/",
                      target: "_blank",
                      rel: "noreferrer"
                    }, "Fiverr")
                  ])
                ]),
                createVNode("section", { class: "about-layers" }, [
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "about-section-head" }, [
                        createVNode("span", { class: "folio-label" }, "04 / STACK"),
                        createVNode("h2", null, [
                          createTextVNode("One partner across"),
                          createVNode("br"),
                          createVNode("em", null, "the critical layers.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "about-layer-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(layers.value, (layer, index) => {
                      return openBlock(), createBlock(unref(motion).article, {
                        key: layer.category,
                        initial: { opacity: 0, x: -14 },
                        "while-in-view": { opacity: 1, x: 0 },
                        viewport: { once: true, amount: 0.4 },
                        transition: { delay: index * 0.05 },
                        "while-hover": { x: 6 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                          createVNode("h3", null, toDisplayString(layer.category), 1),
                          createVNode("p", null, toDisplayString(layer.names), 1)
                        ]),
                        _: 2
                      }, 1032, ["transition"]);
                    }), 128))
                  ])
                ]),
                __props.certificates?.length ? (openBlock(), createBlock("section", {
                  key: 0,
                  class: "about-certs"
                }, [
                  createVNode(_sfc_main$4, null, {
                    default: withCtx(() => [
                      createVNode("header", { class: "about-section-head" }, [
                        createVNode("span", { class: "folio-label" }, "05 / FOUNDATION"),
                        createVNode("h2", null, [
                          createTextVNode("Education that"),
                          createVNode("br"),
                          createVNode("em", null, "supports the craft.")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "about-cert-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate, index) => {
                      return openBlock(), createBlock(unref(motion).article, {
                        key: certificate.id,
                        initial: { opacity: 0, y: 16 },
                        "while-in-view": { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.35 },
                        transition: { delay: index * 0.05 },
                        "while-hover": { x: 6 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(String(index + 1).padStart(2, "0")), 1),
                          createVNode("div", null, [
                            createVNode("small", null, toDisplayString(certificate.issuer), 1),
                            createVNode("h3", null, toDisplayString(certificate.title), 1),
                            createVNode("p", null, toDisplayString(certificate.description), 1)
                          ]),
                          certificate.credential_url ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: certificate.credential_url,
                            target: "_blank",
                            rel: "noreferrer"
                          }, "Credential ↗", 8, ["href"])) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1032, ["transition"]);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                createVNode(_sfc_main$4, null, {
                  default: withCtx(() => [
                    createVNode("section", { class: "page-cta page-cta-split" }, [
                      createVNode("div", { class: "page-cta-copy" }, [
                        createVNode("span", null, "Next"),
                        createVNode("h2", null, "Now see how the thinking becomes product."),
                        createVNode("div", { class: "about-hero-actions" }, [
                          createVNode(unref(Link), {
                            href: "/experience",
                            class: "folio-button"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Explore experience "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(Link), {
                            href: "/work",
                            class: "hero-secondary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Selected work "),
                              createVNode("span", null, "↗")
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      createVNode("div", {
                        class: "cta-scene",
                        "aria-hidden": "true"
                      }, [
                        createVNode(_sfc_main$5, {
                          tone: "about",
                          variant: "shards"
                        })
                      ])
                    ])
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
