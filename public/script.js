//Set up socket client
var socket = io();
var reading;
var deltax = 0;
var deltay = 0;
socket.on('data', function(data){
  console.log('data: ' + data);
  reading = data;
  if(reading.substring(0, reading.indexOf(" ")) == "Sensor:"){
    reading = reading.substring(reading.indexOf(" ")+1);
    deltax = parseFloat(reading.substring(0, reading.indexOf(" ")));
    reading = reading.substring(reading.indexOf(" ")+1);
    deltay = parseFloat(reading);
    console.log(deltax);
    console.log(deltay);
  }
});

//Load File
$('input[type=file]').change(function () {
    console.log(this.files[0].mozFullPath);
});

// Setting up 3JS Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Load Object
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

//Render loop
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
  cube.rotation.x += deltax/500;
  cube.rotation.y += deltay/500;
}
animate();
