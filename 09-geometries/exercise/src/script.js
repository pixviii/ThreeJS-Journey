import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 4, 4, 4) // 4s resemble segmentation; segmentation is used for dividing a geometry;; segmentation can be done to obtain more vertices so that those can be manipulated for example to make a hilly structure on a geometry
// BUFFER GEOMETRY - Custom geometry ;; Float32Array(Native JS) is used to store buffer geometry data(like UV, Normal, vertice co-ordinates)
/* Float32 array
    Typed array - only stores float
    Fixed length - can put only amt of values you declare
    Easier for computer to handle
    Two ways to fill in the array
*/
/* WAY 1
const positionsArray = new Float32Array(9) //Float32Array is a 1D array
positionsArray[0] = 0 // vertex 1- x
positionsArray[1] = 0 // vertex 1- y
positionsArray[2] = 0 // vertex 1- z

positionsArray[3] = 0 // vertex 2- x
positionsArray[4] = 1 // vertex 2- y
positionsArray[5] = 0 // vertex 2- z

positionsArray[6] = 1
positionsArray[7] = 0
positionsArray[8] = 0
// [TRIANGLE CREATION] ^
*/
/* WAY 2 - STEP 1*/
/*const positionsArray = new Float32Array([
    0, 0, 0,
    0, 1, 0,
    1, 0, 0,
])*/

//STEP 2 - Create BufferAttribute
/*
const positionAttribute = new THREE.BufferAttribute(positionsArray, 3) // 3 says one vertex contains 3 values so it directs; UV co-ordinates have 2 values per vertex

//STEP 3 - SENDING BUFFER ATTRIBUTE TO BUFFER GEOMETRY
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute) // Adding position attribute to the geometry ;; position is the value that will be used to provide to shaders hence it has to be 'position'
*/
const geometry = new THREE.BufferGeometry()

const count = 50
const positionsArray = new Float32Array(count * 3 * 3)

for(let i = 0; i<count * 3 * 3; i++){
    positionsArray[i] = Math.random()
}

const positionAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionAttribute)


const material = new THREE.MeshBasicMaterial({ 
    color: 0xff0000,
    wireframe: true //enables geometry to look like a wireframe
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()