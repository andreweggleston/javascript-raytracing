class Camera{
    constructor(){
        this.pos = createVector(width/2, height/2);
        this.rays = [];
        this.heading = 0;
        this.fov = 90;
        for(let i = -this.fov/2; i < this.fov/2; i+=.5){
            this.rays.push(new Ray(this.pos, radians(i)));
        }
    }

    camLook(x, y) {
        let dir = p5.Vector.fromAngle(this.heading)
        dir.x = x - this.pos.x;
        dir.y = y - this.pos.y;
        // dir.normalize();
        this.heading = Math.atan2(dir.y, dir.x);
        for(let i = 0; i < this.rays.length; i++){
            this.rays[i].setAngle(radians(i-this.fov/2)+this.heading);
        }
    }

    rotate(angle){
        this.heading += angle;
        for(let i = 0; i < this.rays.length; i++){
            this.rays[i].setAngle(radians(i-this.fov/2)+this.heading);
        }
    }

    setFOV(fov){
        this.fov = fov;
        this.rays = [];
        for(let i = -this.fov/2; i < this.fov/2; i+=1){
            this.rays.push(new Ray(this.pos, radians(i) + this.heading));
        }
    }

    show(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, 4);
        for(let ray of this.rays){
            ray.show();
        }
    }

    update(x, y){
        this.pos.set(x,y);
    }

    move(dist){
        const velocity = p5.Vector.fromAngle(this.heading);
        velocity.setMag(dist);
        this.pos.add(velocity);
    }

    look(walls){
        let slices = [];
        let i = 0;
        for(let ray of this.rays){
            let closestWall = null;
            let minDistance = Infinity;
            for(let wall of walls) {
                const intersect = ray.cast(wall);
                if (intersect) {
                    let dist = p5.Vector.dist(this.pos, intersect);
                    const a = ray.dir.heading() - this.heading;
                    dist *= Math.cos(a);
                    if(dist < minDistance){
                        minDistance = dist;
                        closestWall = intersect;
                    }
                }
            }
            if(closestWall) {
                stroke(255, 100);
                line(this.pos.x, this.pos.y, closestWall.x, closestWall.y);
            }
            slices[i] = minDistance;
            i++;
        }
        return slices;
    }
}