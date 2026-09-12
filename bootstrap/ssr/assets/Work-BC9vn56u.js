import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./PageAtmosphere-B4p25rd1.js";
import { _ as _sfc_main$5 } from "./ProjectCover-D_pFmt3q.js";
import { _ as _sfc_main$4 } from "./TiltCard-BCpF3Iif.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Work",
  __ssrInlineRender: true,
  props: { profile: Object, projects: Array },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Selected Work — Ibrahim Nawab</title><meta head-key="description" name="description" content="Selected Laravel products, operational platforms and infrastructure projects by Ibrahim Nawab."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Selected Work — Ibrahim Nawab"),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: "Selected Laravel products, operational platforms and infrastructure projects by Ibrahim Nawab."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { profile: __props.profile }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inner-page has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              tone: "work",
              mode: "dots"
            }, null, _parent2, _scopeId));
            _push2(`<header class="page-hero page-hero-split"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`03 / Selected work`);
                } else {
                  return [
                    createTextVNode("03 / Selected work")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).h1, {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Products built to perform <em${_scopeId2}>under pressure.</em>`);
                } else {
                  return [
                    createTextVNode("Products built to perform "),
                    createVNode("em", null, "under pressure.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).p, {
              initial: { opacity: 0, y: 18 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` From commerce operations to mobile platforms — every system starts with a real constraint and ends with something people can use. `);
                } else {
                  return [
                    createTextVNode(" From commerce operations to mobile platforms — every system starts with a real constraint and ends with something people can use. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "page-hero-scene",
              initial: { opacity: 0, scale: 0.92 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8, delay: 0.1 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    tone: "work",
                    variant: "dots"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      tone: "work",
                      variant: "dots"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</header><section class="work-gallery"${_scopeId}><!--[-->`);
            ssrRenderList(__props.projects, (project, index) => {
              _push2(ssrRenderComponent(unref(motion).article, {
                key: project.id,
                class: "work-gallery-item",
                initial: { opacity: 0, y: 34 },
                "while-in-view": { opacity: 1, y: 0 },
                viewport: { once: true, amount: 0.12 },
                transition: { duration: 0.5, delay: Math.min(index * 0.03, 0.18) }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, { max: 8 }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(Link), {
                            href: `/work/${project.slug}`,
                            class: "work-gallery-link"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_sfc_main$5, {
                                  project,
                                  index
                                }, null, _parent5, _scopeId4));
                                _push5(`<div class="work-gallery-copy"${_scopeId4}><small${_scopeId4}>${ssrInterpolate(project.category)}`);
                                if (project.company) {
                                  _push5(`<!--[--> · ${ssrInterpolate(project.company)}<!--]-->`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</small><h2${_scopeId4}>${ssrInterpolate(project.title)}</h2><p${_scopeId4}>${ssrInterpolate(project.summary)}</p><div class="tags"${_scopeId4}><!--[-->`);
                                ssrRenderList(project.tech_stack, (tech) => {
                                  _push5(`<span${_scopeId4}>${ssrInterpolate(tech)}</span>`);
                                });
                                _push5(`<!--]--></div><div class="work-gallery-actions"${_scopeId4}><span${_scopeId4}>Case study ↗</span>`);
                                if (project.live_url) {
                                  _push5(`<em${_scopeId4}>${ssrInterpolate(/flutter|mobile/i.test(project.category || "") ? "App store" : "Live project")}</em>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(`</div></div>`);
                              } else {
                                return [
                                  createVNode(_sfc_main$5, {
                                    project,
                                    index
                                  }, null, 8, ["project", "index"]),
                                  createVNode("div", { class: "work-gallery-copy" }, [
                                    createVNode("small", null, [
                                      createTextVNode(toDisplayString(project.category), 1),
                                      project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                        createTextVNode(" · " + toDisplayString(project.company), 1)
                                      ], 64)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("h2", null, toDisplayString(project.title), 1),
                                    createVNode("p", null, toDisplayString(project.summary), 1),
                                    createVNode("div", { class: "tags" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(project.tech_stack, (tech) => {
                                        return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                      }), 128))
                                    ]),
                                    createVNode("div", { class: "work-gallery-actions" }, [
                                      createVNode("span", null, "Case study ↗"),
                                      project.live_url ? (openBlock(), createBlock("em", { key: 0 }, toDisplayString(/flutter|mobile/i.test(project.category || "") ? "App store" : "Live project"), 1)) : createCommentVNode("", true)
                                    ])
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
                              class: "work-gallery-link"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$5, {
                                  project,
                                  index
                                }, null, 8, ["project", "index"]),
                                createVNode("div", { class: "work-gallery-copy" }, [
                                  createVNode("small", null, [
                                    createTextVNode(toDisplayString(project.category), 1),
                                    project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createTextVNode(" · " + toDisplayString(project.company), 1)
                                    ], 64)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h2", null, toDisplayString(project.title), 1),
                                  createVNode("p", null, toDisplayString(project.summary), 1),
                                  createVNode("div", { class: "tags" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(project.tech_stack, (tech) => {
                                      return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                    }), 128))
                                  ]),
                                  createVNode("div", { class: "work-gallery-actions" }, [
                                    createVNode("span", null, "Case study ↗"),
                                    project.live_url ? (openBlock(), createBlock("em", { key: 0 }, toDisplayString(/flutter|mobile/i.test(project.category || "") ? "App store" : "Live project"), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$4, { max: 8 }, {
                        default: withCtx(() => [
                          createVNode(unref(Link), {
                            href: `/work/${project.slug}`,
                            class: "work-gallery-link"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$5, {
                                project,
                                index
                              }, null, 8, ["project", "index"]),
                              createVNode("div", { class: "work-gallery-copy" }, [
                                createVNode("small", null, [
                                  createTextVNode(toDisplayString(project.category), 1),
                                  project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                    createTextVNode(" · " + toDisplayString(project.company), 1)
                                  ], 64)) : createCommentVNode("", true)
                                ]),
                                createVNode("h2", null, toDisplayString(project.title), 1),
                                createVNode("p", null, toDisplayString(project.summary), 1),
                                createVNode("div", { class: "tags" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(project.tech_stack, (tech) => {
                                    return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                  }), 128))
                                ]),
                                createVNode("div", { class: "work-gallery-actions" }, [
                                  createVNode("span", null, "Case study ↗"),
                                  project.live_url ? (openBlock(), createBlock("em", { key: 0 }, toDisplayString(/flutter|mobile/i.test(project.category || "") ? "App store" : "Live project"), 1)) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1032, ["href"])
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section></div>`);
          } else {
            return [
              createVNode("div", { class: "inner-page has-atmosphere" }, [
                createVNode(_sfc_main$2, {
                  tone: "work",
                  mode: "dots"
                }),
                createVNode("header", { class: "page-hero page-hero-split" }, [
                  createVNode("div", null, [
                    createVNode(unref(motion).span, {
                      class: "section-kicker",
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("03 / Selected work")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).h1, {
                      initial: { opacity: 0, y: 40 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.7 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Products built to perform "),
                        createVNode("em", null, "under pressure.")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).p, {
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.1 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" From commerce operations to mobile platforms — every system starts with a real constraint and ends with something people can use. ")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(unref(motion).div, {
                    class: "page-hero-scene",
                    initial: { opacity: 0, scale: 0.92 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.8, delay: 0.1 }
                  }, {
                    default: withCtx(() => [
                      createVNode(_sfc_main$3, {
                        tone: "work",
                        variant: "dots"
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", { class: "work-gallery" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project, index) => {
                    return openBlock(), createBlock(unref(motion).article, {
                      key: project.id,
                      class: "work-gallery-item",
                      initial: { opacity: 0, y: 34 },
                      "while-in-view": { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.12 },
                      transition: { duration: 0.5, delay: Math.min(index * 0.03, 0.18) }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$4, { max: 8 }, {
                          default: withCtx(() => [
                            createVNode(unref(Link), {
                              href: `/work/${project.slug}`,
                              class: "work-gallery-link"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$5, {
                                  project,
                                  index
                                }, null, 8, ["project", "index"]),
                                createVNode("div", { class: "work-gallery-copy" }, [
                                  createVNode("small", null, [
                                    createTextVNode(toDisplayString(project.category), 1),
                                    project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                                      createTextVNode(" · " + toDisplayString(project.company), 1)
                                    ], 64)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h2", null, toDisplayString(project.title), 1),
                                  createVNode("p", null, toDisplayString(project.summary), 1),
                                  createVNode("div", { class: "tags" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(project.tech_stack, (tech) => {
                                      return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                                    }), 128))
                                  ]),
                                  createVNode("div", { class: "work-gallery-actions" }, [
                                    createVNode("span", null, "Case study ↗"),
                                    project.live_url ? (openBlock(), createBlock("em", { key: 0 }, toDisplayString(/flutter|mobile/i.test(project.category || "") ? "App store" : "Live project"), 1)) : createCommentVNode("", true)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1032, ["href"])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["transition"]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/Work.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
