class Player {
    constructor() {
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.r = 30;
        this.pos = createVector(random(this.r *2,width-60), random(this.r *2,height-60));
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.vel.limit(5);
        this.acc.mult(0);
        this.edges();
    }

    draw(angle) {
        push();
        translate(this.pos.x, this.pos.y)
        rotate(angle);
        ellipse(0, 0, this.r, this.r);
        rect(0, -5, 20, 10);
        pop();
    }

    edges() {
        if (this.pos.x < this.r/2) {
            this.pos.x = this.r/2;
        } else if (this.pos.x > width - this.r/2) {
            this.pos.x = width - this.r/2;
        }

        if (this.pos.y < this.r/2) {
            this.pos.y = this.r/2;
        } else if (this.pos.y > height - this.r/2) {
            this.pos.y = height - this.r/2;
        }
    }
}