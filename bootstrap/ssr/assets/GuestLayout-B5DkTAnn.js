import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
const _sfc_main = {
  __name: "GuestLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-shell" }, _attrs))}><section class="auth-visual">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "auth-brand"
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
      _push(`<div><span>Secure content management</span><h1>Your work.<br><em>Your story.</em><br>One dashboard.</h1><p>Manage the portfolio without touching code. Every saved change updates the Laravel + Inertia website.</p></div><footer>Laravel · Vue 3 · Inertia</footer></section><main class="auth-panel"><div class="auth-card">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: "auth-back"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`← Back to portfolio`);
          } else {
            return [
              createTextVNode("← Back to portfolio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/GuestLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
