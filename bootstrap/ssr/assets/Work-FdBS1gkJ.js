import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PortfolioLayout-C4yABIDF.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
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
            _push2(`<div class="inner-page"${_scopeId}><header class="page-hero"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0 },
              animate: { opacity: 1 }
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
              initial: { opacity: 0, y: 35 },
              animate: { opacity: 1, y: 0 }
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
            _push2(`<p${_scopeId}>From commerce operations to infrastructure dashboards—every system starts with a real constraint and ends with measurable clarity.</p></header><section class="work-index"${_scopeId}><!--[-->`);
            ssrRenderList(__props.projects, (project, index) => {
              _push2(ssrRenderComponent(unref(motion).article, {
                key: project.id,
                class: "work-row",
                initial: { opacity: 1, y: 35 },
                "while-in-view": { opacity: 1, y: 0 },
                "while-hover": { x: 8 },
                viewport: { once: true, amount: 0.2 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/work/${project.slug}`
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span class="work-number"${_scopeId3}>0${ssrInterpolate(index + 1)}</span><div${_scopeId3}><small${_scopeId3}>${ssrInterpolate(project.category)}`);
                          if (project.company) {
                            _push4(`<!--[--> · ${ssrInterpolate(project.company)}<!--]-->`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</small><h2${_scopeId3}>${ssrInterpolate(project.title)}</h2><p${_scopeId3}>${ssrInterpolate(project.summary)}</p><div class="tags"${_scopeId3}><!--[-->`);
                          ssrRenderList(project.tech_stack, (tech) => {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(tech)}</span>`);
                          });
                          _push4(`<!--]--></div></div><span class="work-arrow"${_scopeId3}>↗</span>`);
                        } else {
                          return [
                            createVNode("span", { class: "work-number" }, "0" + toDisplayString(index + 1), 1),
                            createVNode("div", null, [
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
                              ])
                            ]),
                            createVNode("span", { class: "work-arrow" }, "↗")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Link), {
                        href: `/work/${project.slug}`
                      }, {
                        default: withCtx(() => [
                          createVNode("span", { class: "work-number" }, "0" + toDisplayString(index + 1), 1),
                          createVNode("div", null, [
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
                            ])
                          ]),
                          createVNode("span", { class: "work-arrow" }, "↗")
                        ]),
                        _: 2
                      }, 1032, ["href"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section></div>`);
          } else {
            return [
              createVNode("div", { class: "inner-page" }, [
                createVNode("header", { class: "page-hero" }, [
                  createVNode(unref(motion).span, {
                    class: "section-kicker",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("03 / Selected work")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(motion).h1, {
                    initial: { opacity: 0, y: 35 },
                    animate: { opacity: 1, y: 0 }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Products built to perform "),
                      createVNode("em", null, "under pressure.")
                    ]),
                    _: 1
                  }),
                  createVNode("p", null, "From commerce operations to infrastructure dashboards—every system starts with a real constraint and ends with measurable clarity.")
                ]),
                createVNode("section", { class: "work-index" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.projects, (project, index) => {
                    return openBlock(), createBlock(unref(motion).article, {
                      key: project.id,
                      class: "work-row",
                      initial: { opacity: 1, y: 35 },
                      "while-in-view": { opacity: 1, y: 0 },
                      "while-hover": { x: 8 },
                      viewport: { once: true, amount: 0.2 }
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Link), {
                          href: `/work/${project.slug}`
                        }, {
                          default: withCtx(() => [
                            createVNode("span", { class: "work-number" }, "0" + toDisplayString(index + 1), 1),
                            createVNode("div", null, [
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
                              ])
                            ]),
                            createVNode("span", { class: "work-arrow" }, "↗")
                          ]),
                          _: 2
                        }, 1032, ["href"])
                      ]),
                      _: 2
                    }, 1024);
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
