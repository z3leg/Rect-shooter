class Player {
    constructor() {
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.side = 30;
        this.pos = createVector(random(this.side *2,width-60), random(this.side *2,height-60));
        this.projectiles = [];
        this.klass = "circle";
        this.isAlive = true;

        this.shootInterval = 0;
        this.projectileAngle = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }
    shoot() {
        push();
        rotate(this.projectileAngle);
        if (this.shootInterval % (60 / playerShootingSpeed) == 0) {
            this.projectiles.push(new Projectile(this.pos, this.projectileAngle, playerProjectileVelocity));
			this.shootInterval = 0;
		}
        pop();
    }

    update() {
        if (this.isAlive) {
            if (this.shootInterval < 60 / playerShootingSpeed) {
                this.shootInterval++;
            }
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.vel.limit(playerMvmSpeedLimit);
            this.acc.mult(0);
            this.edges();
            this.draw(this.projectileAngle);
        }
    }

    draw(angle) {
        push();
        this.angle = angle;
        translate(this.pos.x, this.pos.y)
        rotate(angle);
        ellipse(0, 0, this.side, this.side);
        rect(0, -5, 20, 10);
        pop();
    }

    edges() {
        if (this.pos.x < this.side/2) {
            this.pos.x = this.side/2;
        } else if (this.pos.x > width - this.side/2) {
            this.pos.x = width - this.side/2;
        }

        if (this.pos.y < this.side/2) {
            this.pos.y = this.side/2;
        } else if (this.pos.y > height - this.side/2) {
            this.pos.y = height - this.side/2;
        }
    }
}