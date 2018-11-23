function setup() {
	createCanvas(windowWidth-4,windowHeight-4);
	

	player1 = new Player();

	enemy = new Enemy(false);
	enemy.spawn(1);


	trail = new Trail();
	grid = new Grid(300,300);

	deathScreenVal = 0;
}



function draw() {
	
	background(51);
	grid.draw();
	
	//console.log(frameRate());
	
	trail.draw();

	if (player1.health > 0) {
		trail.update(player1.vel);
		isKeyPressed = false;
		if (keyIsDown(87)) { //W
			player1.applyForce(createVector(0, -playerMvmSpeed));
			isKeyPressed = true;
		}
		if (keyIsDown(83)) { //S
			player1.applyForce(createVector(0, playerMvmSpeed));
			isKeyPressed = true;
		}
		if (keyIsDown(65)) { //A
			player1.applyForce(createVector(-playerMvmSpeed, 0));
			isKeyPressed = true;
		}
		if (keyIsDown(68)) { //D
			player1.applyForce(createVector(playerMvmSpeed, 0));
			isKeyPressed = true;
		}
		if (keyIsDown(LEFT_ARROW)) {
			player1.projectileAngle -= playerRotateSpeed/10;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			player1.projectileAngle += playerRotateSpeed/10;
		}

		if (keyIsDown(32)) { //SPACE
			player1.shoot();
		}

	} else {
		if (deathScreenVal < 255) {
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
		//console.log(random(width, width*2), random(0, height*2));
		//console.log(random(-width, 0), random(-height, height));
	}


	
	

	//Slows the player down if no movement keys are pressed
	if (!isKeyPressed && Math.abs(player1.vel.x) > 0 || Math.abs(player1.vel.y) > 0) {
		player1.applyForce(createVector(-player1.vel.x * 0.1, -player1.vel.y * 0.1));
	}

	for (i = 0; i < player1.projectiles.length; i++) {
		player1.projectiles[i].update();
		if (player1.projectiles[i].currTravelDist > playerProjectileTravelDist) {
			player1.projectiles.splice(i, 1);
		}
	}
	
	player1.update(player1.projectileAngle);


	



	push();
	fill(255);
	textSize(30)
	text(frameRate(), 680, 20)
	text(enemy.enemies.length, 570, 20)
	pop();

	for (i = 0; i < maxRender; i++) {
		//if (i > maxRender) {
		//	break;
		//}

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
			


		for (k = 0; k < player1.projectiles.length; k++) {
			if (enemy.enemies.length > 0 && player1.projectiles.length > 0) {
				if (CollisionDetectionSquares(enemy.enemies[i], player1.projectiles[k], false)) {

					//If the currenct piercing object is the same, dont deal any damage
					if (enemy.enemies[i].lastPiercingObject != player1.projectiles[k].uid) {
						if (player1.projectiles[k].piercedAmount >= playerProjectilePiercingForce - 1) {
							player1.projectiles.splice(k, 1);
						} else {
							player1.projectiles[k].piercedAmount += 1;
						}
						
						
						enemy.enemies[i].takeDamage(player1.damage);
						if (enemy.enemies[i].health <= 0) {
							player1.kills++;
							player1.xp += enemy.enemies[i].xpDrop;
							enemy.enemies.splice(i, 1);
						} else {
							if (player1.projectiles[k] != null) {
								enemy.enemies[i].lastPiercingObject = player1.projectiles[k].uid;
							}
						}
					}
				}
			}
		}
	}
}
