class Projectile {
    constructor(pos, angle) {
        this.pos = createVector(pos.x, pos.y);
        this.vel = 4;
        this.r = 5;
        this.destination = p5.Vector.fromAngle(angle);
        //this.destination.setMag(10);
    }
    
    update() {
        this.destination.setMag(this.vel);
        this.pos.add(this.destination);
        this.draw();

    }

    draw() {
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}