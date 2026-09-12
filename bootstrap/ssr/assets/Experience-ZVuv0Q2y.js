import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./PageAtmosphere-B4p25rd1.js";
import { _ as _sfc_main$5 } from "./CompanyLogo-DBsmU8oY.js";
import { _ as _sfc_main$4 } from "./TiltCard-BCpF3Iif.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Experience",
  __ssrInlineRender: true,
  props: { profile: Object, experiences: Array },
  setup(__props) {
    const date = (value, empty = "Present") => value ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value)) : empty;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Experience — Ibrahim Nawab</title><meta head-key="description" name="description" content="Professional experience, roles and engineering background of Ibrahim Nawab."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Experience — Ibrahim Nawab"),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: "Professional experience, roles and engineering background of Ibrahim Nawab."
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
              tone: "experience",
              mode: "mist"
            }, null, _parent2, _scopeId));
            _push2(`<header class="page-hero page-hero-split"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`02 / Experience`);
                } else {
                  return [
                    createTextVNode("02 / Experience")
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
                  _push3(`Experience earned by solving <em${_scopeId2}>real operational problems.</em>`);
                } else {
                  return [
                    createTextVNode("Experience earned by solving "),
                    createVNode("em", null, "real operational problems.")
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
                  _push3(` A career spanning software products, operational systems and the teams who ship them — from Karachi studios to remote product companies and freelance platforms. `);
                } else {
                  return [
                    createTextVNode(" A career spanning software products, operational systems and the teams who ship them — from Karachi studios to remote product companies and freelance platforms. ")
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
                    tone: "experience",
                    variant: "orbit"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3, {
                      tone: "experience",
                      variant: "orbit"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</header><section class="experience-ledger experience-timeline"${_scopeId}><div class="timeline-rail" aria-hidden="true"${_scopeId}></div><!--[-->`);
            ssrRenderList(__props.experiences, (item, index) => {
              _push2(ssrRenderComponent(_sfc_main$4, {
                key: item.id,
                max: 7,
                class: "experience-tilt"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(motion).article, {
                      class: "experience-card",
                      initial: { opacity: 0, y: 28 },
                      "while-in-view": { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.2 },
                      transition: { duration: 0.45, delay: Math.min(index * 0.04, 0.24) }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="ledger-brand"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_sfc_main$5, {
                            src: item.logo_path,
                            name: item.company,
                            size: "lg"
                          }, null, _parent4, _scopeId3));
                          _push4(`<span class="ledger-number"${_scopeId3}>${ssrInterpolate(String(index + 1).padStart(2, "0"))}</span></div><div class="ledger-date"${_scopeId3}><b${_scopeId3}>${ssrInterpolate(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates on request")}</b>`);
                          if (!item.end_date) {
                            _push4(`<em${_scopeId3}>Present</em>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div><div class="ledger-copy"${_scopeId3}><small${_scopeId3}>`);
                          if (item.company_url) {
                            _push4(`<a${ssrRenderAttr("href", item.company_url)} target="_blank" rel="noreferrer"${_scopeId3}>${ssrInterpolate(item.company)}</a>`);
                          } else {
                            _push4(`<!--[-->${ssrInterpolate(item.company)}<!--]-->`);
                          }
                          if (item.employment_type) {
                            _push4(`<!--[--> · ${ssrInterpolate(item.employment_type)}<!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                          if (item.work_mode) {
                            _push4(`<!--[--> · ${ssrInterpolate(item.work_mode)}<!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(` · ${ssrInterpolate(item.location)}</small><h2${_scopeId3}>${ssrInterpolate(item.role)}</h2><p${_scopeId3}>${ssrInterpolate(item.description)}</p></div>`);
                        } else {
                          return [
                            createVNode("div", { class: "ledger-brand" }, [
                              createVNode(_sfc_main$5, {
                                src: item.logo_path,
                                name: item.company,
                                size: "lg"
                              }, null, 8, ["src", "name"]),
                              createVNode("span", { class: "ledger-number" }, toDisplayString(String(index + 1).padStart(2, "0")), 1)
                            ]),
                            createVNode("div", { class: "ledger-date" }, [
                              createVNode("b", null, toDisplayString(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates on request"), 1),
                              !item.end_date ? (openBlock(), createBlock("em", { key: 0 }, "Present")) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "ledger-copy" }, [
                              createVNode("small", null, [
                                item.company_url ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: item.company_url,
                                  target: "_blank",
                                  rel: "noreferrer"
                                }, toDisplayString(item.company), 9, ["href"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(toDisplayString(item.company), 1)
                                ], 64)),
                                item.employment_type ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                                  createTextVNode(" · " + toDisplayString(item.employment_type), 1)
                                ], 64)) : createCommentVNode("", true),
                                item.work_mode ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                  createTextVNode(" · " + toDisplayString(item.work_mode), 1)
                                ], 64)) : createCommentVNode("", true),
                                createTextVNode(" · " + toDisplayString(item.location), 1)
                              ]),
                              createVNode("h2", null, toDisplayString(item.role), 1),
                              createVNode("p", null, toDisplayString(item.description), 1)
                            ])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(motion).article, {
                        class: "experience-card",
                        initial: { opacity: 0, y: 28 },
                        "while-in-view": { opacity: 1, y: 0 },
                        viewport: { once: true, amount: 0.2 },
                        transition: { duration: 0.45, delay: Math.min(index * 0.04, 0.24) }
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "ledger-brand" }, [
                            createVNode(_sfc_main$5, {
                              src: item.logo_path,
                              name: item.company,
                              size: "lg"
                            }, null, 8, ["src", "name"]),
                            createVNode("span", { class: "ledger-number" }, toDisplayString(String(index + 1).padStart(2, "0")), 1)
                          ]),
                          createVNode("div", { class: "ledger-date" }, [
                            createVNode("b", null, toDisplayString(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates on request"), 1),
                            !item.end_date ? (openBlock(), createBlock("em", { key: 0 }, "Present")) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "ledger-copy" }, [
                            createVNode("small", null, [
                              item.company_url ? (openBlock(), createBlock("a", {
                                key: 0,
                                href: item.company_url,
                                target: "_blank",
                                rel: "noreferrer"
                              }, toDisplayString(item.company), 9, ["href"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                createTextVNode(toDisplayString(item.company), 1)
                              ], 64)),
                              item.employment_type ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                                createTextVNode(" · " + toDisplayString(item.employment_type), 1)
                              ], 64)) : createCommentVNode("", true),
                              item.work_mode ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                createTextVNode(" · " + toDisplayString(item.work_mode), 1)
                              ], 64)) : createCommentVNode("", true),
                              createTextVNode(" · " + toDisplayString(item.location), 1)
                            ]),
                            createVNode("h2", null, toDisplayString(item.role), 1),
                            createVNode("p", null, toDisplayString(item.description), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["transition"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section>`);
            _push2(ssrRenderComponent(unref(motion).section, {
              class: "page-cta page-cta-split",
              initial: { opacity: 0, y: 24 },
              "while-in-view": { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.35 },
              transition: { duration: 0.55 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="page-cta-copy"${_scopeId2}><span${_scopeId2}>Selected output</span><h2${_scopeId2}>Now see how the experience becomes product.</h2>`);
                  _push3(ssrRenderComponent(unref(Link), {
                    href: "/work",
                    class: "pill"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Explore selected work ↗`);
                      } else {
                        return [
                          createTextVNode("Explore selected work ↗")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(motion).div, {
                    class: "cta-scene",
                    "aria-hidden": "true",
                    initial: { opacity: 0, scale: 0.92 },
                    "while-in-view": { opacity: 1, scale: 1 },
                    viewport: { once: true },
                    transition: { duration: 0.7, delay: 0.1 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          tone: "experience",
                          variant: "orbit"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            tone: "experience",
                            variant: "orbit"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "page-cta-copy" }, [
                      createVNode("span", null, "Selected output"),
                      createVNode("h2", null, "Now see how the experience becomes product."),
                      createVNode(unref(Link), {
                        href: "/work",
                        class: "pill"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Explore selected work ↗")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(motion).div, {
                      class: "cta-scene",
                      "aria-hidden": "true",
                      initial: { opacity: 0, scale: 0.92 },
                      "while-in-view": { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.7, delay: 0.1 }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          tone: "experience",
                          variant: "orbit"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "inner-page has-atmosphere" }, [
                createVNode(_sfc_main$2, {
                  tone: "experience",
                  mode: "mist"
                }),
                createVNode("header", { class: "page-hero page-hero-split" }, [
                  createVNode("div", null, [
                    createVNode(unref(motion).span, {
                      class: "section-kicker",
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("02 / Experience")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).h1, {
                      initial: { opacity: 0, y: 40 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.7 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Experience earned by solving "),
                        createVNode("em", null, "real operational problems.")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(motion).p, {
                      initial: { opacity: 0, y: 18 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.1 }
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" A career spanning software products, operational systems and the teams who ship them — from Karachi studios to remote product companies and freelance platforms. ")
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
                        tone: "experience",
                        variant: "orbit"
                      })
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", { class: "experience-ledger experience-timeline" }, [
                  createVNode("div", {
                    class: "timeline-rail",
                    "aria-hidden": "true"
                  }),
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.experiences, (item, index) => {
                    return openBlock(), createBlock(_sfc_main$4, {
                      key: item.id,
                      max: 7,
                      class: "experience-tilt"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(motion).article, {
                          class: "experience-card",
                          initial: { opacity: 0, y: 28 },
                          "while-in-view": { opacity: 1, y: 0 },
                          viewport: { once: true, amount: 0.2 },
                          transition: { duration: 0.45, delay: Math.min(index * 0.04, 0.24) }
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "ledger-brand" }, [
                              createVNode(_sfc_main$5, {
                                src: item.logo_path,
                                name: item.company,
                                size: "lg"
                              }, null, 8, ["src", "name"]),
                              createVNode("span", { class: "ledger-number" }, toDisplayString(String(index + 1).padStart(2, "0")), 1)
                            ]),
                            createVNode("div", { class: "ledger-date" }, [
                              createVNode("b", null, toDisplayString(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates on request"), 1),
                              !item.end_date ? (openBlock(), createBlock("em", { key: 0 }, "Present")) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "ledger-copy" }, [
                              createVNode("small", null, [
                                item.company_url ? (openBlock(), createBlock("a", {
                                  key: 0,
                                  href: item.company_url,
                                  target: "_blank",
                                  rel: "noreferrer"
                                }, toDisplayString(item.company), 9, ["href"])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                                  createTextVNode(toDisplayString(item.company), 1)
                                ], 64)),
                                item.employment_type ? (openBlock(), createBlock(Fragment, { key: 2 }, [
                                  createTextVNode(" · " + toDisplayString(item.employment_type), 1)
                                ], 64)) : createCommentVNode("", true),
                                item.work_mode ? (openBlock(), createBlock(Fragment, { key: 3 }, [
                                  createTextVNode(" · " + toDisplayString(item.work_mode), 1)
                                ], 64)) : createCommentVNode("", true),
                                createTextVNode(" · " + toDisplayString(item.location), 1)
                              ]),
                              createVNode("h2", null, toDisplayString(item.role), 1),
                              createVNode("p", null, toDisplayString(item.description), 1)
                            ])
                          ]),
                          _: 2
                        }, 1032, ["transition"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                createVNode(unref(motion).section, {
                  class: "page-cta page-cta-split",
                  initial: { opacity: 0, y: 24 },
                  "while-in-view": { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.35 },
                  transition: { duration: 0.55 }
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "page-cta-copy" }, [
                      createVNode("span", null, "Selected output"),
                      createVNode("h2", null, "Now see how the experience becomes product."),
                      createVNode(unref(Link), {
                        href: "/work",
                        class: "pill"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Explore selected work ↗")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(motion).div, {
                      class: "cta-scene",
                      "aria-hidden": "true",
                      initial: { opacity: 0, scale: 0.92 },
                      "while-in-view": { opacity: 1, scale: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.7, delay: 0.1 }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          tone: "experience",
                          variant: "orbit"
                        })
                      ]),
                      _: 1
                    })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/Experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
