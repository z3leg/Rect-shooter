class Particle {
    constructor(obj, vel) {
        
        if (obj != null) {
            this.color = obj.color;
            this.side = obj.side/4;
            this.lifespan = 60 * 3;
            this.opacity = 255;
            this.projectileVel = vel;
            this.enemyObj = obj;

            this.pos = createVector( random(obj.pos.x, obj.pos.x + obj.side), random(obj.pos.y, obj.pos.y + obj.side))

            this.move = createVector( (this.projectileVel.x * 0.3) + this.enemyObj.vel.x + random(-1, 1), (this.projectileVel.y * 0.3) + this.enemyObj.vel.y + random(-1, 1));
            
            
            this.airResistance = createVector(-this.move.x * 0.3, -this.move.y * 0.3)
            
        } else {
            this.particlesArr = [];
        }
    }
    
    //  BROKEN; DONT WORK
    update() {
        for (this.i = 0; this.i < this.particlesArr.length; this.i++) {

            
            this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
            
            this.particlesArr[this.i].pos.add(this.cameraMove);
            this.particlesArr[this.i].pos.add(this.particlesArr[this.i].move);
            
            this.particlesArr[this.i].pos.add(this.particlesArr[this.i].airResistance);
            
            this.particlesArr[this.i].draw();
            if (this.particlesArr[this.i].opacity < 1) { this.particlesArr.splice(this.i, 1); }
        }
    }
    
    draw() {
        push();
        //for (this.i = 0; this.i < this.particlesArr.length; this.i++) {
            noStroke();
            fill(this.color[0], this.color[1], this.color[2], 255);
            rect(this.pos.x, this.pos.y, this.side, this.side);

            this.lifespan--;

            if (this.lifespan < 1) { this.opacity-- }
        //}
        pop();
    }

    mapPos() {
        // for (this.i = 0; this.i < this.particlesArr.length; this.i++) {

        // }
    }


    spawn(amount, obj, vel) {
        for (this.i = 0; this.i < amount; this.i++) {
            this.particlesArr.push(new Particle(obj, vel));
        }

        //SET POS HERE, USE BACKWARDS LOOP, YOU DONT WANT TO CHANGE THE POS OF ALL THE ALREADY EXISTING PARTICLES
    }


}