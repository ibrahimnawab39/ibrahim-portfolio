import { computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./PageAtmosphere-tZ9iTIjN.js";
import { _ as _sfc_main$3 } from "./AmbientScene-CdqcK6xN.js";
import { _ as _sfc_main$4 } from "./ProjectCover-D_pFmt3q.js";
import { _ as _sfc_main$5 } from "./Reveal-COkcuhhh.js";
import { Head, Link } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProjectShow",
  __ssrInlineRender: true,
  props: { profile: Object, project: Object, nextProject: Object },
  setup(__props) {
    const props = __props;
    const gallery = computed(() => props.project.gallery?.length ? props.project.gallery : props.project.image_path ? [props.project.image_path] : []);
    const isMobile = computed(() => props.project.is_mobile || /flutter|mobile/i.test(props.project.category || ""));
    const liveLabel = computed(() => isMobile.value ? "View on Google Play ↗" : "Visit live project ↗");
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
            _push2(`<article class="case-study has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              tone: "work",
              mode: "dots"
            }, null, _parent2, _scopeId));
            _push2(`<header class="case-hero"${_scopeId}>`);
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
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.65 }
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
            _push2(`<div class="case-meta"${_scopeId}><div${_scopeId}><small${_scopeId}>Association</small><span${_scopeId}>${ssrInterpolate(__props.project.company || "Independent project")}</span></div><div${_scopeId}><small${_scopeId}>System</small><span${_scopeId}>${ssrInterpolate(__props.project.category)}</span></div><div${_scopeId}><small${_scopeId}>Stack</small><span${_scopeId}>${ssrInterpolate((__props.project.tech_stack ?? []).slice(0, 3).join(" · "))}</span></div></div><div class="case-actions case-actions-top"${_scopeId}>`);
            if (__props.project.live_url) {
              _push2(`<a${ssrRenderAttr("href", __props.project.live_url)} target="_blank" rel="noreferrer" class="pill"${_scopeId}>${ssrInterpolate(liveLabel.value)}</a>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.project.repo_url) {
              _push2(`<a${ssrRenderAttr("href", __props.project.repo_url)} target="_blank" rel="noreferrer" class="pill alt"${_scopeId}>View repository ↗</a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></header><div class="case-ambient-band" aria-hidden="true"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              tone: "work",
              variant: "dots"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (gallery.value.length) {
              _push2(ssrRenderComponent(unref(motion).div, {
                class: ["case-visual", isMobile.value ? "case-visual-mobile" : "case-visual-web has-shot"],
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (isMobile.value) {
                      _push3(`<div class="phone-showcase"${_scopeId2}><!--[-->`);
                      ssrRenderList(gallery.value.slice(0, 4), (shot, index) => {
                        _push3(`<figure class="phone-frame case-phone"${_scopeId2}><span class="phone-notch"${_scopeId2}></span><img${ssrRenderAttr("src", shot)}${ssrRenderAttr("alt", `${__props.project.title} screen ${index + 1}`)} loading="lazy"${_scopeId2}></figure>`);
                      });
                      _push3(`<!--]--></div>`);
                    } else {
                      _push3(`<img${ssrRenderAttr("src", gallery.value[0])}${ssrRenderAttr("alt", `${__props.project.title} screenshot`)}${_scopeId2}>`);
                    }
                    _push3(`<i${_scopeId2}>${ssrInterpolate(__props.project.live_url ? "LIVE PRODUCT" : "CASE STUDY")} / ${ssrInterpolate(String(__props.project.order ?? 0).padStart(2, "0"))}</i>`);
                  } else {
                    return [
                      isMobile.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "phone-showcase"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(gallery.value.slice(0, 4), (shot, index) => {
                          return openBlock(), createBlock("figure", {
                            key: shot,
                            class: "phone-frame case-phone"
                          }, [
                            createVNode("span", { class: "phone-notch" }),
                            createVNode("img", {
                              src: shot,
                              alt: `${__props.project.title} screen ${index + 1}`,
                              loading: "lazy"
                            }, null, 8, ["src", "alt"])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("img", {
                        key: 1,
                        src: gallery.value[0],
                        alt: `${__props.project.title} screenshot`
                      }, null, 8, ["src", "alt"])),
                      createVNode("i", null, toDisplayString(__props.project.live_url ? "LIVE PRODUCT" : "CASE STUDY") + " / " + toDisplayString(String(__props.project.order ?? 0).padStart(2, "0")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(motion).div, {
                class: "case-visual",
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8 }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$4, {
                      project: __props.project,
                      index: __props.project.order || 0
                    }, null, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>${ssrInterpolate(__props.project.title)}</span><i${_scopeId2}>CASE STUDY / ${ssrInterpolate(String(__props.project.order ?? 0).padStart(2, "0"))}</i>`);
                  } else {
                    return [
                      createVNode(_sfc_main$4, {
                        project: __props.project,
                        index: __props.project.order || 0
                      }, null, 8, ["project", "index"]),
                      createVNode("span", null, toDisplayString(__props.project.title), 1),
                      createVNode("i", null, "CASE STUDY / " + toDisplayString(String(__props.project.order ?? 0).padStart(2, "0")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            if (gallery.value.length > 1 && !isMobile.value) {
              _push2(ssrRenderComponent(_sfc_main$5, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<section class="case-gallery"${_scopeId2}><!--[-->`);
                    ssrRenderList(gallery.value.slice(1), (shot, index) => {
                      _push3(`<img${ssrRenderAttr("src", shot)}${ssrRenderAttr("alt", `${__props.project.title} detail ${index + 2}`)} loading="lazy"${_scopeId2}>`);
                    });
                    _push3(`<!--]--></section>`);
                  } else {
                    return [
                      createVNode("section", { class: "case-gallery" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(gallery.value.slice(1), (shot, index) => {
                          return openBlock(), createBlock("img", {
                            key: shot,
                            src: shot,
                            alt: `${__props.project.title} detail ${index + 2}`,
                            loading: "lazy"
                          }, null, 8, ["src", "alt"]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$5, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<section class="case-content"${_scopeId2}><div${_scopeId2}><span class="section-kicker"${_scopeId2}>The brief</span><h2${_scopeId2}>Turning operational complexity into one dependable system.</h2></div><div${_scopeId2}><p${_scopeId2}>${ssrInterpolate(__props.project.description)}</p><h3${_scopeId2}>Technology</h3><div class="tags large"${_scopeId2}><!--[-->`);
                  ssrRenderList(__props.project.tech_stack, (tech) => {
                    _push3(`<span${_scopeId2}>${ssrInterpolate(tech)}</span>`);
                  });
                  _push3(`<!--]--></div><div class="case-actions"${_scopeId2}>`);
                  if (__props.project.live_url) {
                    _push3(`<a${ssrRenderAttr("href", __props.project.live_url)} target="_blank" rel="noreferrer" class="pill"${_scopeId2}>${ssrInterpolate(liveLabel.value)}</a>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (__props.project.repo_url) {
                    _push3(`<a${ssrRenderAttr("href", __props.project.repo_url)} target="_blank" rel="noreferrer" class="pill alt"${_scopeId2}>View repository ↗</a>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div></section>`);
                } else {
                  return [
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
                          }, toDisplayString(liveLabel.value), 9, ["href"])) : createCommentVNode("", true),
                          __props.project.repo_url ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: __props.project.repo_url,
                            target: "_blank",
                            rel: "noreferrer",
                            class: "pill alt"
                          }, "View repository ↗", 8, ["href"])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, { delay: 0.05 }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (__props.nextProject && __props.nextProject.id !== __props.project.id) {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: `/work/${__props.nextProject.slug}`,
                      class: "next-project"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Next case study</span><h2${_scopeId3}>${ssrInterpolate(__props.nextProject.title)}</h2><b${_scopeId3}>↗</b>`);
                        } else {
                          return [
                            createVNode("span", null, "Next case study"),
                            createVNode("h2", null, toDisplayString(__props.nextProject.title), 1),
                            createVNode("b", null, "↗")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(Link), {
                      href: "/contact",
                      class: "next-project"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<span${_scopeId3}>Start something new</span><h2${_scopeId3}>Let’s build the next system.</h2><b${_scopeId3}>↗</b>`);
                        } else {
                          return [
                            createVNode("span", null, "Start something new"),
                            createVNode("h2", null, "Let’s build the next system."),
                            createVNode("b", null, "↗")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                } else {
                  return [
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
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</article>`);
          } else {
            return [
              createVNode("article", { class: "case-study has-atmosphere" }, [
                createVNode(_sfc_main$2, {
                  tone: "work",
                  mode: "dots"
                }),
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
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.65 }
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
                      createVNode("span", null, toDisplayString((__props.project.tech_stack ?? []).slice(0, 3).join(" · ")), 1)
                    ])
                  ]),
                  createVNode("div", { class: "case-actions case-actions-top" }, [
                    __props.project.live_url ? (openBlock(), createBlock("a", {
                      key: 0,
                      href: __props.project.live_url,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "pill"
                    }, toDisplayString(liveLabel.value), 9, ["href"])) : createCommentVNode("", true),
                    __props.project.repo_url ? (openBlock(), createBlock("a", {
                      key: 1,
                      href: __props.project.repo_url,
                      target: "_blank",
                      rel: "noreferrer",
                      class: "pill alt"
                    }, "View repository ↗", 8, ["href"])) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", {
                  class: "case-ambient-band",
                  "aria-hidden": "true"
                }, [
                  createVNode(_sfc_main$3, {
                    tone: "work",
                    variant: "dots"
                  })
                ]),
                gallery.value.length ? (openBlock(), createBlock(unref(motion).div, {
                  key: 0,
                  class: ["case-visual", isMobile.value ? "case-visual-mobile" : "case-visual-web has-shot"],
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.8 }
                }, {
                  default: withCtx(() => [
                    isMobile.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "phone-showcase"
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(gallery.value.slice(0, 4), (shot, index) => {
                        return openBlock(), createBlock("figure", {
                          key: shot,
                          class: "phone-frame case-phone"
                        }, [
                          createVNode("span", { class: "phone-notch" }),
                          createVNode("img", {
                            src: shot,
                            alt: `${__props.project.title} screen ${index + 1}`,
                            loading: "lazy"
                          }, null, 8, ["src", "alt"])
                        ]);
                      }), 128))
                    ])) : (openBlock(), createBlock("img", {
                      key: 1,
                      src: gallery.value[0],
                      alt: `${__props.project.title} screenshot`
                    }, null, 8, ["src", "alt"])),
                    createVNode("i", null, toDisplayString(__props.project.live_url ? "LIVE PRODUCT" : "CASE STUDY") + " / " + toDisplayString(String(__props.project.order ?? 0).padStart(2, "0")), 1)
                  ]),
                  _: 1
                }, 8, ["class"])) : (openBlock(), createBlock(unref(motion).div, {
                  key: 1,
                  class: "case-visual",
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.8 }
                }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$4, {
                      project: __props.project,
                      index: __props.project.order || 0
                    }, null, 8, ["project", "index"]),
                    createVNode("span", null, toDisplayString(__props.project.title), 1),
                    createVNode("i", null, "CASE STUDY / " + toDisplayString(String(__props.project.order ?? 0).padStart(2, "0")), 1)
                  ]),
                  _: 1
                })),
                gallery.value.length > 1 && !isMobile.value ? (openBlock(), createBlock(_sfc_main$5, { key: 2 }, {
                  default: withCtx(() => [
                    createVNode("section", { class: "case-gallery" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(gallery.value.slice(1), (shot, index) => {
                        return openBlock(), createBlock("img", {
                          key: shot,
                          src: shot,
                          alt: `${__props.project.title} detail ${index + 2}`,
                          loading: "lazy"
                        }, null, 8, ["src", "alt"]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_sfc_main$5, null, {
                  default: withCtx(() => [
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
                          }, toDisplayString(liveLabel.value), 9, ["href"])) : createCommentVNode("", true),
                          __props.project.repo_url ? (openBlock(), createBlock("a", {
                            key: 1,
                            href: __props.project.repo_url,
                            target: "_blank",
                            rel: "noreferrer",
                            class: "pill alt"
                          }, "View repository ↗", 8, ["href"])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$5, { delay: 0.05 }, {
                  default: withCtx(() => [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/ProjectShow.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
