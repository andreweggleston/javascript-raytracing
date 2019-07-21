let w = [];
let cam;
let slices = [];
let sceneH = 700;
let sceneW = 700;
let width = 700;

let sliderFOV;
function setup() {
    createCanvas(1400, 700);
    w.push(new Wall(0, 0, width, 0));
    w.push(new Wall(0, 0, 0, height));
    w.push(new Wall(0, height, width, height));
    w.push(new Wall(width, 0, width, height));
    for(let i = 0; i < 5; i++){
        let x1 = random(width);
        let x2 = random(width);
        let y1 = random(width);
        let y2 = random(width);
        w.push(new Wall(x1, y1, x2, y2));
    }
    cam = new Camera();
    sliderFOV = createSlider(0, 360, 90);
    sliderFOV.input(changeFOV);
    cam.setFOV(90);
}

function changeFOV(){
    cam.setFOV(sliderFOV.value());
}

function draw() {
    background(0);
    for(let wall of w){
        wall.show();
    }
    cam.show();

    if(keyIsDown(LEFT_ARROW)){
        cam.rotate(-.01);
    }
    if(keyIsDown(RIGHT_ARROW)){
        cam.rotate(.01);
    }
    if(keyIsDown(UP_ARROW)){
        cam.move(1);
    }
    if(keyIsDown(DOWN_ARROW)){
        cam.move(-1);
    }

    slices = cam.look(w);
    let dw = sceneW / slices.length;
    push();
    translate(sceneW, 0);
    for(let i = 0; i < slices.length; i++){
        noStroke();
        const sq = slices[i]*slices[i];
        const wsq = sceneW * sceneW;
        let b = map(sq, 0, wsq, 240, 0);
        let h = map(sq, 0, wsq, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i*dw + dw/2, sceneH/2, dw, h);
    }
    pop();

    cam.camLook(mouseX, mouseY);

    // cam.update(mouseX, mouseY);
}