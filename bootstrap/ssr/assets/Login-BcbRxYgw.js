import { withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./GuestLayout-B5DkTAnn.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "Login",
  __ssrInlineRender: true,
  props: { canResetPassword: Boolean, status: String },
  setup(__props) {
    const form = useForm({ email: "", password: "", remember: true });
    const submit = () => form.post(route("login"), { onFinish: () => form.reset("password") });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Admin Login" }, null, _parent2, _scopeId));
            _push2(`<span class="auth-kicker"${_scopeId}>Portfolio administration</span><h2${_scopeId}>Welcome back.</h2><p class="auth-intro"${_scopeId}>Sign in to manage projects, experience, certificates, skills and enquiries.</p>`);
            if (__props.status) {
              _push2(`<div class="auth-status"${_scopeId}>${ssrInterpolate(__props.status)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="auth-form"${_scopeId}><label${_scopeId}><span${_scopeId}>Email address</span><input${ssrRenderAttr("value", unref(form).email)} type="email" required autofocus autocomplete="username" placeholder="you@example.com"${_scopeId}>`);
            if (unref(form).errors.email) {
              _push2(`<small${_scopeId}>${ssrInterpolate(unref(form).errors.email)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><label${_scopeId}><span${_scopeId}>Password</span><input${ssrRenderAttr("value", unref(form).password)} type="password" required autocomplete="current-password" placeholder="Your password"${_scopeId}>`);
            if (unref(form).errors.password) {
              _push2(`<small${_scopeId}>${ssrInterpolate(unref(form).errors.password)}</small>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><div class="auth-options"${_scopeId}><label${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).remember) ? ssrLooseContain(unref(form).remember, null) : unref(form).remember) ? " checked" : ""} type="checkbox"${_scopeId}> Remember me</label>`);
            if (__props.canResetPassword) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("password.request")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Forgot password?`);
                  } else {
                    return [
                      createTextVNode("Forgot password?")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""}${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(form).processing ? "Signing in…" : "Sign in to CMS")}</span><b${_scopeId}>↗</b></button></form>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Admin Login" }),
              createVNode("span", { class: "auth-kicker" }, "Portfolio administration"),
              createVNode("h2", null, "Welcome back."),
              createVNode("p", { class: "auth-intro" }, "Sign in to manage projects, experience, certificates, skills and enquiries."),
              __props.status ? (openBlock(), createBlock("div", {
                key: 0,
                class: "auth-status"
              }, toDisplayString(__props.status), 1)) : createCommentVNode("", true),
              createVNode("form", {
                class: "auth-form",
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("label", null, [
                  createVNode("span", null, "Email address"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    required: "",
                    autofocus: "",
                    autocomplete: "username",
                    placeholder: "you@example.com"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).email]
                  ]),
                  unref(form).errors.email ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.email), 1)) : createCommentVNode("", true)
                ]),
                createVNode("label", null, [
                  createVNode("span", null, "Password"),
                  withDirectives(createVNode("input", {
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    required: "",
                    autocomplete: "current-password",
                    placeholder: "Your password"
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, unref(form).password]
                  ]),
                  unref(form).errors.password ? (openBlock(), createBlock("small", { key: 0 }, toDisplayString(unref(form).errors.password), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "auth-options" }, [
                  createVNode("label", null, [
                    withDirectives(createVNode("input", {
                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                      type: "checkbox"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelCheckbox, unref(form).remember]
                    ]),
                    createTextVNode(" Remember me")
                  ]),
                  __props.canResetPassword ? (openBlock(), createBlock(unref(Link), {
                    key: 0,
                    href: _ctx.route("password.request")
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Forgot password?")
                    ]),
                    _: 1
                  }, 8, ["href"])) : createCommentVNode("", true)
                ]),
                createVNode("button", {
                  type: "submit",
                  disabled: unref(form).processing
                }, [
                  createVNode("span", null, toDisplayString(unref(form).processing ? "Signing in…" : "Sign in to CMS"), 1),
                  createVNode("b", null, "↗")
                ], 8, ["disabled"])
              ], 32)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
