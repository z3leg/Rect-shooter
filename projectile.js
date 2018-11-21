class Projectile {
    constructor(pos, angle, vel) {
        this.vel = vel;
        this.klass = "circle";
        this.side = 5;
        this.muzzlePos = 15;
        this.destination = p5.Vector.fromAngle(angle);
        this.pos = createVector(pos.x + (this.destination.x * this.muzzlePos),
                                pos.y + (this.destination.y * this.muzzlePos));
    }
    
    update() {
        this.destination.setMag(this.vel);
        this.pos.add(this.destination);
        this.draw();

    }

    draw() {
        ellipse(this.pos.x, this.pos.y, this.side, this.side);
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