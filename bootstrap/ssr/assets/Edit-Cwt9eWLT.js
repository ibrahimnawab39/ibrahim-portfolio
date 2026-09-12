import { unref, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AuthenticatedLayout-gFy7Fq2q.js";
import _sfc_main$3 from "./UpdatePasswordForm-Bxe9xPET.js";
import _sfc_main$2 from "./UpdateProfileInformationForm-C-sTB8dc.js";
import { Head } from "@inertiajs/vue3";
import "./TextInput-A0-GkXWF.js";
import "./PrimaryButton-CIooT64n.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: { mustVerifyEmail: Boolean, status: String },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Account & Security" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="account-page"${_scopeId}><header${_scopeId}><span${_scopeId}>Personal access</span><h1${_scopeId}>Account &amp; security</h1><p${_scopeId}>Manage the login details used to access your private portfolio CMS.</p></header><div class="account-card"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              "must-verify-email": __props.mustVerifyEmail,
              status: __props.status
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="account-card"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "account-page" }, [
                createVNode("header", null, [
                  createVNode("span", null, "Personal access"),
                  createVNode("h1", null, "Account & security"),
                  createVNode("p", null, "Manage the login details used to access your private portfolio CMS.")
                ]),
                createVNode("div", { class: "account-card" }, [
                  createVNode(_sfc_main$2, {
                    "must-verify-email": __props.mustVerifyEmail,
                    status: __props.status
                  }, null, 8, ["must-verify-email", "status"])
                ]),
                createVNode("div", { class: "account-card" }, [
                  createVNode(_sfc_main$3)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
