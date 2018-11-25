class EvenHandler {
    constructor() {

    }



    update() {
        if (keyIsDown(87)) { player1.applyForce(createVector(0, -playerMvmSpeed)), isKeyPressed = true;} //W
        if (keyIsDown(83)) { player1.applyForce(createVector(0, playerMvmSpeed)), isKeyPressed = true;} //S
        if (keyIsDown(65)) { player1.applyForce(createVector(-playerMvmSpeed, 0)), isKeyPressed = true;} //A
        if (keyIsDown(68)) { player1.applyForce(createVector(playerMvmSpeed, 0)), isKeyPressed = true;} //D
        

		if (playerControlls['mouse']) {
			vMouse = createVector(mouseX-width/2, mouseY-height/2);
			player1.projectileAngle = vMouse.heading()
		} else if (playerControlls['keyboard']) {
			if (keyIsDown(LEFT_ARROW)) {
				player1.projectileAngle -= playerRotateSpeed;
			}
			if (keyIsDown(RIGHT_ARROW)) {
				player1.projectileAngle += playerRotateSpeed;
			}
		}


		//Player shooting
		onmousedown = function(){shooting = true};
		onmouseup = function(){shooting = false};

		if (shooting) {
			player1.shoot();
		}


		if (keyIsDown(32)) { //SPACE
			player1.shoot();
		}
    }

}

//NOT FINISHED