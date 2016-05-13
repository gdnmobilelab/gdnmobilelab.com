// Set vars
var stars = [],
    numOfStars = 30,
    canvas;

function  drawScreen () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < numOfStars; i++) {
        var star = stars[i];
        var image = new Image();
        image.src = "assets/images/star.png";
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(star.angle * Math.PI/180);
        context.translate(image.width / -2, image.height / -2);
        star.x += star.speed * Math.cos(Math.PI/180);
        star.y += star.speed *  Math.sin(Math.PI/180);
        context.drawImage(image, star.x, star.y);
        context.restore();

        if (star.x > canvas.width + image.width || star.y > canvas.height + image.height) {
            newStar(i);
        }
    }
}

function generateX() {
    var x = Math.random() * canvas.width;
    if (x > canvas.width / 2) {
        x += canvas.width;
    } else if (x < canvas.width / 2) {
        x -= canvas.width;
    }
    return x;
}

function generateY() {
    var y = Math.random() * canvas.height;
    if (y > canvas.height / 2) {
        y -= canvas.height;
    } else if (y < canvas.height / 2) {
        y += canvas.height;
    }
    return y;
}

function newStar(i) {
    var star = new Object();
    star.x = generateX();
    star.y = generateY();
    star.speed = 1 + Math.random() * 3;
    star.angle = Math.random() * 360;
    stars[i] = star;
}

function initStars() {
    numOfStars = Math.floor(canvas.width / 60);

    for (var i = 0; i < numOfStars; i++) {
        newStar(i);
    }
}

function setLoop() {
    window.setTimeout(setLoop, 20);
    drawScreen();
}

function init() {
    canvas = document.getElementsByClassName("canvas")[0];
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    context = canvas.getContext("2d");

    initStars();
    setLoop();
}

init();
