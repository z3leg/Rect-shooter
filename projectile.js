class Projectile {
    constructor(pos, angle, weapon) {
        //WEAPON =  GETS THE PLAYERCURRWEAPON HASH 
        this.muzzlePos = 15;
        this.destination = p5.Vector.fromAngle(angle);
        this.pos = createVector(pos.x + (this.destination.x * this.muzzlePos),
                                pos.y + (this.destination.y * this.muzzlePos));
        this.piercedAmount = 0;
        this.uid = random(9999999999);
        this.currTravelDist = 0;


        this.klass = weapon['klass'];
        this.vel = weapon['projectileVelocity'];
        this.side = (weapon['projectileWidth'] + weapon['projectileHeight'])  /2;

        this.width = weapon['projectileWidth'];
        this.height = weapon['projectileHeight'];

        
        this.piercingForce = weapon['projectilePiercingForce'];
        this.color = weapon['projectileColor'];
        this.outline = weapon['outline'];
        this.travelDist = weapon['projectileTravelDist'];

        //console.log(this.klass, this.vel, this.side, this.piercingForce)
        //this.maxTravelDist = playerProjectileTravelDist;
        //this.projectileRotation
    }
    
    update() {
        this.destination.setMag(this.vel);
        this.cameraMove = createVector(-player1.vel.x, -player1.vel.y);
        this.pos.add(this.cameraMove);

        this.pos.add(this.destination);
        this.draw();
        this.currTravelDist += Math.abs(this.destination.x)
        this.currTravelDist += Math.abs(this.destination.y)

    }

    draw() {
        push();
        //text(this.uid, this.pos.x, this.pos.y);
        if (!this.outline) {
            noStroke();
        }
        fill(this.color[0], this.color[1], this.color[2]);
        translate(this.pos.x, this.pos.y);
        //Rotating the projectile before it leaves the player
        if (this.currTravelDist < 1) {
            this.projectileRotation = player1.projectileAngle;
        }
        rotate(this.projectileRotation)
        rect(-this.vel, 0, this.height, this.width/2 -2);
        pop();
    }
    // outOfBoundaries() {
    //     if (this.pos.x + this.side > width) {
    //         return true;
    //     } else if (this.pos.x - this.side < 0) {
    //         return true;
    //     } else if (this.pos.y + this.side > height) {
    //         return true;
    //     } else if (this.pos.y - this.side < 0) {
    //         return true;
    //     }
    // }
}