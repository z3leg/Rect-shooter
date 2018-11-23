class Player {
    constructor() {
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.side = 30;
        this.pos = createVector(width/2, height/2);
        this.projectiles = [];
        this.klass = "circle";
        this.isAlive = true;
        this.health = playerHealth;
        this.damage = playerDamage;
        
        this.shootInterval = 0;
        this.projectileAngle = 0;


        this.kills = 0;
        this.xp = 0;
        this.lvl = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }
    shoot() {
        push();
        this.drawPos = createVector(width/2, height/2);
        rotate(this.projectileAngle);
        if (this.shootInterval % (60 / playerShootingSpeed) == 0) {
            this.projectiles.push(new Projectile(this.drawPos, this.projectileAngle, playerProjectileVelocity));
			this.shootInterval = 0;
		}
        pop();
    }
    takeDamage(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.isAlive = false;
            this.vel.mult(0);
        }
    }

    healthBar() {
        push();
        fill(0, 255, 0, 150);
        rect(width/2 - this.side, height/2 + this.side/2 + 5, this.health/1.5, 5);
        pop();
    }

    update() {
        if (this.isAlive) {
            if (this.shootInterval < 60 / playerShootingSpeed) {
                this.shootInterval++;
            }
            this.vel.add(this.acc);
            //this.pos.add(this.vel);
            this.vel.limit(playerMvmSpeedLimit);
            this.acc.mult(0);
            this.edges();
            this.draw(this.projectileAngle);
            this.healthBar();
        }
    }

    draw(angle) {
        textSize(30);
        fill(255);
        text("kills: " + this.kills, 10, 25);
        text("xp: " + this.xp, 10, 60);
        push();
        this.angle = angle;
        translate(width/2, height/2)
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