class Projectile {
    constructor(pos, angle, vel) {
        this.vel = vel;
        this.klass = "circle";
        this.side = playerProjectileSize;
        this.muzzlePos = 15;
        this.destination = p5.Vector.fromAngle(angle);
        this.pos = createVector(pos.x + (this.destination.x * this.muzzlePos),
                                pos.y + (this.destination.y * this.muzzlePos));
        this.piercingForce = playerProjectilePiercingForce;
        this.piercedAmount = 0;
        this.uid = random(99999);
        //this.maxTravelDist = playerProjectileTravelDist;
        this.currTravelDist = 0;
        this.projectileRotation
    }
    
    update() {
        this.destination.setMag(this.vel);
        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.pos.add(this.cameraMove)

        this.pos.add(this.destination);
        this.draw();
        this.currTravelDist += Math.abs(this.destination.x)
        this.currTravelDist += Math.abs(this.destination.y)

    }

    draw() {
        push();
        noStroke();
        fill(playerProjectileColor[0], playerProjectileColor[1], playerProjectileColor[2]);
        translate(this.pos.x, this.pos.y);
        //Rotating the projectile before it leaves the player
        if (this.currTravelDist < 1) {
            this.projectileRotation = player1.projectileAngle;
        }
        rotate(this.projectileRotation)
        rect(0, 0, this.side, this.side/2 -2);
        //translate(0,0);
        pop();
    }
    outOfBoundaries() {
        if (this.pos.x + this.side > width) {
            return true;
        } else if (this.pos.x - this.side < 0) {
            return true;
        } else if (this.pos.y + this.side > height) {
            return true;
        } else if (this.pos.y - this.side < 0) {
            return true;
        }
    }
}