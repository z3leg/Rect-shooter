class Particle {
    constructor(obj, vel) {
        
        if (obj != null) {
            //Spawns on an objects position
            this.pos = createVector(obj.pos.x + obj.side/2, obj.pos.y+ obj.side/2);
            this.color = obj.color;
            this.side = obj.side/4;
            this.lifespan = 60 * 3;
            this.opacity = 255;

            //playerWeaponsArr[playerCurrWeapon]['projectileVelocity']


            this.move = createVector( (vel.x * 0.7) + obj.vel.x + random(-1, 1),
                                      (vel.y * 0.7) + obj.vel.y + random(-1, 1) );

            this.airResistance = createVector(-this.move.x * 0.5, -this.move.y * 0.5)
        } else {
            this.particlesArr = [];
        }
    }
    
    
    update() {
        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.pos.add(this.cameraMove);

        this.pos.add(this.move);
        this.pos.add(this.airResistance);

        this.draw();
    }
    
    draw() {
        push();
        //for (this.i = 0; this.i < this.particlesArr.length; this.i++) {
            noStroke();
            fill(this.color[0], this.color[1], this.color[2], 255);
            rect(this.pos.x, this.pos.y, this.side, this.side);

            this.lifespan--;

            if (this.lifespan < 1) {
                this.opacity--;
            }
        //}
        pop();
    }


    spawn(amount, obj, vel) {
        for (this.i = 0; this.i < amount; this.i++) {
            this.particlesArr.push(new Particle(obj, vel));
        }
    }


}