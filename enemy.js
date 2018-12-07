class Enemy {
    constructor(arg) {
        this.enemies = [];
        if (arg != false) {

            if ( random(1) > 0.5) {
                this.pos = createVector(random(-width, 0), random(-height, height*2));
            } else {
                this.pos = createVector(random(width, width*2), random(-height, height*2));
            }

            //this.pos = createVector(500, 300);

            this.hitInterval = 0;
            this.vel = createVector(0, 0);
            this.acc = createVector(0,0)
            this.lastPiercingObject = -1;
            this.klass = 'enemy';
            

            this.currType = enemiesArr[1]
            this.currType = enemiesArr[Math.round(random(enemiesArr.length-1))];
            //RETURNS HASH

            
            this.lvl = player1.lvl + ( Math.round(random(1,3) ) );
            this.xpDrop = player1.lvl + this.lvl * Math.round(random(5,10));
            
            this.mvmSpeed = this.currType.mvmSpeed;
            this.mvmSpeedLimit = this.currType.mvmSpeedLimit;
            this.damage = this.currType.damage;
            this.hitSpeed = this.currType.hitSpeed;
            this.health = this.currType.health * (this.lvl + 1);
            this.maxHealth = this.health;
            this.armor = this.currType.armor;
            this.side = this.currType.side;
            this.color = this.currType.color;
            this.outline = this.currType.outline;


            //console.log(this.mvmSpeed, this.mvmSpeedLimit, this.damage, this.hitSpeed, this.health, this.side, this.color)
            
        }
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
        if (this.hitInterval % (60 / this.hitSpeed) == 0) {
            return true;
        } else {
            return false;
        }
    }

    update() {
        if (this.hitInterval < 60 / this.hitSpeed) {
            this.hitInterval++; 
        }

        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.pos.add(this.cameraMove);


        //push();
        //translate(this.side/2, this.side/2)
        this.destination = createVector(width/2 - this.side/2, height/2 - this.side/2);
        this.destination.sub(this.pos);
        this.destination.setMag(0.4);
        this.acc = this.destination;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(this.mvmSpeedLimit);
        if (!this.outOfBounds()) {        
            this.draw();
        }
        //pop();
        
    }

    outOfBounds() {
        if (this.pos.x + this.side < 0 || this.pos.y + this.side < 0) {
            return true;
        } else if (this.pos.x > width || this.pos.y > height) {
            return true;
        }
    }
    
    draw() {
            push();
            this.outline === true ? stroke(255) : noStroke();
            this.colorIntensity = (this.health / this.maxHealth);
            fill(this.color[0] * this.colorIntensity,
                 this.color[1] * this.colorIntensity,
                 this.color[2] * this.colorIntensity,
                 this.color[3]);

            rect(this.pos.x, this.pos.y, this.side, this.side);  
            pop();
    }

    pushAway(other) {
        this.pushForce = createVector(other.pos.x, other.pos.y);
        this.pushForce.sub(this.pos);
        this.pushForce.mult(-1);
        if (other.klass == 'circle') {
            this.pushForce.setMag(this.mvmSpeedLimit *1.15);
        } else {
            this.pushForce.setMag(this.mvmSpeed);
        }

        this.pos.add(this.pushForce);
    }

}