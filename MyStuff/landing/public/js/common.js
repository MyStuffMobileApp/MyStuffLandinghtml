// Particle Animation for Vertical Divider
function createParticle() {
    const particleContainer = document.querySelector('.particle-container');
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random horizontal position within 20px of the divider
    const randomX = (Math.random() * 40 - 20);
    particle.style.left = `calc(50% + ${randomX}px)`;
    particle.style.bottom = '-10px';
    
    particleContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Create particles at regular intervals
setInterval(createParticle, 200);

// Sparkle Animation for CTA Button
function createSparkle(e) {
    const button = e.currentTarget;
    const sparkleContainer = button.querySelector('.sparkle-container');
    
    // Create multiple sparkles
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random position relative to cursor
        const x = e.offsetX;
        const y = e.offsetY;
        
        // Random direction for sparkle movement
        const angle = Math.random() * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.setProperty('--tx', `${tx}px`);
        sparkle.style.setProperty('--ty', `${ty}px`);
        
        sparkleContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Add event listener to CTA button
document.querySelector('.cta-button').addEventListener('mousemove', createSparkle);

// Counter Animation
function animateCounter() {
    const counter = document.querySelector('.counter');
    const targetNumber = 1203;
    let currentNumber = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    const interval = duration / steps;
    
    const updateCounter = () => {
        currentNumber = Math.min(currentNumber + increment, targetNumber);
        counter.textContent = Math.round(currentNumber).toLocaleString();
        
        if (currentNumber < targetNumber) {
            setTimeout(updateCounter, interval);
        }
    };
    
    updateCounter();
}

// Start counter animation when element is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('.stats-counter')); 