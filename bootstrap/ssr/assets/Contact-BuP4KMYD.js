import { computed, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, vModelSelect, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3 } from "./PageAtmosphere-B4p25rd1.js";
import { usePage, useForm, Head } from "@inertiajs/vue3";
import { motion } from "motion-v";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Contact",
  __ssrInlineRender: true,
  props: { profile: Object },
  setup(__props) {
    const page = usePage();
    const success = computed(() => page.props.flash?.success);
    const form = useForm({ name: "", email: "", company: "", budget: "", message: "" });
    const submit = () => form.post("/contact", { preserveScroll: true, onSuccess: () => form.reset() });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<title${_scopeId}>Start a Project — Ibrahim Nawab</title><meta head-key="description" name="description" content="Discuss a Laravel product, operational platform or infrastructure project with Ibrahim Nawab."${_scopeId}>`);
          } else {
            return [
              createVNode("title", null, "Start a Project — Ibrahim Nawab"),
              createVNode("meta", {
                "head-key": "description",
                name: "description",
                content: "Discuss a Laravel product, operational platform or infrastructure project with Ibrahim Nawab."
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { profile: __props.profile }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="contact-page has-atmosphere"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              tone: "contact",
              mode: "orbs"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).aside, {
              initial: { opacity: 0, x: -28 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.55 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="section-kicker"${_scopeId2}>04 / Start a conversation</span><h1${_scopeId2}>Let’s build something <em${_scopeId2}>worth relying on.</em></h1><p${_scopeId2}>Tell me what you are solving, where the friction lives and what a successful outcome looks like.</p>`);
                  _push3(ssrRenderComponent(unref(motion).div, {
                    class: "contact-scene",
                    initial: { opacity: 0, y: 16 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: 0.15, duration: 0.6 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_sfc_main$3, {
                          tone: "contact",
                          variant: "knot"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_sfc_main$3, {
                            tone: "contact",
                            variant: "knot"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="contact-details"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(motion).div, { "while-hover": { x: 4 } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<small${_scopeId3}>Email</small><a${ssrRenderAttr("href", `mailto:${__props.profile?.email}`)}${_scopeId3}>${ssrInterpolate(__props.profile?.email)}</a>`);
                      } else {
                        return [
                          createVNode("small", null, "Email"),
                          createVNode("a", {
                            href: `mailto:${__props.profile?.email}`
                          }, toDisplayString(__props.profile?.email), 9, ["href"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (__props.profile?.whatsapp_number) {
                    _push3(ssrRenderComponent(unref(motion).div, { "while-hover": { x: 4 } }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<small${_scopeId3}>WhatsApp</small><a${ssrRenderAttr("href", `https://wa.me/${__props.profile.whatsapp_number.replace(/\D/g, "")}`)} target="_blank" rel="noreferrer"${_scopeId3}>Chat on WhatsApp ↗</a>`);
                        } else {
                          return [
                            createVNode("small", null, "WhatsApp"),
                            createVNode("a", {
                              href: `https://wa.me/${__props.profile.whatsapp_number.replace(/\D/g, "")}`,
                              target: "_blank",
                              rel: "noreferrer"
                            }, "Chat on WhatsApp ↗", 8, ["href"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(ssrRenderComponent(unref(motion).div, { "while-hover": { x: 4 } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<small${_scopeId3}>Location</small><span${_scopeId3}>${ssrInterpolate(__props.profile?.location ?? "Karachi, Pakistan")} · Working globally</span>`);
                      } else {
                        return [
                          createVNode("small", null, "Location"),
                          createVNode("span", null, toDisplayString(__props.profile?.location ?? "Karachi, Pakistan") + " · Working globally", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(motion).div, { "while-hover": { x: 4 } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<small${_scopeId3}>Availability</small><span class="available"${_scopeId3}><i${_scopeId3}></i>${ssrInterpolate(__props.profile?.availability)}</span>`);
                      } else {
                        return [
                          createVNode("small", null, "Availability"),
                          createVNode("span", { class: "available" }, [
                            createVNode("i"),
                            createTextVNode(toDisplayString(__props.profile?.availability), 1)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("span", { class: "section-kicker" }, "04 / Start a conversation"),
                    createVNode("h1", null, [
                      createTextVNode("Let’s build something "),
                      createVNode("em", null, "worth relying on.")
                    ]),
                    createVNode("p", null, "Tell me what you are solving, where the friction lives and what a successful outcome looks like."),
                    createVNode(unref(motion).div, {
                      class: "contact-scene",
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.15, duration: 0.6 }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          tone: "contact",
                          variant: "knot"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "contact-details" }, [
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Email"),
                          createVNode("a", {
                            href: `mailto:${__props.profile?.email}`
                          }, toDisplayString(__props.profile?.email), 9, ["href"])
                        ]),
                        _: 1
                      }),
                      __props.profile?.whatsapp_number ? (openBlock(), createBlock(unref(motion).div, {
                        key: 0,
                        "while-hover": { x: 4 }
                      }, {
                        default: withCtx(() => [
                          createVNode("small", null, "WhatsApp"),
                          createVNode("a", {
                            href: `https://wa.me/${__props.profile.whatsapp_number.replace(/\D/g, "")}`,
                            target: "_blank",
                            rel: "noreferrer"
                          }, "Chat on WhatsApp ↗", 8, ["href"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Location"),
                          createVNode("span", null, toDisplayString(__props.profile?.location ?? "Karachi, Pakistan") + " · Working globally", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Availability"),
                          createVNode("span", { class: "available" }, [
                            createVNode("i"),
                            createTextVNode(toDisplayString(__props.profile?.availability), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).form, {
              class: "project-form",
              onSubmit: submit,
              initial: { opacity: 0, y: 34 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.12, duration: 0.55 },
              novalidate: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (success.value) {
                    _push3(`<div class="form-success" role="status"${_scopeId2}>`);
                    _push3(ssrRenderComponent(unref(motion).div, {
                      initial: { opacity: 0, y: 8 },
                      animate: { opacity: 1, y: 0 },
                      transition: { duration: 0.4 }
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(success.value)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(success.value), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="form-grid"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(motion).label, {
                    "while-hover": { y: -2 },
                    transition: { duration: 0.2 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Name *</span><input${ssrRenderAttr("value", unref(form).name)} type="text" autocomplete="name" placeholder="Your name"${ssrRenderAttr("aria-invalid", !!unref(form).errors.name)}${_scopeId3}>`);
                        if (unref(form).errors.name) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(form).errors.name)}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, "Name *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            autocomplete: "name",
                            placeholder: "Your name",
                            "aria-invalid": !!unref(form).errors.name
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(motion).label, {
                    "while-hover": { y: -2 },
                    transition: { duration: 0.2 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Email *</span><input${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" placeholder="you@company.com"${ssrRenderAttr("aria-invalid", !!unref(form).errors.email)}${_scopeId3}>`);
                        if (unref(form).errors.email) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(form).errors.email)}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, "Email *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            autocomplete: "email",
                            placeholder: "you@company.com",
                            "aria-invalid": !!unref(form).errors.email
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div class="form-grid"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(motion).label, {
                    "while-hover": { y: -2 },
                    transition: { duration: 0.2 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Company</span><input${ssrRenderAttr("value", unref(form).company)} type="text" autocomplete="organization" placeholder="Company or project"${_scopeId3}>`);
                        if (unref(form).errors.company) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(form).errors.company)}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, "Company"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).company = $event,
                            type: "text",
                            autocomplete: "organization",
                            placeholder: "Company or project"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).company]
                          ]),
                          unref(form).errors.company ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.company), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(motion).label, {
                    "while-hover": { y: -2 },
                    transition: { duration: 0.2 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>Estimated budget</span><select${_scopeId3}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "") : ssrLooseEqual(unref(form).budget, "")) ? " selected" : ""}${_scopeId3}>Select a range</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, null) : ssrLooseEqual(unref(form).budget, null)) ? " selected" : ""}${_scopeId3}>$2k — $5k</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, null) : ssrLooseEqual(unref(form).budget, null)) ? " selected" : ""}${_scopeId3}>$5k — $10k</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, null) : ssrLooseEqual(unref(form).budget, null)) ? " selected" : ""}${_scopeId3}>$10k — $25k</option><option${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, null) : ssrLooseEqual(unref(form).budget, null)) ? " selected" : ""}${_scopeId3}>$25k+</option></select>`);
                        if (unref(form).errors.budget) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(form).errors.budget)}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, "Estimated budget"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).budget = $event
                          }, [
                            createVNode("option", { value: "" }, "Select a range"),
                            createVNode("option", null, "$2k — $5k"),
                            createVNode("option", null, "$5k — $10k"),
                            createVNode("option", null, "$10k — $25k"),
                            createVNode("option", null, "$25k+")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).budget]
                          ]),
                          unref(form).errors.budget ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.budget), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(motion).label, {
                    "while-hover": { y: -2 },
                    transition: { duration: 0.2 }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<span${_scopeId3}>What are we building? *</span><textarea rows="7" placeholder="The problem, current setup, goals and ideal timeline…"${ssrRenderAttr("aria-invalid", !!unref(form).errors.message)}${_scopeId3}>${ssrInterpolate(unref(form).message)}</textarea>`);
                        if (unref(form).errors.message) {
                          _push4(`<small${_scopeId3}>${ssrInterpolate(unref(form).errors.message)}</small>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          createVNode("span", null, "What are we building? *"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).message = $event,
                            rows: "7",
                            placeholder: "The problem, current setup, goals and ideal timeline…",
                            "aria-invalid": !!unref(form).errors.message
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).message]
                          ]),
                          unref(form).errors.message ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<button class="submit-button" type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId2}><span${_scopeId2}>${ssrInterpolate(unref(form).processing ? "Sending…" : "Send project brief")}</span><b${_scopeId2}>↗</b></button><p class="form-note"${_scopeId2}>Your details stay private. Typical response time: 1–2 business days.</p>`);
                } else {
                  return [
                    success.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "form-success",
                      role: "status"
                    }, [
                      createVNode(unref(motion).div, {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.4 }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(success.value), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "form-grid" }, [
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Name *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            autocomplete: "name",
                            placeholder: "Your name",
                            "aria-invalid": !!unref(form).errors.name
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Email *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            autocomplete: "email",
                            placeholder: "you@company.com",
                            "aria-invalid": !!unref(form).errors.email
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "form-grid" }, [
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Company"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).company = $event,
                            type: "text",
                            autocomplete: "organization",
                            placeholder: "Company or project"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).company]
                          ]),
                          unref(form).errors.company ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.company), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Estimated budget"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).budget = $event
                          }, [
                            createVNode("option", { value: "" }, "Select a range"),
                            createVNode("option", null, "$2k — $5k"),
                            createVNode("option", null, "$5k — $10k"),
                            createVNode("option", null, "$10k — $25k"),
                            createVNode("option", null, "$25k+")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).budget]
                          ]),
                          unref(form).errors.budget ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.budget), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(motion).label, {
                      "while-hover": { y: -2 },
                      transition: { duration: 0.2 }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, "What are we building? *"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).message = $event,
                          rows: "7",
                          placeholder: "The problem, current setup, goals and ideal timeline…",
                          "aria-invalid": !!unref(form).errors.message
                        }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                          [vModelText, unref(form).message]
                        ]),
                        unref(form).errors.message ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("button", {
                      class: "submit-button",
                      type: "submit",
                      disabled: unref(form).processing
                    }, [
                      createVNode("span", null, toDisplayString(unref(form).processing ? "Sending…" : "Send project brief"), 1),
                      createVNode("b", null, "↗")
                    ], 8, ["disabled"]),
                    createVNode("p", { class: "form-note" }, "Your details stay private. Typical response time: 1–2 business days.")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "contact-page has-atmosphere" }, [
                createVNode(_sfc_main$2, {
                  tone: "contact",
                  mode: "orbs"
                }),
                createVNode(unref(motion).aside, {
                  initial: { opacity: 0, x: -28 },
                  animate: { opacity: 1, x: 0 },
                  transition: { duration: 0.55 }
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "section-kicker" }, "04 / Start a conversation"),
                    createVNode("h1", null, [
                      createTextVNode("Let’s build something "),
                      createVNode("em", null, "worth relying on.")
                    ]),
                    createVNode("p", null, "Tell me what you are solving, where the friction lives and what a successful outcome looks like."),
                    createVNode(unref(motion).div, {
                      class: "contact-scene",
                      initial: { opacity: 0, y: 16 },
                      animate: { opacity: 1, y: 0 },
                      transition: { delay: 0.15, duration: 0.6 }
                    }, {
                      default: withCtx(() => [
                        createVNode(_sfc_main$3, {
                          tone: "contact",
                          variant: "knot"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "contact-details" }, [
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Email"),
                          createVNode("a", {
                            href: `mailto:${__props.profile?.email}`
                          }, toDisplayString(__props.profile?.email), 9, ["href"])
                        ]),
                        _: 1
                      }),
                      __props.profile?.whatsapp_number ? (openBlock(), createBlock(unref(motion).div, {
                        key: 0,
                        "while-hover": { x: 4 }
                      }, {
                        default: withCtx(() => [
                          createVNode("small", null, "WhatsApp"),
                          createVNode("a", {
                            href: `https://wa.me/${__props.profile.whatsapp_number.replace(/\D/g, "")}`,
                            target: "_blank",
                            rel: "noreferrer"
                          }, "Chat on WhatsApp ↗", 8, ["href"])
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Location"),
                          createVNode("span", null, toDisplayString(__props.profile?.location ?? "Karachi, Pakistan") + " · Working globally", 1)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).div, { "while-hover": { x: 4 } }, {
                        default: withCtx(() => [
                          createVNode("small", null, "Availability"),
                          createVNode("span", { class: "available" }, [
                            createVNode("i"),
                            createTextVNode(toDisplayString(__props.profile?.availability), 1)
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  _: 1
                }),
                createVNode(unref(motion).form, {
                  class: "project-form",
                  onSubmit: withModifiers(submit, ["prevent"]),
                  initial: { opacity: 0, y: 34 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.12, duration: 0.55 },
                  novalidate: ""
                }, {
                  default: withCtx(() => [
                    success.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "form-success",
                      role: "status"
                    }, [
                      createVNode(unref(motion).div, {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.4 }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(success.value), 1)
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "form-grid" }, [
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Name *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            autocomplete: "name",
                            placeholder: "Your name",
                            "aria-invalid": !!unref(form).errors.name
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Email *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).email = $event,
                            type: "email",
                            autocomplete: "email",
                            placeholder: "you@company.com",
                            "aria-invalid": !!unref(form).errors.email
                          }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                            [vModelText, unref(form).email]
                          ]),
                          unref(form).errors.email ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode("div", { class: "form-grid" }, [
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Company"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).company = $event,
                            type: "text",
                            autocomplete: "organization",
                            placeholder: "Company or project"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).company]
                          ]),
                          unref(form).errors.company ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.company), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(motion).label, {
                        "while-hover": { y: -2 },
                        transition: { duration: 0.2 }
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Estimated budget"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).budget = $event
                          }, [
                            createVNode("option", { value: "" }, "Select a range"),
                            createVNode("option", null, "$2k — $5k"),
                            createVNode("option", null, "$5k — $10k"),
                            createVNode("option", null, "$10k — $25k"),
                            createVNode("option", null, "$25k+")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).budget]
                          ]),
                          unref(form).errors.budget ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.budget), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(unref(motion).label, {
                      "while-hover": { y: -2 },
                      transition: { duration: 0.2 }
                    }, {
                      default: withCtx(() => [
                        createVNode("span", null, "What are we building? *"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).message = $event,
                          rows: "7",
                          placeholder: "The problem, current setup, goals and ideal timeline…",
                          "aria-invalid": !!unref(form).errors.message
                        }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                          [vModelText, unref(form).message]
                        ]),
                        unref(form).errors.message ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.message), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("button", {
                      class: "submit-button",
                      type: "submit",
                      disabled: unref(form).processing
                    }, [
                      createVNode("span", null, toDisplayString(unref(form).processing ? "Sending…" : "Send project brief"), 1),
                      createVNode("b", null, "↗")
                    ], 8, ["disabled"]),
                    createVNode("p", { class: "form-note" }, "Your details stay private. Typical response time: 1–2 business days.")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Portfolio/Contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
