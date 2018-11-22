function setup() {
	createCanvas(windowWidth-10,windowHeight-10);
	

	player1 = new Player();

	enemy = new Enemy();
	enemy.spawn(1);

	killCounter = 0;

	trail = new Trail();
	grid = new Grid(100,100);
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
	//enemy.draw();
	//console.log(player1.vel);

	



	// if (enemy.enemies.length > 250) {
	// 	enemyRenderAmount = 250;
	// } else {
		enemyRenderAmount = enemy.enemies.length;
	//}

	for (i = 0; i < enemy.enemies.length; i++) {

		currentEnemy = enemy.enemies[i];

		if (currentEnemy == null) {
			break;
		}
		currentEnemy.update();

		for (j = 0; j < enemy.enemies.length; j++) {
			if (enemy.enemies[j] == null) {
				break;
			}
			//Check if the distance between objects is enough to check the collision
			if (dist( currentEnemy.pos.x, currentEnemy.pos.y, enemy.enemies[j].pos.x, enemy.enemies[j].pos.y) < currentEnemy.side*2 + 10 ) {

				if (i != j && CollisionDetectionSquares(currentEnemy, enemy.enemies[j], true)) {
					currentEnemy.pushAway(enemy.enemies[j]);
					enemy.enemies[j].pushAway(currentEnemy);
				}
			}
		}
		//Check if the distance between objects is enough to check the collision
		if (dist( currentEnemy.pos.x, currentEnemy.pos.y, player1.pos.x, player1.pos.y ) < player1.side + currentEnemy.side + 50 ) {
			if ( CollisionDetectionSquares(currentEnemy, player1, false) ) {
				if (currentEnemy.isHitCharged()) {
					player1.takeDamage(currentEnemy.damage)
					currentEnemy.hitInterval = 0;
				}
			}
		}

		currentPiercedEnemy = enemy.enemies[i].uid

		if (enemy.enemies[i - 1] == null) {
			previousPiercedEnemy = enemy.enemies[i].uid;
		} else {
			previousPiercedEnemy = enemy.enemies[i - 1].uid
		}



		for (k = 0; k < player1.projectiles.length; k++) {
			if (enemy.enemies.length > 0 && player1.projectiles.length > 0) {
				if (!player1.projectiles[k].outOfBoundaries()) {
					if (CollisionDetectionSquares(enemy.enemies[i], player1.projectiles[k], false)) {

						console.log(previousPiercedEnemy, currentPiercedEnemy)
						if (currentPiercedEnemy == previousPiercedEnemy) {
							break;
						}

						if (player1.projectiles[k].piercedAmount >= playerProjectilePiercingForce - 1) {
							player1.projectiles.splice(k, 1);
						} else {
							player1.projectiles[k].piercedAmount += 1;
						}

						//previousPiercedEnemy = enemy.enemies[i]

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
