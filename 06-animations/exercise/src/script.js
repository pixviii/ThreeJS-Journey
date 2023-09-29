import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

console.log(gsap)
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Clock - ThreeJS method
const clock = new THREE.Clock()

gsap.to(mesh.scale, { duration: 1, delay: 1, x: 2}) //gsap has it's own requestFrame function so you need not write it; here we are animating x property of scale

/** Time - for Vanilla JS method
let time = Date.now() **/

// Animations
const tick = () =>
{
    // 3. Adapting FPS - Use Time
    /** By using Time - Vanilla JS method
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime // update time for next tick **/
    
    // Using Clock
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    // 2. Update Objects
    /* For Vanilla JS method
    mesh.rotation.y += 0.01 * deltaTime //higher the frame rate, higher rotation; different devices have different frame rates **/
    camera.rotation.y = elapsedTime * Math.PI * 2 // Here Math.PI*2 is used for 1 revolution per second
    mesh.position.x = Math.sin(elapsedTime) // trigonometric operations
    camera.lookAt(mesh.position)
    /* NOTE: DO NOT USE getDelta() because it does things with getElapseTime()*/
    /* Library can be used to better animation. Many libraries but we are using GSAP*/
    // 1. Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick) //pass the function and not call; JS will call it on the next frame because thats how requestFrame works
}

tick()