class Grid {
    constructor(xIncrement, yIncrement) {
        this.xIncrement = xIncrement;
        this.yIncrement = yIncrement;
        this.offset = createVector(0,0);
        this.x = 0;
        this.y = 0;
    }
    
    draw() {
        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.offset.add(this.cameraMove);

        if (this.offset.x > this.xIncrement) {
            this.offset.x = 0;
        } else if (this.offset.y > this.yIncrement) {
            this.offset.y = 0;
        }


        for (this.x = this.offset.x; this.x < width; this.x += this.xIncrement) {
            for (this.y = this.offset.y; this.y < height; this.y += this.yIncrement) {
                line(0, this.y, width, this.y);
            }
            line(this.x, 0, this.x, height);
        }
    }


}