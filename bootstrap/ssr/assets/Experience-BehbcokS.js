import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PortfolioLayout-C4yABIDF.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
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
            _push2(`<div class="inner-page"${_scopeId}><header class="page-hero"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0 },
              animate: { opacity: 1 }
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
              initial: { opacity: 0, y: 35 },
              animate: { opacity: 1, y: 0 }
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
            _push2(`<p${_scopeId}>A career spanning software products, operational systems, infrastructure and the people who rely on them every day.</p></header><section class="experience-ledger"${_scopeId}><!--[-->`);
            ssrRenderList(__props.experiences, (item, index) => {
              _push2(ssrRenderComponent(unref(motion).article, {
                key: item.id,
                initial: { opacity: 1, x: 35 },
                "while-in-view": { opacity: 1, x: 0 },
                viewport: { once: true, amount: 0.25 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="ledger-number"${_scopeId2}>0${ssrInterpolate(index + 1)}</span><div class="ledger-date"${_scopeId2}>${ssrInterpolate(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates available on request")}</div><div class="ledger-copy"${_scopeId2}><small${_scopeId2}>${ssrInterpolate(item.company)}`);
                    if (item.employment_type) {
                      _push3(`<!--[--> · ${ssrInterpolate(item.employment_type)}<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    if (item.work_mode) {
                      _push3(`<!--[--> · ${ssrInterpolate(item.work_mode)}<!--]-->`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(` · ${ssrInterpolate(item.location)}</small><h2${_scopeId2}>${ssrInterpolate(item.role)}</h2><p${_scopeId2}>${ssrInterpolate(item.description)}</p></div>`);
                  } else {
                    return [
                      createVNode("span", { class: "ledger-number" }, "0" + toDisplayString(index + 1), 1),
                      createVNode("div", { class: "ledger-date" }, toDisplayString(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates available on request"), 1),
                      createVNode("div", { class: "ledger-copy" }, [
                        createVNode("small", null, [
                          createTextVNode(toDisplayString(item.company), 1),
                          item.employment_type ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode(" · " + toDisplayString(item.employment_type), 1)
                          ], 64)) : createCommentVNode("", true),
                          item.work_mode ? (openBlock(), createBlock(Fragment, { key: 1 }, [
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
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></section><section class="page-cta"${_scopeId}><span${_scopeId}>Selected output</span><h2${_scopeId}>Now see how the experience becomes product.</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/work",
              class: "pill"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Explore selected work ↗`);
                } else {
                  return [
                    createTextVNode("Explore selected work ↗")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section></div>`);
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
                      createTextVNode("02 / Experience")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(motion).h1, {
                    initial: { opacity: 0, y: 35 },
                    animate: { opacity: 1, y: 0 }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Experience earned by solving "),
                      createVNode("em", null, "real operational problems.")
                    ]),
                    _: 1
                  }),
                  createVNode("p", null, "A career spanning software products, operational systems, infrastructure and the people who rely on them every day.")
                ]),
                createVNode("section", { class: "experience-ledger" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.experiences, (item, index) => {
                    return openBlock(), createBlock(unref(motion).article, {
                      key: item.id,
                      initial: { opacity: 1, x: 35 },
                      "while-in-view": { opacity: 1, x: 0 },
                      viewport: { once: true, amount: 0.25 }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "ledger-number" }, "0" + toDisplayString(index + 1), 1),
                        createVNode("div", { class: "ledger-date" }, toDisplayString(item.start_date ? `${date(item.start_date)} — ${date(item.end_date)}` : "Dates available on request"), 1),
                        createVNode("div", { class: "ledger-copy" }, [
                          createVNode("small", null, [
                            createTextVNode(toDisplayString(item.company), 1),
                            item.employment_type ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" · " + toDisplayString(item.employment_type), 1)
                            ], 64)) : createCommentVNode("", true),
                            item.work_mode ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" · " + toDisplayString(item.work_mode), 1)
                            ], 64)) : createCommentVNode("", true),
                            createTextVNode(" · " + toDisplayString(item.location), 1)
                          ]),
                          createVNode("h2", null, toDisplayString(item.role), 1),
                          createVNode("p", null, toDisplayString(item.description), 1)
                        ])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                createVNode("section", { class: "page-cta" }, [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/Experience.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
