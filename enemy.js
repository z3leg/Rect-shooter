class Enemy {
    constructor() {
        this.enemies = [];
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0,0)
        this.health = 100;
        this.side = 20;
    }

    spawn(amount) {
        for (this.i = 0; this.i < amount; this.i++) {
            this.enemies.push(new Enemy());
        }
    }

    update() {
        this.destination = createVector(player1.pos.x, player1.pos.y);
        this.destination.sub(this.pos);
        this.destination.setMag(enemyMvmSpeed);
        this.acc = this.destination;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(enemyMvmSpeedLimit);
        //this.vel = player1.pos.sub(this.pos);
        
        this.draw();
    }
    
    draw() {
        push();
        for (this.i = 0; this.i < this.enemies.length; this.i++) {
            fill(255, 0, 0);
            rect(this.enemies[this.i].pos.x, this.enemies[this.i].pos.y,
                 this.enemies[this.i].side, this.enemies[this.i].side);
        }
        pop();
    }

    pushAway(other) {
        this.pushForce = createVector(other.pos.x, other.pos.y);
        this.pushForce.sub(this.pos);
        this.pushForce.mult(-1);
        this.pushForce.setMag(0.1);

        this.pos.add(this.pushForce);
    }
}