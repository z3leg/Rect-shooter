function setup() {
	createCanvas(600,500);
	

	player1 = new Player();

	enemy = new Enemy();
	enemy.spawn(50);
}



function draw() {
	background(51);
	
	
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
	if (keyIsDown(70)) { //F
		enemy.spawn(50);
	}



	
	

	//Slows the player down if no movement keys are pressed
	if (!isKeyPressed && Math.abs(player1.vel.x) > 0 || Math.abs(player1.vel.y) > 0) {
		player1.applyForce(createVector(-player1.vel.x * 0.1, -player1.vel.y * 0.1));
	}

	for (i = 0; i < player1.projectiles.length; i++) {
		player1.projectiles[i].update();
		if (player1.projectiles[i].outOfBoundaries()) {
			player1.projectiles.splice(i, 1);
		}
	}

	
	player1.update(player1.projectileAngle);
	enemy.update();

	
	for (i = 0; i < enemy.enemies.length; i++) {
		enemy.enemies[i].update();
		for (j = 0; j < enemy.enemies.length; j++) {
			if (i != j && CollisionDetectionSquares(enemy.enemies[i], enemy.enemies[j], true)) {
				enemy.enemies[i].pushAway(enemy.enemies[j]);
				enemy.enemies[j].pushAway(enemy.enemies[i]);
			}
		}
		if ( CollisionDetectionSquares(enemy.enemies[i], player1, false) ) {
			//player1.isAlive = false;
		}
		
	}
	
	for (j = 0; j < enemy.enemies.length; j++) {
		for (i = 0; i < player1.projectiles.length; i++) {
			if (enemy.enemies.length > 0 && player1.projectiles.length > 0) {
				if (!player1.projectiles[i].outOfBoundaries()) {
					if (CollisionDetectionSquares(enemy.enemies[j], player1.projectiles[i], false)) {
						player1.projectiles.splice(i, 1);
						enemy.enemies.splice(j, 1);
					}
				}
			}
		}
	}
	//frameRate(30)
}
