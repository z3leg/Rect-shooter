function setup() {
	canvas = createCanvas(windowWidth-5,windowHeight-5);
	

	player1 = new Player();

	enemy = new Enemy(false);
	enemy.spawn(1);


	trail = new Trail();
	grid = new Grid(300,300);
	particle = new Particle();
	eventHandler = new EvenHandler();

	//console.log(particle)

	deathScreenVal = 0;
	frameRateInterval = 0;
	//addEventListener(onmousedown, console.log("so"));
}



function draw() {
	//frameRate(20)


	background(51);
	grid.draw();
	
	//trail.draw();

	if (player1.health > 0) {
		//trail.update(player1.vel);

		eventHandler.update();



	} else {

		//Deathscreen
		if (deathScreenVal < 200) {
			deathScreenVal++;
		}
		push();
		fill(255, 0, 0, deathScreenVal);
		rect(0, 0, width, height);

		fill(255, 255, 255, deathScreenVal);
		textSize(60)
		textAlign(CENTER)
		text("You died", width/2, height/2)
		pop();
	}


	if (keyIsDown(78)) { //N
		for (i = 0; i < enemy.enemies.length; i++) {
			enemy.enemies.splice(i, 1);
		}
	}
	if (keyIsDown(70)) { //F
		enemy.spawn(50);
	}



	//Removing projectiles when they exceed the travel dist
	for (i = 0; i < player1.projectiles.length; i++) {
		player1.projectiles[i].update();
		if (player1.projectiles[i].currTravelDist > player1.projectiles[i].travelDist) {
			player1.projectiles.splice(i, 1);
		}
	}
	
	player1.update(player1.projectileAngle);

	//particle.particlesArr.update();


	



	push();
	fill(255);
	textSize(30)
	if (frameRateInterval > 10) {
		frames = frameRate().toFixed(1)
		frameRateInterval = 0;
	} else {
		frameRateInterval++
	}
	text(frames, 680, 30)

	text(enemy.enemies.length, 570, 30)
	pop();




	//Big loop
	for (i = 0; i < maxRender; i++) {

		currentEnemy = enemy.enemies[i];

		if (currentEnemy == null) {
			break;
		}
		if (player1.isAlive) {
			currentEnemy.update();
		}

		for (j = 0; j < enemy.enemies.length; j++) {
			if (enemy.enemies[j] == null) {
				break;
			}
			//Check if the distance between objects is enough to check the collision
			if (dist( currentEnemy.pos.x, currentEnemy.pos.y, enemy.enemies[j].pos.x, enemy.enemies[j].pos.y) < currentEnemy.side*2 + 200 ) {

				if (i != j && CollisionDetectionSquares(currentEnemy, enemy.enemies[j], true)) {
					currentEnemy.pushAway(enemy.enemies[j]);
					enemy.enemies[j].pushAway(currentEnemy);
				}
			}
		}
		if (player1.isAlive) {
			//Check if the distance between objects is enough to check the collision
			if (dist( currentEnemy.pos.x, currentEnemy.pos.y, player1.pos.x, player1.pos.y ) < player1.side + currentEnemy.side + 50 ) {
				if ( CollisionDetectionSquares(currentEnemy, player1, false) ) {
					currentEnemy.pushAway(player1);
					if (currentEnemy.isHitCharged()) {
						push();
						fill(255, 0, 0, 70);
						rect(0, 0, width, height);
						pop();
						player1.takeDamage(currentEnemy.damage)
						currentEnemy.hitInterval = 0;
					}
				}
			}
		}
			


		//Collision between projectiles and enemies
		for (k = 0; k < player1.projectiles.length; k++) {
			if (enemy.enemies.length > 0 && player1.projectiles.length > 0) {
				if (CollisionDetectionSquares(enemy.enemies[i], player1.projectiles[k], false)) {

					//If the currenct piercing object is the same, dont deal any damage
					if (enemy.enemies[i].lastPiercingObject != player1.projectiles[k].uid) {

						
						enemy.enemies[i].takeDamage(player1.damage);
						player1.projectiles[k].piercingForce -= enemy.enemies[i].armor;
						
						//Enemy death
						if (enemy.enemies[i].health <= 0) {
							player1.kills++;
							player1.xp += enemy.enemies[i].xpDrop;


							particle.spawn(5, enemy.enemies[i], player1.projectiles[k].destination);


							enemy.enemies.splice(i, 1);
						} else {
							enemy.enemies[i].lastPiercingObject = player1.projectiles[k].uid;
						}
						
						//Projectile death
						if (player1.projectiles[k].piercingForce <= 0) {
							player1.projectiles.splice(k, 1);
						}
					}
				}
			}
		}
		
		// if (particle.particlesArr.length > 0 && i < particle.particlesArr.length) {
		// 	//drawing particles
		// 	particle.particlesArr[i].update();

			
		// 	if (particle.particlesArr[i].opacity < 0) {
		// 		particle.particlesArr.splice(i, 1);
		// 	}
		// }
	}
	if (particle.particlesArr.length > 0) {
		particle.update()
	}

	//drawing particles
	//for (u = 0; u < particle.particlesArr.length; u++) {

		//particle.particlesArr[u].update();
		
		
		//if (particle.particlesArr[u].opacity < 1) {
		//	particle.particlesArr.splice(u, 1);
		//}
	//}
}
