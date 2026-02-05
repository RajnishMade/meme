// Get button elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const container = document.querySelector('.container');

// Track if "Yes" was clicked
let yesClicked = false;

// Function to move the "No" button to a random position
function moveNoButton() {
    if (yesClicked) return; // Don't move if already clicked yes
    
    // Get viewport dimensions
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Get button dimensions
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    
    // Calculate random position within viewport (with some padding)
    const maxX = windowWidth - btnWidth - 50;
    const maxY = windowHeight - btnHeight - 50;
    
    const randomX = Math.floor(Math.random() * maxX) + 25;
    const randomY = Math.floor(Math.random() * maxY) + 25;
    
    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.transform = 'none';
}

// Event listeners for "No" button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Click event for "No" button (just in case someone manages to click it)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Event listener for "Yes" button
yesBtn.addEventListener('click', () => {
    yesClicked = true;
    
    // Hide buttons
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    // Show success message
    message.textContent = "Yay! I knew you'd say yes! 💕🎉";
    message.classList.remove('hidden');
    
    // Add celebration animation to container
    container.classList.add('celebrating');
    
    // Create hearts animation
    createHearts();
});

// Function to create falling hearts
function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-50px';
            heart.style.fontSize = Math.random() * 30 + 20 + 'px';
            heart.style.opacity = '1';
            heart.style.transition = 'all 3s linear';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            
            document.body.appendChild(heart);
            
            // Animate heart falling
            setTimeout(() => {
                heart.style.top = '100vh';
                heart.style.opacity = '0';
            }, 100);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 3100);
        }, i * 200);
    }
}

// Make "Yes" button grow larger over time to encourage clicking
let yesButtonScale = 1;
setInterval(() => {
    if (!yesClicked && yesButtonScale < 1.5) {
        yesButtonScale += 0.02;
        yesBtn.style.transform = `scale(${yesButtonScale})`;
    }
}, 1000);