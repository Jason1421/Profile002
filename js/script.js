document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevents the form from actually submitting; for demo purposes
    alert('Form submitted! Thank you.');
});



const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'rgba(0,255,255,0.8)'; // LED cyan color

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();

const profilePic = document.getElementById('profilePic');

// Store the initial position for the playful interaction with the profile picture
const initialPosition = {
    left: profilePic.offsetLeft,
    top: profilePic.offsetTop
};

document.addEventListener('mousemove', function(e) {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const imgRect = profilePic.getBoundingClientRect();
    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2;

    const distance = Math.sqrt(Math.pow(cursorX - imgCenterX, 2) + Math.pow(cursorY - imgCenterY, 2));

    // If cursor is within 200 pixels of the image
    if (distance < 200) {
        const deltaX = (cursorX - imgCenterX) / distance;  // Normalize the direction
        const deltaY = (cursorY - imgCenterY) / distance;  // Normalize the direction

        // Calculate a dynamic multiplier based on proximity
        const multiplier = 30 + (200 - distance) * 0.5;

        // Move the image away from the cursor with the dynamic speed
        profilePic.style.left = `${profilePic.offsetLeft - deltaX * multiplier}px`;
        profilePic.style.top = `${profilePic.offsetTop - deltaY * multiplier}px`;
    }

    // Wall collisions - Reset to original position
    if (profilePic.offsetLeft < 0 || 
        profilePic.offsetTop < 0 ||
        profilePic.offsetLeft + imgRect.width > window.innerWidth ||
        profilePic.offsetTop + imgRect.height > window.innerHeight) {
        
        profilePic.style.left = `${initialPosition.left}px`;
        profilePic.style.top = `${initialPosition.top}px`;
    }
});

const backgroundContainer = document.getElementById('boxBackground');
const numOfRows = 5; // Reduced number for rarity

for (let i = 0; i < numOfRows; i++) {
    const row = document.createElement('div');
    row.classList.add('boxRow');

    // Set top position randomly with added space between rows for rarity
    row.style.top = `${Math.random() * window.innerHeight * 1.5}px`;

    const boxesPerRow = Math.floor(Math.random() * 15) + 5;  // Random number of boxes between 5 and 20

    // Create random number of boxes in each row
    for (let j = 0; j < boxesPerRow; j++) {
        const box = document.createElement('div');
        box.classList.add('box');
        row.appendChild(box);
    }

    backgroundContainer.appendChild(row);
}

// Animate the rows of boxes for the background effect
function animateRows() {
    const rows = document.querySelectorAll('.boxRow');
    rows.forEach((row, index) => {
        const speed = 1 + index * 0.2; // Closer rows move faster
        row.style.left = `${row.offsetLeft - speed}px`;

        // If row goes completely out of the screen, reset its position
        if (row.offsetLeft + row.offsetWidth < 0) {
            row.style.left = `${window.innerWidth}px`;
        }
    });

    requestAnimationFrame(animateRows);
}

animateRows();




