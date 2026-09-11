import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "TiltCard",
  __ssrInlineRender: true,
  props: {
    max: { type: Number, default: 8 },
    glare: { type: Boolean, default: true }
  },
  setup(__props) {
    const root = ref(null);
    const transform = ref("perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)");
    const glareStyle = ref({ opacity: 0 });
    const enabled = ref(false);
    const tilting = ref(false);
    onMounted(() => {
      enabled.value = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "root",
        ref: root,
        class: ["tilt-card", { "is-enabled": enabled.value, "is-tilting": tilting.value }]
      }, _attrs))}><div class="tilt-card-inner" style="${ssrRenderStyle({ transform: transform.value })}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      if (__props.glare) {
        _push(`<span class="tilt-card-glare" aria-hidden="true" style="${ssrRenderStyle(glareStyle.value)}"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/TiltCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
