<script setup>
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
    tone: { type: String, default: 'default' },
    /** knot | dots | shards | orbit — auto from tone if omitted */
    variant: { type: String, default: '' },
});

const mount = ref(null);
const resolved = computed(() => {
    if (props.variant) return props.variant;
    return ({
        about: 'shards',
        work: 'dots',
        experience: 'orbit',
        contact: 'knot',
        default: 'dots',
    })[props.tone] || 'dots';
});

let renderer, scene, camera, group, meshes = [], dust, frame, resize, intersection, destroyed = false;
let visible = true, reduced = false, paused = false, angle = 0, previous = 0, themeObserver;
const pointer = { x: 0, y: 0 };

const palette = () => {
    const dark = document.documentElement.dataset.theme !== 'light';
    return dark
        ? { a: 0xb1aeff, b: 0xd3fa9b, c: 0x6d8cff, dust: 0xc8cae0 }
        : { a: 0x4a47d4, b: 0x6f9e3d, c: 0x7a78e8, dust: 0x7a8296 };
};

function move(event) {
    if (reduced || paused || event.pointerType === 'touch') return;
    const rect = mount.value.getBoundingClientRect();
    pointer.x = (event.clientX - rect.left) / rect.width - .5;
    pointer.y = (event.clientY - rect.top) / rect.height - .5;
}
function reset() { pointer.x = 0; pointer.y = 0; }

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
    const mat = (hex, opacity = .9) => new THREE.MeshStandardMaterial({
        color: hex, emissive: hex, emissiveIntensity: .2, metalness: .3, roughness: .48, transparent: true, opacity,
    });

    if (variant === 'dots') {
        const count = 220;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 0.4 + Math.random() * 2.4;
            const t = Math.random() * Math.PI * 2;
            const p = (Math.random() - .5) * Math.PI;
            positions[i * 3] = Math.cos(t) * Math.cos(p) * r;
            positions[i * 3 + 1] = Math.sin(p) * r * .7;
            positions[i * 3 + 2] = Math.sin(t) * Math.cos(p) * r;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        dust = new THREE.Points(geo, new THREE.PointsMaterial({
            color: colors.dust, size: .045, transparent: true, opacity: .85, sizeAttenuation: true,
        }));
        group.add(dust);

        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.28, 0), mat(colors.a, .85));
        meshes = [core];
        group.add(core);
        return;
    }

    if (variant === 'shards') {
        const shapes = [
            new THREE.TetrahedronGeometry(.55),
            new THREE.OctahedronGeometry(.42),
            new THREE.TetrahedronGeometry(.32),
            new THREE.BoxGeometry(.28, .28, .28),
        ];
        meshes = shapes.map((geo, i) => {
            const mesh = new THREE.Mesh(geo, mat(i % 2 ? colors.b : colors.a, .82));
            const a = (i / shapes.length) * Math.PI * 2;
            mesh.position.set(Math.cos(a) * 1.2, Math.sin(a * 1.3) * .45, Math.sin(a) * 1.1);
            return mesh;
        });
        group.add(...meshes);
        return;
    }

    if (variant === 'orbit') {
        const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.35, .038, 12, 90), mat(colors.a, .92));
        const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.0, .03, 12, 80), mat(colors.b, .88));
        const ring3 = new THREE.Mesh(new THREE.TorusGeometry(.65, .024, 12, 70), mat(colors.c, .84));
        ring1.rotation.x = Math.PI / 2.6;
        ring2.rotation.x = Math.PI / 2.2;
        ring2.rotation.y = .4;
        ring3.rotation.x = Math.PI / 1.8;
        ring3.rotation.z = .5;
        const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(.32, 0), mat(colors.b, .95));
        meshes = [ring1, ring2, ring3, gem];
        group.add(...meshes);
        return;
    }

    // knot (default contact)
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(.5, .14, 110, 14), mat(colors.a));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, .03, 14, 70), mat(colors.b, .72));
    ring.rotation.x = Math.PI / 2.4;
    const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(.26, 0), mat(colors.c));
    gem.position.set(1.25, .55, .15);
    meshes = [knot, ring, gem];
    group.add(...meshes);
}

function render(time = 0) {
    if (!renderer || !visible || document.hidden || paused || reduced) {
        previous = time;
        return;
    }
    const delta = previous ? Math.min((time - previous) / 1000, .05) : 0;
    previous = time;
    angle += delta * .42;
    const variant = resolved.value;

    group.rotation.y = pointer.x * .35 + Math.sin(angle * .4) * .1;
    group.rotation.x = .15 + pointer.y * .18 + Math.cos(angle * .3) * .05;

    if (variant === 'dots' && dust) {
        dust.rotation.y = angle * .18;
        dust.rotation.x = Math.sin(angle * .2) * .12;
        meshes[0] && (meshes[0].rotation.y += delta * .6);
    } else if (variant === 'orbit') {
        meshes.forEach((mesh, i) => {
            if (i < 3) mesh.rotation.z += delta * (.35 + i * .12) * (i % 2 ? -1 : 1);
            else mesh.position.y = Math.sin(angle * 1.4) * .12;
        });
    } else if (variant === 'shards') {
        meshes.forEach((mesh, i) => {
            mesh.rotation.x += delta * (.4 + i * .1);
            mesh.rotation.y -= delta * (.35 + i * .08);
            mesh.position.y += Math.sin(angle + i) * .002;
        });
    } else {
        meshes.forEach((mesh, i) => {
            mesh.rotation.x += delta * (.25 + i * .08);
            mesh.rotation.y -= delta * (.3 + i * .05);
        });
    }

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
}

onMounted(async () => {
    if (!mount.value) return;
    reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.addEventListener('portfolio-motion', preferenceChange);
    mount.value.dataset.variant = resolved.value;

    if (reduced) {
        mount.value.classList.add('is-fallback');
        return;
    }

    const THREE = await import('three');
    if (destroyed || !mount.value) return;

    const width = mount.value.clientWidth || 320;
    const height = mount.value.clientHeight || 320;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(width, height, false);
    mount.value.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, width / height, .1, 40);
    camera.position.set(0, .15, 5.1);

    group = new THREE.Group();
    scene.add(group);
    buildScene(THREE, resolved.value, palette());

    scene.add(new THREE.AmbientLight(0xffffff, .75));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
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
    }, { threshold: .05 });
    intersection.observe(mount.value);

    themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    mount.value.addEventListener('pointermove', move);
    mount.value.addEventListener('pointerleave', reset);
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(render);
});

onBeforeUnmount(() => {
    destroyed = true;
    cancelAnimationFrame(frame);
    intersection?.disconnect();
    themeObserver?.disconnect();
    window.removeEventListener('portfolio-motion', preferenceChange);
    mount.value?.removeEventListener('pointermove', move);
    mount.value?.removeEventListener('pointerleave', reset);
    window.removeEventListener('resize', resize);
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
</script>

<template>
    <div
        ref="mount"
        class="ambient-scene"
        :class="[`tone-${tone}`, `variant-${resolved}`]"
        aria-hidden="true"
    >
        <div class="ambient-fallback" :data-variant="resolved"></div>
    </div>
</template>
