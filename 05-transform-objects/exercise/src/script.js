import './style.css'
import * as THREE from 'three'
import { AxesHelper } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = 0.7
mesh.position.y = -0.6
mesh.position.z = 1
/* mesh.position.x = 1 --> X = left & right ; y = up & down ; z = front and back ; arbitary position wrt to camera
position should be set before render (but anywhere before render and after creating var works)
position is a vector3(not just an object and has more methods than just x,y,z)
mesh.position.set(0.7, -0.6, 1) --> Setting properties of x,y and z at once*/
scene.add(mesh)
/*Axes helper*/
const axesHelper = new THREE.AxesHelper() //add numbers in () to increase length of axes
scene.add(axesHelper)
console.log(mesh.position.length()) //provides length of vector = dist between centre of screen and object

/* Scale is also vector3
mesh.scale.x = 1
mesh.scale.y = 1
mesh.scale.z = 1*/
mesh.scale.set(2, 0.5, 0.5)

/* Rotation -> Can be done using rotation or quaternion */
// With Rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25 // Rotation is Euler, NOT A VECTOR3 so less methods available
/*3.14 = pi = half a rotation
full rotation = 2 x 3.14 
to write pi = Math.PI */
/* Gimbal locked = one axis doesn't work anymore because you have exhausted the amount of rotation you can do. The rotation scales change based on how you rotate an object, when you rotate an object on x-axis the y-axis might not rotate in vertical manner but in horizontal manner*/
// To fix gimbal lock change order, do it before changing rotation -> use reorder method

// With Quartenion -> More mathematical but difficult to imagine


/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
/*camera.position.z = 3*/
camera.position.set(1, 1, 3)
scene.add(camera)
console.log(mesh.position.distanceTo(camera.position))// dist between camera and object
/*mesh.position.normalize() //normalize takes vector length and reduce it to 1;*/ 
// lookAt() method can be used to make an object look at something; works on Object3D; provide Vector3()
camera.lookAt(mesh.position)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)