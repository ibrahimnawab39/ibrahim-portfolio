import { unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PortfolioLayout-C4yABIDF.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
const _sfc_main = {
  __name: "About",
  __ssrInlineRender: true,
  props: { profile: Object, skills: Object, experiences: Array, certificates: Array },
  setup(__props) {
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
            _push2(`<div class="inner-page"${_scopeId}><header class="page-hero about-hero"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(motion).span, {
              class: "section-kicker",
              initial: { opacity: 0 },
              animate: { opacity: 1 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`01 / About Ibrahim`);
                } else {
                  return [
                    createTextVNode("01 / About Ibrahim")
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
                  _push3(`An engineer who thinks in <em${_scopeId2}>complete systems.</em>`);
                } else {
                  return [
                    createTextVNode("An engineer who thinks in "),
                    createVNode("em", null, "complete systems.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</header><section class="about-editorial"${_scopeId}><div class="portrait-panel"${_scopeId}>`);
            if (__props.profile?.photo_path) {
              _push2(`<img${ssrRenderAttr("src", __props.profile.photo_path)}${ssrRenderAttr("alt", __props.profile.name)}${_scopeId}>`);
            } else {
              _push2(`<span${_scopeId}>IN</span>`);
            }
            _push2(`<small${_scopeId}>Karachi · Pakistan</small></div>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 1, y: 30 },
              "while-in-view": { opacity: 1, y: 0 },
              viewport: { once: true }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-kicker"${_scopeId2}>The approach</span><p class="lead-copy"${_scopeId2}>${ssrInterpolate(__props.profile?.bio)}</p><p${_scopeId2}>I work across product thinking, backend architecture, interface engineering and infrastructure—so the result stays coherent from the first interaction to the final deployment.</p><div class="fact-grid"${_scopeId2}><div${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(__props.profile?.years_experience ?? 10)}+</strong><span${_scopeId2}>Years in technology</span></div><div${_scopeId2}><strong${_scopeId2}>${ssrInterpolate(Object.values(__props.skills ?? {}).flat().length)}</strong><span${_scopeId2}>Core capabilities</span></div><div${_scopeId2}><strong${_scopeId2}>Global</strong><span${_scopeId2}>Remote collaboration</span></div></div>`);
                } else {
                  return [
                    createVNode("span", { class: "section-kicker" }, "The approach"),
                    createVNode("p", { class: "lead-copy" }, toDisplayString(__props.profile?.bio), 1),
                    createVNode("p", null, "I work across product thinking, backend architecture, interface engineering and infrastructure—so the result stays coherent from the first interaction to the final deployment."),
                    createVNode("div", { class: "fact-grid" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, toDisplayString(__props.profile?.years_experience ?? 10) + "+", 1),
                        createVNode("span", null, "Years in technology")
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, toDisplayString(Object.values(__props.skills ?? {}).flat().length), 1),
                        createVNode("span", null, "Core capabilities")
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Global"),
                        createVNode("span", null, "Remote collaboration")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section><section class="inner-section"${_scopeId}><span class="section-kicker"${_scopeId}>Capabilities</span><h2${_scopeId}>One partner across the critical layers.</h2><div class="capability-list"${_scopeId}><!--[-->`);
            ssrRenderList(__props.skills, (items, category, index) => {
              _push2(ssrRenderComponent(unref(motion).div, {
                key: category,
                initial: { opacity: 1, y: 20 },
                "while-in-view": { opacity: 1, y: 0 },
                viewport: { once: true }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>0${ssrInterpolate(index + 1)}</span><h3${_scopeId2}>${ssrInterpolate(category)}</h3><p${_scopeId2}>${ssrInterpolate(items.map((item) => item.name).join(" · "))}</p>`);
                  } else {
                    return [
                      createVNode("span", null, "0" + toDisplayString(index + 1), 1),
                      createVNode("h3", null, toDisplayString(category), 1),
                      createVNode("p", null, toDisplayString(items.map((item) => item.name).join(" · ")), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></section><section class="inner-section"${_scopeId}><span class="section-kicker"${_scopeId}>Education &amp; recognition</span><h2${_scopeId}>Certificates that support the craft.</h2><div class="certificate-grid"${_scopeId}><!--[-->`);
            ssrRenderList(__props.certificates, (certificate, index) => {
              _push2(`<article${_scopeId}><span${_scopeId}>0${ssrInterpolate(index + 1)}</span><small${_scopeId}>${ssrInterpolate(certificate.issuer)}</small><h3${_scopeId}>${ssrInterpolate(certificate.title)}</h3><p${_scopeId}>${ssrInterpolate(certificate.description)}</p>`);
              if (certificate.credential_url) {
                _push2(`<a${ssrRenderAttr("href", certificate.credential_url)} target="_blank" rel="noreferrer"${_scopeId}>View credential ↗</a>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</article>`);
            });
            _push2(`<!--]--></div></section><section class="page-cta"${_scopeId}><span${_scopeId}>Next</span><h2${_scopeId}>See the experience behind the work.</h2>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/experience",
              class: "pill"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Explore experience ↗`);
                } else {
                  return [
                    createTextVNode("Explore experience ↗")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section></div>`);
          } else {
            return [
              createVNode("div", { class: "inner-page" }, [
                createVNode("header", { class: "page-hero about-hero" }, [
                  createVNode(unref(motion).span, {
                    class: "section-kicker",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("01 / About Ibrahim")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(motion).h1, {
                    initial: { opacity: 0, y: 35 },
                    animate: { opacity: 1, y: 0 }
                  }, {
                    default: withCtx(() => [
                      createTextVNode("An engineer who thinks in "),
                      createVNode("em", null, "complete systems.")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", { class: "about-editorial" }, [
                  createVNode("div", { class: "portrait-panel" }, [
                    __props.profile?.photo_path ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.profile.photo_path,
                      alt: __props.profile.name
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", { key: 1 }, "IN")),
                    createVNode("small", null, "Karachi · Pakistan")
                  ]),
                  createVNode(unref(motion).div, {
                    initial: { opacity: 1, y: 30 },
                    "while-in-view": { opacity: 1, y: 0 },
                    viewport: { once: true }
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "section-kicker" }, "The approach"),
                      createVNode("p", { class: "lead-copy" }, toDisplayString(__props.profile?.bio), 1),
                      createVNode("p", null, "I work across product thinking, backend architecture, interface engineering and infrastructure—so the result stays coherent from the first interaction to the final deployment."),
                      createVNode("div", { class: "fact-grid" }, [
                        createVNode("div", null, [
                          createVNode("strong", null, toDisplayString(__props.profile?.years_experience ?? 10) + "+", 1),
                          createVNode("span", null, "Years in technology")
                        ]),
                        createVNode("div", null, [
                          createVNode("strong", null, toDisplayString(Object.values(__props.skills ?? {}).flat().length), 1),
                          createVNode("span", null, "Core capabilities")
                        ]),
                        createVNode("div", null, [
                          createVNode("strong", null, "Global"),
                          createVNode("span", null, "Remote collaboration")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("section", { class: "inner-section" }, [
                  createVNode("span", { class: "section-kicker" }, "Capabilities"),
                  createVNode("h2", null, "One partner across the critical layers."),
                  createVNode("div", { class: "capability-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.skills, (items, category, index) => {
                      return openBlock(), createBlock(unref(motion).div, {
                        key: category,
                        initial: { opacity: 1, y: 20 },
                        "while-in-view": { opacity: 1, y: 0 },
                        viewport: { once: true }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "0" + toDisplayString(index + 1), 1),
                          createVNode("h3", null, toDisplayString(category), 1),
                          createVNode("p", null, toDisplayString(items.map((item) => item.name).join(" · ")), 1)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ]),
                createVNode("section", { class: "inner-section" }, [
                  createVNode("span", { class: "section-kicker" }, "Education & recognition"),
                  createVNode("h2", null, "Certificates that support the craft."),
                  createVNode("div", { class: "certificate-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.certificates, (certificate, index) => {
                      return openBlock(), createBlock("article", {
                        key: certificate.id
                      }, [
                        createVNode("span", null, "0" + toDisplayString(index + 1), 1),
                        createVNode("small", null, toDisplayString(certificate.issuer), 1),
                        createVNode("h3", null, toDisplayString(certificate.title), 1),
                        createVNode("p", null, toDisplayString(certificate.description), 1),
                        certificate.credential_url ? (openBlock(), createBlock("a", {
                          key: 0,
                          href: certificate.credential_url,
                          target: "_blank",
                          rel: "noreferrer"
                        }, "View credential ↗", 8, ["href"])) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ])
                ]),
                createVNode("section", { class: "page-cta" }, [
                  createVNode("span", null, "Next"),
                  createVNode("h2", null, "See the experience behind the work."),
                  createVNode(unref(Link), {
                    href: "/experience",
                    class: "pill"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Explore experience ↗")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/About.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
