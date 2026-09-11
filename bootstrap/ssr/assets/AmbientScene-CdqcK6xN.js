import { ref, computed, onMounted, onBeforeUnmount, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "AmbientScene",
  __ssrInlineRender: true,
  props: {
    tone: { type: String, default: "default" },
    /** knot | dots | shards | orbit — auto from tone if omitted */
    variant: { type: String, default: "" }
  },
  setup(__props) {
    const props = __props;
    const mount = ref(null);
    const resolved = computed(() => {
      if (props.variant) return props.variant;
      return {
        about: "shards",
        work: "dots",
        experience: "orbit",
        contact: "knot",
        default: "dots"
      }[props.tone] || "dots";
    });
    let renderer, scene, camera, group, meshes = [], dust, frame, resize, intersection, destroyed = false;
    let visible = true, reduced = false, paused = false, angle = 0, previous = 0, themeObserver;
    const pointer = { x: 0, y: 0 };
    const palette = () => {
      const dark = document.documentElement.dataset.theme !== "light";
      return dark ? { a: 11644671, b: 13892251, c: 7179519, dust: 13159136 } : { a: 4868052, b: 7315005, c: 8026344, dust: 8028822 };
    };
    function move(event) {
      if (reduced || paused || event.pointerType === "touch") return;
      const rect = mount.value.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    }
    function reset() {
      pointer.x = 0;
      pointer.y = 0;
    }
    function applyTheme() {
      const colors = palette();
      meshes.forEach((mesh, i) => {
        const hex = i % 3 === 0 ? colors.a : i % 3 === 1 ? colors.b : colors.c;
        if (mesh.material?.color) mesh.material.color.setHex(hex);
        if (mesh.material?.emissive) mesh.material.emissive.setHex(hex);
      });
      if (dust?.material?.color) dust.material.color.setHex(colors.dust);
    }
    function preferenceChange(event) {
      paused = Boolean(event.detail);
      if (!paused && renderer && visible && !reduced) {
        previous = 0;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(render);
      }
    }
    function buildScene(THREE, variant, colors) {
      const mat = (hex, opacity = 0.9) => new THREE.MeshStandardMaterial({
        color: hex,
        emissive: hex,
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.48,
        transparent: true,
        opacity
      });
      if (variant === "dots") {
        const count = 220;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const r = 0.4 + Math.random() * 2.4;
          const t = Math.random() * Math.PI * 2;
          const p = (Math.random() - 0.5) * Math.PI;
          positions[i * 3] = Math.cos(t) * Math.cos(p) * r;
          positions[i * 3 + 1] = Math.sin(p) * r * 0.7;
          positions[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        dust = new THREE.Points(geo, new THREE.PointsMaterial({
          color: colors.dust,
          size: 0.045,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true
        }));
        group.add(dust);
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), mat(colors.a, 0.85));
        meshes = [core];
        group.add(core);
        return;
      }
      if (variant === "shards") {
        const shapes = [
          new THREE.TetrahedronGeometry(0.55),
          new THREE.OctahedronGeometry(0.42),
          new THREE.TetrahedronGeometry(0.32),
          new THREE.BoxGeometry(0.28, 0.28, 0.28)
        ];
        meshes = shapes.map((geo, i) => {
          const mesh = new THREE.Mesh(geo, mat(i % 2 ? colors.b : colors.a, 0.82));
          const a = i / shapes.length * Math.PI * 2;
          mesh.position.set(Math.cos(a) * 1.2, Math.sin(a * 1.3) * 0.45, Math.sin(a) * 1.1);
          return mesh;
        });
        group.add(...meshes);
        return;
      }
      if (variant === "orbit") {
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.028, 12, 90), mat(colors.a, 0.8));
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.022, 12, 80), mat(colors.b, 0.75));
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.018, 12, 70), mat(colors.c, 0.7));
        ring1.rotation.x = Math.PI / 2.6;
        ring2.rotation.x = Math.PI / 2.2;
        ring2.rotation.y = 0.4;
        ring3.rotation.x = Math.PI / 1.8;
        ring3.rotation.z = 0.5;
        const gem2 = new THREE.Mesh(new THREE.SphereGeometry(0.22, 24, 24), mat(colors.b, 0.9));
        meshes = [ring1, ring2, ring3, gem2];
        group.add(...meshes);
        return;
      }
      const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.14, 110, 14), mat(colors.a));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.03, 14, 70), mat(colors.b, 0.72));
      ring.rotation.x = Math.PI / 2.4;
      const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(0.26, 0), mat(colors.c));
      gem.position.set(1.25, 0.55, 0.15);
      meshes = [knot, ring, gem];
      group.add(...meshes);
    }
    function render(time = 0) {
      if (!renderer || !visible || document.hidden || paused || reduced) {
        previous = time;
        return;
      }
      const delta = previous ? Math.min((time - previous) / 1e3, 0.05) : 0;
      previous = time;
      angle += delta * 0.42;
      const variant = resolved.value;
      group.rotation.y = pointer.x * 0.35 + Math.sin(angle * 0.4) * 0.1;
      group.rotation.x = 0.15 + pointer.y * 0.18 + Math.cos(angle * 0.3) * 0.05;
      if (variant === "dots" && dust) {
        dust.rotation.y = angle * 0.18;
        dust.rotation.x = Math.sin(angle * 0.2) * 0.12;
        meshes[0] && (meshes[0].rotation.y += delta * 0.6);
      } else if (variant === "orbit") {
        meshes.forEach((mesh, i) => {
          if (i < 3) mesh.rotation.z += delta * (0.35 + i * 0.12) * (i % 2 ? -1 : 1);
          else mesh.position.y = Math.sin(angle * 1.4) * 0.12;
        });
      } else if (variant === "shards") {
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += delta * (0.4 + i * 0.1);
          mesh.rotation.y -= delta * (0.35 + i * 0.08);
          mesh.position.y += Math.sin(angle + i) * 2e-3;
        });
      } else {
        meshes.forEach((mesh, i) => {
          mesh.rotation.x += delta * (0.25 + i * 0.08);
          mesh.rotation.y -= delta * (0.3 + i * 0.05);
        });
      }
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    }
    onMounted(async () => {
      if (!mount.value) return;
      reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.addEventListener("portfolio-motion", preferenceChange);
      mount.value.dataset.variant = resolved.value;
      if (reduced) {
        mount.value.classList.add("is-fallback");
        return;
      }
      const THREE = await import("three");
      if (destroyed || !mount.value) return;
      const width = mount.value.clientWidth || 320;
      const height = mount.value.clientHeight || 320;
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      mount.value.appendChild(renderer.domElement);
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 40);
      camera.position.set(0, 0.15, 5.1);
      group = new THREE.Group();
      scene.add(group);
      buildScene(THREE, resolved.value, palette());
      scene.add(new THREE.AmbientLight(16777215, 0.75));
      const key = new THREE.DirectionalLight(16777215, 1.05);
      key.position.set(2, 3, 4);
      scene.add(key);
      resize = () => {
        if (!mount.value || !renderer) return;
        const w = mount.value.clientWidth;
        const h = mount.value.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !paused && !reduced) {
          previous = 0;
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(render);
        }
      }, { threshold: 0.05 });
      intersection.observe(mount.value);
      themeObserver = new MutationObserver(applyTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      mount.value.addEventListener("pointermove", move);
      mount.value.addEventListener("pointerleave", reset);
      window.addEventListener("resize", resize);
      frame = requestAnimationFrame(render);
    });
    onBeforeUnmount(() => {
      destroyed = true;
      cancelAnimationFrame(frame);
      intersection?.disconnect();
      themeObserver?.disconnect();
      window.removeEventListener("portfolio-motion", preferenceChange);
      mount.value?.removeEventListener("pointermove", move);
      mount.value?.removeEventListener("pointerleave", reset);
      window.removeEventListener("resize", resize);
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      meshes.forEach((mesh) => {
        mesh.geometry?.dispose();
        mesh.material?.dispose();
      });
      dust?.geometry?.dispose();
      dust?.material?.dispose();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "mount",
        ref: mount,
        class: ["ambient-scene", [`tone-${__props.tone}`, `variant-${resolved.value}`]],
        "aria-hidden": "true"
      }, _attrs))}><div class="ambient-fallback"${ssrRenderAttr("data-variant", resolved.value)}></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Portfolio/AmbientScene.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
