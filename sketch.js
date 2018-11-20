function setup() {
	createCanvas(600,500);
	player1 = new Player();
	projectiles = [];
	mvmSpeed = 1;
	spawnInterval = 0;
	projectileAngle = 0;
}



function draw() {
	background(51);
	isKeyPressed = false;


	if (keyIsDown(87)) { //W
		player1.applyForce(createVector(0, -mvmSpeed));
		isKeyPressed = true;
	}
	if (keyIsDown(83)) { //S
		player1.applyForce(createVector(0, mvmSpeed));
		isKeyPressed = true;
	}
	if (keyIsDown(65)) { //D
		player1.applyForce(createVector(-mvmSpeed, 0));
		isKeyPressed = true;
	}
	if (keyIsDown(68)) { //A
		player1.applyForce(createVector(mvmSpeed, 0));
		isKeyPressed = true;
	}

	if (keyIsDown(LEFT_ARROW)) {
		projectileAngle -= 0.1;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		projectileAngle += 0.1;
	}

	//console.log(projectileAngle);
	
	
	if (!isKeyPressed && Math.abs(player1.vel.x) > 0 || Math.abs(player1.vel.y) > 0) {
		player1.applyForce(createVector(-player1.vel.x * 0.1, -player1.vel.y * 0.1));
	}
	

	
	player1.update();
	player1.draw(projectileAngle);



	if (spawnInterval % 60 == 0) {
		projectiles.push(new Projectile(player1.pos, projectileAngle));
		spawnInterval = 0;
	}
	spawnInterval++;

	for (i = 0; i < projectiles.length; i++) {
		projectiles[i].update();
	}
}
