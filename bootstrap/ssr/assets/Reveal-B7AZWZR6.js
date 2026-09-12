import { ref, onMounted, onBeforeUnmount, unref, mergeProps, withCtx, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { motion } from "motion-v";
const _sfc_main = {
  __name: "Reveal",
  __ssrInlineRender: true,
  props: {
    as: { type: String, default: "div" },
    delay: { type: Number, default: 0 },
    y: { type: Number, default: 28 },
    amount: { type: Number, default: 0.2 },
    once: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    const inview = ref(false);
    const root = ref(null);
    let observer;
    onMounted(() => {
      const el = root.value?.$el ?? root.value;
      if (!el || typeof IntersectionObserver === "undefined") {
        inview.value = true;
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          inview.value = true;
          if (props.once) observer?.disconnect();
        },
        { threshold: Math.min(Math.max(props.amount, 0.05), 1) }
      );
      observer.observe(el);
    });
    onBeforeUnmount(() => observer?.disconnect());
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(motion).div, mergeProps({
        ref_key: "root",
        ref: root,
        as: __props.as,
        class: ["folio-reveal", { "is-inview": inview.value }],
        initial: { opacity: 0, y: __props.y },
        "while-in-view": { opacity: 1, y: 0 },
        viewport: { once: __props.once, amount: __props.amount },
        transition: { duration: 0.55, delay: __props.delay, ease: [0.22, 1, 0.36, 1] }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/Reveal.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
