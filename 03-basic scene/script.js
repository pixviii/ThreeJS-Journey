//Scene creation
const scene = new THREE.Scene()

//Creating Mesh - 3 parameters passed to BoxGeometry are size/units of box
//const is better at memory management
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red'})
const mesh = new THREE.Mesh(geometry, material) //A mesh consist of geometry and material
//Mesh should be added to the scene
scene.add(mesh)

// Size for Aspect Ratio
const sizes = {
    width: 800,
    height: 600
}

// Camera is needed to get a POV
// First parameter is FOV - How close or far camera is from the object/position
// Aspect Ratio is the second parameter - width divided by height - render size we decided prior to creating any render - viewport
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height )
camera.position.z = 4
camera.position.y = 1
camera.position.x = 1
// Add camera to the scene
scene.add(camera)

//Render of scene seen through your camera pov - drawn on canvas
const canvas = document.querySelector('.webgl')
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
    canvas //If property name is same as variable name then you can use one of them
})
renderer.setSize(sizes.width, sizes.height)
// There are SVG and CSS renderers too

//provide scene and camera to renderer
renderer.render(scene, camera)

// Transformation of objects - position, rotation, scale