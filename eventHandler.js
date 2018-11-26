class EvenHandler {
    constructor() {

		this.shooting = false;
		this.reloaded = true;

    }



    update(mousePress) {
		this.isKeyPressed = false;
        if (keyIsDown(87)) { player1.applyForce(createVector(0, -playerMvmSpeed)), this.isKeyPressed = true;} //W
        if (keyIsDown(83)) { player1.applyForce(createVector(0, playerMvmSpeed)), this.isKeyPressed = true;} //S
        if (keyIsDown(65)) { player1.applyForce(createVector(-playerMvmSpeed, 0)), this.isKeyPressed = true;} //A
        if (keyIsDown(68)) { player1.applyForce(createVector(playerMvmSpeed, 0)), this.isKeyPressed = true;} //D
        

		if (playerControlls['rotating'] == 'mouse') {
			this.vMouse = createVector(mouseX-width/2, mouseY-height/2);
			player1.projectileAngle = this.vMouse.heading()
		} else if (playerControlls['rotating'] == 'keyboard') {
			if (keyIsDown(LEFT_ARROW)) {
				player1.projectileAngle -= playerRotateSpeed;
			}
			if (keyIsDown(RIGHT_ARROW)) {
				player1.projectileAngle += playerRotateSpeed;
			}
		}


		if ( playerControlls['shooting'] == 'mouse' ) {
			//Player this.shooting mouse
			if (mouseIsPressed) { if (mouseButton === LEFT) {this.shooting = true} }
			if (!mouseIsPressed) { if (mouseButton === LEFT) {this.shooting = false} }

			if (player1.weapon['rapidFire'] && this.shooting) {
				player1.shoot();
			} else {
				if (this.reloaded && this.shooting) {
					player1.shoot();
					this.reloaded = false;
				}
				if (!mouseIsPressed) { if (mouseButton === LEFT) {this.reloaded = true} }
			}

		} else if ( playerControlls['shooting'] == 'keyboard') {
			//Player this.shooting keyboard

			if (keyIsDown(32)) { this.shooting = true } else { this.shooting = false }

			if (player1.weapon['rapidFire'] && this.shooting) {
				player1.shoot();
			} else {
				
				if (this.reloaded && this.shooting) { player1.shoot(), this.reloaded = false }
				if (!keyIsDown(32)) { this.reloaded = true }
			}
		}



		//Slows the player down if no movement keys are pressed
		if (!this.isKeyPressed && Math.abs(player1.vel.x) > 0 || Math.abs(player1.vel.y) > 0) {
			player1.applyForce(createVector(-player1.vel.x * 0.1, -player1.vel.y * 0.1));
		}
    }

}

//NOT FINISHED