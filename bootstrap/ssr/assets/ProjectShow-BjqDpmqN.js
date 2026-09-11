import { unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./PortfolioLayout-C4yABIDF.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
const _sfc_main = {
  __name: "ProjectShow",
  __ssrInlineRender: true,
  props: { profile: Object, project: Object, nextProject: Object },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>${ssrInterpolate(__props.project.title)} — Ibrahim Nawab</title><meta head-key="description" name="description"${ssrRenderAttr("content", __props.project.summary)}${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, toDisplayString(__props.project.title) + " — Ibrahim Nawab", 1),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: __props.project.summary
              }, null, 8, ["content"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { profile: __props.profile }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<article class="case-study"${_scopeId}><header class="case-hero"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/work",
              class: "back-link"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`← All selected work`);
                } else {
                  return [
                    createTextVNode("← All selected work")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 0, y: 35 },
              animate: { opacity: 1, y: 0 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-kicker"${_scopeId2}>${ssrInterpolate(__props.project.category)}`);
                  if (__props.project.company) {
                    _push3(`<!--[--> · Associated with ${ssrInterpolate(__props.project.company)}<!--]-->`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</span><h1${_scopeId2}>${ssrInterpolate(__props.project.title)}</h1><p${_scopeId2}>${ssrInterpolate(__props.project.summary)}</p>`);
                } else {
                  return [
                    createVNode("span", { class: "section-kicker" }, [
                      createTextVNode(toDisplayString(__props.project.category), 1),
                      __props.project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(" · Associated with " + toDisplayString(__props.project.company), 1)
                      ], 64)) : createCommentVNode("", true)
                    ]),
                    createVNode("h1", null, toDisplayString(__props.project.title), 1),
                    createVNode("p", null, toDisplayString(__props.project.summary), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="case-meta"${_scopeId}><div${_scopeId}><small${_scopeId}>Association</small><span${_scopeId}>${ssrInterpolate(__props.project.company || "Independent project")}</span></div><div${_scopeId}><small${_scopeId}>System</small><span${_scopeId}>${ssrInterpolate(__props.project.category)}</span></div><div${_scopeId}><small${_scopeId}>Stack</small><span${_scopeId}>${ssrInterpolate(__props.project.tech_stack.slice(0, 3).join(" · "))}</span></div></div></header>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              class: "case-visual",
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.8 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.project.image_path) {
                    _push3(`<img${ssrRenderAttr("src", __props.project.image_path)}${ssrRenderAttr("alt", __props.project.title)}${_scopeId2}>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span${_scopeId2}>${ssrInterpolate(__props.project.title)}</span><i${_scopeId2}>LIVE SYSTEM / 0${ssrInterpolate(__props.project.order)}</i>`);
                } else {
                  return [
                    __props.project.image_path ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.project.image_path,
                      alt: __props.project.title
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(__props.project.title), 1),
                    createVNode("i", null, "LIVE SYSTEM / 0" + toDisplayString(__props.project.order), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<section class="case-content"${_scopeId}><div${_scopeId}><span class="section-kicker"${_scopeId}>The brief</span><h2${_scopeId}>Turning operational complexity into one dependable system.</h2></div><div${_scopeId}><p${_scopeId}>${ssrInterpolate(__props.project.description)}</p><h3${_scopeId}>Technology</h3><div class="tags large"${_scopeId}><!--[-->`);
            ssrRenderList(__props.project.tech_stack, (tech) => {
              _push2(`<span${_scopeId}>${ssrInterpolate(tech)}</span>`);
            });
            _push2(`<!--]--></div><div class="case-actions"${_scopeId}>`);
            if (__props.project.live_url) {
              _push2(`<a${ssrRenderAttr("href", __props.project.live_url)} target="_blank" rel="noreferrer" class="pill"${_scopeId}>Visit live project ↗</a>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.repo_url) {
              _push2(`<a${ssrRenderAttr("href", __props.project.repo_url)} target="_blank" rel="noreferrer" class="pill alt"${_scopeId}>View repository ↗</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></section>`);
            if (__props.nextProject && __props.nextProject.id !== __props.project.id) {
              _push2(ssrRenderComponent(unref(Link), {
                href: `/work/${__props.nextProject.slug}`,
                class: "next-project"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Next case study</span><h2${_scopeId2}>${ssrInterpolate(__props.nextProject.title)}</h2><b${_scopeId2}>↗</b>`);
                  } else {
                    return [
                      createVNode("span", null, "Next case study"),
                      createVNode("h2", null, toDisplayString(__props.nextProject.title), 1),
                      createVNode("b", null, "↗")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Link), {
                href: "/contact",
                class: "next-project"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span${_scopeId2}>Start something new</span><h2${_scopeId2}>Let’s build the next system.</h2><b${_scopeId2}>↗</b>`);
                  } else {
                    return [
                      createVNode("span", null, "Start something new"),
                      createVNode("h2", null, "Let’s build the next system."),
                      createVNode("b", null, "↗")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</article>`);
          } else {
            return [
              createVNode("article", { class: "case-study" }, [
                createVNode("header", { class: "case-hero" }, [
                  createVNode(unref(Link), {
                    href: "/work",
                    class: "back-link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("← All selected work")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(motion).div, {
                    initial: { opacity: 0, y: 35 },
                    animate: { opacity: 1, y: 0 }
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "section-kicker" }, [
                        createTextVNode(toDisplayString(__props.project.category), 1),
                        __props.project.company ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createTextVNode(" · Associated with " + toDisplayString(__props.project.company), 1)
                        ], 64)) : createCommentVNode("", true)
                      ]),
                      createVNode("h1", null, toDisplayString(__props.project.title), 1),
                      createVNode("p", null, toDisplayString(__props.project.summary), 1)
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "case-meta" }, [
                    createVNode("div", null, [
                      createVNode("small", null, "Association"),
                      createVNode("span", null, toDisplayString(__props.project.company || "Independent project"), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("small", null, "System"),
                      createVNode("span", null, toDisplayString(__props.project.category), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("small", null, "Stack"),
                      createVNode("span", null, toDisplayString(__props.project.tech_stack.slice(0, 3).join(" · ")), 1)
                    ])
                  ])
                ]),
                createVNode(unref(motion).div, {
                  class: "case-visual",
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.8 }
                }, {
                  default: withCtx(() => [
                    __props.project.image_path ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.project.image_path,
                      alt: __props.project.title
                    }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(__props.project.title), 1),
                    createVNode("i", null, "LIVE SYSTEM / 0" + toDisplayString(__props.project.order), 1)
                  ]),
                  _: 1
                }),
                createVNode("section", { class: "case-content" }, [
                  createVNode("div", null, [
                    createVNode("span", { class: "section-kicker" }, "The brief"),
                    createVNode("h2", null, "Turning operational complexity into one dependable system.")
                  ]),
                  createVNode("div", null, [
                    createVNode("p", null, toDisplayString(__props.project.description), 1),
                    createVNode("h3", null, "Technology"),
                    createVNode("div", { class: "tags large" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(__props.project.tech_stack, (tech) => {
                        return openBlock(), createBlock("span", { key: tech }, toDisplayString(tech), 1);
                      }), 128))
                    ]),
                    createVNode("div", { class: "case-actions" }, [
                      __props.project.live_url ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: __props.project.live_url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "pill"
                      }, "Visit live project ↗", 8, ["href"])) : createCommentVNode("", true),
                      __props.project.repo_url ? (openBlock(), createBlock("a", {
                        key: 1,
                        href: __props.project.repo_url,
                        target: "_blank",
                        rel: "noreferrer",
                        class: "pill alt"
                      }, "View repository ↗", 8, ["href"])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                __props.nextProject && __props.nextProject.id !== __props.project.id ? (openBlock(), createBlock(unref(Link), {
                  key: 0,
                  href: `/work/${__props.nextProject.slug}`,
                  class: "next-project"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Next case study"),
                    createVNode("h2", null, toDisplayString(__props.nextProject.title), 1),
                    createVNode("b", null, "↗")
                  ]),
                  _: 1
                }, 8, ["href"])) : (openBlock(), createBlock(unref(Link), {
                  key: 1,
                  href: "/contact",
                  class: "next-project"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, "Start something new"),
                    createVNode("h2", null, "Let’s build the next system."),
                    createVNode("b", null, "↗")
                  ]),
                  _: 1
                }))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/ProjectShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
