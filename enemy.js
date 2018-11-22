class Enemy {
    constructor() {
        this.enemies = [];
        this.pos = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.acc = createVector(0,0)
        this.health = enemyHealth;
        this.side = 20;
        this.damage = enemyDamage;
        this.uid = random(999999);
        
        this.hitInterval = 0;
    }

    spawn(amount) {
        for (this.i = 0; this.i < amount; this.i++) {
            this.enemies.push(new Enemy());
        }
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    isHitCharged() {
        if (this.hitInterval % (60 / enemyHitSpeed) == 0) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        if (this.hitInterval < 60 / enemyHitSpeed) {
            this.hitInterval++; 
        }

        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.pos.add(this.cameraMove);


        //push();
        //translate(this.side/2, this.side/2)
        this.destination = createVector(width/2 - this.side/2, height/2 - this.side/2);
        this.destination.sub(this.pos);
        this.destination.setMag(enemyMvmSpeed);
        this.acc = this.destination;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(enemyMvmSpeedLimit);
        this.draw();
        //pop();
        
    }
    
    draw() {
        push();
        // for (this.i = 0; this.i < this.enemies.length; this.i++) {
        //     this.colorIntensity = (this.enemies[this.i].health / enemyHealth)
        //     fill(255 * this.colorIntensity, 0, 0);
        //     rect(this.enemies[this.i].pos.x, this.enemies[this.i].pos.y,
        //          this.enemies[this.i].side, this.enemies[this.i].side);
        // }
        this.colorIntensity = (this.health / enemyHealth)
        fill(255 * this.colorIntensity, 0, 0);
        rect(this.pos.x, this.pos.y,
             this.side, this.side);

        pop();
    }

    pushAway(other) {
        this.pushForce = createVector(other.pos.x, other.pos.y);
        this.pushForce.sub(this.pos);
        this.pushForce.mult(-1);
        this.pushForce.setMag(1);

        this.pos.add(this.pushForce);
    }
}