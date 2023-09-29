import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
    CURSOR -> get co-ordinates of cursor
**/
const cursor = {
    x: 0,
    y:0
}
window.addEventListener('mousemove', (event) => {
    //console.log(event.clientX) //pixel value is bad because val is bigger when screen is bigger and if smaller then small like 800
    cursor.x = event.clientX / sizes.width - 0.5 //divided by width to generate smaller value ; to make val neg and pos we subtract - 0.5(non-mandate)
    cursor.y = - (event.clientY /sizes.height - 0.5)
    //console.log(cursor.x)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height) 
/* PARAMETERS with PerspectiveCamera
75 degrees -> vertical FOV/vertical vision angle(=) ; val between 45 and 75 ideal ; 
Aspect ration -> width of render/height of render
Near & Far parameters -> Any object before near and after far value won't be visible ; to avoid z-fighting, DO NOT use extreme values -> Z-FIGHTING = glitchy part when 2 objects intersect
*/

/*const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100) 
PARAM 1: distance to be rendered on left, right, top and bottom
PARAM 2: near and far
NOTE: We calculated AspectRatio to fix the render for Ortho camera. 
*/

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// ThreeJS in-built controls
    /*
    • Device orientation control - used mostly for smartphones, which have orientation control like seeing things in AR apps
    • Fly control - Fly like a space ship or rotate, do a barrel roll
    • First person control - Similar to fly but cannot see y-axis, like seeing things in first person except not being able to look up, no barrel roll
    • Pointer Lock Control - Like minecraft (W A S D to move and jump) mouse move to see, mousee is not visible on the screen ; fetches mouse and keyboard controls
    • OrbitControl - Cannot go below the floor or above the sky. Has zoom in and zoom out, can move with mouse
    • TrackballControls - No limit, can turn the world upside down
    • TransformControls - It is like editor - can be used to move objects in the render. Nothing to do with the camera.
    */

    // METHOD - 2 [OrbitControl] -> Not accessible using THREE.OrbitControl; fetch from webpack; check import statement(3)
    const controls = new OrbitControls(camera, canvas) //DOM event because we need to fetch mouse movement or touch event for iPad etc
    //controls.target.y = 2 ;;update is required after using target
    //controls.update()
    // Damping - smoothening the camera movement
    controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;

    // Update Camera -> Change position of camera and should be on right axis
    /*camera.position.x = cursor.x * 10 //*3 to add more aplitude
    camera.position.y = cursor.y * 10*/
    /* METHOD - 1 - CUSTOM CONTROL
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    camera.lookAt(mesh.position)*/

    // Update controls
    controls.update() // To keep inertia of damping
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()