import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "AuthenticatedLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "account-shell" }, _attrs))}><aside class="account-sidebar">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin",
        class: "admin-brand"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`IBRAHIM<span${_scopeId}>.</span><small${_scopeId}>Portfolio CMS</small>`);
          } else {
            return [
              createTextVNode("IBRAHIM"),
              createVNode("span", null, "."),
              createVNode("small", null, "Portfolio CMS")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← CMS overview`);
          } else {
            return [
              createTextVNode("← CMS overview")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), { href: "/admin" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Website content`);
          } else {
            return [
              createTextVNode("Website content")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/profile",
        class: "active"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Account &amp; security`);
          } else {
            return [
              createTextVNode("Account & security")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View website ↗`);
          } else {
            return [
              createTextVNode("View website ↗")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/logout",
        method: "post",
        as: "button",
        class: "account-logout"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Sign out`);
          } else {
            return [
              createTextVNode("Sign out")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</aside><main class="account-main"><header class="account-topbar"><div><small>Administration</small><strong>${ssrInterpolate(_ctx.$page.props.auth.user.name)}</strong></div><span class="admin-status"><i></i>Secure session</span></header>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AuthenticatedLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
