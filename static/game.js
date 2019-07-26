

var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

/*


// Renderer
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
*/


CameraControls.install( { THREE: THREE } );

/**
 * Scene
 */
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xffffff )

/**
 * Sizes
 */
const sizes = {}
sizes.width = window.innerWidth
sizes.height = window.innerHeight
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.shadowMap.enabled = true
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)

/**
 * Camera
 */
const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera( 60, sizes.width / sizes.height, 0.01, 100 );
const cameraControls = new CameraControls( camera, renderer.domElement );



/**
 * Resize
 */
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update
    renderer.setSize(sizes.width, sizes.height)
})

/**
 * Light 
 */
const ambientLight = new THREE.DirectionalLight(0xffffff, 1.2)
ambientLight.position.x = 0
ambientLight.position.y = 1
ambientLight.position.z = 1
scene.add(ambientLight)

/**
 * new element
 */


let array_player = new Array();
cameraControls.dollyTo(5, true)
cameraControls.setTarget(0, 0, -10, true)
let number_players = 0
socket.on('nb_player', (clients)=>{
  console.log(clients);
  console.log(clients.length);
});

socket.on('state', function(players) {
  scene.remove.apply(scene, scene.children);
  
  for (var id in players) {
    var player = players[id];
    let el = new Player(0xFF0000, scene, 1, 1, 1, 1, player.x, player.y, -10, id)
  }
});
socket.on('create_player', (players)=>{
  for (var id in players) {
    var player = players[id];
    //array_player.push(new Player(0xFF0000, scene, 1, 1, 1, 1, player.x, 0, -10, id))
  }
}
);

/**
 * Loop
 */
const loop = () =>
{
  
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );
    window.requestAnimationFrame(loop)
    renderer.render(scene, camera)
}
loop()