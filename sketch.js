function setup() {
	createCanvas(750,600);
	

	player1 = new Player();

	enemy = new Enemy();
	enemy.spawn(1);

	killCounter = 0;

	trail = new Trail();
}



function draw() {
	background(51);

	trail.update(player1.vel);
	trail.draw();
	//grid.draw(player1.vel);

	//console.log(frameRate());
	
	if (player1.health > 0) {
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
	enemy.draw();
	//console.log(player1.vel);

	





	for (i = 0; i < enemy.enemies.length; i++) {

		currentEnemy = enemy.enemies[i];

		if (currentEnemy == null) {
			break;
		}
		currentEnemy.update();

		for (j = 0; j < enemy.enemies.length; j++) {
			//Check if the distance between objects is enough to check the collision
			if (dist( currentEnemy.pos.x, currentEnemy.pos.y, enemy.enemies[j].pos.x, enemy.enemies[j].pos.y) < currentEnemy.side*2 + 10 ) {

				if (i != j && CollisionDetectionSquares(currentEnemy, enemy.enemies[j], true)) {
					currentEnemy.pushAway(enemy.enemies[j]);
					enemy.enemies[j].pushAway(currentEnemy);
				}
			}
		}
		//Check if the distance between objects is enough to check the collision
		//if (dist( currentEnemy.pos.x, currentEnemy.pos.y, player1.pos.x, player1.pos.y ) < player1.side + currentEnemy.side + 50 ) {
			if ( CollisionDetectionSquares(currentEnemy, player1, false) ) {
				if (currentEnemy.isHitCharged()) {
					player1.takeDamage(currentEnemy.damage)
					console.log("u got hit")
					currentEnemy.hitInterval = 0;
				}
			}
		//}
		for (k = 0; k < player1.projectiles.length; k++) {
			if (enemy.enemies.length > 0 && player1.projectiles.length > 0) {
				if (!player1.projectiles[k].outOfBoundaries()) {
					if (CollisionDetectionSquares(enemy.enemies[i], player1.projectiles[k], false)) {
						player1.projectiles.splice(k, 1);
						enemy.enemies[i].takeDamage(player1.damage);
						if (enemy.enemies[i].health <= 0) {
							killCounter++;
							enemy.enemies.splice(i, 1);
						}
					}
				}
			}
		}
	}
}
