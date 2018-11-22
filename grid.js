class Grid {
    constructor(xOffset, yOffset) {
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.x = 0;
        this.y = 0;
    }
    
    draw(cameraMove) {
        this.cameraMove = createVector(-cameraMove.x, -cameraMove.y);
        // this.x += this.cameraMove.x;
        // this.y += this.cameraMove.y;

        for (this.x = 0; this.x < width; this.x += this.xOffset) {
            for (this.y = 0; this.y < height; this.y += this.yOffset) {
                line(0, this.y, width, this.y);
            }
            line(this.x, 0, this.x, height);
        }
    }


}