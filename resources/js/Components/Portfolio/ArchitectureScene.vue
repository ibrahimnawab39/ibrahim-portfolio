<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';

const mount = ref(null);
const paused = ref(false);
const ready = ref(false);

let renderer, scene, camera, group, core, rings = [], floats = [], stars, resize, intersection, media, destroyed = false;
let visible = true, reduced = false, angle = 0, previous = 0, themeObserver;
const pointer = { x: 0, y: 0 };

const palette = () => {
    const dark = document.documentElement.dataset.theme !== 'light';
    return dark
        ? { core: 0xb1aeff, glow: 0xd3fa9b, ring: 0x7a78c9, panel: 0x2a2f45, edge: 0xc9c7ff, star: 0xd8daf0 }
        : { core: 0x4a47d4, glow: 0x6f9e3d, ring: 0x7a78e8, panel: 0xe8ebf4, edge: 0x4a47d4, star: 0x7a8296 };
};

function move(event) {
    if (reduced || event.pointerType === 'touch') return;
    const rect = mount.value.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - .5;
    pointer.y = (event.clientY - rect.top) / rect.height - .5;
}
function reset() { pointer.x = 0; pointer.y = 0; }

function applyTheme(T) {
    const colors = palette();
    if (core) {
        core.material.color.setHex(colors.core);
        core.material.emissive.setHex(colors.core);
        core.children[0]?.material?.color?.setHex(colors.edge);
    }
    rings.forEach((ring, i) => {
        ring.material.color.setHex(i % 2 ? colors.glow : colors.ring);
    });
    floats.forEach((card, i) => {
        card.material.color.setHex(colors.panel);
        card.children[0]?.material?.color?.setHex(i === 0 ? colors.glow : colors.edge);
    });
    if (stars) stars.material.color.setHex(colors.star);
}

function render(time = 0) {
    if (!renderer || !visible || document.hidden) { previous = time; return; }
    const delta = previous ? Math.min((time - previous) / 1000, .05) : 0;
    previous = time;
    if (!paused.value && !reduced) angle += delta * .35;

    group.rotation.y = -.25 + pointer.x * .55 + Math.sin(angle * .35) * .08;
    group.rotation.x = .18 + pointer.y * .28 + Math.cos(angle * .28) * .04;

    if (core) {
        core.rotation.y += delta * .45;
        core.rotation.x += delta * .18;
        const pulse = 1 + Math.sin(angle * 1.4) * .04;
        core.scale.setScalar(pulse);
    }

    rings.forEach((ring, i) => {
        ring.rotation.z = angle * (i % 2 ? -.55 : .4) + i;
        ring.rotation.x = Math.sin(angle * .5 + i) * .15 + .6;
        ring.rotation.y = Math.cos(angle * .35 + i) * .2;
    });

    floats.forEach((card, i) => {
        const orbit = angle * .55 + i * 2.1;
        card.position.x = Math.cos(orbit) * (2.1 + i * .15);
        card.position.z = Math.sin(orbit) * (1.55 + i * .12);
        card.position.y = Math.sin(angle * 1.2 + i * 1.4) * .45 + (i - 1) * .35;
        card.rotation.y = -orbit + Math.PI / 2;
        card.rotation.x = Math.sin(angle + i) * .12;
    });

    if (stars) stars.rotation.y = angle * .08;

    renderer.render(scene, camera);
}

function preferenceChange(event) { paused.value = event.detail; }
function motionChange(event) { reduced = event.matches; render(); }

onMounted(async () => {
    window.addEventListener('portfolio-motion', preferenceChange);
    try {
        const T = await import('three');
        if (destroyed) return;

        renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        mount.value.appendChild(renderer.domElement);

        scene = new T.Scene();
        camera = new T.PerspectiveCamera(38, 1, .1, 100);
        camera.position.set(0, 1.2, 7.4);
        camera.lookAt(0, 0, 0);

        group = new T.Group();
        scene.add(group);

        const colors = palette();

        // Core crystal — the “system brain”
        const coreGeo = new T.IcosahedronGeometry(1.05, 1);
        const coreMat = new T.MeshStandardMaterial({
            color: colors.core,
            metalness: .55,
            roughness: .22,
            emissive: colors.core,
            emissiveIntensity: .22,
        });
        core = new T.Mesh(coreGeo, coreMat);
        const wire = new T.LineSegments(
            new T.WireframeGeometry(coreGeo),
            new T.LineBasicMaterial({ color: colors.edge, transparent: true, opacity: .55 })
        );
        core.add(wire);
        group.add(core);

        // Inner glow sphere
        const glow = new T.Mesh(
            new T.SphereGeometry(.72, 32, 32),
            new T.MeshBasicMaterial({ color: colors.glow, transparent: true, opacity: .14 })
        );
        core.add(glow);

        // Orbital rings
        for (let i = 0; i < 3; i++) {
            const ring = new T.Mesh(
                new T.TorusGeometry(1.55 + i * .38, .018, 12, 100),
                new T.MeshStandardMaterial({
                    color: i % 2 ? colors.glow : colors.ring,
                    metalness: .8,
                    roughness: .25,
                    emissive: i % 2 ? colors.glow : colors.ring,
                    emissiveIntensity: .15,
                })
            );
            rings.push(ring);
            group.add(ring);
        }

        // Floating glass panels (product surfaces)
        for (let i = 0; i < 3; i++) {
            const card = new T.Mesh(
                new T.BoxGeometry(1.15, .72, .04),
                new T.MeshPhysicalMaterial({
                    color: colors.panel,
                    metalness: .15,
                    roughness: .28,
                    transmission: .35,
                    transparent: true,
                    opacity: .92,
                    clearcoat: 1,
                })
            );
            const accent = new T.Mesh(
                new T.BoxGeometry(.85, .05, .02),
                new T.MeshStandardMaterial({
                    color: i === 0 ? colors.glow : colors.edge,
                    emissive: i === 0 ? colors.glow : colors.edge,
                    emissiveIntensity: .45,
                })
            );
            accent.position.set(0, .18, .03);
            card.add(accent);
            for (let r = 0; r < 3; r++) {
                const bar = new T.Mesh(
                    new T.BoxGeometry(.55 - r * .1, .03, .015),
                    new T.MeshStandardMaterial({ color: colors.edge, transparent: true, opacity: .45 })
                );
                bar.position.set(-.12, -.05 - r * .12, .03);
                card.add(bar);
            }
            floats.push(card);
            group.add(card);
        }

        // Particle constellation
        const count = 180;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const radius = 2.2 + Math.random() * 2.8;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * .7;
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }
        const starGeo = new T.BufferGeometry();
        starGeo.setAttribute('position', new T.BufferAttribute(positions, 3));
        stars = new T.Points(
            starGeo,
            new T.PointsMaterial({ color: colors.star, size: .035, transparent: true, opacity: .75, sizeAttenuation: true })
        );
        group.add(stars);

        // Soft lights
        const key = new T.DirectionalLight(0xffffff, 3.2);
        key.position.set(-3, 4, 5);
        scene.add(key);
        const fill = new T.DirectionalLight(0xb1aeff, 1.4);
        fill.position.set(4, -1, 2);
        scene.add(fill);
        scene.add(new T.AmbientLight(0xffffff, .65));

        resize = new ResizeObserver(() => {
            if (!mount.value) return;
            const { width, height } = mount.value.getBoundingClientRect();
            renderer.setSize(width, height);
            camera.aspect = width / Math.max(height, 1);
            camera.updateProjectionMatrix();
            render();
        });
        resize.observe(mount.value);

        intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
        intersection.observe(mount.value);

        media = window.matchMedia('(prefers-reduced-motion: reduce)');
        reduced = media.matches;
        media.addEventListener('change', motionChange);

        themeObserver = new MutationObserver(() => applyTheme(T));
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

        renderer.domElement.addEventListener('webglcontextlost', () => {
            ready.value = false;
            renderer.setAnimationLoop(null);
        });

        ready.value = true;
        renderer.setAnimationLoop(render);
    } catch {
        ready.value = false;
    }
});

onBeforeUnmount(() => {
    destroyed = true;
    window.removeEventListener('portfolio-motion', preferenceChange);
    themeObserver?.disconnect();
    resize?.disconnect();
    intersection?.disconnect();
    media?.removeEventListener('change', motionChange);
    renderer?.setAnimationLoop(null);
    const geometries = new Set(), materials = new Set();
    scene?.traverse((object) => {
        if (object.geometry) geometries.add(object.geometry);
        if (object.material) {
            if (Array.isArray(object.material)) object.material.forEach((m) => materials.add(m));
            else materials.add(object.material);
        }
    });
    geometries.forEach((item) => item.dispose());
    materials.forEach((item) => item.dispose());
    renderer?.dispose();
    renderer?.domElement.remove();
});
</script>

<template>
    <div class="orbital-scene constellation-scene" @pointermove="move" @pointerleave="reset">
        <div ref="mount" class="webgl-mount" aria-hidden="true"></div>
        <div v-if="!ready" class="orbital-fallback" aria-hidden="true"><i></i><i></i><b>IN</b></div>
        <span class="orbit-note orbit-note-top">SYSTEM CORE</span>
        <span class="orbit-note orbit-note-bottom">Drag your pointer — explore the constellation.</span>
    </div>
</template>
