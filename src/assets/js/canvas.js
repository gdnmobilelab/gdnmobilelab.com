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

        if (star.x > canvas.width - image.width || star.y > canvas.height - image.height) {
            newStar(i);
        }
    }
}

function newStar(i) {
    stars[i].x = Math.random() * canvas.width - canvas.width;
    stars[i].y = Math.random() * canvas.height - canvas.height;
}

function initStars() {
    for (var i = 0; i < numOfStars; i++) {
        var star = new Object();
        star.x = Math.random() * canvas.width - canvas.width;
        star.y = Math.random() * canvas.height - canvas.height;
        star.speed = 1 + Math.random() * 3;
        star.angle = Math.random() * 360;
        stars.push(star);
    }
}

// Init the canvas
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

function setLoop() {
    window.setTimeout(setLoop, 20);
    drawScreen();
}

init();
