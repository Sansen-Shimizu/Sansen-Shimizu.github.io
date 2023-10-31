

			/*/

			import * as THREE from 'https://cdn.skypack.dev/three@0.133.1/build/three.module.js';
			
			import { * as THREE } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/geometries/ParametricGeometry.js';
			import { * as THREE } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';
			import { * as THREE } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/DRACOLoader.js';
			
			import { GUI } from 'https://cdn.skypack.dev/dat.gui';
			import Stats from 'https://cdn.skypack.dev/stats.js'

			let scene, renderer, camera, stats;
			let textureLoader;

			/*/

			import * as THREE from 'https://sansen-shimizu.github.io/three.module.js';
			import * as THREE2 from 'https://sansen-shimizu.github.io/GLTFLoader.js';
			
			//console.log("#okay");
			import { GUI } from 'https://sansen-shimizu.github.io/dat.gui.module.js';
			//import { GUI } from 'https://cdn.skypack.dev/dat.gui';
			//console.log(THREE.REVISION)
			let scene, renderer, camera, stats;
			let textureLoader;
			

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
			// ---------------------------------------------------
			// sansenchan sleeves
			let sleeveVector1, sleeveVector2, sleeveVector3, tmpParticle;

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
			// ---------------------------------------------------
			// animation
			let model, skeleton, mixer;

			const crossFadeControls = [];

			let idleAction, walkAction, runAction, RPSDamn, RPSHopping, RPSYay, RPSPunch, RPSShocked, waveAction;
			let lastAction;
			let idleWeight, walkWeight, runWeight, damnWeight, hoppingWeight, yayWeight, punchWeight, shockedWeight, waveWeight;
			let actions, settings;

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
			// ---------------------------------------------------
			// control
			let RPSbutton, RPSRockButton, RPSScissorsButton, RPSPaperButton, RPSEnemyRock, RPSEnemyScissors, RPSEnemyPaper;
			
			let SansenChansChoice = 0;
			let PlayersChoice;

			let triggerState = {
				punchingOn: false,
				happyOn: false,
				surpriseOn: false,
				defeatedOn: false,
				rock: false,
				paper: false,
				scissors: false,
				reacting: false
			}

			function triggersOff(){
				triggerState.punchingOn = false;
				triggerState.happyOn = false;
				triggerState.surpriseOn = false;
				triggerState.defeatedOn = false;
				triggerState.rock = false;
				triggerState.paper = false;
				triggerState.scissors = false;
				triggerState.reacting = false;
			}

			const animationEnum = {
				idleAction :0, 
				walkAction :1, 
				runAction :2, 
				RPSDamn :3, 
				RPSHopping :4, 
				RPSYay :5, 
				RPSPunch :6, 
				RPSShocked :7, 
				waveAction :8
			}
			Object.freeze(animationEnum);

			const RPSEnum = {
				rock : 0,
				scissors : 1,
				paper : 2
			}
			Object.freeze(RPSEnum);
			let gameCount = 0;

			function getRandomInt(max) {
				return Math.floor(Math.random() * max);
			}
			function getRandomRPS(){
				return getRandomInt(3);
			}

			const container = document.getElementById( '3jsme' );
			const backupImage = document.getElementById( '3jsout' );

			let singleStepMode = false;
			let sizeOfNextStep = 0;

			function disableRPS(){
				let RPSbutton2 = body.getElementById("awef");
				RPSbutton2.style.setProperty();
			}

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			var clockControl; 

			// general clock manipulation and timer for syncing animations ticking other things etc.
			class ClockController {
				
				constructor(startTime = 0, time = 0){
					this.clock = new THREE.Clock();
					this.startTime = startTime;
					this.time = time;
					this.eventArray = [];
					this.lastDelta=0;
				}
				addTimer( clockControllerEvent ){
					this.eventArray.push(clockControllerEvent);
				}
				checkDelta(){
					return this.lastDelta;
				}
				updateDeltaAndEvents(){
					this.lastDelta = this.clock.getDelta();
					this.eventArray.forEach(event => event.updateByDelta(this.lastDelta));
					return this.lastDelta;
				}
				
			}
			// premature optimisation is the root of all evil
			let punchGraphicTimer;
			let clearPunchGraphicTimer;
			
			class Timer {
				constructor(callback, duration, enabled = false, onlyOnce = true){
					this.callback = callback;
					this.duration = duration;
					this.enabled = enabled;
					this.onlyOnce = onlyOnce;
					this.elapsedTime = 0.0;
				}
				restart(){
					this.enabled = true;
					this.elapsedTime = 0;
				}
				updateByDelta(delta){
					this.elapsedTime += delta;
					while (this.elapsedTime >= this.duration && this.enabled) {
						this.elapsedTime -= this.duration;
						this.callback();
						if(this.onlyOnce){
							this.enabled = false;
						}
					}
				}
			}



//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
			// ---------------------------------------------------
			// Cloth Simulation using a relaxed constraints solver
			const DAMPING = 0.03;
			const DRAG = 1 - DAMPING;
			const MASS = 0.01;
			const restDistance = 0.2;

			const xSegs = 4;
			const ySegs = 4;

			const clothFunction = plane( restDistance * xSegs, restDistance * ySegs );

			const GRAVITY = 981 * 0.02;
			const gravity = new THREE.Vector3( 0, - GRAVITY, 0 ).multiplyScalar( MASS );

			const TIMESTEP = 18 / 1000;
			const TIMESTEP_SQ = TIMESTEP * TIMESTEP;

			let pins = [];

			const tmpForce = new THREE.Vector3();
			const diff = new THREE.Vector3();

			class Particle {
				constructor( x, y, z, mass ) {
					this.position = new THREE.Vector3();
					this.previous = new THREE.Vector3();
					this.original = new THREE.Vector3();
					this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
					this.mass = mass;
					this.invMass = 1 / mass;
					this.tmp = new THREE.Vector3();
					this.tmp2 = new THREE.Vector3();
					clothFunction( x, y, this.position ); // position
					clothFunction( x, y, this.previous ); // previous
					clothFunction( x, y, this.original );
				}

				// Force -> Acceleration

				addForce( force ) {
					this.a.add(
						this.tmp2.copy( force ).multiplyScalar( this.invMass )
					);
				}

				// Performs Verlet integration

				integrate( timesq ) {
					const newPos = this.tmp.subVectors( this.position, this.previous );
					newPos.multiplyScalar( DRAG ).add( this.position );
					newPos.add( this.a.multiplyScalar( timesq ) );

					this.tmp = this.previous;
					this.previous = this.position;
					this.position = newPos;

					this.a.set( 0, 0, 0 );
				}

			}

			class Cloth {
				constructor( w = 10, h = 10, ox = 0, oy = 0, oz = 0 ) {
					this.w = w;
					this.h = h;

					const particles = [];
					const constraints = [];

					// Create particles
					for ( let v = 0; v <= h; v ++ ) {
						for ( let u = 0; u <= w; u ++ ) {
							particles.push(
								new Particle( u / w + ox, v / h + oy, 0 + oz, MASS )
							);
						}
					}

					// Structural
					for ( let v = 0; v < h; v ++ ) {
						for ( let u = 0; u < w; u ++ ) {
							constraints.push( [
								particles[ index( u, v ) ],
								particles[ index( u, v + 1 ) ],
								restDistance
							] );

							constraints.push( [
								particles[ index( u, v ) ],
								particles[ index( u + 1, v ) ],
								restDistance
							] );
						}
					}

					for ( let u = w, v = 0; v < h; v ++ ) {
						constraints.push( [
							particles[ index( u, v ) ],
							particles[ index( u, v + 1 ) ],
							restDistance

						] );
					}

					for ( let v = h, u = 0; u < w; u ++ ) {
						constraints.push( [
							particles[ index( u, v ) ],
							particles[ index( u + 1, v ) ],
							restDistance
						] );
					} 

					this.particles = particles;
					this.constraints = constraints;

					function index( u, v ) {
						return u + v * ( w + 1 );
					}
					this.index = index;
				}
			}

			function plane( width, height ) {
				return function ( u, v, target ) {
					const x = ( u - 0.5 ) * width;
					const y = ( v + 0.5 ) * height;
					const z = 0;
					
					target.set( x, y, z );
				};

			}

			function satisfyConstraints( p1, p2, distance ) {
				diff.subVectors( p2.position, p1.position );
				const currentDist = diff.length();
				if ( currentDist === 0 ) return; // prevents division by 0
				const correction = diff.multiplyScalar( 1 - distance / currentDist );
				const correctionHalf = correction.multiplyScalar( 0.5 );
				p1.position.add( correctionHalf );
				p2.position.sub( correctionHalf );
			}

			function updateCloth( now ) {
				_updateLeftCloth();
				_updateRightCloth2();
			}

			function _updateLeftCloth(){
				// Aerodynamics forces
				const particles = cloth.particles;
				for ( let i = 0, il = particles.length; i < il; i ++ ) {
					const particle = particles[ i ];
					particle.addForce( gravity );

					particle.integrate( TIMESTEP_SQ );
				}

				// Start Constraints
				const constraints = cloth.constraints;
				const il = constraints.length;

				for ( let i = 0; i < il; i ++ ) {
					const constraint = constraints[ i ];
					satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] );
				}

				// Floor Constraints
				for ( let i = 0, il = particles.length; i < il; i ++ ) {
					const particle = particles[ i ];
					const pos = particle.position;
					if ( pos.y < - 0 ) {
						pos.y = - 0;
					}
				}
				_leftPins(particles);
			}

			function _leftPins(particles){
				if(skeleton != null){
					// find the characters arm bones
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					
					var shoulder, elbow, hand;
					shoulder = 16; //upperarm002
					elbow = 14; //upperarm 001
					hand = 12; // forearm 001

					tmpParticle = particles[4];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[shoulder].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					tmpParticle = particles[3];
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					skeleton.bones[shoulder].getWorldPosition(sleeveVector1);
					skeleton.bones[elbow].getWorldPosition(sleeveVector2);
					sleeveVector3 = new THREE.Vector3();
					sleeveVector3.lerpVectors(sleeveVector1,sleeveVector2,0.5);
					tmpParticle.original.copy(sleeveVector3);
					
					tmpParticle = particles[2];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[elbow].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					tmpParticle = particles[1];
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					skeleton.bones[elbow].getWorldPosition(sleeveVector1);
					skeleton.bones[hand].getWorldPosition(sleeveVector2);
					sleeveVector3 = new THREE.Vector3();
					sleeveVector3.lerpVectors(sleeveVector1,sleeveVector2,0.5);
					tmpParticle.original.copy(sleeveVector3);
					
					tmpParticle = particles[0];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[hand].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					for ( let i = 0; i <= 4; i ++ ) {
						const p = particles[ i ];
						
						p.position.copy( p.original );
						p.previous.copy( p.original );
					}
				}
			}

			function _updateRightCloth2(){
				// Aerodynamics forces
				const particles = cloth2.particles;
				for ( let i = 0, il = particles.length; i < il; i ++ ) {
					const particle = particles[ i ];
					particle.addForce( gravity );
					particle.integrate( TIMESTEP_SQ );
				}

				// Start Constraints
				const constraints = cloth2.constraints;
				const il = constraints.length;
				for ( let i = 0; i < il; i ++ ) {
					const constraint = constraints[ i ];
					satisfyConstraints( constraint[ 0 ], constraint[ 1 ], constraint[ 2 ] );
				}

				// Floor Constraints
				for ( let i = 0, il = particles.length; i < il; i ++ ) {
					const particle = particles[ i ];
					const pos = particle.position;
					if ( pos.y < - 0 ) {
						pos.y = - 0;
					}
				}
				_rightPins(particles);
			}
			function _rightPins(particles){
				if(skeleton != null){
					// find the characters arm bones
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					
					var shoulder, elbow, hand;
					shoulder = 26; //upperarm002
					elbow = 24; //upperarm 001
					hand = 22; // forearm 001

					tmpParticle = particles[4];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[shoulder].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					tmpParticle = particles[3];
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					skeleton.bones[shoulder].getWorldPosition(sleeveVector1);
					skeleton.bones[elbow].getWorldPosition(sleeveVector2);
					sleeveVector3 = new THREE.Vector3();
					sleeveVector3.lerpVectors(sleeveVector1,sleeveVector2,0.5);
					tmpParticle.original.copy(sleeveVector3);
					
					tmpParticle = particles[2];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[elbow].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					tmpParticle = particles[1];
					sleeveVector1 = new THREE.Vector3();
					sleeveVector2 = new THREE.Vector3();
					skeleton.bones[elbow].getWorldPosition(sleeveVector1);
					skeleton.bones[hand].getWorldPosition(sleeveVector2);
					sleeveVector3 = new THREE.Vector3();
					sleeveVector3.lerpVectors(sleeveVector1,sleeveVector2,0.5);
					tmpParticle.original.copy(sleeveVector3);
					
					tmpParticle = particles[0];
					sleeveVector1 = new THREE.Vector3();
					skeleton.bones[hand].getWorldPosition(sleeveVector1);
					tmpParticle.original.copy(sleeveVector1);

					for ( let i = 0; i <= 4; i ++ ) {
						const p = particles[ i ];
						
						p.position.copy( p.original );
						p.previous.copy( p.original );

					}
				}
			}

			/* testing cloth simulation */
			const cloth = new Cloth( xSegs, ySegs );
			const cloth2 = new Cloth( xSegs, ySegs );

			const pinsFormation = [];
			pins = [ 6 ];

			pinsFormation.push( pins );

			pins = [ 0, 1, 2];
			pinsFormation.push( pins );

			pins = [ 0 ];
			pinsFormation.push( pins );

			pins = []; // cut the rope ;)
			pinsFormation.push( pins );

			pins = [ 0, cloth.w ]; // classic 2 pins
			pinsFormation.push( pins );

			pins = pinsFormation[ 1 ];

			function togglePins() {

				pins = pinsFormation[ 1 ];

			}
			let clothGeometry, clothGeometry2;
			let sphere;
			let object;

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function _punchStartCallback(){
				if(SansenChansChoice == RPSEnum.rock){
					container.appendChild(RPSEnemyRock);
				}
				if(SansenChansChoice == RPSEnum.scissors){
					container.appendChild(RPSEnemyScissors);
				}
				if(SansenChansChoice == RPSEnum.paper){
					container.appendChild(RPSEnemyPaper);
				}
				clearPunchGraphicTimer.restart()
			}
			function _punchEndCallback(){
				if(SansenChansChoice == RPSEnum.rock){
					container.removeChild(RPSEnemyRock);
				}
				if(SansenChansChoice == RPSEnum.scissors){
					container.removeChild(RPSEnemyScissors);
				}
				if(SansenChansChoice == RPSEnum.paper){
					container.removeChild(RPSEnemyPaper);
				}
			}
					

			function init() {
				camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 1000 );
				camera.position.set( 0, 2, 6 );
				camera.rotation.set(0,0,0);


				clockControl = new ClockController();
				punchGraphicTimer = new Timer( _punchStartCallback , 1.1, false);
				clearPunchGraphicTimer = new Timer( _punchEndCallback , 1, false);
				clockControl.addTimer(punchGraphicTimer);
				clockControl.addTimer(clearPunchGraphicTimer);
				
				scene = new THREE.Scene();
				scene.background = null;
				//scene.background =new THREE.Color( 0xffffff );
				//scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xedae49 );
				hemiLight.position.set( 0, 20, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 30, 10, 30 );
				dirLight.castShadow = false;
				dirLight.shadow.camera.top = 2;
				dirLight.shadow.camera.bottom = - 2;
				dirLight.shadow.camera.left = - 2;
				dirLight.shadow.camera.right = 2;
				dirLight.shadow.camera.near = 0.1;
				dirLight.shadow.camera.far = 40;
				scene.add( dirLight );

				// scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );
					/*/ floor
				const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
				mesh.rotation.x = - Math.PI / 2;
				mesh.receiveShadow = true;
				scene.add( mesh );
					/*/

				// cloth material
				const textureLoader = new THREE.TextureLoader();
				const clothTexture = textureLoader.load( 'https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6156b85744b257a5fa9b9795_sansensleeve.png' );
				clothTexture.anisotropy = 16;
				const clothMaterial = new THREE.MeshLambertMaterial( {
					map: clothTexture,
					side: THREE.DoubleSide,
					alphaTest: 0.5
				} );

				// cloth geometry
				clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );

				// cloth mesh
				object = new THREE.Mesh( clothGeometry, clothMaterial );
				object.position.set( 0, 0, 0 );
				object.castShadow = true;
				scene.add( object );

				// cloth geometry
				clothGeometry2 = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );

				object = new THREE.Mesh( clothGeometry2, clothMaterial );
				object.position.set( 0, 0, 0 );
				object.castShadow = true;
				scene.add( object );

				object.customDepthMaterial = new THREE.MeshDepthMaterial( {
					depthPacking: THREE.RGBADepthPacking,
					map: clothTexture,
					alphaTest: 0.5
				} );

				//====================================================================================================================================
				//====================================================================================================================================
				//====================================================================================================================================
				// SANSEN CHAN
				const gltfLoader = new THREE2.GLTFLoader();
				const dracoLoader = new THREE2.DRACOLoader();
				dracoLoader.setDecoderPath( 'https://cdn.jsdelivr.net/npm/three@0.133.1/examples/js/libs/draco/' );
				//https://cdn.jsdelivr.net/npm/three@0.133.1/examples/js/libs/draco/draco_decoder.js
				gltfLoader.setDRACOLoader( dracoLoader );
				
				gltfLoader.load( 'https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/616cc4e737a2ff660e32dfb9_sansenchanNLAfixed.glb.txt', function ( gltf ) {
					if(backupImage != null)
						backupImage.style.display = "none";

					model = gltf.scene;
					scene.add( model );

					model.traverse( function ( object ) {
						if ( object.isMesh ) object.castShadow = true;
					} );
					skeleton = new THREE.SkeletonHelper( model );
					skeleton.visible = false;

					scene.add( skeleton );
					
					createPanel();

					const animations = gltf.animations;
					//console.log(animations)
					mixer = new THREE.AnimationMixer( model );
					
					//idleAction, walkAction, runAction, RPSDamn, RPSHopping, RPSYay, RPSPunch, RPSShocked, waveAction
					idleAction = mixer.clipAction( animations[ 10 ] );
					walkAction = mixer.clipAction( animations[ 0 ] ); 
					runAction = mixer.clipAction( animations[ 8 ] );
					RPSDamn = mixer.clipAction( animations[ 2 ] );
					RPSHopping = mixer.clipAction( animations[ 3 ] );
					RPSYay = mixer.clipAction( animations[ 4 ] );
					RPSPunch = mixer.clipAction( animations[ 5 ] );
					RPSShocked = mixer.clipAction( animations[ 6 ] );
					waveAction = mixer.clipAction( animations[ 1 ] );
					setWeight(waveAction, 1);
					actions = [ idleAction, walkAction, runAction, RPSDamn, RPSHopping, RPSYay, RPSPunch, RPSShocked, waveAction ];
					lastAction = walkAction;
					activateAllActions();

					prepareCrossFade( lastAction, waveAction, 0.1);
					
					mixer.addEventListener( 'loop', function( e ) { 
						let name = e.action._clip.name;
						if(name == "RPS.punch"){
							//handle end of rps
							if(triggerState.punchingOn){
								triggerState.punchingOn = false;

								if(triggerState.rock){
									triggerState.rock = false;
									if(SansenChansChoice == RPSEnum.rock){
										triggerState.surpriseOn = true;
										prepareCrossFade(lastAction, RPSShocked, 0.25);
									}
									if(SansenChansChoice == RPSEnum.scissors){
										triggerState.defeatedOn = true;
										prepareCrossFade(lastAction, RPSDamn, 0.25);
									}
									if(SansenChansChoice == RPSEnum.paper){
										triggerState.happyOn = true;
										prepareCrossFade(lastAction, RPSYay, 0.25);
									}
									triggerState.surpriseOn = true;
								}

								if(triggerState.paper){
									triggerState.paper = false;
									if(SansenChansChoice == RPSEnum.rock){
										triggerState.defeatedOn = true;
										prepareCrossFade(lastAction, RPSDamn, 0.25);
									}
									if(SansenChansChoice == RPSEnum.scissors){
										triggerState.happyOn = true;
										prepareCrossFade(lastAction, RPSYay, 0.25);
									}
									if(SansenChansChoice == RPSEnum.paper){
										triggerState.surpriseOn = true;
										prepareCrossFade(lastAction, RPSShocked, 0.25);
									}
								}

								if(triggerState.scissors){
									triggerState.scissors = false;
									if(SansenChansChoice == RPSEnum.rock){
										triggerState.happyOn = true;
										prepareCrossFade(lastAction, RPSYay, 0.25);
									}
									if(SansenChansChoice == RPSEnum.scissors){
										triggerState.surpriseOn = true;
										prepareCrossFade(lastAction, RPSShocked, 0.25);
									}
									if(SansenChansChoice == RPSEnum.paper){
										triggerState.defeatedOn = true;
										prepareCrossFade(lastAction, RPSDamn, 0.25);
									}
								}
								
								triggerState.reacting = true;

							}
						}
						
						if(name == "RPS.ahhdamn"){
							if(triggerState.defeatedOn){
								triggerState.defeatedOn = false;
								if(getRandomInt(100) > 85){
									prepareCrossFade(lastAction, waveAction, 0.2);	
								} else {
									prepareCrossFade(lastAction, RPSHopping, 0.2);
								}
								triggerState.reacting = false;
							}
						}

						if(name == "RPS.oiwai"){
							if(triggerState.happyOn){
								triggerState.happyOn = false;
								if(getRandomInt(100) > 85){
									prepareCrossFade(lastAction, waveAction, 0.2);	
								} else {
									prepareCrossFade(lastAction, RPSHopping, 0.2);
								}
								triggerState.reacting = false;
							}
						}

						if(name == "RPS.shokku"){
							if(triggerState.surpriseOn){
								triggerState.surpriseOn = false;
								if(getRandomInt(100) > 85){
									prepareCrossFade(lastAction, waveAction, 0.2);	
								} else {
									prepareCrossFade(lastAction, RPSHopping, 0.2);
								}
								triggerState.reacting = false;
							}
						}

					} );
					
					mixer.addEventListener( 'finished', function( e ) {
						console.log("finished")
					} ); 

					animate(0);
				} );
				//====================================================================================================================================
				//====================================================================================================================================
				//====================================================================================================================================


				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setSize( container.clientWidth, container.clientHeight );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.shadowMap.enabled = true;
				renderer.setClearColor(0x0000000,0);
				container.appendChild( renderer.domElement );

				RPSbutton =  document.getElementById("RPS1");
				RPSRockButton = document.getElementById("RPSrock");
				RPSScissorsButton = document.getElementById("RPSscissors");
				RPSPaperButton = document.getElementById("RPSpaper");


				if(RPSRockButton == null){
					RPSRockButton = document.createElement("button");
					RPSRockButton.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6177aa7f289b1b07b6ff8f89_rock%20ZA%20FINAL.svg\"); background-size: cover; z-index: 9999999; font-size: 18px; border-radius: 100%; width: 80px; height: 80px; position: absolute; right: 110px; bottom: -10px";
					container.appendChild(RPSRockButton);
				}
				RPSRockButton.setAttribute("alt","グー");
				RPSRockButton.addEventListener('click', (event) => {
					if(triggerState.rock!=true && triggerState.paper!=true && triggerState.scissors!=true && triggerState.reacting!=true){
						prepareCrossFade( lastAction, RPSPunch, 0.3 );
						triggersOff();
						triggerState.punchingOn = true;
						triggerState.rock = true;
						PlayersChoice = RPSEnum.rock;
						SansenChansChoice = getRandomRPS();
						punchGraphicTimer.restart();
						container.removeChild(RPSEnemyRock);
						container.removeChild(RPSEnemyScissors);
						container.removeChild(RPSEnemyPaper);
					}
				});


				if(RPSScissorsButton == null){
					RPSScissorsButton = document.createElement("button");
					RPSScissorsButton.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6177aa806f89312b5f4a9ded_scissors%20ZA%20FINAL.svg\"); background-size: cover; z-index:9999999; font-size: 18px; border-radius: 100%; width: 80px; height: 80px; position: absolute; right: 27px; bottom: 39px";
					container.appendChild(RPSScissorsButton);
				}
				RPSRockButton.setAttribute("alt","チョキ");
				RPSScissorsButton.addEventListener('click', (event) => {
					if(triggerState.rock!=true && triggerState.paper!=true && triggerState.scissors!=true && triggerState.reacting!=true){
						prepareCrossFade( lastAction, RPSPunch, 0.3 );
						triggersOff();
						triggerState.punchingOn = true;
						triggerState.scissors = true;
						PlayersChoice = RPSEnum.scissors;
						SansenChansChoice = getRandomRPS();
						punchGraphicTimer.restart();
						container.removeChild(RPSEnemyRock);
						container.removeChild(RPSEnemyScissors);
						container.removeChild(RPSEnemyPaper);
					}
				});
				
				
				if(RPSPaperButton == null){
					RPSPaperButton = document.createElement("button");
					RPSPaperButton.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6177aa8057b46f749191c275_paper%20ZA%20FINAL.svg\"); background-size: cover; z-index:9999999; font-size: 18px; border-radius: 100%; width: 80px; height: 80px; position: absolute; right: -10px; bottom: 130px";
					container.appendChild(RPSPaperButton);	
				}
				RPSRockButton.setAttribute("alt","パー");
				RPSPaperButton.addEventListener('click', (event) => {
					if(triggerState.rock!=true && triggerState.paper!=true && triggerState.scissors!=true && triggerState.reacting!=true){
						prepareCrossFade( lastAction, RPSPunch, 0.3 );
						triggersOff();
						triggerState.punchingOn = true;
						triggerState.paper = true;
						PlayersChoice = RPSEnum.paper;
						SansenChansChoice = getRandomRPS();
						punchGraphicTimer.restart();
						container.removeChild(RPSEnemyRock);
						container.removeChild(RPSEnemyScissors);
						container.removeChild(RPSEnemyPaper);
					}
				});
				
				container.style.setProperty('position','relative');

				RPSEnemyRock = document.createElement("div");
				RPSEnemyRock.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db82881c1407c68d3dd0_rockchan%20ZA%20FINAL.svg\"); background-size: cover; z-index:9999999; font-size: 18px; border-radius: 100%; width: 120px; height: 120px; position: absolute; left: 30%; bottom: 30%";
				
				RPSEnemyScissors = document.createElement("div");
				RPSEnemyScissors.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db8303b4f3a5d0a09ee7_scissorschan%20ZA%20FINAL.svg\"); background-size: cover; z-index:9999999; font-size: 18px; border-radius: 100%; width: 120px; height: 120px; position: absolute; left: 30%; bottom: 30%";
				
				RPSEnemyPaper = document.createElement("div");
				RPSEnemyPaper.style = "background-image: url(\"https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db821a30829b226c92cb_paperchan%20ZA%20FINAL.svg\"); background-size: cover; z-index:9999999; font-size: 18px; border-radius: 100%; width: 120px; height: 120px; position: absolute; left: 30%; bottom: 30%";
				

				/*
				https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db82881c1407c68d3dd0_rockchan%20ZA%20FINAL.svg
				https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db8303b4f3a5d0a09ee7_scissorschan%20ZA%20FINAL.svg
				https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6178db821a30829b226c92cb_paperchan%20ZA%20FINAL.svg
				*/

				//====================================================================================================================================
				//====================================================================================================================================
				window.addEventListener( 'resize', onWindowResize );
			}

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function createPanel() {
				const panel = new GUI({hideable: false});//{width: 400});//
				panel.hide();
				
				const folder1 = panel.addFolder( 'Visibility' );
				const folder2 = panel.addFolder( 'Activation/Deactivation' );
				const folder3 = panel.addFolder( 'Pausing/Stepping' );
				const folder4 = panel.addFolder( 'Crossfading' );
				const folder5 = panel.addFolder( 'Blend Weights' );
				const folder6 = panel.addFolder( 'General Speed' );
				
				settings = {
					'show model': true,
					'show skeleton': false,
					'deactivate all': deactivateAllActions,
					'activate all': activateAllActions,
					'pause/continue': pauseContinue,
					'make single step': toSingleStepMode,
					'modify step size': 0.05,
					'from walk to idle': function () {
						prepareCrossFade( walkAction, idleAction, 0.25 );
					},
					'from idle to walk': function () {
						prepareCrossFade( idleAction, walkAction, 0.25 );
					},
					'from walk to run': function () {
						prepareCrossFade( walkAction, runAction, 0.25 );
					},
					'from run to walk': function () {
						prepareCrossFade( runAction, walkAction, 0.25 );
					},
					'use default duration': true,
					'set custom duration': 3.5,
					'modify idle weight': 0.0,
					'modify walk weight': 1.0,
					'modify run weight': 0.0,
					'modify damnWeight weight': 0.0,
					'modify hoppingWeight weight': 0.0,
					'modify yayWeight weight': 0.0,
					'modify punchWeight weight': 0.0,
					'modify shockedWeight weight': 0.0,
					'modify waveWeight weight': 0.0,
					'modify time scale': 1.0,
				};

				folder2.add( settings, 'deactivate all' );
				folder2.add( settings, 'activate all' );
				folder3.add( settings, 'pause/continue' );
				folder3.add( settings, 'make single step' );
				folder3.add( settings, 'modify step size', 0.01, 0.1, 0.001 );
				crossFadeControls.push( folder4.add( settings, 'from walk to idle' ) );
				crossFadeControls.push( folder4.add( settings, 'from idle to walk' ) );
				crossFadeControls.push( folder4.add( settings, 'from walk to run' ) );
				crossFadeControls.push( folder4.add( settings, 'from run to walk' ) );
				folder4.add( settings, 'use default duration' );
				folder4.add( settings, 'set custom duration', 0, 10, 0.01 );
				folder5.add( settings, 'modify idle weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( idleAction, weight );
				} );
				folder5.add( settings, 'modify walk weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( walkAction, weight );
				} );
				folder5.add( settings, 'modify run weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( runAction, weight );
				} );
				folder5.add( settings, 'modify damnWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( RPSDamn, weight );
				} );
				folder5.add( settings, 'modify hoppingWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( RPSHopping, weight );
				} );
				folder5.add( settings, 'modify yayWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( RPSYay, weight );
				} );
				folder5.add( settings, 'modify punchWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( RPSPunch, weight );
				} );
				folder5.add( settings, 'modify shockedWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( RPSShocked, weight );
				} );
				folder5.add( settings, 'modify waveWeight weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {
					setWeight( waveAction, weight );
				} );
				folder6.add( settings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );
				
				folder1.open();
				folder2.open();
				folder3.open();
				folder4.open();
				folder5.open();
				folder6.open();

				crossFadeControls.forEach( function ( control ) {
					control.classList1 = control.domElement.parentElement.parentElement.classList;
					control.classList2 = control.domElement.previousElementSibling.classList;

					control.setDisabled = function () {
						control.classList1.add( 'no-pointer-events' );
						control.classList2.add( 'control-disabled' );
					};

					control.setEnabled = function () {
						control.classList1.remove( 'no-pointer-events' );
						control.classList2.remove( 'control-disabled' );
					};
				} );
			}
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================


			function modifyTimeScale( speed ) {

				mixer.timeScale = speed;

			}


			function deactivateAllActions() {

				actions.forEach( function ( action ) {

					action.stop();

				} );

			}

			function activateAllActions() {

				setWeight( idleAction, settings[ 'modify idle weight' ] );
				setWeight( walkAction, settings[ 'modify walk weight' ] );
				setWeight( runAction, settings[ 'modify run weight' ] );
				setWeight( RPSDamn, settings[ 'modify RPSDamn weight' ] );
				setWeight( RPSHopping, settings[ 'modify RPSHopping weight' ] );
				setWeight( RPSYay, settings[ 'modify RPSYay weight' ] );
				setWeight( RPSPunch, settings[ 'modify RPSPunch weight' ] );
				setWeight( RPSShocked, settings[ 'modify RPSShocked weight' ] );
				setWeight( waveAction, settings[ 'modify waveAction weight' ] );
				actions.forEach( function ( action ) {

					action.play();

				} );

			}

//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function pauseContinue() {

				if ( singleStepMode ) {

					singleStepMode = false;
					unPauseAllActions();

				} else {

					if ( idleAction.paused ) {

						unPauseAllActions();

					} else {

						pauseAllActions();

					}

				}

			}

			function pauseAllActions() {

				actions.forEach( function ( action ) {

					action.paused = true;

				} );

			}

			function unPauseAllActions() {

				actions.forEach( function ( action ) {

					action.paused = false;

				} );

			}

			function toSingleStepMode() {

				unPauseAllActions();

				singleStepMode = true;
				sizeOfNextStep = settings[ 'modify step size' ];

			}
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function prepareCrossFade( startAction, endAction, defaultDuration ) {

				// Switch default / custom crossfade duration (according to the user's choice)
				lastAction = endAction;
				const duration = setCrossFadeDuration( defaultDuration );

				// Make sure that we don't go on in singleStepMode, and that all actions are unpaused

				singleStepMode = false;
				unPauseAllActions();

				// If the current action is 'idle' (duration 4 sec), execute the crossfade immediately;
				// else wait until the current action has finished its current loop

				if ( true){ //startAction === idleAction ) {

					executeCrossFade( startAction, endAction, duration );

				} else {

					synchronizeCrossFade( startAction, endAction, duration );

				}

			}

			function setCrossFadeDuration( defaultDuration ) {

				// Switch default crossfade duration <-> custom crossfade duration

				if ( settings[ 'use default duration' ] ) {

					return defaultDuration;

				} else {

					return settings[ 'set custom duration' ];

				}

			}

			function synchronizeCrossFade( startAction, endAction, duration ) {

				mixer.addEventListener( 'loop', onLoopFinished );

				function onLoopFinished( event ) {

					if ( event.action === startAction ) {

						mixer.removeEventListener( 'loop', onLoopFinished );

						executeCrossFade( startAction, endAction, duration );

					}

				}

			}

			function executeCrossFade( startAction, endAction, duration ) {

				// Not only the start action, but also the end action must get a weight of 1 before fading
				// (concerning the start action this is already guaranteed in this place)

				setWeight( endAction, 1 );
				endAction.time = 0;

				// Crossfade with warping - you can also try without warping by setting the third parameter to false

				startAction.crossFadeTo( endAction, duration, true );

			}

			// This function is needed, since animationAction.crossFadeTo() disables its start action and sets
			// the start action's timeScale to ((start animation's duration) / (end animation's duration))

			function setWeight( action, weight ) {

				action.enabled = true;
				action.setEffectiveTimeScale( 1 );
				action.setEffectiveWeight( weight );

			}

			// Called by the render loop

			function updateWeightSliders() {

				settings[ 'modify idle weight' ] = idleWeight;
				settings[ 'modify walk weight' ] = walkWeight;
				settings[ 'modify run weight' ] = runWeight;

				settings[ 'modify damnWeight weight' ] = damnWeight;
				settings[ 'modify hoppingWeight weight' ] = hoppingWeight;
				settings[ 'modify yayWeight weight' ] = yayWeight;

				settings[ 'modify punchWeight weight' ] = punchWeight;
				settings[ 'modify shockedWeight weight' ] = shockedWeight;
				settings[ 'modify waveWeight weight' ] = waveWeight;

			}

			// Called by the render loop

			function updateCrossFadeControls() {

				crossFadeControls.forEach( function ( control ) {

					control.setDisabled();

				} );

				if ( idleWeight === 1 && walkWeight === 0 && runWeight === 0 ) {

					crossFadeControls[ 1 ].setEnabled();

				}

				if ( idleWeight === 0 && walkWeight === 1 && runWeight === 0 ) {

					crossFadeControls[ 0 ].setEnabled();
					crossFadeControls[ 2 ].setEnabled();

				}

				if ( idleWeight === 0 && walkWeight === 0 && runWeight === 1 ) {

					crossFadeControls[ 3 ].setEnabled();

				}

			}
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function onWindowResize() {

				camera.aspect = container.clientWidth / container.clientHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( container.clientWidth, container.clientHeight );

			}
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function animate( now ) {	
				// Render loop

				requestAnimationFrame( animate );

				updateCloth( now );
				renderCloth();

				idleWeight = idleAction.getEffectiveWeight();
				walkWeight = walkAction.getEffectiveWeight();
				runWeight = runAction.getEffectiveWeight();
				damnWeight = RPSDamn.getEffectiveWeight();
				hoppingWeight = RPSHopping.getEffectiveWeight();
				yayWeight = RPSYay.getEffectiveWeight();
				punchWeight = RPSPunch.getEffectiveWeight();
				shockedWeight = RPSShocked.getEffectiveWeight();
				waveWeight = waveAction.getEffectiveWeight();

				updateCrossFadeControls();

				clockControl.updateDeltaAndEvents();
				let clockDelta = clockControl.checkDelta();

				//console.log(clockDelta);
				if ( singleStepMode ) {
					clockDelta = sizeOfNextStep;
					sizeOfNextStep = 0;
				}
				mixer.update( clockDelta );

				renderer.render( scene, camera );


			}
			
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			function renderCloth() {

				const p = cloth.particles;

				for ( let i = 0, il = p.length; i < il; i ++ ) {

					const v = p[ i ].position;

					clothGeometry.attributes.position.setXYZ( i, v.x, v.y, v.z );

				}

				clothGeometry.attributes.position.needsUpdate = true;

				clothGeometry.computeVertexNormals();


				const p2 = cloth2.particles;

				for ( let i = 0, il = p2.length; i < il; i ++ ) {

					const v = p2[ i ].position;

					clothGeometry2.attributes.position.setXYZ( i, v.x, v.y, v.z );

				}

				clothGeometry2.attributes.position.needsUpdate = true;

				clothGeometry2.computeVertexNormals();

			}
			 
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================
//====================================================================================================================================

			
			init();

		
