import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "ProjectCover",
  __ssrInlineRender: true,
  props: { project: Object, index: Number },
  setup(__props) {
    const props = __props;
    const kind = computed(
      () => /flutter|mobile/i.test(props.project.category || "") ? "mobile" : /wordpress|commerce|website/i.test(props.project.category || "") ? "web" : "system"
    );
    const hasImage = computed(() => !!props.project.image_path);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["work-cover project-scene", [`scene-${kind.value}`, { "has-media": hasImage.value }]]
      }, _attrs))}>`);
      if (hasImage.value && kind.value === "mobile") {
        _push(`<!--[--><div class="phone-frame" aria-hidden="true"><span class="phone-notch"></span><img${ssrRenderAttr("src", __props.project.image_path)}${ssrRenderAttr("alt", __props.project.title)} loading="lazy"></div><span class="cover-badge">Mobile app</span><!--]-->`);
      } else if (hasImage.value) {
        _push(`<!--[--><div class="browser-frame" aria-hidden="true"><div class="browser-chrome"><i></i><i></i><i></i><span>${ssrInterpolate(__props.project.title)}</span></div><img${ssrRenderAttr("src", __props.project.image_path)}${ssrRenderAttr("alt", __props.project.title)} loading="lazy"></div><span class="cover-badge">Live product</span><!--]-->`);
      } else {
        _push(`<!--[--><span class="cover-caption">${ssrInterpolate(__props.project.category)} / ${ssrInterpolate(String(__props.index + 1).padStart(2, "0"))}</span><div class="project-stage" aria-hidden="true">`);
        if (kind.value === "mobile") {
          _push(`<!--[--><div class="device-phone"><span class="phone-island"></span><b>${ssrInterpolate(__props.project.title)}</b><div class="phone-orbit">✳</div><i></i><i></i><span class="phone-footer">EXPLORE THE EXPERIENCE ↗</span></div><div class="device-phone secondary-phone"><span class="phone-island"></span><div class="phone-orbit">↗</div><i></i><i></i></div><!--]-->`);
        } else if (kind.value === "web") {
          _push(`<div class="device-browser"><div class="browser-chrome"><i></i><i></i><i></i><span>${ssrInterpolate(__props.project.title)}</span></div><div class="browser-content"><span>THE DIGITAL EXPERIENCE</span><b>${ssrInterpolate(__props.project.title)}<em>Designed to connect.</em></b><div class="browser-sculpture">✳</div><small>DISCOVER MORE ↗</small></div></div>`);
        } else {
          _push(`<!--[--><div class="system-plane plane-data"><span>DATA LAYER</span><i></i><i></i><i></i></div><div class="system-plane plane-api"><span>API / BUSINESS LOGIC</span><b>←→</b></div><div class="system-plane plane-product"><span>PRODUCT EXPERIENCE</span><strong>${ssrInterpolate(__props.project.title)}</strong><div class="system-nodes"><i></i><i></i><i></i></div></div><!--]-->`);
        }
        _push(`</div><span class="cover-tech">${ssrInterpolate((__props.project.tech_stack ?? []).slice(0, 3).join(" / "))}</span><span class="visual-note">Concept illustration</span><!--]-->`);
      }
      _push(`<b class="work-arrow-round">↗</b></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/ProjectCover.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
