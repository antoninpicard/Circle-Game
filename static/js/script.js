let score = 0;
let smallCircle = document.getElementById("smallCircle");
let colorZone = document.getElementById("colorZone");
let angle = 0;
let speed = 0.05;
let offsetAngle = Math.PI / 2; // Offset angle for color zone

setInterval(function() {
    let top = 150 - 130 * Math.cos(angle) - 10;  // Subtract half of the small circle size
    let left = 150 - 130 * Math.sin(angle) - 10;  // Subtract half of the small circle size
    smallCircle.style.top = top + "px";
    smallCircle.style.left = left + "px";
    angle += speed;
}, 50);

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {  // the space key
        let smallCircleRect = smallCircle.getBoundingClientRect();
        let colorZoneRect = colorZone.getBoundingClientRect();
        if (!(smallCircleRect.right < colorZoneRect.left || 
            smallCircleRect.left > colorZoneRect.right || 
            smallCircleRect.bottom < colorZoneRect.top || 
            smallCircleRect.top > colorZoneRect.bottom)) {
            score++;
            document.getElementById("score").textContent = "Score: " + score;
            speed += 0.002;  // Increase the speed

            // Change color zone position along the circle path
            let colorZoneAngle = angle + offsetAngle;  // Offset from the current small circle angle
            let top = 150 - 130 * Math.cos(colorZoneAngle) - 15;  // Subtract half of the color zone size
            let left = 150 - 130 * Math.sin(colorZoneAngle) - 15;  // Subtract half of the color zone size
            colorZone.style.top = top + "px";
            colorZone.style.left = left + "px";
        } else {
            // Save score in local storage
            localStorage.setItem('score', score);
            // Redirect to game over page
            window.location.href = "gameover.html";
        }
    }
}

