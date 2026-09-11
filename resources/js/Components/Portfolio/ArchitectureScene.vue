<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
const mount = ref(null);
const paused = ref(false);
const ready = ref(false);
let renderer, scene, camera, group, resize, intersection, media, environment, destroyed = false;
let visible = true, reduced = false, angle = 0, previous = 0;
const pointer = { x: 0, y: 0 };
function move(event) {
    if (reduced || event.pointerType === 'touch') return;
    const rect = mount.value.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - .5;
    pointer.y = (event.clientY - rect.top) / rect.height - .5;
}
function reset() { pointer.x = 0; pointer.y = 0; }
function render(time = 0) {
    if (!renderer || !visible || document.hidden) { previous = time; return; }
    const delta = previous ? Math.min((time - previous) / 1000, .05) : 0;
    previous = time;
    if (!paused.value && !reduced) angle += delta * .18;
    group.rotation.set(.32 + pointer.y * .15, angle + pointer.x * .35, -.28);
    renderer.render(scene, camera);
}
function motionChange(event) { reduced = event.matches; render(); }
onMounted(async () => {
    try {
        const T = await import('three');
        const { RoomEnvironment } = await import('three/addons/environments/RoomEnvironment.js');
        if (destroyed) return;
        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.4;
        mount.value.appendChild(renderer.domElement);
        scene = new T.Scene();
        camera = new T.PerspectiveCamera(35, 1, .1, 100);
        camera.position.set(0, .2, 8.8);
        const pmrem = new T.PMREMGenerator(renderer);
        const room = new RoomEnvironment();
        environment = pmrem.fromScene(room, .04);
        scene.environment = environment.texture;
        room.dispose(); pmrem.dispose();
        group = new T.Group(); scene.add(group);
        const chrome = new T.MeshStandardMaterial({ color: 0xe7e9ef, metalness: 1, roughness: .14 });
        const blue = new T.MeshPhysicalMaterial({ color: 0x214bfa, metalness: .45, roughness: .19, clearcoat: 1 });
        const ringGeometry = new T.TorusGeometry(1.52, .25, 28, 100);
        [0, 1, 2].forEach((n) => {
            const ring = new T.Mesh(ringGeometry, n === 1 ? blue : chrome);
            ring.rotation.set(n === 2 ? Math.PI / 2 : 0, n === 1 ? Math.PI / 2 : 0, 0);
            group.add(ring);
        });
        const core = new T.Mesh(new T.IcosahedronGeometry(.63, 0), blue);
        group.add(core);
        const light = new T.DirectionalLight(0xffffff, 4); light.position.set(-3, 5, 4); scene.add(light);
        scene.add(new T.AmbientLight(0xffffff, .8));
        resize = new ResizeObserver(() => {
            if (!mount.value) return;
            const { width, height } = mount.value.getBoundingClientRect();
            renderer.setSize(width, height);
            camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); render();
        });
        resize.observe(mount.value);
        intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
        intersection.observe(mount.value);
        media = window.matchMedia('(prefers-reduced-motion: reduce)'); reduced = media.matches;
        media.addEventListener('change', motionChange);
        renderer.domElement.addEventListener('webglcontextlost', () => { ready.value = false; renderer.setAnimationLoop(null); });
        ready.value = true; renderer.setAnimationLoop(render);
    } catch { ready.value = false; }
});
onBeforeUnmount(() => {
    destroyed = true;
    resize?.disconnect(); intersection?.disconnect(); media?.removeEventListener('change', motionChange);
    renderer?.setAnimationLoop(null);
    const geometries = new Set(), materials = new Set();
    scene?.traverse(object => { if(object.geometry) geometries.add(object.geometry); if(object.material) materials.add(object.material); });
    geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose());
    environment?.dispose(); renderer?.dispose(); renderer?.domElement.remove();
});
</script>
<template>
    <div class="orbital-scene" @pointermove="move" @pointerleave="reset">
        <div ref="mount" class="webgl-mount" aria-hidden="true"></div>
        <div v-if="!ready" class="orbital-fallback" aria-hidden="true"><i></i><i></i><b>IN</b></div>
        <span class="orbit-note orbit-note-top">Ideas into interfaces.</span>
        <span class="orbit-note orbit-note-bottom">Complexity into clarity.</span>
        <button v-if="ready" type="button" class="motion-control" :aria-pressed="paused" @click="paused = !paused">{{ paused ? 'Play motion ↻' : 'Pause motion Ⅱ' }}</button>
    </div>
</template>
