import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "CompanyLogo",
  __ssrInlineRender: true,
  props: {
    src: { type: String, default: null },
    name: { type: String, default: "" },
    size: { type: String, default: "md" }
  },
  setup(__props) {
    const props = __props;
    const initials = computed(() => {
      const clean = (props.name || "").replace(/\s*\|.*/, "").trim();
      const parts = clean.split(/\s+/).filter(Boolean);
      if (!parts.length) return "•";
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[1][0]).toUpperCase();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["company-logo", `size-${__props.size}`],
        title: __props.name
      }, _attrs))}>`);
      if (__props.src) {
        _push(`<img${ssrRenderAttr("src", __props.src)}${ssrRenderAttr("alt", __props.name)} loading="lazy">`);
      } else {
        _push(`<span>${ssrInterpolate(initials.value)}</span>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/CompanyLogo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
