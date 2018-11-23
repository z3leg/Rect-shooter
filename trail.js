class Trail {
    constructor() {
        this.trailArr = [];
        this.pos = createVector(width / 2, height / 2);
        this.spawnInterval = 0;
        this.spawnSpeed = 10;
        this.side = 3;
        this.opacity = 255;
        
    }
    
    draw() {
        push();
        for (this.i = 0; this.i < this.trailArr.length; this.i++) {
            this.trailArr[this.i].opacity--;
            fill(255, 255, 255, this.trailArr[this.i].opacity);
            noStroke();
            ellipse(this.trailArr[this.i].pos.x, this.trailArr[this.i].pos.y, 5, 5);
            if (this.trailArr[this.i].opacity < 1) {
                this.trailArr.splice(this.i, 1);
            }
        }
        pop();
    }
    
    update(cameraMove) {
        if (Math.abs(player1.vel.x) > 0.4 || Math.abs(player1.vel.y) > 0.4) {
            if (this.spawnInterval % (60 / this.spawnSpeed) == 0) {
                this.trailArr.push(new Trail());
                this.spawnInterval = 0;
            }
        }
        this.cameraMove = createVector(-cameraMove.x, -cameraMove.y);

        for (this.i = 0; this.i < this.trailArr.length; this.i++) {
            this.trailArr[this.i].pos.add(this.cameraMove);
        }

        this.spawnInterval++;
    }


}