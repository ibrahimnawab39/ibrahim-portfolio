<script setup>
import { computed } from 'vue';

const props = defineProps({ project: Object, index: Number });

const kind = computed(() =>
    /flutter|mobile/i.test(props.project.category || '')
        ? 'mobile'
        : /wordpress|commerce|website/i.test(props.project.category || '')
            ? 'web'
            : 'system'
);

const hasImage = computed(() => !!props.project.image_path);

function tilt(event) {
    if (event.pointerType === 'touch' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--rx', `${((event.clientY - box.top) / box.height - .5) * -8}deg`);
    event.currentTarget.style.setProperty('--ry', `${((event.clientX - box.left) / box.width - .5) * 10}deg`);
}

function reset(event) {
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
}
</script>

<template>
    <div
        class="work-cover project-scene"
        :class="[`scene-${kind}`, { 'has-media': hasImage }]"
        @pointermove="tilt"
        @pointerleave="reset"
    >
        <template v-if="hasImage && kind === 'mobile'">
            <div class="phone-frame" aria-hidden="true">
                <span class="phone-notch"></span>
                <img :src="project.image_path" :alt="project.title" loading="lazy">
            </div>
            <span class="cover-badge">Mobile app</span>
        </template>

        <template v-else-if="hasImage">
            <div class="browser-frame" aria-hidden="true">
                <div class="browser-chrome"><i></i><i></i><i></i><span>{{ project.title }}</span></div>
                <img :src="project.image_path" :alt="project.title" loading="lazy">
            </div>
            <span class="cover-badge">Live product</span>
        </template>

        <template v-else>
            <span class="cover-caption">{{ project.category }} / {{ String(index + 1).padStart(2, '0') }}</span>
            <div class="project-stage" aria-hidden="true">
                <template v-if="kind === 'mobile'">
                    <div class="device-phone">
                        <span class="phone-island"></span>
                        <b>{{ project.title }}</b>
                        <div class="phone-orbit">✳</div>
                        <i></i><i></i>
                        <span class="phone-footer">EXPLORE THE EXPERIENCE ↗</span>
                    </div>
                    <div class="device-phone secondary-phone">
                        <span class="phone-island"></span>
                        <div class="phone-orbit">↗</div>
                        <i></i><i></i>
                    </div>
                </template>
                <template v-else-if="kind === 'web'">
                    <div class="device-browser">
                        <div class="browser-chrome"><i></i><i></i><i></i><span>{{ project.title }}</span></div>
                        <div class="browser-content">
                            <span>THE DIGITAL EXPERIENCE</span>
                            <b>{{ project.title }}<em>Designed to connect.</em></b>
                            <div class="browser-sculpture">✳</div>
                            <small>DISCOVER MORE ↗</small>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="system-plane plane-data"><span>DATA LAYER</span><i></i><i></i><i></i></div>
                    <div class="system-plane plane-api"><span>API / BUSINESS LOGIC</span><b>←→</b></div>
                    <div class="system-plane plane-product">
                        <span>PRODUCT EXPERIENCE</span>
                        <strong>{{ project.title }}</strong>
                        <div class="system-nodes"><i></i><i></i><i></i></div>
                    </div>
                </template>
            </div>
            <span class="cover-tech">{{ (project.tech_stack ?? []).slice(0, 3).join(' / ') }}</span>
            <span class="visual-note">Concept illustration</span>
        </template>

        <b class="work-arrow-round">↗</b>
    </div>
</template>
