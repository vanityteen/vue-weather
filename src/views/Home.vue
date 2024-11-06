<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useEventListener } from '@vueuse/core';

type MESH = THREE.Group<THREE.Object3DEventMap>

let statueMesh = reactive<MESH | null>(null)
let renderer = reactive<THREE.WebGLRenderer | null>(null)
let scene = reactive<THREE.Scene | null>(null)
let camera = reactive<THREE.PerspectiveCamera | null>(null)

let pointLight = reactive<THREE.PointLight | null>(null)

const containerRef = ref<HTMLDivElement | null>(null)

function createScene() {
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (containerRef.value) {
        containerRef.value.appendChild(renderer.domElement)
    }
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff")
}

function createCamera() {
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    )
    camera.position.set(4, 0, 0)
    camera.zoom = 1;
}

function addPointLight() {
    pointLight = new THREE.PointLight(0xffffff, 5)
    pointLight.position.set(2, 1, 1)
    scene.add(pointLight)
}

function createShape() {
    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    loader.setDRACOLoader(dracoLoader)
    loader.load('src/assets/statue.glb', (gltf) => {
        const model = gltf.scene
        statueMesh = model

        if (statueMesh) {
            scene.add(statueMesh)
            camera.lookAt(statueMesh.position)
            renderer.render(scene, camera)
        }
    })
}

onMounted(() => {
    createScene();
    createCamera();
    addPointLight();
    createShape();
})

// operation
const handleMove = (e: MouseEvent) => {
    const { x, y } = e;
    const originX = window.innerWidth / 2
    const originY = window.innerHeight / 2

    const mouseX = ((originX - x) / window.innerWidth) * 2
    const mouseY = -((y - originY) / window.innerHeight) * 2

    pointLight.position.set(2, mouseY * 2, mouseX * 2)
    renderer.render(scene, camera)
}
useEventListener(document, "mousemove", handleMove);

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.render(scene, camera)
}
useEventListener(window, "resize", onWindowResize);

</script>

<template>
    <div ref="containerRef"></div>
</template>

<style scoped lang="less"></style>